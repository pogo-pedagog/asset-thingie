"""Civitai download preparation (enqueue body → PreparedDownload)."""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any

from at_comfy.civitai.client import CivitaiClient
from at_comfy.config import ATComfyConfig
from at_comfy.download_sources.types import PreparedDownload
from at_comfy.install_paths import civitai_filename_with_id, first_tag_sorted, resolve_install_dir_for_download
from at_comfy.models.download import DuplicateResolution


async def prepare_civitai_download(body: dict[str, Any], cfg: ATComfyConfig) -> PreparedDownload:
    mid = int(body["civitai_model_id"])
    vid = int(body["version_id"])
    fid = int(body["file_id"])
    category = str(body.get("category") or "General")
    dup = DuplicateResolution(str(body.get("duplicate_resolution") or "none").lower())
    if dup not in (DuplicateResolution.NONE, DuplicateResolution.SKIP, DuplicateResolution.REPLACE):
        dup = DuplicateResolution.NONE

    client = CivitaiClient(
        api_key=cfg.civitai_api_key,
        hide_early_access=cfg.hide_early_access,
    )
    try:
        model = await client.get_model(mid, nsfw=not cfg.hide_nsfw)
    finally:
        await client.aclose()

    ver = next((v for v in model.model_versions if v.id == vid), None)
    if not ver:
        raise ValueError("version not found")
    file = next((x for x in ver.files if x.id == fid), None)
    if not file or not file.download_url:
        raise ValueError("file not found or no URL")

    fname = civitai_filename_with_id(file.name, file.id)
    install_dir = resolve_install_dir_for_download(
        model.type,
        cfg,
        category=category,
        creator=model.creator_username or "",
        base_model=ver.base_model or "",
        first_tag=first_tag_sorted(list(model.tags or [])),
        subpath_template=cfg.download_subpath_template,
    )
    dest = install_dir / fname
    if dest.exists() and dest.stat().st_size > 0 and dup == DuplicateResolution.SKIP:
        exp = (file.sha256 or "").strip().upper()
        if exp:
            hasher = hashlib.sha256()
            with open(dest, "rb") as f:
                for chunk in iter(lambda: f.read(65536), b""):
                    hasher.update(chunk)
            if hasher.hexdigest().upper() == exp:
                raise ValueError("already installed (skip)")

    cand = [file.download_url]
    return PreparedDownload(
        source="civitai",
        filename=fname,
        install_dir=install_dir,
        candidate_urls=cand,
        expected_sha256=(file.sha256.strip().upper() if file.sha256 else None),
        headers_by_url={},
        metadata_snapshot={"items": [model.model_dump(mode="json", by_alias=True)]},
        source_item_ref=str(mid),
        source_version_ref=str(vid),
        source_file_ref=str(fid),
        duplicate_resolution=dup.value,
        category=category,
        content_type_label=model.type,
        model_id=mid,
        version_id=vid,
        file_id=fid,
    )


def prepared_to_dest_paths(prepared: PreparedDownload) -> tuple[Path, Path]:
    dest = prepared.install_dir / prepared.filename
    part = dest.with_suffix(dest.suffix + ".part")
    return dest, part
