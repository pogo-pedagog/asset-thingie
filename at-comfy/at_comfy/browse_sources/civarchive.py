"""CivArchive browse adapter (search / pagination / detail)."""

from __future__ import annotations

import re
from typing import Any

from at_comfy.browse_sources.types import BrowsePageResult
from at_comfy.civarchive_catalog import civarchive_base_models_upsert_batch
from at_comfy.civarchive_client import CivArchiveClient
from at_comfy.civarchive_payload import civarchive_mid_vid_from_sha_payload, normalize_civarchive_detail
from at_comfy.config import ATComfyConfig

_SORT_RE = re.compile(r"^[a-z0-9_]{1,32}$")

_ITEM_REF_RE = re.compile(r"^model:(\d+):version:(\d+)$", re.I)
_SHA_PREFIX_RE = re.compile(r"^sha256:([0-9a-f]{64})$", re.I)
_USER_REF_RE = re.compile(r"^user:(.+)$", re.I)
_HIT_SHA_URL_RE = re.compile(r"/sha256/([0-9a-f]{64})", re.I)


def _parse_model_version_from_hit(hit: dict[str, Any]) -> tuple[int, int] | None:
    url = str(hit.get("url") or "")
    mm = re.search(r"/models/(\d+)", url)
    mv = re.search(r"modelVersionId=(\d+)", url, re.I)
    if mm and mv:
        return int(mm.group(1)), int(mv.group(1))
    rid = str(hit.get("id") or "")
    if rid.startswith("v") and rid[1:].isdigit():
        # Version-only id — cannot build item ref without model id.
        return None
    return None


def _civarchive_hit_kind(hit: dict[str, Any]) -> str:
    k = str(hit.get("kind") or "version").strip().lower()
    if k in ("version", "file", "user"):
        return k
    return "version"


def _list_item_ref_for_hit(hit: dict[str, Any], *, hit_kind: str) -> str:
    """Opaque grid id / detail ref for CivArchive search rows."""
    if hit_kind == "user":
        un = str(hit.get("username") or "").strip()
        if not un:
            un = str(hit.get("name") or "").strip()
        if not un:
            rid = str(hit.get("id") or "")
            if rid.startswith("u") and len(rid) > 1:
                un = rid[1:]
        return f"user:{un}" if un else str(hit.get("id") or "")

    url = str(hit.get("url") or "")
    msha = _HIT_SHA_URL_RE.search(url)
    if msha:
        return f"sha256:{msha.group(1).lower()}"

    ids = _parse_model_version_from_hit(hit)
    if ids is not None:
        mid, vid = ids
        return f"model:{mid}:version:{vid}"

    if hit_kind == "file":
        sha = str(hit.get("sha256") or "").strip().lower()
        if len(sha) == 64 and all(c in "0123456789abcdef" for c in sha):
            return f"sha256:{sha}"

    return str(hit.get("id") or "")


def _normalize_list_item(hit: dict[str, Any]) -> dict[str, Any]:
    hit_kind = _civarchive_hit_kind(hit)
    item_ref = _list_item_ref_for_hit(hit, hit_kind=hit_kind)
    creator = str(hit.get("username") or "")
    name = str(hit.get("name") or "")
    dl = hit.get("download_count")
    thumb = hit.get("image_url")
    return {
        "id": item_ref,
        "source": "civarchive",
        "civarchiveHitKind": hit_kind,
        "name": name,
        "type": str(hit.get("type") or "Model"),
        "nsfw": bool(hit.get("is_nsfw")),
        "creator_username": creator,
        "creator": {"username": creator} if creator else None,
        "stats": {"downloadCount": dl} if dl is not None else None,
        "image_url": thumb,
        "tags": list(hit.get("tags") or []) if isinstance(hit.get("tags"), list) else [],
        "sourceItemRef": item_ref,
    }


def _sanitize_civarchive_sort(sort_raw: str) -> str:
    s = str(sort_raw or "").strip().lower() or "newest"
    return s if _SORT_RE.fullmatch(s) else "newest"


