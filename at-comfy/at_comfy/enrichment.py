"""Civitai hash-based metadata enrichment."""

from __future__ import annotations

import asyncio
import json
import logging
import shutil
from datetime import UTC, datetime
from typing import Any

import httpx

from at_comfy.civitai.client import (
    CivitaiClient,
    civitai_download_headers,
    civitai_image_display_url,
    civitai_image_url_with_width,
)
from at_comfy.civitai.models import CivitaiModel, CivitaiModelVersion
from at_comfy.config import cache_root
from at_comfy.db import get_conn

logger = logging.getLogger(__name__)

_status: dict[str, Any] = {"pending": 0, "running": False}

_batch_lock = asyncio.Lock()


def enrichment_public_status() -> dict[str, Any]:
    return dict(_status)


def _utc_now_iso() -> str:
    return datetime.now(tz=UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


async def _version_with_rich_image_meta(
    client: CivitaiClient,
    ver: CivitaiModelVersion | None,
    *,
    nsfw: bool,
) -> CivitaiModelVersion | None:
    """``GET /api/v1/models?ids=…`` embeds versions but often strips ``images[].meta``; version detail does not."""
    if ver is None:
        return None
    try:
        return await client.get_version_detail(ver.id, nsfw=nsfw)
    except Exception as e:
        logger.debug("get_version_detail for gallery meta failed (id=%s): %s", ver.id, e)
        return ver


def _meta_pick(meta: dict[str, Any], *keys: str) -> Any:
    for k in keys:
        if k in meta and meta[k] is not None and str(meta[k]).strip() != "":
            return meta[k]
    return None


def _checkpoint_system_fields_from_version(ver: CivitaiModelVersion | None) -> dict[str, Any]:
    if ver is None:
        return {}
    meta: dict[str, Any] | None = None
    for im in ver.images or []:
        if (im.type or "image").strip().lower() == "video":
            continue
        if im.meta and isinstance(im.meta, dict) and im.meta:
            meta = im.meta
            break
    if not meta:
        return {}
    out: dict[str, Any] = {}
    s = _meta_pick(meta, "sampler", "Sampler")
    if s:
        out["recommended_sampler"] = str(s)
    sch = _meta_pick(meta, "scheduler", "Scheduler")
    if sch:
        out["recommended_scheduler"] = str(sch)
    steps = _meta_pick(meta, "steps", "Steps")
    if steps is not None:
        try:
            out["recommended_steps"] = int(steps)
        except (TypeError, ValueError):
            pass
    cfgv = _meta_pick(meta, "cfgScale", "cfg", "CFG scale")
    if cfgv is not None:
        try:
            out["recommended_cfg"] = float(cfgv)
        except (TypeError, ValueError):
            pass
    cs = _meta_pick(meta, "clipSkip", "clip_skip", "Clip skip")
    if cs is not None:
        try:
            out["recommended_clip_skip"] = int(cs)
        except (TypeError, ValueError):
            pass
    p = _meta_pick(meta, "prompt", "Prompt")
    if p:
        out["recommended_prompt"] = str(p)
    pn = _meta_pick(meta, "negativePrompt", "negative_prompt")
    if pn:
        out["recommended_negative_prompt"] = str(pn)
    return out


def _persist_system_fields(conn: Any, asset_id: int, fields: dict[str, Any]) -> None:
    for fk, fv in fields.items():
        if fv is None:
            continue
        conn.execute(
            """
            INSERT INTO system_field_values (asset_id, field_key, value_json)
            VALUES (?, ?, ?)
            ON CONFLICT(asset_id, field_key) DO UPDATE SET
                value_json = excluded.value_json
            """,
            (asset_id, fk, json.dumps(fv)),
        )


class EnrichmentService:
    async def enrich_asset(self, asset_id: int, cfg: Any) -> None:
        conn = get_conn()
        row = conn.execute(
            """
            SELECT la.asset_id, lf.path, lf.sha256, lf.stem
            FROM library_assets la
            INNER JOIN library_files lf ON lf.path = la.primary_path
            WHERE la.asset_id = ?
            """,
            (asset_id,),
        ).fetchone()
        if row is None or not row["sha256"]:
            return
        has_sm = conn.execute(
            "SELECT 1 FROM source_metadata WHERE asset_id = ? LIMIT 1",
            (asset_id,),
        ).fetchone()
        if has_sm:
            return
        rd = {k: row[k] for k in row.keys()}
        await self._enrich_row(rd, cfg)

    async def re_enrich_asset(self, asset_id: int, cfg: Any) -> None:
        """Clear Civitai-linked rows and cache for this asset, then run hash enrichment again."""
        conn = get_conn()
        conn.execute("DELETE FROM source_metadata WHERE asset_id = ?", (asset_id,))
        conn.execute("DELETE FROM example_media WHERE asset_id = ?", (asset_id,))
        conn.execute("DELETE FROM asset_tags WHERE asset_id = ? AND origin = 'source'", (asset_id,))
        conn.execute("DELETE FROM trigger_words WHERE asset_id = ?", (asset_id,))
        conn.execute("DELETE FROM system_field_values WHERE asset_id = ?", (asset_id,))
        conn.execute(
            "UPDATE library_files SET enrichment_status = NULL WHERE path = ("
            " SELECT primary_path FROM library_assets WHERE asset_id = ?)",
            (asset_id,),
        )
        conn.execute("UPDATE library_assets SET user_edited = 0 WHERE asset_id = ?", (asset_id,))
        conn.commit()

        cache = cache_root()
        cover = cache / "covers" / f"{asset_id}.jpg"
        if cover.is_file():
            try:
                cover.unlink()
            except OSError:
                pass
        ex_dir = cache / "examples" / str(asset_id)
        if ex_dir.is_dir():
            shutil.rmtree(ex_dir, ignore_errors=True)

        await self.enrich_asset(asset_id, cfg)

    async def run_batch(self, cfg: Any) -> None:
        if _batch_lock.locked():
            return
        async with _batch_lock:
            conn = get_conn()
            rows = conn.execute(
                """
                SELECT la.asset_id, lf.path, lf.sha256, lf.stem
                FROM library_assets la
                INNER JOIN library_files lf ON lf.path = la.primary_path
                WHERE lf.sha256 IS NOT NULL AND TRIM(lf.sha256) != ''
                  AND NOT EXISTS (SELECT 1 FROM source_metadata sm WHERE sm.asset_id = la.asset_id)
                """,
            ).fetchall()
            _status["pending"] = len(rows)
            _status["running"] = True
            client = CivitaiClient(
                api_key=cfg.civitai_api_key,
                hide_early_access=cfg.hide_early_access,
            )
            try:
                for i, r in enumerate(rows):
                    _status["pending"] = len(rows) - i
                    try:
                        rd = {k: r[k] for k in r.keys()}
                        await self._enrich_row(rd, cfg, client=client)
                    except Exception:
                        logger.exception("enrich failed for asset %s", r["asset_id"])
                    await asyncio.sleep(max(0, int(cfg.enrichment_rate_limit_ms)) / 1000.0)
            finally:
                await client.aclose()
                _status["running"] = False
                _status["pending"] = 0

    async def _enrich_row(
        self,
        row: dict[str, Any],
        cfg: Any,
        *,
        client: CivitaiClient | None = None,
    ) -> None:
        own = client is None
        if client is None:
            client = CivitaiClient(api_key=cfg.civitai_api_key, hide_early_access=cfg.hide_early_access)
        try:
            sha = str(row["sha256"]).strip().upper()
            raw_ver = await client.model_version_by_hash(sha)
            asset_id = int(row["asset_id"])
            conn = get_conn()
            if raw_ver is None:
                conn.execute(
                    "UPDATE library_files SET enrichment_status = ? WHERE path = ?",
                    ("not_found", str(row["path"])),
                )
                conn.commit()
                return
            model_id = int(raw_ver.get("modelId") or raw_ver.get("modelid") or 0)
            full = await client.get_model(model_id, nsfw=not cfg.hide_nsfw)
            ver_obj = next((v for v in full.model_versions if v.id == int(raw_ver.get("id") or 0)), None)
            if ver_obj is None and full.model_versions:
                ver_obj = full.model_versions[0]
            self._apply_civitai_db(full, raw_ver, asset_id, ver=ver_obj)
            conn.execute(
                "UPDATE library_files SET enrichment_status = ? WHERE path = ?",
                ("found", str(row["path"])),
            )
            conn.commit()
            ver_gallery = await _version_with_rich_image_meta(
                client, ver_obj, nsfw=not cfg.hide_nsfw
            )
            await _fetch_cover(asset_id, full, cfg, ver=ver_obj)
            await _fetch_example_images(asset_id, ver_gallery or ver_obj, cfg, model=full)
        finally:
            if own:
                await client.aclose()

    def _apply_civitai_db(
        self,
        model: CivitaiModel,
        raw_ver: dict[str, Any],
        asset_id: int,
        *,
        ver: CivitaiModelVersion | None = None,
    ) -> None:
        vobj = ver
        if vobj is None:
            vobj = next((v for v in model.model_versions if v.id == int(raw_ver.get("id") or 0)), None)
            if vobj is None and model.model_versions:
                vobj = model.model_versions[0]
        trained = list(vobj.trained_words or []) if vobj else []
        tags = [str(t) for t in (model.tags or [])]
        now = _utc_now_iso()
        conn = get_conn()
        title = model.name
        desc = model.description
        conn.execute(
            """
            INSERT INTO source_metadata (
                asset_id, source, external_model_id, external_version_id, external_file_id,
                creator_name, source_url, title, description_html, raw_snapshot_json, fetched_at
            ) VALUES (?, 'civitai', ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id) DO UPDATE SET
                external_model_id = excluded.external_model_id,
                external_version_id = excluded.external_version_id,
                creator_name = excluded.creator_name,
                source_url = excluded.source_url,
                title = excluded.title,
                description_html = excluded.description_html,
                raw_snapshot_json = excluded.raw_snapshot_json,
                fetched_at = excluded.fetched_at
            """,
            (
                asset_id,
                str(model.id),
                str(raw_ver.get("id")) if raw_ver.get("id") is not None else None,
                None,
                model.creator_username,
                f"https://civitai.com/models/{model.id}",
                title,
                desc,
                json.dumps({"model": model.model_dump(mode="json"), "version": raw_ver})[:500000],
                now,
            ),
        )
        trig_json = json.dumps(trained)
        display = title or None
        base = vobj.base_model if vobj else None
        ue_row = conn.execute(
            "SELECT user_edited FROM library_assets WHERE asset_id = ?",
            (asset_id,),
        ).fetchone()
        user_edited = bool(ue_row and ue_row["user_edited"])
        if not user_edited:
            conn.execute(
                """
                UPDATE library_assets SET
                    display_name = COALESCE(?, display_name),
                    base_model = COALESCE(?, base_model),
                    content_type = ?,
                    trigger_words = ?,
                    updated_at = ?
                WHERE asset_id = ?
                """,
                (display, base, model.type, trig_json, now, asset_id),
            )
        else:
            conn.execute(
                """
                UPDATE library_assets SET
                    content_type = ?,
                    updated_at = ?
                WHERE asset_id = ?
                """,
                (model.type, now, asset_id),
            )
        pr = conn.execute("SELECT primary_path FROM library_assets WHERE asset_id = ?", (asset_id,)).fetchone()
        if pr:
            conn.execute(
                "UPDATE library_files SET content_type = ? WHERE path = ?",
                (model.type, str(pr["primary_path"])),
            )
        conn.execute("DELETE FROM trigger_words WHERE asset_id = ?", (asset_id,))
        for w in trained:
            ww = str(w).strip()
            if ww:
                conn.execute(
                    "INSERT OR IGNORE INTO trigger_words (word, asset_id) VALUES (?, ?)",
                    (ww, asset_id),
                )
        conn.execute("DELETE FROM asset_tags WHERE asset_id = ?", (asset_id,))
        for t in tags:
            tt = str(t).strip()
            if not tt:
                continue
            conn.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", (tt,))
            tr = conn.execute("SELECT tag_id FROM tags WHERE name = ? COLLATE NOCASE", (tt,)).fetchone()
            if tr:
                conn.execute(
                    "INSERT OR IGNORE INTO asset_tags (asset_id, tag_id, origin) VALUES (?, ?, 'source')",
                    (asset_id, int(tr["tag_id"])),
                )
        if "checkpoint" in (model.type or "").lower():
            conn.execute("DELETE FROM system_field_values WHERE asset_id = ?", (asset_id,))
            sf = _checkpoint_system_fields_from_version(vobj)
            if sf:
                _persist_system_fields(conn, asset_id, sf)
        conn.commit()


async def _fetch_cover(
    asset_id: int,
    model: CivitaiModel,
    cfg: Any,
    *,
    ver: CivitaiModelVersion | None = None,
) -> None:
    v = ver or (model.model_versions[0] if model.model_versions else None)
    if not v:
        return
    cover_im = None
    for im in v.images or []:
        if (im.type or "image").strip().lower() != "image":
            continue
        u0 = (im.url or "").strip()
        if u0:
            cover_im = im
            break
    if cover_im is None:
        return
    dest = cache_root() / "covers" / f"{asset_id}.jpg"
    dest.parent.mkdir(parents=True, exist_ok=True)
    base = civitai_image_display_url(cover_im.url, natural_width=cover_im.width)
    u = civitai_image_url_with_width(base, 256)
    headers = civitai_download_headers(
        api_key=cfg.civitai_api_key,
        user_agent="AssetThingie-Comfy/0.1",
        model_id=model.id,
        for_url=u,
    )
    try:
        async with httpx.AsyncClient(timeout=30, follow_redirects=True) as c:
            r = await c.get(u, headers=headers)
            if r.is_success:
                dest.write_bytes(r.content)
    except Exception as e:
        logger.debug("cover fetch failed: %s", e)


async def _fetch_example_images(
    asset_id: int,
    ver: CivitaiModelVersion | None,
    cfg: Any,
    *,
    model: CivitaiModel | None = None,
    max_images: int = 5,
) -> None:
    if not ver or not ver.images:
        return
    mid = int(model.id) if model is not None else 0
    ex_root = cache_root() / "examples" / str(asset_id)
    ex_root.mkdir(parents=True, exist_ok=True)
    conn = get_conn()
    now = _utc_now_iso()
    sort_order = 0
    count = 0
    idx = 0
    async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as c:
        for im in ver.images:
            if count >= max_images:
                break
            if (im.type or "image").strip().lower() != "image":
                continue
            u = (im.url or "").strip()
            if not u:
                continue
            idx += 1
            base_name = f"{idx:03d}.jpg"
            thumb_name = f"{idx:03d}.thumb.jpg"
            full_img = ex_root / base_name
            full_thumb = ex_root / thumb_name
            base = civitai_image_display_url(u, natural_width=im.width)
            u_img = civitai_image_url_with_width(base, 512)
            u_thumb = civitai_image_url_with_width(base, 200)
            hdr_img = civitai_download_headers(
                api_key=cfg.civitai_api_key,
                user_agent="AssetThingie-Comfy/0.1",
                model_id=mid,
                for_url=u_img,
            )
            hdr_thumb = civitai_download_headers(
                api_key=cfg.civitai_api_key,
                user_agent="AssetThingie-Comfy/0.1",
                model_id=mid,
                for_url=u_thumb,
            )
            try:
                if not full_img.is_file() or full_img.stat().st_size == 0:
                    r = await c.get(u_img, headers=hdr_img)
                    if r.is_success:
                        full_img.write_bytes(r.content)
                if not full_thumb.is_file() or full_thumb.stat().st_size == 0:
                    rt = await c.get(u_thumb, headers=hdr_thumb)
                    if rt.is_success:
                        full_thumb.write_bytes(rt.content)
            except Exception as e:
                logger.debug("example image failed: %s", e)
                continue
            if not full_img.is_file() or full_img.stat().st_size == 0:
                continue
            caption: str | None = None
            meta_json: str | None = None
            if im.meta:
                meta_json = json.dumps(dict(im.meta))[:100000]
                p = im.meta.get("prompt") or im.meta.get("Prompt")
                if p:
                    caption = str(p)[:2000]
            exists = conn.execute(
                "SELECT 1 FROM example_media WHERE asset_id = ? AND local_path = ?",
                (asset_id, base_name),
            ).fetchone()
            if not exists:
                conn.execute(
                    """
                    INSERT INTO example_media (
                        asset_id, media_type, origin_type, local_path, source_url,
                        width, height, caption, metadata_json, sort_order,
                        thumbnail_local_path, created_at
                    ) VALUES (?, 'image', 'civitai', ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        asset_id,
                        base_name,
                        u,
                        im.width,
                        im.height,
                        caption,
                        meta_json,
                        sort_order,
                        thumb_name,
                        now,
                    ),
                )
            elif meta_json or caption:
                conn.execute(
                    """
                    UPDATE example_media SET
                        caption = COALESCE(:caption, caption),
                        metadata_json = COALESCE(:meta_json, metadata_json)
                    WHERE asset_id = :asset_id AND local_path = :local_path
                    """,
                    {
                        "caption": caption,
                        "meta_json": meta_json,
                        "asset_id": asset_id,
                        "local_path": base_name,
                    },
                )
            sort_order += 1
            count += 1
    conn.commit()


async def apply_civitai_metadata_from_download(
    asset_id: int,
    model: CivitaiModel,
    version_id: int,
    cfg: Any,
) -> None:
    """Persist Civitai metadata, covers, examples, and checkpoint hints after a successful download."""
    ver = next((v for v in model.model_versions if v.id == version_id), None)
    if ver is None:
        return
    raw_ver = ver.model_dump(mode="json", by_alias=True)
    svc = EnrichmentService()
    svc._apply_civitai_db(model, raw_ver, asset_id, ver=ver)
    conn = get_conn()
    row = conn.execute("SELECT primary_path FROM library_assets WHERE asset_id = ?", (asset_id,)).fetchone()
    if row:
        conn.execute(
            "UPDATE library_files SET enrichment_status = ? WHERE path = ?",
            ("found", str(row["primary_path"])),
        )
        conn.commit()
    client = CivitaiClient(api_key=cfg.civitai_api_key, hide_early_access=cfg.hide_early_access)
    try:
        ver_gallery = await _version_with_rich_image_meta(client, ver, nsfw=not cfg.hide_nsfw)
    finally:
        await client.aclose()
    await _fetch_cover(asset_id, model, cfg, ver=ver)
    await _fetch_example_images(asset_id, ver_gallery or ver, cfg, model=model)
