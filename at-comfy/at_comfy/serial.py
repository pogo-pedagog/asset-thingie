"""JSON shapes compatible with AssetThingie ``/api/comfy/*``."""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from at_comfy.civitai.models import normalize_civitai_image_meta_dict
from at_comfy.comfy_paths import comfy_model_name_for_path
from at_comfy.config import ATComfyConfig, cache_root
from at_comfy.library_repo import get_system_field_values, list_example_media, parse_trigger_words_json
from at_comfy.type_families import CHECKPOINT_SYSTEM_FIELDS, TYPE_FAMILY_REGISTRY


def _last_used_iso(value: str | None) -> str | None:
    if not value or not str(value).strip():
        return None
    return str(value).strip()


def _lora_syntax(stem: str, default_strength: float | None) -> str:
    sm = float(default_strength) if default_strength is not None else 1.0
    return f"<lora:{stem}:{sm}>"


def cover_urls_for_asset(asset_id: int) -> dict[str, Any]:
    """Local cover art under ``at_cache/covers``: optional poster JPG and optional MP4 playback."""
    root = cache_root()
    jpg = root / "covers" / f"{asset_id}.jpg"
    mp4 = root / "covers" / f"{asset_id}.mp4"
    cover_url = f"/at/cache/covers/{asset_id}.jpg" if jpg.is_file() else None
    cover_playback_url = f"/at/cache/covers/{asset_id}.mp4" if mp4.is_file() else None
    if cover_playback_url:
        cover_media_type = "video"
    elif cover_url:
        cover_media_type = "image"
    else:
        cover_media_type = None
    return {
        "cover_url": cover_url,
        "cover_playback_url": cover_playback_url,
        "cover_media_type": cover_media_type,
    }


def cover_url_thumbnail(asset_id: int) -> str | None:
    return cover_urls_for_asset(asset_id).get("cover_url")


def _cover_video_url_from_snapshot(raw_snapshot_json: Any) -> str | None:
    if not raw_snapshot_json:
        return None
    try:
        snap = json.loads(raw_snapshot_json) if isinstance(raw_snapshot_json, str) else raw_snapshot_json
    except (json.JSONDecodeError, TypeError):
        return None
    if not isinstance(snap, dict):
        return None
    model = snap.get("model")
    if not isinstance(model, dict):
        return None
    versions = model.get("modelVersions") or model.get("model_versions") or []
    if not isinstance(versions, list) or not versions:
        return None

    preferred_version_id = None
    version_blob = snap.get("version")
    if isinstance(version_blob, dict):
        raw_id = version_blob.get("id")
        try:
            preferred_version_id = int(raw_id) if raw_id is not None else None
        except (TypeError, ValueError):
            preferred_version_id = None

    ordered_versions: list[dict[str, Any]] = []
    for v in versions:
        if not isinstance(v, dict):
            continue
        if preferred_version_id is not None:
            try:
                if int(v.get("id")) == preferred_version_id:
                    ordered_versions.append(v)
                    break
            except (TypeError, ValueError):
                continue
    for v in versions:
        if isinstance(v, dict) and v not in ordered_versions:
            ordered_versions.append(v)

    for v in ordered_versions:
        images = v.get("images") or []
        if not isinstance(images, list):
            continue
        for im in images:
            if not isinstance(im, dict):
                continue
            if str(im.get("type") or "image").strip().lower() != "video":
                continue
            url = str(im.get("url") or "").strip()
            if url:
                return url
    return None


def _tag_names_from_concat(raw: str | None) -> list[str]:
    if raw is None or not str(raw).strip():
        return []
    return [t.strip() for t in str(raw).split(" · ") if t.strip()]


