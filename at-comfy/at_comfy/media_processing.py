"""Optional local thumbnail / poster generation (ffmpeg, optional Pillow)."""

from __future__ import annotations

import logging
import re
import shutil
import subprocess
from pathlib import Path

logger = logging.getLogger(__name__)

_VIDEO_EXT_RE = re.compile(r"\.(mp4|webm|mov|mkv)(?:\?|$)", re.IGNORECASE)


def video_extension_from_url(url: str) -> str:
    u = (url or "").strip().lower()
    m = _VIDEO_EXT_RE.search(u)
    if m:
        return f".{m.group(1)}"
    return ".mp4"


def ffmpeg_available() -> bool:
    return shutil.which("ffmpeg") is not None


def _run_ffmpeg(args: list[str], *, timeout: float = 120.0) -> bool:
    try:
        r = subprocess.run(
            args,
            capture_output=True,
            text=True,
            timeout=timeout,
            check=False,
        )
        if r.returncode != 0:
            logger.debug("ffmpeg failed rc=%s stderr=%s", r.returncode, (r.stderr or "")[:500])
            return False
        return True
    except (OSError, subprocess.SubprocessError) as e:
        logger.debug("ffmpeg subprocess error: %s", e)
        return False


def poster_jpeg_from_video_file(video: Path, dest_jpg: Path) -> bool:
    """Extract one frame to JPEG using ffmpeg (best-effort)."""
    if not video.is_file():
        return False
    if not ffmpeg_available():
        return False
    dest_jpg.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest_jpg.with_suffix(dest_jpg.suffix + ".tmp.jpg")
    try:
        if tmp.is_file():
            tmp.unlink()
    except OSError:
        pass
    ok = _run_ffmpeg(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-ss",
            "0",
            "-i",
            str(video),
            "-frames:v",
            "1",
            "-q:v",
            "3",
            str(tmp),
        ],
        timeout=120.0,
    )
    if not ok or not tmp.is_file() or tmp.stat().st_size == 0:
        try:
            if tmp.is_file():
                tmp.unlink()
        except OSError:
            pass
        return False
    try:
        tmp.replace(dest_jpg)
    except OSError:
        return False
    return True


def poster_jpeg_from_video_url(url: str, dest_jpg: Path, *, headers: dict[str, str] | None = None) -> bool:
    """Grab first-frame JPEG from a remote video URL (no full local copy)."""
    u = (url or "").strip()
    if not u or not ffmpeg_available():
        return False
    dest_jpg.parent.mkdir(parents=True, exist_ok=True)
    hdr_args: list[str] = []
    if headers:
        parts: list[str] = []
        for k, v in headers.items():
            parts.append(f"{k}: {v}\r\n")
        blob = "".join(parts)
        hdr_args = ["-headers", blob]
    tmp = dest_jpg.with_suffix(dest_jpg.suffix + ".tmp.jpg")
    try:
        if tmp.is_file():
            tmp.unlink()
    except OSError:
        pass
    args = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        *hdr_args,
        "-ss",
        "0",
        "-i",
        u,
        "-frames:v",
        "1",
        "-q:v",
        "3",
        str(tmp),
    ]
    ok = _run_ffmpeg(args, timeout=180.0)
    if not ok or not tmp.is_file() or tmp.stat().st_size == 0:
        try:
            if tmp.is_file():
                tmp.unlink()
        except OSError:
            pass
        return False
    try:
        tmp.replace(dest_jpg)
    except OSError:
        return False
    return True


def jpeg_thumbnail_from_image_file(src: Path, dest_jpg: Path, *, max_side: int = 200) -> bool:
    """Downscale a cached image to a JPEG thumb (Pillow if installed, else ffmpeg)."""
    if not src.is_file():
        return False
    dest_jpg.parent.mkdir(parents=True, exist_ok=True)
    ms = max(32, int(max_side))
    try:
        from PIL import Image  # type: ignore[import-untyped]

        with Image.open(src) as im:
            im = im.convert("RGB")
            im.thumbnail((ms, ms), Image.Resampling.LANCZOS)
            im.save(dest_jpg, format="JPEG", quality=85, optimize=True)
        return dest_jpg_ok(dest_jpg)
    except Exception:
        logger.debug("Pillow thumb failed for %s", src, exc_info=True)

    if not ffmpeg_available():
        return False
    tmp = dest_jpg.with_suffix(dest_jpg.suffix + ".tmp.jpg")
    try:
        if tmp.is_file():
            tmp.unlink()
    except OSError:
        pass
    scale = f"scale='min({ms},iw)':-2"
    ok = _run_ffmpeg(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(src),
            "-vf",
            scale,
            "-frames:v",
            "1",
            "-q:v",
            "5",
            str(tmp),
        ],
        timeout=60.0,
    )
    if not ok or not tmp.is_file():
        try:
            if tmp.is_file():
                tmp.unlink()
        except OSError:
            pass
        return False
    try:
        tmp.replace(dest_jpg)
    except OSError:
        return False
    return dest_jpg_ok(dest_jpg)


def dest_jpg_ok(p: Path) -> bool:
    return p.is_file() and p.stat().st_size > 0


def downscale_jpeg_copy(src: Path, dest_jpg: Path, *, max_side: int = 200) -> bool:
    """Same as ``jpeg_thumbnail_from_image_file`` but explicit name for callers."""
    return jpeg_thumbnail_from_image_file(src, dest_jpg, max_side=max_side)
