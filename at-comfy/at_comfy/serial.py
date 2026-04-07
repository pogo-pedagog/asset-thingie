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


def cover_url_thumbnail(asset_id: int) -> str | None:
    cache_cover = cache_root() / "covers" / f"{asset_id}.jpg"
    if cache_cover.is_file():
        return f"/at/cache/covers/{asset_id}.jpg"
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
    cover = cover_url_thumbnail(int(row["asset_id"]))
    _ue = row["user_edited"] if "user_edited" in row.keys() else 0
    out: dict[str, Any] = {
        "asset_id": int(row["asset_id"]),
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
    base = "/at/cache/examples/" + str(asset_id)
    url = f"{base}/{Path(rel_local).name}" if rel_local and Path(rel_local).name else (row["source_url"] or "")
    thumb = f"{base}/{Path(rel_thumb).name}" if rel_thumb and Path(rel_thumb).name else url
    out: dict[str, Any] = {
        "media_id": mid,
        "url": url or None,
        "thumbnail_url": thumb or url,
        "media_type": row["media_type"],
        "width": row["width"],
        "height": row["height"],
        "caption": row["caption"],
        "generation_params": generation_params,
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
