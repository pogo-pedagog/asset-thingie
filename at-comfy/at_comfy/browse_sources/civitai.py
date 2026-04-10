"""Civitai browse source adapter."""

from __future__ import annotations

from typing import Any

from at_comfy.browse_sources.civitai_enrich import enrich_model_versions_with_image_meta
from at_comfy.browse_sources.types import BrowsePageResult
from at_comfy.civitai.client import CivitaiClient, merge_models_list_pagination_url
from at_comfy.civitai.models import ModelListPage, SearchParams
from at_comfy.civitai_catalog import civitai_base_models_upsert_batch
from at_comfy.config import ATComfyConfig


def _civitai_base_models_from_page(page: ModelListPage) -> list[str]:
    names: list[str] = []
    for m in page.items:
        for v in m.model_versions:
            bm = (v.base_model or "").strip()
            if bm:
                names.append(bm)
    return names


def civitai_model_list_page_dict(page: ModelListPage, params: SearchParams | None = None) -> dict[str, Any]:
    """Same JSON shape as legacy ``/at/browse/search`` responses."""
    np = page.next_page
    pp = page.prev_page
    if params is not None:
        if np:
            np = merge_models_list_pagination_url(np, params)
        if pp:
            pp = merge_models_list_pagination_url(pp, params)
    return {
        "items": [m.model_dump(mode="json", by_alias=True) for m in page.items],
        "next_page": np,
        "prev_page": pp,
    }


def civitai_search_params_from_browse_query(query: dict[str, Any], cfg: ATComfyConfig, *, limit: int) -> SearchParams:
    """Build Civitai ``SearchParams`` from a normalized browse query dict."""
    nsfw_q = bool(query.get("nsfw"))
    if cfg.hide_nsfw:
        nsfw_effective = False
    else:
        nsfw_effective = nsfw_q
    ct = query.get("content_types")
    if isinstance(ct, str):
        content_types = [ct] if ct.strip() else []
    elif isinstance(ct, list):
        content_types = [str(x) for x in ct if str(x).strip()]
    else:
        content_types = []
    bm = query.get("base_models")
    if isinstance(bm, str):
        base_models = [bm] if bm.strip() else []
    elif isinstance(bm, list):
        base_models = [str(x) for x in bm if str(x).strip()]
    else:
        base_models = []
    st = str(query.get("search_type") or "model_name")
    sort = str(query.get("sort") or "Most Downloaded")
    period = str(query.get("period") or "All Time")
    term = str(query.get("q") or "")
    return SearchParams(
        search_term=term,
        search_type=st,  # type: ignore[arg-type]
        content_types=content_types,
        base_models=base_models,
        sort=sort,  # type: ignore[arg-type]
        period=period,  # type: ignore[arg-type]
        nsfw=nsfw_effective,
        limit=limit,
    )


class CivitaiBrowseSource:
    """Civitai list/search/detail via ``CivitaiClient``."""

    source_id = "civitai"

    def __init__(self, cfg: ATComfyConfig, *, browse_limit: int) -> None:
        self._cfg = cfg
        self._browse_limit = browse_limit

    def _client(self) -> CivitaiClient:
        return CivitaiClient(
            api_key=self._cfg.civitai_api_key,
            hide_early_access=self._cfg.hide_early_access,
        )

    def _params(self, query: dict[str, Any]) -> SearchParams:
        return civitai_search_params_from_browse_query(query, self._cfg, limit=self._browse_limit)

    async def search(self, query: dict[str, Any]) -> BrowsePageResult:
        params = self._params(query)
        client = self._client()
        try:
            page = await client.search(params)
            civitai_base_models_upsert_batch(_civitai_base_models_from_page(page))
            d = civitai_model_list_page_dict(page, params)
            return BrowsePageResult(
                items=d["items"],
                next_page=d.get("next_page"),
                prev_page=d.get("prev_page"),
            )
        finally:
            await client.aclose()

    async def page(self, page_ref: str, query: dict[str, Any]) -> BrowsePageResult:
        params = self._params(query)
        fetch_url = merge_models_list_pagination_url(page_ref, params)
        client = self._client()
        try:
            page = await client.fetch_url(fetch_url)
            civitai_base_models_upsert_batch(_civitai_base_models_from_page(page))
            d = civitai_model_list_page_dict(page, params)
            return BrowsePageResult(
                items=d["items"],
                next_page=d.get("next_page"),
                prev_page=d.get("prev_page"),
            )
        finally:
            await client.aclose()

    async def detail(self, item_ref: str, *, nsfw: bool) -> dict[str, Any]:
        mid = int(item_ref)
        client = self._client()
        try:
            m = await client.get_model_detail_payload(mid, nsfw=nsfw)
            m = await enrich_model_versions_with_image_meta(client, m, nsfw=nsfw)
            return m.model_dump(mode="json", by_alias=True)
        finally:
            await client.aclose()
