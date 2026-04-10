"""Dispatch download POST bodies to source-specific preparers."""

from __future__ import annotations

from typing import Any

from at_comfy.config import ATComfyConfig
from at_comfy.download_sources.types import PreparedDownload


async def prepare_download(body: dict[str, Any], cfg: ATComfyConfig) -> PreparedDownload:
    source = str(body.get("source") or "civitai").lower().strip()
    if source == "civitai":
        from at_comfy.download_sources.civitai import prepare_civitai_download

        return await prepare_civitai_download(body, cfg)
    if source == "civarchive":
        from at_comfy.download_sources.civarchive import prepare_civarchive_download

        return await prepare_civarchive_download(body, cfg)
    raise ValueError(f"unknown download source: {source}")
