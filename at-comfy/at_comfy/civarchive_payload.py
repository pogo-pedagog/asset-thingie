"""CivArchive API JSON → Civitai-shaped detail dict (shared by browse and enrichment)."""

from __future__ import annotations

from typing import Any


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


def normalize_civarchive_detail(raw: dict[str, Any]) -> dict[str, Any]:
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

    return {
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


def civarchive_mid_vid_from_sha_payload(data: dict[str, Any]) -> tuple[int, int]:
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
