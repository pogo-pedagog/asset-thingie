"""Browse source registry."""

from __future__ import annotations

from typing import Any

from at_comfy.browse_sources.civarchive import CivArchiveBrowseSource
from at_comfy.browse_sources.civitai import CivitaiBrowseSource
from at_comfy.browse_sources.types import BrowseSource
from at_comfy.config import ATComfyConfig


def list_browse_source_manifests() -> list[dict[str, str]]:
    """Static list for ``GET /at/browse/sources`` (extend when adding sources)."""
    return [
        {"id": "civitai", "label": "Civitai"},
        {"id": "civarchive", "label": "CivArchive"},
    ]


def get_browse_source(source_id: str, cfg: ATComfyConfig, *, browse_limit: int) -> BrowseSource:
    if source_id == "civitai":
        return CivitaiBrowseSource(cfg, browse_limit=browse_limit)
    if source_id == "civarchive":
        return CivArchiveBrowseSource(cfg, browse_limit=browse_limit)
    raise KeyError(source_id)


def browse_query_dict_from_request(request: Any) -> dict[str, Any]:
    """Normalize aiohttp query multidict into a dict for source adapters."""
    q = request.query
    getall = getattr(q, "getall", None)

    def all_vals(key: str) -> list[str]:
        if callable(getall):
            try:
                vals = list(getall(key))
            except KeyError:
                vals = []
            return [str(x) for x in vals if str(x).strip()]
        v = q.get(key)
        return [str(v)] if v is not None and str(v).strip() else []

    ct = all_vals("content_types") + all_vals("content_type")
    return {
        "q": q.get("q") or "",
        "search_type": q.get("search_type") or "model_name",
        "content_types": ct,
        "base_models": all_vals("base_models"),
        "sort": q.get("sort") or "Most Downloaded",
        "period": q.get("period") or "All Time",
        "nsfw": (q.get("nsfw") or "").lower() in ("1", "true", "yes"),
        "kind": (q.get("kind") or "").strip(),
        "page": (q.get("page") or "").strip(),
    }
