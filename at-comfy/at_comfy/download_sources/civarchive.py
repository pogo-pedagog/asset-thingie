"""CivArchive download preparation (implemented alongside browse adapter)."""

from __future__ import annotations

from typing import Any

from at_comfy.config import ATComfyConfig
from at_comfy.download_sources.types import PreparedDownload


async def prepare_civarchive_download(_body: dict[str, Any], _cfg: ATComfyConfig) -> PreparedDownload:
    """Populated in the CivArchive download task; placeholder until wired."""
    raise ValueError("CivArchive download body not yet supported")
