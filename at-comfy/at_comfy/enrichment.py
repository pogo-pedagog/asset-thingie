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
    civitai_image_original_fetch_url,
    civitai_image_strip_width_query,
    civitai_image_url_with_width,
)
from at_comfy.civitai.models import CivitaiModel, CivitaiModelVersion
from at_comfy.config import cache_root, clamp_max_example_images
from at_comfy.db import get_conn
from at_comfy.media_processing import (
    jpeg_thumbnail_from_image_file,
    poster_jpeg_from_video_file,
    poster_jpeg_from_video_url,
    video_extension_from_url,
)

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
        for suffix in (".jpg", ".mp4"):
            cover = cache / "covers" / f"{asset_id}{suffix}"
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
            await _fetch_civitai_cover_and_example_gallery(
                asset_id=asset_id,
                model=full,
                ver=ver_obj,
                cfg=cfg,
                client=client,
            )
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
    mid = int(model.id)
    dest_dir = cache_root() / "covers"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_jpg = dest_dir / f"{asset_id}.jpg"
    dest_mp4 = dest_dir / f"{asset_id}.mp4"

    cover_vid = None
    for im in v.images or []:
        if (im.type or "").strip().lower() == "video" and (im.url or "").strip():
            cover_vid = im
            break

    cover_im = None
    for im in v.images or []:
        if (im.type or "image").strip().lower() == "image" and (im.url or "").strip():
            cover_im = im
            break

    # Prefer motion covers when we can materialize at least a poster or local MP4.
    if cover_vid is not None and (
        getattr(cfg, "download_example_videos", False) or getattr(cfg, "generate_video_posters", True)
    ):
        vu = cover_vid.url.strip()
        hdr = civitai_download_headers(
            api_key=cfg.civitai_api_key,
            user_agent="AssetThingie-Comfy/0.1",
            model_id=mid,
            for_url=vu,
        )
        if getattr(cfg, "download_example_videos", False):
            try:
                async with httpx.AsyncClient(timeout=180.0, follow_redirects=True) as c:
                    r = await c.get(vu, headers=hdr)
                    if r.is_success and r.content:
                        dest_mp4.write_bytes(r.content)
            except Exception as e:
                logger.debug("cover video download failed: %s", e)
            if getattr(cfg, "generate_video_posters", True):
                if dest_mp4.is_file():
                    poster_jpeg_from_video_file(dest_mp4, dest_jpg)
                if not dest_jpg.is_file():
                    poster_jpeg_from_video_url(vu, dest_jpg, headers=hdr)
        else:
            if getattr(cfg, "generate_video_posters", True):
                if dest_mp4.is_file():
                    poster_jpeg_from_video_file(dest_mp4, dest_jpg)
                if not dest_jpg.is_file():
                    poster_jpeg_from_video_url(vu, dest_jpg, headers=hdr)
        # Only stop here once we have a raster poster; MP4 alone still needs a JPG for grid/thumb.
        if dest_jpg.is_file():
            return

    if cover_im is None:
        return

    u_orig = civitai_image_original_fetch_url(cover_im.url, natural_width=cover_im.width)
    hdr = civitai_download_headers(
        api_key=cfg.civitai_api_key,
        user_agent="AssetThingie-Comfy/0.1",
        model_id=mid,
        for_url=u_orig,
    )
    try:
        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as c:
            r = await c.get(u_orig, headers=hdr)
            if r.is_success and r.content:
                dest_jpg.write_bytes(r.content)
    except Exception as e:
        logger.debug("cover image fetch failed: %s", e)
    # Keep local MP4 when this version still has a video cover (poster may come from image fallback).
    if cover_vid is None and dest_mp4.is_file():
        try:
            dest_mp4.unlink()
        except OSError:
            pass


