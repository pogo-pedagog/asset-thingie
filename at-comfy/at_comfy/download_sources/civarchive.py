"""CivArchive download preparation."""

from __future__ import annotations

import hashlib
from typing import Any
from urllib.parse import urlparse

from at_comfy.civarchive_client import CivArchiveClient
from at_comfy.config import ATComfyConfig
from at_comfy.download_sources.types import PreparedDownload
from at_comfy.install_paths import civitai_filename_with_id, first_tag_sorted, resolve_install_dir_for_download
from at_comfy.models.download import DuplicateResolution


def _expand_mirror_url(url: str) -> str:
    u = str(url).strip()
    if not u:
        return ""
    if u.startswith("http://") or u.startswith("https://"):
        return u
    if u.startswith("//"):
        return "https:" + u
    if u.startswith("/"):
        return f"https://civarchive.com{u}"
    return u


async def prepare_civarchive_download(body: dict[str, Any], cfg: ATComfyConfig) -> PreparedDownload:
    mid = int(body["civarchive_model_id"])
    vid = int(body["civarchive_version_id"])
    fid = int(body["civarchive_file_id"])
    category = str(body.get("category") or "General")
    dup = DuplicateResolution(str(body.get("duplicate_resolution") or "none").lower())
    if dup not in (DuplicateResolution.NONE, DuplicateResolution.SKIP, DuplicateResolution.REPLACE):
        dup = DuplicateResolution.NONE

    client = CivArchiveClient()
    try:
        raw = await client.get_model(mid, vid)
    finally:
        await client.aclose()

    version = raw.get("version") if isinstance(raw.get("version"), dict) else {}
    files = version.get("files") if isinstance(version.get("files"), list) else []
    file = next((f for f in files if isinstance(f, dict) and int(f.get("id") or 0) == fid), None)
    if not file:
        raise ValueError("file not found")

    raw_name = str(file.get("name") or "download.safetensors").strip() or "download.safetensors"
    safe_name = raw_name.replace("/", "_").replace("\\", "_")
    fname = civitai_filename_with_id(safe_name, fid)

    model_type = str(raw.get("type") or "LORA")
    creator = str(raw.get("username") or raw.get("creator_username") or "")
    base_model = str(version.get("baseModel") or "")
    tags_raw = raw.get("tags")
    tag_list: list[str] = [str(x) for x in tags_raw] if isinstance(tags_raw, list) else []

    install_dir = resolve_install_dir_for_download(
        model_type,
        cfg,
        category=category,
        creator=creator,
        base_model=base_model,
        first_tag=first_tag_sorted(tag_list),
        subpath_template=cfg.download_subpath_template,
    )

    urls_ordered: list[str] = []
    seen: set[str] = set()

    def add(u: str) -> None:
        eu = _expand_mirror_url(u)
        if not eu:
            return
        pr = urlparse(eu)
        if pr.scheme not in ("http", "https") or not pr.netloc:
            return
        if eu not in seen:
            seen.add(eu)
            urls_ordered.append(eu)

    du = file.get("downloadUrl")
    if du:
        add(str(du))
    for m in file.get("mirrors") if isinstance(file.get("mirrors"), list) else []:
        if isinstance(m, dict) and m.get("url"):
            add(str(m["url"]))

    non_civ = [u for u in urls_ordered if not u.startswith("https://civitai.com/api/download/")]
    civ = [u for u in urls_ordered if u.startswith("https://civitai.com/api/download/")]
    candidate_urls = non_civ + civ
    if not candidate_urls:
        raise ValueError("no download URLs")

    pref_raw = str(body.get("civarchive_preferred_download_url") or "").strip()
    if pref_raw:
        pref_expanded = _expand_mirror_url(pref_raw)
        if pref_expanded:
            idx = next(
                (i for i, u in enumerate(candidate_urls) if _expand_mirror_url(u) == pref_expanded),
                None,
            )
            if idx is not None and idx > 0:
                picked = candidate_urls[idx]
                candidate_urls = [picked, *[u for i, u in enumerate(candidate_urls) if i != idx]]

    key = (cfg.civitai_api_key or "").strip()
    headers_by_url: dict[str, dict[str, str]] = {}
    for u in candidate_urls:
        if u.startswith("https://civitai.com/api/download/") and key:
            headers_by_url[u] = {"Authorization": f"Bearer {key}"}
        else:
            headers_by_url[u] = {}

    sha_raw = str(file.get("sha256") or "").strip()
    expected = sha_raw.upper() if sha_raw else None

    dest = install_dir / fname
    if dest.exists() and dest.stat().st_size > 0 and dup == DuplicateResolution.SKIP:
        exp = (expected or "").strip().upper()
        if exp:
            hasher = hashlib.sha256()
            with open(dest, "rb") as f:
                for chunk in iter(lambda: f.read(65536), b""):
                    hasher.update(chunk)
            if hasher.hexdigest().upper() == exp:
                raise ValueError("already installed (skip)")

    return PreparedDownload(
        source="civarchive",
        filename=fname,
        install_dir=install_dir,
        candidate_urls=candidate_urls,
        expected_sha256=expected,
        headers_by_url=headers_by_url,
        metadata_snapshot={"civarchive_model": raw},
        source_item_ref=f"model:{mid}:version:{vid}",
        source_version_ref=str(vid),
        source_file_ref=str(fid),
        duplicate_resolution=dup.value,
        category=category,
        content_type_label=model_type,
        model_id=mid,
        version_id=vid,
        file_id=fid,
    )
