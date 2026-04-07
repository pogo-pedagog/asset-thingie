"""Walk Comfy model folders and index into SQLite."""

from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import shutil
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from at_comfy.comfy_paths import get_folder_paths_list
from at_comfy.config import ATComfyConfig, cache_root, load_config
from at_comfy.db import get_conn
from at_comfy.safetensors_header import normalize_lora_metadata, read_safetensors_metadata
from at_comfy.scan_state import scan_reset, scan_set

logger = logging.getLogger(__name__)

MODEL_EXTS = {".safetensors", ".ckpt", ".pt", ".pth", ".bin", ".gguf", ".onnx"}

_scan_lock = asyncio.Lock()


def _utc_now() -> str:
    return datetime.now(tz=UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def get_scan_dirs(config: ATComfyConfig) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    for key in ("loras", "checkpoints"):
        out[key] = get_folder_paths_list(key, config)
    return out


def _iter_model_files(root: Path):
    root = root.resolve()
    if not root.is_dir():
        return
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in MODEL_EXTS:
            yield p


def file_sha256_sync(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest().upper()


def _infer_types(
    path: Path,
    meta: dict[str, str] | None,
    scan_family: str,
) -> tuple[str, str]:
    """Return (content_type, family)."""
    if scan_family == "checkpoints":
        return "Checkpoint", "checkpoint"
    family = "lora"
    if meta:
        net = (meta.get("ss_network_module") or "").lower()
        if "dora" in net:
            return "DoRA", family
        if "lycoris" in net or "locon" in net:
            return "LoCon", family
        if net:
            return "LORA", family
    return "LORA", family


def _base_model_from_meta(meta: dict[str, str] | None) -> str | None:
    if not meta:
        return None
    for k in ("ss_base_model_version", "ss_sd_model_name", "modelspec.architecture"):
        v = meta.get(k)
        if v and str(v).strip():
            return str(v).strip()
    return None


def _content_type_from_header_meta(meta: dict[str, str] | None, scan_family: str) -> tuple[str, str]:
    if scan_family == "checkpoints":
        return "Checkpoint", "checkpoint"
    return _infer_types(Path(), meta, scan_family)


async def index_one_file(
    path: Path,
    *,
    scan_family: str,
    config: ATComfyConfig,
    force_hash: bool = False,
) -> int | None:
    """Index a single file (blocking work offloaded for hash/metadata). Returns ``asset_id`` when known."""
    path = path.resolve()
    spath = str(path)
    try:
        st = path.stat()
    except OSError as e:
        logger.debug("skip unreadable %s: %s", path, e)
        return None

    mtime = float(st.st_mtime)
    size = int(st.st_size)
    conn = get_conn()

    row = conn.execute("SELECT mtime, sha256 FROM library_files WHERE path = ?", (spath,)).fetchone()
    if (
        not force_hash
        and row is not None
        and row["mtime"] is not None
        and float(row["mtime"]) == mtime
        and row["sha256"]
    ):
        cur = conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (spath,)).fetchone()
        return int(cur["asset_id"]) if cur else None

    meta: dict[str, str] | None = None
    norm: dict[str, Any] = {}
    if path.suffix.lower() == ".safetensors":
        meta = await asyncio.to_thread(read_safetensors_metadata, path)
        if meta:
            norm = normalize_lora_metadata(meta)

    sha = await asyncio.to_thread(file_sha256_sync, path)

    content_type, family = _content_type_from_header_meta(meta, scan_family)
    stem = path.stem
    scanned_at = _utc_now()

    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime,
            source, civitai_model_id, civitai_version_id, scanned_at, enrichment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL)
        ON CONFLICT(path) DO UPDATE SET
            filename = excluded.filename,
            stem = excluded.stem,
            sha256 = excluded.sha256,
            content_type = excluded.content_type,
            family = excluded.family,
            file_size_bytes = excluded.file_size_bytes,
            mtime = excluded.mtime,
            scanned_at = excluded.scanned_at
        """,
        (
            spath,
            path.name,
            stem,
            sha,
            content_type,
            family,
            size,
            mtime,
            scanned_at,
        ),
    )

    display_name = stem
    base_model = _base_model_from_meta(meta)
    trig_json = "[]"

    cur = conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (spath,)).fetchone()
    now = _utc_now()
    if cur is None:
        conn.execute(
            """
            INSERT INTO library_assets (
                primary_path, display_name, content_type, family, base_model, category,
                is_favorite, notes, trigger_words, default_strength, usage_count,
                last_used_at, cover_media_id, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, NULL, 0, NULL, ?, NULL, 0, NULL, NULL, ?, ?)
            """,
            (spath, display_name, content_type, family, base_model, trig_json, now, now),
        )
        asset_id = int(conn.execute("SELECT last_insert_rowid()").fetchone()[0])
    else:
        asset_id = int(cur["asset_id"])
        conn.execute(
            """
            UPDATE library_assets SET
                display_name = ?, content_type = ?, family = ?, base_model = ?,
                trigger_words = ?, updated_at = ?
            WHERE asset_id = ?
            """,
            (display_name, content_type, family, base_model, trig_json, now, asset_id),
        )

    raw_meta_json = json.dumps(meta) if meta else None
    norm_json = json.dumps(norm) if norm else None
    conn.execute(
        """
        INSERT INTO artifact_metadata (
            asset_id, artifact_type, raw_metadata, normalized, file_mtime, extracted_at, parser_version
        )
        VALUES (?, 'safetensors_header', ?, ?, ?, ?, 1)
        ON CONFLICT(asset_id) DO UPDATE SET
            raw_metadata = excluded.raw_metadata,
            normalized = excluded.normalized,
            file_mtime = excluded.file_mtime,
            extracted_at = excluded.extracted_at
        """,
        (asset_id, raw_meta_json, norm_json, mtime, now),
    )
    conn.commit()
    return asset_id


def compute_stale_assets() -> list[dict[str, Any]]:
    """Return assets whose ``primary_path`` is not a readable file on disk."""
    conn = get_conn()
    rows = conn.execute(
        "SELECT asset_id, display_name, primary_path FROM library_assets",
    ).fetchall()
    stale: list[dict[str, Any]] = []
    for r in rows:
        p = Path(str(r["primary_path"]))
        if not p.is_file():
            stale.append(
                {
                    "asset_id": int(r["asset_id"]),
                    "display_name": r["display_name"],
                    "path": str(r["primary_path"]),
                },
            )
    return stale


def orphan_cache_bytes_for_asset_ids(asset_ids: set[int]) -> int:
    """Total bytes under covers/ and examples/ for the given asset ids."""
    if not asset_ids:
        return 0
    total = 0
    cache = cache_root()
    for aid in asset_ids:
        cover = cache / "covers" / f"{aid}.jpg"
        if cover.is_file():
            try:
                total += int(cover.stat().st_size)
            except OSError:
                pass
        ex_dir = cache / "examples" / str(aid)
        if ex_dir.is_dir():
            try:
                for f in ex_dir.rglob("*"):
                    if f.is_file():
                        try:
                            total += int(f.stat().st_size)
                        except OSError:
                            pass
            except OSError:
                pass
    return total


def clean_stale_assets() -> int:
    """Delete stale assets, their library_files row, and cached cover/examples. Returns removed count."""
    stale = compute_stale_assets()
    conn = get_conn()
    cache = cache_root()
    for s in stale:
        aid = int(s["asset_id"])
        path = str(s["path"])
        conn.execute("DELETE FROM library_assets WHERE asset_id = ?", (aid,))
        conn.execute("DELETE FROM library_files WHERE path = ?", (path,))
        cover = cache / "covers" / f"{aid}.jpg"
        if cover.is_file():
            try:
                cover.unlink()
            except OSError:
                pass
        ex_dir = cache / "examples" / str(aid)
        if ex_dir.is_dir():
            shutil.rmtree(ex_dir, ignore_errors=True)
    conn.commit()
    return len(stale)


def prune_missing(indexed_paths: set[str]) -> int:
    conn = get_conn()
    rows = [str(r[0]) for r in conn.execute("SELECT path FROM library_files").fetchall()]
    removed = 0
    for p in rows:
        if p not in indexed_paths:
            conn.execute("DELETE FROM library_assets WHERE primary_path = ?", (p,))
            conn.execute("DELETE FROM library_files WHERE path = ?", (p,))
            removed += 1
    conn.commit()
    return removed


async def run_full_scan(*, config: ATComfyConfig | None = None) -> None:
    if _scan_lock.locked():
        return
    async with _scan_lock:
        cfg = config or load_config()
        scan_reset()
        scan_set(running=True, phase="listing", done=0, total=0, message="")
        all_files: list[tuple[str, Path]] = []
        dirs = get_scan_dirs(cfg)
        for scan_family, roots in dirs.items():
            if scan_family not in ("loras", "checkpoints"):
                continue
            for root_s in roots:
                root = Path(root_s)
                for f in _iter_model_files(root):
                    all_files.append(("checkpoints" if scan_family == "checkpoints" else "loras", f))

        scan_set(total=len(all_files), phase="indexing", message="indexing")
        indexed: set[str] = set()
        mode = (cfg.enrichment_mode or "").strip().lower()
        for i, (fam, fpath) in enumerate(all_files):
            try:
                aid = await index_one_file(fpath, scan_family=fam, config=cfg)
                if aid is not None:
                    indexed.add(str(fpath.resolve()))
                    if mode == "auto":
                        from at_comfy.enrichment import EnrichmentService

                        await asyncio.sleep(max(0, int(cfg.enrichment_rate_limit_ms)) / 1000.0)
                        await EnrichmentService().enrich_asset(aid, cfg)
            except Exception:
                logger.exception("index failed for %s", fpath)
            scan_set(done=i + 1)

        scan_set(running=False, phase="done", message="ok")
        if mode == "background":
            from at_comfy.enrichment import EnrichmentService

            asyncio.create_task(EnrichmentService().run_batch(cfg))


def schedule_scan_background() -> None:
    cfg = load_config()
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        return
    if cfg.scan_on_startup:
        loop.create_task(run_full_scan(config=cfg))
