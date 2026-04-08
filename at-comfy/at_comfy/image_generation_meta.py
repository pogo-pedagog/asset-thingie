"""Extract Stable-Diffusion-style generation blobs from image bytes (PNG / JPEG).

PNG: reads ``tEXt``, ``zTXt``, and uncompressed ``iTXt`` chunks — same families of chunks
automatic1111 / many UIs embed (``parameters``, ``prompt``, Comfy ``workflow`` keys, etc.).
JPEG: optional Pillow read of EXIF UserComment (tag ``0x9286``).

This mirrors what dedicated gallery tools (e.g. LoraMaster-style pipelines) typically scrape
from downloaded Civitai samples without relying on the REST ``meta`` field alone.
"""

from __future__ import annotations

import struct
import zlib
from io import BytesIO
from typing import Any

PNG_SIG = b"\x89PNG\r\n\x1a\n"

# Prefer these chunk keywords when several carry long text (A111 default is ``parameters``).
_PNG_TEXT_KEY_PRIORITY = (
    "parameters",
    "prompt",
    "Negative prompt",
    "Comment",
    "Description",
    "comfy",
    "workflow",
)

# Heuristic: generation parameter dumps almost always mention sampling / model / prompts.
_GEN_MARKERS = (
    "steps",
    "Steps:",
    "Sampler:",
    "CFG scale",
    "Model:",
    "Model hash",
    "negative prompt",
    "Negative prompt",
    "Dream",
    "Denoising strength",
    "Hires upscale",
    "Clip skip",
    "VAE:",
    "Lora",
)


def _iter_png_chunks(data: bytes):
    if len(data) < 16 or not data.startswith(PNG_SIG):
        return
    pos = len(PNG_SIG)
    n = len(data)
    while pos + 8 <= n:
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        ctype = data[pos + 4 : pos + 8]
        pos += 8
        end = pos + length
        if end + 4 > n:
            return
        yield ctype, data[pos:end]
        pos = end + 4
        if ctype == b"IEND":
            return


def _split_png_text_chunk(chunk: bytes) -> tuple[str, str]:
    i = chunk.index(0)
    kw = chunk[:i].decode("latin-1", errors="replace")
    return kw, chunk[i + 1 :].decode("latin-1", errors="replace")


def _split_ztxt_chunk(chunk: bytes) -> tuple[str, str] | None:
    try:
        i = chunk.index(0)
    except ValueError:
        return None
    kw = chunk[:i].decode("latin-1", errors="replace")
    tail = chunk[i + 1 :]
    if len(tail) < 2 or tail[0] != 0:
        return None
    try:
        txt = zlib.decompress(tail[1:]).decode("utf-8", errors="replace")
    except Exception:
        return None
    return kw, txt


def _split_itxt_chunk(chunk: bytes) -> tuple[str, str] | None:
    """PNG iTXt: keyword\\0 compression_flag method lang\\0 trans_kw\\0 text."""
    try:
        i = chunk.index(0)
    except ValueError:
        return None
    kw = chunk[:i].decode("latin-1", errors="replace")
    rest = chunk[i + 1 :]
    if len(rest) < 2:
        return None
    comp = rest[0]
    rest = rest[2:]
    try:
        zl = rest.index(0)
        rest = rest[zl + 1 :]
        zt = rest.index(0)
        text_field = rest[zt + 1 :]
    except ValueError:
        return None
    if comp == 0:
        text = text_field.decode("utf-8", errors="replace")
    elif comp == 1:
        try:
            text = zlib.decompress(text_field).decode("utf-8", errors="replace")
        except Exception:
            return None
    else:
        return None
    return kw, text


def _collect_png_keyed_text(data: bytes) -> dict[str, str]:
    out: dict[str, str] = {}
    for ctype, chunk in _iter_png_chunks(data):
        if ctype == b"tEXt":
            try:
                k, v = _split_png_text_chunk(chunk)
            except ValueError:
                continue
            if k and v:
                out[k] = v
        elif ctype == b"zTXt":
            pair = _split_ztxt_chunk(chunk)
            if pair:
                k, v = pair
                if k and v:
                    out[k] = v
        elif ctype == b"iTXt":
            pair = _split_itxt_chunk(chunk)
            if pair:
                k, v = pair
                if k and v:
                    out[k] = v
    return out


def _pick_best_png_payload(keyed: dict[str, str]) -> tuple[str | None, str | None]:
    if not keyed:
        return None, None
    for key in _PNG_TEXT_KEY_PRIORITY:
        if key in keyed and keyed[key].strip():
            return keyed[key].strip(), f"png:{key}"
    # Longest value that looks like generation metadata
    best_k = None
    best_v = ""
    for k, v in keyed.items():
        s = (v or "").strip()
        if len(s) > len(best_v) and text_looks_like_generation_metadata(s):
            best_k, best_v = k, s
    if best_k:
        return best_v, f"png:{best_k}"
    # Fallback: longest chunk
    kmax = max(keyed, key=lambda x: len((keyed[x] or "").strip()))
    v = (keyed[kmax] or "").strip()
    return (v or None, f"png:{kmax}" if v else None)


def text_looks_like_generation_metadata(text: str) -> bool:
    t = (text or "").strip()
    if len(t) < 24:
        return False
    tl = t.lower()
    return any(m.lower() in tl for m in _GEN_MARKERS)


def extract_embedded_generation_text(data: bytes) -> tuple[str | None, str]:
    """Return ``(text, source)`` where ``source`` is a short label, e.g. ``png:parameters`` or ``none``."""
    if not data:
        return None, "empty"
    head = data[:12]
    if data.startswith(PNG_SIG):
        keyed = _collect_png_keyed_text(data)
        txt, src = _pick_best_png_payload(keyed)
        if txt:
            return txt, src or "png"
        return None, "png_no_text_chunks" if keyed else "png_no_chunks"
    if head.startswith(b"\xff\xd8\xff") or head[0:3] == b"GIF":
        j = _jpeg_exif_user_comment(data)
        if j:
            return j, "jpeg:exif_usercomment"
        return None, "jpeg_no_usercomment"

    return None, "unknown_format"


def _jpeg_exif_user_comment(data: bytes) -> str | None:
    try:
        from PIL import Image
    except ImportError:
        return None
    try:
        with Image.open(BytesIO(data)) as im:
            if (im.format or "").upper() not in {"JPEG", "MPO"}:
                return None
            exif = im.getexif()
            if exif is None:
                return None
            uc = exif.get(0x9286)
    except Exception:
        return None
    if uc is None:
        return None
    if isinstance(uc, str):
        s = uc.strip()
        return s or None
    if isinstance(uc, bytes):
        if uc.startswith(b"UNICODE\0"):
            try:
                return uc[8:].decode("utf-16le", errors="replace").strip() or None
            except Exception:
                return None
        if uc.startswith(b"ASCII\0"):
            try:
                return uc[7:].decode("ascii", errors="replace").strip() or None
            except Exception:
                return None
        try:
            return uc.decode("utf-8", errors="replace").strip() or None
        except Exception:
            return None
    return str(uc).strip() or None


def summarize_embedded_extraction(data: bytes) -> dict[str, Any]:
    """Structured summary for logging / manual scripts."""
    text, source = extract_embedded_generation_text(data)
    png_keys: list[str] = []
    if data.startswith(PNG_SIG):
        png_keys = sorted(_collect_png_keyed_text(data).keys())
    return {
        "embedded_text": text,
        "embedded_source": source,
        "embedded_useful": bool(text and text_looks_like_generation_metadata(text)),
        "png_text_keys": png_keys,
    }
