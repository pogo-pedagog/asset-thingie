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

    def truthy_keys(*keys: str) -> bool:
        for k in keys:
            v = str(q.get(k) or "").strip().lower()
            if v in ("1", "true", "yes", "on"):
                return True
        return False

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
        "civarchive_sort": (q.get("civarchive_sort") or "").strip(),
        "civarchive_type": (q.get("civarchive_type") or "").strip(),
        "civarchive_base_models": all_vals("civarchive_base_model"),
        "civarchive_tags": (q.get("civarchive_tags") or "").strip(),
        "civarchive_deleted_only": truthy_keys("civarchive_deleted_only", "civarchive_is_deleted"),
        "civarchive_nsfw": (q.get("civarchive_nsfw") or "").strip().lower(),
    }