async def _fetch_example_media(
    asset_id: int,
    ver: CivitaiModelVersion | None,
    cfg: Any,
    *,
    model: CivitaiModel | None = None,
    max_items: int = 20,
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

    async with httpx.AsyncClient(timeout=180.0, follow_redirects=True) as c:
        for im in ver.images:
            if count >= max_items:
                break
            raw_type = (im.type or "image").strip().lower()
            vu = (im.url or "").strip()
            if not vu:
                continue

            if raw_type == "image":
                idx += 1
                base_name = f"{idx:03d}.jpg"
                thumb_name = f"{idx:03d}.thumb.jpg"
                full_img = ex_root / base_name
                full_thumb = ex_root / thumb_name
                u_orig = civitai_image_original_fetch_url(im.url, natural_width=im.width)
                base_disp = civitai_image_display_url(im.url, natural_width=im.width)
                u_fallback = civitai_image_url_with_width(base_disp, 512)
                hdr_o = civitai_download_headers(
                    api_key=cfg.civitai_api_key,
                    user_agent="AssetThingie-Comfy/0.1",
                    model_id=mid,
                    for_url=u_orig,
                )
                hdr_f = civitai_download_headers(
                    api_key=cfg.civitai_api_key,
                    user_agent="AssetThingie-Comfy/0.1",
                    model_id=mid,
                    for_url=u_fallback,
                )
                hdr_t = civitai_download_headers(
                    api_key=cfg.civitai_api_key,
                    user_agent="AssetThingie-Comfy/0.1",
                    model_id=mid,
                    for_url=civitai_image_url_with_width(base_disp, 200),
                )
                try:
                    if not full_img.is_file() or full_img.stat().st_size == 0:
                        r = await c.get(u_orig, headers=hdr_o)
                        if not (r.is_success and r.content):
                            r = await c.get(u_fallback, headers=hdr_f)
                        if r.is_success and r.content:
                            full_img.write_bytes(r.content)
                    if full_img.is_file() and full_img.stat().st_size > 0:
                        if not full_thumb.is_file() or full_thumb.stat().st_size == 0:
                            if not jpeg_thumbnail_from_image_file(full_img, full_thumb, max_side=200):
                                rt = await c.get(civitai_image_url_with_width(base_disp, 200), headers=hdr_t)
                                if rt.is_success and rt.content:
                                    full_thumb.write_bytes(rt.content)
                except Exception as e:
                    logger.debug("example image failed: %s", e)
                    continue
                if not full_img.is_file() or full_img.stat().st_size == 0:
                    continue

                caption, meta_json = _example_caption_meta(im)
                _upsert_example_row(
                    conn,
                    asset_id=asset_id,
                    media_type="image",
                    source_url=_example_media_source_key("image", vu, natural_width=im.width),
                    local_path=base_name,
                    thumb_name=thumb_name,
                    playback_name=None,
                    poster_name=None,
                    caption=caption,
                    meta_json=meta_json,
                    sort_order=sort_order,
                    width=im.width,
                    height=im.height,
                    now=now,
                )
                sort_order += 1
                count += 1

            elif raw_type == "video":
                if not cfg.download_example_videos and not cfg.generate_video_posters:
                    continue
                idx += 1
                ext = video_extension_from_url(vu)
                play_name = f"{idx:03d}{ext}"
                poster_name = f"{idx:03d}.poster.jpg"
                thumb_name = f"{idx:03d}.thumb.jpg"
                video_path = ex_root / play_name
                poster_path = ex_root / poster_name
                thumb_path = ex_root / thumb_name
                hdr = civitai_download_headers(
                    api_key=cfg.civitai_api_key,
                    user_agent="AssetThingie-Comfy/0.1",
                    model_id=mid,
                    for_url=vu,
                )
                try:
                    if cfg.download_example_videos:
                        if not video_path.is_file() or video_path.stat().st_size == 0:
                            r = await c.get(vu, headers=hdr)
                            if r.is_success and r.content:
                                video_path.write_bytes(r.content)
                        if video_path.is_file() and video_path.stat().st_size > 0:
                            if cfg.generate_video_posters:
                                if not poster_jpeg_from_video_file(video_path, poster_path):
                                    poster_jpeg_from_video_url(vu, poster_path, headers=dict(hdr))
                    elif cfg.generate_video_posters:
                        poster_jpeg_from_video_url(vu, poster_path, headers=dict(hdr))
                except Exception as e:
                    logger.debug("example video failed: %s", e)
                    continue

                poster_ok = poster_path.is_file() and poster_path.stat().st_size > 0
                play_ok = video_path.is_file() and video_path.stat().st_size > 0
                playback_rel = play_name if play_ok else None
                if not poster_ok and not play_ok:
                    continue

                thumb_final: str | None = None
                if poster_ok:
                    if jpeg_thumbnail_from_image_file(poster_path, thumb_path, max_side=200):
                        thumb_final = thumb_name
                    else:
                        thumb_final = poster_name
                elif play_ok:
                    # Avoid pointing ``thumbnail_local_path`` at an MP4 (breaks ``<img>`` tiles).
                    if cfg.generate_video_posters and poster_jpeg_from_video_file(video_path, thumb_path):
                        thumb_final = thumb_name
                    else:
                        thumb_final = None

                local_primary = poster_name if poster_ok else play_name
                caption, meta_json = _example_caption_meta(im)
                _upsert_example_row(
                    conn,
                    asset_id=asset_id,
                    media_type="video",
                    source_url=_example_media_source_key("video", vu, natural_width=im.width),
                    local_path=local_primary,
                    thumb_name=thumb_final,
                    playback_name=playback_rel,
                    poster_name=poster_name if poster_ok else None,
                    caption=caption,
                    meta_json=meta_json,
                    sort_order=sort_order,
                    width=im.width,
                    height=im.height,
                    now=now,
                )
                sort_order += 1
                count += 1
            else:
                continue

    conn.commit()


def _example_media_source_key(media_type: str, raw_url: str, *, natural_width: int | None) -> str:
    """Stable ``source_url`` for example rows so CDN/query variants map to one gallery item."""
    u = (raw_url or "").strip()
    if not u:
        return u
    if (media_type or "").strip().lower() == "image":
        return civitai_image_original_fetch_url(u, natural_width=natural_width)
    return civitai_image_strip_width_query(u)


def _example_caption_meta(im: Any) -> tuple[str | None, str | None]:
    caption: str | None = None
    meta_json: str | None = None
    if im.meta:
        meta_json = json.dumps(dict(im.meta))[:100000]
        p = im.meta.get("prompt") or im.meta.get("Prompt")
        if p:
            caption = str(p)[:2000]
    return caption, meta_json


def _example_media_row_id_for_source(
    conn: Any,
    *,
    asset_id: int,
    media_type: str,
    source_key: str,
    natural_width: int | None,
) -> int | None:
    """Match by canonical key or by normalizing a legacy stored ``source_url``."""
    for row in conn.execute(
        "SELECT example_media_id, source_url FROM example_media WHERE asset_id = ? AND media_type = ?",
        (asset_id, media_type),
    ):
        stored = (row["source_url"] or "").strip()
        if stored == source_key:
            return int(row["example_media_id"])
        if _example_media_source_key(media_type, stored, natural_width=natural_width) == source_key:
            return int(row["example_media_id"])
    return None


def _upsert_example_row(
    conn: Any,
    *,
    asset_id: int,
    media_type: str,
    source_url: str,
    local_path: str,
    thumb_name: str | None,
    playback_name: str | None,
    poster_name: str | None,
    caption: str | None,
    meta_json: str | None,
    sort_order: int,
    width: int | None,
    height: int | None,
    now: str,
) -> None:
    ex_id = _example_media_row_id_for_source(
        conn,
        asset_id=asset_id,
        media_type=media_type,
        source_key=source_url,
        natural_width=width,
    )
    if ex_id is None:
        conn.execute(
            """
            INSERT INTO example_media (
                asset_id, media_type, origin_type, local_path, source_url,
                width, height, caption, metadata_json, sort_order,
                thumbnail_local_path, playback_local_path, poster_local_path, created_at
            ) VALUES (?, ?, 'civitai', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                asset_id,
                media_type,
                local_path,
                source_url,
                width,
                height,
                caption,
                meta_json,
                sort_order,
                thumb_name,
                playback_name,
                poster_name,
                now,
            ),
        )
    else:
        conn.execute(
            """
            UPDATE example_media SET
                source_url = :source_url,
                media_type = :media_type,
                local_path = :local_path,
                width = :width,
                height = :height,
                sort_order = :sort_order,
                thumbnail_local_path = :thumb_name,
                playback_local_path = :playback_name,
                poster_local_path = :poster_name,
                caption = COALESCE(:caption, caption),
                metadata_json = COALESCE(:meta_json, metadata_json)
            WHERE example_media_id = :example_media_id
            """,
            {
                "source_url": source_url,
                "media_type": media_type,
                "local_path": local_path,
                "width": width,
                "height": height,
                "sort_order": sort_order,
                "thumb_name": thumb_name,
                "playback_name": playback_name,
                "poster_name": poster_name,
                "caption": caption,
                "meta_json": meta_json,
                "example_media_id": ex_id,
            },
        )


def _max_example_gallery_items(cfg: Any) -> int:
    return clamp_max_example_images(getattr(cfg, "max_example_images", None))


async def _fetch_civitai_cover_and_example_gallery(
    *,
    asset_id: int,
    model: CivitaiModel,
    ver: CivitaiModelVersion | None,
    cfg: Any,
    client: CivitaiClient,
) -> None:
    """Version gallery detail + cover + examples — shared by hash enrichment and post-download."""
    ver_gallery = await _version_with_rich_image_meta(client, ver, nsfw=not cfg.hide_nsfw)
    await _fetch_cover(asset_id, model, cfg, ver=ver)
    await _fetch_example_media(
        asset_id,
        ver_gallery or ver,
        cfg,
        model=model,
        max_items=_max_example_gallery_items(cfg),
    )


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
        await _fetch_civitai_cover_and_example_gallery(
            asset_id=asset_id,
            model=model,
            ver=ver,
            cfg=cfg,
            client=client,
        )
    finally:
        await client.aclose()
