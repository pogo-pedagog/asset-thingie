"""Civitai-only browse detail enrichment (moved from route_handlers to avoid cycles)."""

from __future__ import annotations

import asyncio
import logging
from typing import Any

from at_comfy.civitai.client import CivitaiClient
from at_comfy.civitai.models import (
    CivitaiImage,
    CivitaiModel,
    CivitaiModelVersion,
    civitai_image_api_numeric_id,
    normalize_civitai_image_meta_dict,
)

logger = logging.getLogger(__name__)


def gallery_meta_is_missing(im: CivitaiImage) -> bool:
    m = im.meta
    return m is None or len(m) == 0


async def hydrate_version_gallery_meta_from_images_api(
    client: CivitaiClient,
    ver: CivitaiModelVersion,
    *,
    nsfw: bool,
    max_concurrent: int = 4,
) -> CivitaiModelVersion:
    """Fill ``images[].meta`` via ``GET /api/v1/images?imageId=`` when still empty after version fetch."""
    slots: list[tuple[int, int]] = []
    for idx, im in enumerate(ver.images):
        if not gallery_meta_is_missing(im):
            continue
        iid = civitai_image_api_numeric_id(explicit=im.id, url=im.url)
        if iid is None:
            continue
        slots.append((idx, iid))
    if not slots:
        return ver
    uniq = {iid for _, iid in slots}
    sem_img = asyncio.Semaphore(max_concurrent)
    by_iid: dict[int, dict[str, Any]] = {}

    async def fetch_one(image_id: int) -> None:
        async with sem_img:
            row = await client.get_image_by_id(image_id, nsfw=nsfw)
            if not row:
                return
            raw = row.get("meta")
            if not isinstance(raw, dict):
                return
            norm = normalize_civitai_image_meta_dict(raw)
            if norm:
                by_iid[image_id] = norm

    await asyncio.gather(*(fetch_one(i) for i in uniq))
    new_images = list(ver.images)
    for idx, iid in slots:
        norm = by_iid.get(iid)
        if not norm:
            continue
        cur = new_images[idx]
        new_id = cur.id if cur.id is not None else iid
        new_images[idx] = cur.model_copy(update={"meta": norm, "id": new_id})
    return ver.model_copy(update={"images": new_images})


async def enrich_model_versions_with_image_meta(
    client: CivitaiClient,
    m: CivitaiModel,
    *,
    nsfw: bool,
    max_concurrent: int = 5,
) -> CivitaiModel:
    """Replace list-shaped versions with ``/model-versions/{id}`` payloads (rich ``images[].meta``)."""
    if not m.model_versions:
        return m
    sem = asyncio.Semaphore(max_concurrent)

    async def one(v: CivitaiModelVersion) -> CivitaiModelVersion:
        ea_flag = v.is_early_access
        async with sem:
            try:
                vd = await client.get_version_detail(v.id, nsfw=nsfw)
            except Exception as e:
                logger.debug(
                    "browse model enrich: version %s failed, using list payload: %s",
                    v.id,
                    e,
                )
                return v
            try:
                out = await hydrate_version_gallery_meta_from_images_api(client, vd, nsfw=nsfw)
            except Exception as e:
                logger.debug("browse model image meta hydrate failed: %s", e)
                out = vd
            return out.model_copy(update={"is_early_access": ea_flag})

    enriched = await asyncio.gather(*(one(v) for v in m.model_versions))
    return m.model_copy(update={"model_versions": list(enriched)})
