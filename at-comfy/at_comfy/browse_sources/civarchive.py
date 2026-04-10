"""CivArchive browse adapter (search / pagination / detail)."""

from __future__ import annotations

import re
from typing import Any

from at_comfy.browse_sources.types import BrowsePageResult
from at_comfy.civarchive_client import CivArchiveClient
from at_comfy.config import ATComfyConfig

_ITEM_REF_RE = re.compile(r"^model:(\d+):version:(\d+)$", re.I)
_SHA_PREFIX_RE = re.compile(r"^sha256:([0-9a-f]{64})$", re.I)


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


def _normalize_list_item(hit: dict[str, Any]) -> dict[str, Any]:
    ids = _parse_model_version_from_hit(hit)
    if ids is None:
        item_ref = str(hit.get("id") or "")
    else:
        mid, vid = ids
        item_ref = f"model:{mid}:version:{vid}"
    creator = str(hit.get("username") or "")
    name = str(hit.get("name") or "")
    dl = hit.get("download_count")
    thumb = hit.get("image_url")
    return {
        "id": item_ref,
        "source": "civarchive",
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


def _civarchive_image_entry(url: str) -> dict[str, Any]:
    return {"url": url, "type": "image"}


def _normalize_file_entry(f: dict[str, Any]) -> dict[str, Any]:
    mirrors_in = f.get("mirrors") if isinstance(f.get("mirrors"), list) else []
    mirror_dicts: list[dict[str, Any]] = []
    for m in mirrors_in:
        if isinstance(m, dict):
            mirror_dicts.append(dict(m))
    return {
        "id": int(f.get("id") or 0),
        "name": str(f.get("name") or "file"),
        "downloadUrl": f.get("downloadUrl"),
        "type": str(f.get("type") or "Model"),
        "sizeKB": f.get("sizeKB"),
        "sha256": f.get("sha256"),
        "primary": bool(f.get("is_primary")),
        "mirrors": mirror_dicts,
    }


def _normalize_detail_payload(raw: dict[str, Any]) -> dict[str, Any]:
    """Map CivArchive ``/models/...`` JSON into a Civitai-shaped detail plus ``source`` / ``sourceSections``."""
    mid = int(raw.get("id") or 0)
    version = raw.get("version") if isinstance(raw.get("version"), dict) else {}
    vid = int(version.get("id") or 0)
    item_ref = f"model:{mid}:version:{vid}"

    files_raw = version.get("files") if isinstance(version.get("files"), list) else []
    files_norm: list[dict[str, Any]] = []
    for f in files_raw:
        if isinstance(f, dict):
            files_norm.append(_normalize_file_entry(f))

    images_out: list[dict[str, Any]] = []
    for im in version.get("images") or []:
        if not isinstance(im, dict):
            continue
        u = im.get("image_url") or im.get("url")
        if u:
            images_out.append(_civarchive_image_entry(str(u)))

    triggers = version.get("trigger")
    trained_words: list[str] = list(triggers) if isinstance(triggers, list) else []

    ver_out: dict[str, Any] = {
        "id": vid,
        "name": str(version.get("name") or ""),
        "baseModel": version.get("baseModel"),
        "trainedWords": trained_words,
        "files": files_norm,
        "images": images_out,
        "isEarlyAccess": False,
    }

    creator = str(raw.get("username") or raw.get("creator_username") or "")
    primary_mirrors: list[dict[str, Any]] = []
    primary_sha: str | None = None
    if files_norm:
        prim_i = next((i for i, x in enumerate(files_norm) if x.get("primary")), 0)
        primary = files_raw[prim_i] if prim_i < len(files_raw) and isinstance(files_raw[prim_i], dict) else {}
        if isinstance(primary, dict):
            primary_sha = str(primary.get("sha256") or "").strip() or None
            for m in primary.get("mirrors") or []:
                if isinstance(m, dict):
                    primary_mirrors.append(dict(m))

    out: dict[str, Any] = {
        "source": "civarchive",
        "itemRef": item_ref,
        "id": mid,
        "name": str(raw.get("name") or ""),
        "type": str(raw.get("type") or "Model"),
        "description": raw.get("description"),
        "nsfw": bool(raw.get("is_nsfw")),
        "creator_username": creator,
        "creator": {"username": creator} if creator else None,
        "tags": list(raw.get("tags") or []) if isinstance(raw.get("tags"), list) else [],
        "modelVersions": [ver_out],
        "sourceSections": {
            "mirrors": primary_mirrors,
            "sha256": primary_sha,
            "platform": raw.get("platform"),
        },
    }
    return out


def _mid_vid_from_sha_payload(data: dict[str, Any]) -> tuple[int, int]:
    """Resolve model + version ids from ``/sha256/...`` JSON (compact or full)."""
    model = data.get("model")
    if not isinstance(model, dict) or not model.get("id"):
        raise ValueError("not found")
    mid = int(model["id"])
    ver = model.get("version")
    if isinstance(ver, dict) and ver.get("id"):
        return mid, int(ver["id"])
    vers = model.get("versions")
    if isinstance(vers, list) and vers:
        v0 = vers[0]
        if isinstance(v0, dict) and v0.get("id"):
            return mid, int(v0["id"])
    raise ValueError("sha256 response missing version id")


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
        client = self._client()
        try:
            data = await client.search(q=q, kind=kind, page=page)
        finally:
            await client.aclose()
        results = data.get("results")
        if not isinstance(results, list):
            results = []
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
                mid, vid = _mid_vid_from_sha_payload(data)
                raw = await client.get_model(mid, vid)
                return _normalize_detail_payload(raw)

            m2 = _ITEM_REF_RE.match(ref)
            if not m2:
                raise ValueError("invalid civarchive item ref")
            mid = int(m2.group(1))
            vid = int(m2.group(2))
            raw = await client.get_model(mid, vid)
            return _normalize_detail_payload(raw)
        finally:
            await client.aclose()