def asset_row_to_dict(
    row: sqlite3.Row,
    config: ATComfyConfig,
    *,
    detail: bool = False,
) -> dict[str, Any]:
    path = Path(str(row["primary_path"]))
    content_type = row["content_type"]
    trig = parse_trigger_words_json(row["trigger_words"])
    tags = _tag_names_from_concat(row["asset_tag_names"])
    lora_syntax: str | None = None
    comfy_lora_name: str | None = None
    if TYPE_FAMILY_REGISTRY.is_lora_family(str(content_type) if content_type else None):
        lora_syntax = _lora_syntax(str(row["stem"]), row["default_strength"])
        comfy_lora_name, _warn = comfy_model_name_for_path(path, comfy_folder_type="loras", config=config)
    comfy_checkpoint_name: str | None = None
    checkpoint_meta: dict[str, Any] | None = None
    if TYPE_FAMILY_REGISTRY.family_for(str(content_type) if content_type else None).name == "checkpoint":
        comfy_checkpoint_name, _ = comfy_model_name_for_path(path, comfy_folder_type="checkpoints", config=config)
        aid = int(row["asset_id"])
        sfv = get_system_field_values(aid)
        if sfv:
            meta: dict[str, Any] = {}
            for spec in CHECKPOINT_SYSTEM_FIELDS:
                val = sfv.get(spec.key)
                if val is not None:
                    meta[spec.key] = val
            if meta:
                checkpoint_meta = meta
    aid = int(row["asset_id"])
    cov = cover_urls_for_asset(aid)
    cover = cov["cover_url"]
    remote_cover_playback = _cover_video_url_from_snapshot(
        row["raw_snapshot_json"] if "raw_snapshot_json" in row.keys() else None
    )
    cover_playback = cov["cover_playback_url"] or remote_cover_playback
    cover_media_type = "video" if cover_playback else cov["cover_media_type"]
    _ue = row["user_edited"] if "user_edited" in row.keys() else 0
    out: dict[str, Any] = {
        "asset_id": aid,
        "display_name": row["display_name"],
        "filename": row["filename"],
        "stem": row["stem"],
        "content_type": content_type,
        "base_model": row["base_model"],
        "category": row["category"],
        "subcategory": None,
        "trigger_words": trig,
        "default_strength": row["default_strength"],
        "is_favorite": bool(row["is_favorite"]),
        "usage_count": int(row["usage_count"] or 0),
        "last_used_at": _last_used_iso(row["last_used_at"]),
        "cover_url": cover,
        "cover_playback_url": cover_playback,
        "cover_media_type": cover_media_type,
        "tags": tags,
        "lora_syntax": lora_syntax,
        "comfy_lora_name": comfy_lora_name,
        "comfy_checkpoint_name": comfy_checkpoint_name,
        "checkpoint_meta": checkpoint_meta,
        "user_edited": bool(_ue),
    }
    if detail:
        out["path"] = str(path)
        raw_notes = row["notes"]
        out["notes"] = (
            str(raw_notes).strip() if raw_notes is not None and str(raw_notes).strip() else None
        )
        out["source_url"] = row["source_url"]
        out["source_creator_name"] = row["creator_name"]
    return out


def example_media_to_dict(row: sqlite3.Row, asset_id: int) -> dict[str, Any]:
    raw_meta = row["metadata_json"]
    generation_params: dict[str, Any] | None = None
    if raw_meta:
        try:
            parsed = json.loads(raw_meta) if isinstance(raw_meta, str) else raw_meta
            if isinstance(parsed, dict) and parsed:
                generation_params = normalize_civitai_image_meta_dict(parsed) or parsed
        except (json.JSONDecodeError, TypeError):
            generation_params = None
    mid = int(row["example_media_id"])
    rel_local = row["local_path"] or ""
    rel_thumb = row["thumbnail_local_path"] or ""
    keys = row.keys()
    rel_play = row["playback_local_path"] if "playback_local_path" in keys else ""
    rel_poster = row["poster_local_path"] if "poster_local_path" in keys else ""
    base = "/at/cache/examples/" + str(asset_id)
    mt = str(row["media_type"] or "image").lower()

    def _named(rel: str) -> str:
        name = Path(rel).name
        return f"{base}/{name}" if rel and name else ""

    if mt == "video":
        playback = _named(str(rel_play or ""))
        poster = _named(str(rel_poster or ""))
        thumb_rel = str(rel_thumb or "") or str(rel_poster or "")
        thumb = _named(thumb_rel) if thumb_rel else (poster or playback)
        remote = str(row["source_url"] or "").strip()
        full_url = playback or poster or remote
        out_playback = playback or remote or None
        out_poster = poster or None
        primary_url = full_url or None
    else:
        url_path = _named(str(rel_local))
        thumb_path = _named(str(rel_thumb)) if rel_thumb else url_path
        remote = row["source_url"] or ""
        primary_url = url_path or remote or None
        thumb = thumb_path or primary_url
        out_playback = None
        out_poster = None

    out: dict[str, Any] = {
        "media_id": mid,
        "url": primary_url,
        "thumbnail_url": thumb or primary_url,
        "poster_url": out_poster,
        "media_type": row["media_type"],
        "width": row["width"],
        "height": row["height"],
        "caption": row["caption"],
        "generation_params": generation_params,
        "playback_url": out_playback,
    }
    return out


def asset_detail_dict(row: sqlite3.Row, config: ATComfyConfig) -> dict[str, Any]:
    aid = int(row["asset_id"])
    base = asset_row_to_dict(row, config, detail=True)
    full_cover = cover_url_thumbnail(aid)
    base["cover_url_full"] = full_cover
    base["example_media"] = [example_media_to_dict(r, aid) for r in list_example_media(aid)]
    from at_comfy import description_helpers

    base["description_html"] = description_helpers.description_html_for_asset(aid)
    fam = TYPE_FAMILY_REGISTRY.family_for(str(row["content_type"]) if row["content_type"] else None)
    base["system_fields"] = get_system_field_values(aid) if fam.system_fields else {}
    return base