def _civarchive_is_nsfw_param(cfg: ATComfyConfig, query: dict[str, Any]) -> bool | None:
    if cfg.hide_nsfw:
        return False
    mode = str(query.get("civarchive_nsfw") or "").strip().lower()
    if mode == "sfw":
        return False
    if mode == "nsfw":
        return True
    if mode == "all":
        return None
    nsfw_allowed = bool(query.get("nsfw"))
    return None if nsfw_allowed else False


class CivArchiveBrowseSource:
    """CivArchive list/search/detail."""

    source_id = "civarchive"

    def __init__(self, cfg: ATComfyConfig, *, browse_limit: int) -> None:
        self._cfg = cfg
        self._browse_limit = browse_limit

    def _client(self) -> CivArchiveClient:
        return CivArchiveClient()

    async def search(self, query: dict[str, Any]) -> BrowsePageResult:
        q = str(query.get("q") or "")
        kind = str(query.get("kind") or "version").strip() or "version"
        page_raw = str(query.get("page") or "1").strip() or "1"
        try:
            page = max(1, int(page_raw))
        except ValueError:
            page = 1
        sort = _sanitize_civarchive_sort(str(query.get("civarchive_sort") or "newest"))
        ca_type = str(query.get("civarchive_type") or "").strip() or None
        raw_bases = query.get("civarchive_base_models")
        ca_base_list: list[str] = (
            [str(x).strip() for x in raw_bases if str(x).strip()] if isinstance(raw_bases, list) else []
        )
        # Upstream accepts comma-separated ``base_model`` (OR); duplicate keys use first only.
        ca_base: str | None = None
        if ca_base_list:
            ca_base = ",".join(sorted({*ca_base_list}))
        ca_tags = str(query.get("civarchive_tags") or "").strip() or None
        is_nsfw = _civarchive_is_nsfw_param(self._cfg, query)
        deleted_only = bool(query.get("civarchive_deleted_only"))
        is_deleted: bool | None = True if deleted_only else None

        client = self._client()
        try:
            data = await client.search(
                q=q,
                kind=kind,
                page=page,
                sort=sort,
                model_type=ca_type,
                base_model=ca_base,
                tags=ca_tags,
                is_nsfw=is_nsfw,
                is_deleted=is_deleted,
            )
        finally:
            await client.aclose()
        results = data.get("results")
        if not isinstance(results, list):
            results = []
        bases: set[str] = set()
        for h in results:
            if not isinstance(h, dict):
                continue
            bm = h.get("base_model")
            if bm is not None and str(bm).strip():
                bases.add(str(bm).strip())
        if bases:
            civarchive_base_models_upsert_batch(bases)
        items = [_normalize_list_item(h) for h in results if isinstance(h, dict)]
        total_hits = data.get("totalHits")
        prev_page: str | None = str(page - 1) if page > 1 else None
        next_page: str | None = None
        n = len(items)
        if n == 50:
            if isinstance(total_hits, int):
                next_page = str(page + 1) if page * 50 < total_hits else None
            else:
                next_page = str(page + 1)
        return BrowsePageResult(items=items, next_page=next_page, prev_page=prev_page)

    async def page(self, page_ref: str, query: dict[str, Any]) -> BrowsePageResult:
        q2 = {**query, "page": str(page_ref).strip()}
        return await self.search(q2)

    async def detail(self, item_ref: str, *, nsfw: bool) -> dict[str, Any]:
        ref = item_ref.strip()
        client = self._client()
        try:
            _ = nsfw  # API returns NSFW metadata; config hides in UI
            m = _SHA_PREFIX_RE.match(ref)
            if m:
                sha = m.group(1)
                data = await client.get_by_sha256(sha)
                mid, vid = civarchive_mid_vid_from_sha_payload(data)
                raw = await client.get_model(mid, vid)
                return normalize_civarchive_detail(raw)

            if _USER_REF_RE.match(ref):
                raise ValueError("user rows open via search; use username-scoped browse")

            m2 = _ITEM_REF_RE.match(ref)
            if not m2:
                raise ValueError("invalid civarchive item ref")
            mid = int(m2.group(1))
            vid = int(m2.group(2))
            raw = await client.get_model(mid, vid)
            return normalize_civarchive_detail(raw)
        finally:
            await client.aclose()
