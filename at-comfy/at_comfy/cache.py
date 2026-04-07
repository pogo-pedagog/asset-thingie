"""Thumbnail / example image files under ``at_cache/``."""

from __future__ import annotations

from pathlib import Path

from aiohttp import web

from at_comfy.config import cache_root


def cache_dir_safe_path(rel: str) -> Path | None:
    root = cache_root().resolve()
    rel = rel.lstrip("/").replace("\\", "/")
    if ".." in rel.split("/"):
        return None
    full = (root / rel).resolve()
    try:
        full.relative_to(root)
    except ValueError:
        return None
    return full


async def serve_cache_file(full_path: Path) -> web.FileResponse:
    return web.FileResponse(full_path)
