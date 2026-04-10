"""HTTP handlers for ``/at/*`` (Comfy ``PromptServer.routes`` + test app)."""

from __future__ import annotations

import asyncio
import json
import logging
import urllib.parse
from typing import Any

from aiohttp import web

from at_comfy import scan_state
from at_comfy.browse_sources.registry import browse_query_dict_from_request, get_browse_source, list_browse_source_manifests
from at_comfy.cache import cache_dir_safe_path, serve_cache_file
from at_comfy.config import ATComfyConfig, invalidate_config_cache, load_config, save_config
from at_comfy.download_store import DownloadStore
from at_comfy.downloader import Downloader
from at_comfy.enrichment import EnrichmentService, enrichment_public_status
from at_comfy.library_repo import (
    count_assets,
    distinct_base_models,
    distinct_categories,
    distinct_content_types,
    get_asset_row,
    list_assets,
    list_subfolders,
    list_tags_with_counts,
)
from at_comfy.scanner import (
    clean_stale_assets,
    compute_stale_assets,
    orphan_cache_bytes_for_asset_ids,
    run_full_scan,
)
from at_comfy.serial import asset_detail_dict, asset_row_to_dict

logger = logging.getLogger(__name__)

# Fixed API page size: Civitai returns different result sets at different limits; keep stable.
BROWSE_CIVITAI_LIMIT = 75


def _query_all(request: web.Request, key: str) -> list[str]:
    q = request.query
    getall = getattr(q, "getall", None)
    if callable(getall):
        try:
            vals = list(getall(key))
        except KeyError:
            vals = []
        return [str(x) for x in vals if str(x).strip()]
    v = q.get(key)
    return [str(v)] if v is not None and str(v).strip() else []

_downloader: Downloader | None = None
_enrichment: EnrichmentService | None = None


def _get_downloader() -> Downloader:
    global _downloader
    if _downloader is None:
        _downloader = Downloader()
    return _downloader


def _get_enrichment() -> EnrichmentService:
    global _enrichment
    if _enrichment is None:
        _enrichment = EnrichmentService()
    return _enrichment


def _parse_tags(request: web.Request) -> list[str]:
    return _query_all(request, "tag")


async def handle_health(_request: web.Request) -> web.Response:
    return web.json_response({"ok": True})


async def handle_scan_post(_request: web.Request) -> web.Response:
    cfg = load_config()
    asyncio.create_task(run_full_scan(config=cfg))
    return web.json_response({"ok": True, "started": True})


async def handle_scan_status(_request: web.Request) -> web.Response:
    return web.json_response(scan_state.scan_status())


async def handle_filters(request: web.Request) -> web.Response:
    ct = (request.query.get("content_type") or "").strip() or None
    fam_raw = (request.query.get("family") or "").strip().lower()
    fam_kw: str | None = None
    if fam_raw == "lora" and not ct:
        fam_kw = "lora"
    elif fam_raw == "checkpoint" and not ct:
        fam_kw = "checkpoint"
    tags_param = _parse_tags(request)
    conn_tag_ids = None
    if tags_param:
        from at_comfy.db import get_conn
        from at_comfy.library_repo import tag_ids_for_names

        conn_tag_ids = tag_ids_for_names(get_conn(), tags_param)
        if conn_tag_ids is not None and not conn_tag_ids:
            tags_out: list[dict[str, Any]] = []
            return web.json_response(
                {
                    "content_types": distinct_content_types(),
                    "base_models": [],
                    "categories": [],
                    "tags": tags_out,
                },
            )
    tag_rows = list_tags_with_counts(
        content_type=ct or "",
        family=fam_kw or "",
        limit=2000,
        and_tag_ids=conn_tag_ids,
    )
    tags_out = [{"tag_id": int(t["tag_id"]), "name": t["name"], "count": int(t["count"])} for t in tag_rows]
    return web.json_response(
        {
            "content_types": distinct_content_types(),
            "base_models": distinct_base_models(content_type=ct or "", family=fam_kw or ""),
            "categories": distinct_categories(content_type=ct or "", family=fam_kw or ""),
            "tags": tags_out,
        },
    )


async def handle_subfolders(request: web.Request) -> web.Response:
    parent = request.query.get("parent") or ""
    family = request.query.get("family") or ""
    cfg = load_config()
    folders, parent_path = list_subfolders(parent, family, cfg)
    return web.json_response({"folders": folders, "parent_path": parent_path})


async def handle_assets(request: web.Request) -> web.Response:
    cfg = load_config()
    q = request.query.get("q") or ""
    content_type = request.query.get("content_type") or ""
    base_model = request.query.get("base_model") or ""
    category = request.query.get("category") or ""
    path_prefix = request.query.get("path_prefix") or ""
    sort = request.query.get("sort") or "path"
    family = request.query.get("family") or ""
    try:
        limit = int(request.query.get("limit") or 50)
    except ValueError:
        limit = 50
    try:
        offset = int(request.query.get("offset") or 0)
    except ValueError:
        offset = 0
    tags = _parse_tags(request)
    total = count_assets(
        q=q,
        content_type=content_type,
        base_model=base_model,
        category=category,
        path_prefix=path_prefix,
        family=family,
        tag_names=tags,
        sort=sort,
    )
    rows = list_assets(
        q=q,
        content_type=content_type,
        base_model=base_model,
        category=category,
        path_prefix=path_prefix,
        family=family,
        tag_names=tags,
        sort=sort,
        limit=limit,
        offset=offset,
    )
    items = [asset_row_to_dict(r, cfg) for r in rows]
    lim = max(1, min(limit, 200))
    off = max(0, offset)
    return web.json_response({"total": total, "limit": lim, "offset": off, "items": items})


async def handle_asset_detail(request: web.Request) -> web.Response:
    try:
        asset_id = int(request.match_info["asset_id"])
    except (KeyError, ValueError):
        return web.json_response({"error": "bad id"}, status=400)
    if asset_id <= 0:
        return web.json_response({"error": "not found"}, status=404)
    cfg = load_config()
    row = get_asset_row(asset_id)
    if row is None:
        return web.json_response({"error": "not found"}, status=404)
    return web.json_response(asset_detail_dict(row, cfg))


async def handle_clean_preview(_request: web.Request) -> web.Response:
    stale = compute_stale_assets()
    ids = {int(s["asset_id"]) for s in stale}
    return web.json_response(
        {
            "stale_count": len(stale),
            "stale_assets": stale,
            "orphan_cache_bytes": orphan_cache_bytes_for_asset_ids(ids),
        },
    )


async def handle_clean_confirm(_request: web.Request) -> web.Response:
    removed = clean_stale_assets()
    return web.json_response({"ok": True, "removed": removed})


async def handle_re_enrich_one(request: web.Request) -> web.Response:
    try:
        aid = int(request.match_info["asset_id"])
    except (KeyError, ValueError):
        return web.json_response({"error": "bad id"}, status=400)
    if aid <= 0:
        return web.json_response({"error": "not found"}, status=404)
    row = get_asset_row(aid)
    if row is None:
        return web.json_response({"error": "not found"}, status=404)
    cfg = load_config()
    await _get_enrichment().re_enrich_asset(aid, cfg)
    return web.json_response({"ok": True})


async def handle_batch_re_enrich(request: web.Request) -> web.Response:
    try:
        body = await request.json()
    except json.JSONDecodeError:
        return web.json_response({"error": "invalid json"}, status=400)
    if not isinstance(body, dict):
        return web.json_response({"error": "object required"}, status=400)
    raw_ids = body.get("asset_ids")
    if not isinstance(raw_ids, list) or not raw_ids:
        return web.json_response({"error": "asset_ids required"}, status=400)
    try:
        ids = [int(x) for x in raw_ids]
    except (TypeError, ValueError):
        return web.json_response({"error": "bad asset_ids"}, status=400)
    ids = [i for i in ids if i > 0]
    if not ids:
        return web.json_response({"error": "asset_ids required"}, status=400)
    cfg = load_config()
    delay_s = max(0, int(cfg.enrichment_rate_limit_ms)) / 1000.0
    svc = _get_enrichment()
    processed = 0
    failed = 0
    for aid in ids:
        if get_asset_row(aid) is None:
            failed += 1
            continue
        try:
            await svc.re_enrich_asset(aid, cfg)
            processed += 1
        except Exception:
            logger.exception("batch re-enrich failed for asset %s", aid)
            failed += 1
        if delay_s:
            await asyncio.sleep(delay_s)
    return web.json_response({"ok": True, "processed": processed, "failed": failed})


async def handle_browse_sources(_request: web.Request) -> web.Response:
    return web.json_response({"sources": list_browse_source_manifests()})


async def handle_browse_search_by_source(request: web.Request) -> web.Response:
    cfg = load_config()
    sid = (request.match_info.get("source") or "").strip()
    try:
        src = get_browse_source(sid, cfg, browse_limit=BROWSE_CIVITAI_LIMIT)
    except KeyError:
        return web.json_response({"error": "unknown source"}, status=404)
    q = browse_query_dict_from_request(request)
    try:
        page = await src.search(q)
    except Exception as e:
        return web.json_response({"error": str(e)}, status=400)
    return web.json_response(
        {
            "items": page.items,
            "next_page": page.next_page,
            "prev_page": page.prev_page,
        },
    )


async def handle_browse_page_by_source(request: web.Request) -> web.Response:
    cfg = load_config()
    sid = (request.match_info.get("source") or "").strip()
    raw_url = urllib.parse.unquote(request.query.get("url") or "")
    if not raw_url:
        return web.json_response({"error": "missing url"}, status=400)
    try:
        src = get_browse_source(sid, cfg, browse_limit=BROWSE_CIVITAI_LIMIT)
    except KeyError:
        return web.json_response({"error": "unknown source"}, status=404)
    q = browse_query_dict_from_request(request)
    try:
        page = await src.page(raw_url, q)
    except Exception as e:
        return web.json_response({"error": str(e)}, status=400)
    return web.json_response(
        {
            "items": page.items,
            "next_page": page.next_page,
            "prev_page": page.prev_page,
        },
    )


async def handle_browse_civarchive_base_models(_request: web.Request) -> web.Response:
    from at_comfy.civarchive_catalog import civarchive_base_models_list

    return web.json_response({"base_models": civarchive_base_models_list()})


async def handle_browse_civarchive_base_models_reset(_request: web.Request) -> web.Response:
    from at_comfy.civarchive_catalog import civarchive_base_models_clear, civarchive_base_models_list

    civarchive_base_models_clear()
    return web.json_response({"ok": True, "base_models": civarchive_base_models_list()})


async def handle_browse_detail_by_source(request: web.Request) -> web.Response:
    cfg = load_config()
    sid = (request.match_info.get("source") or "").strip()
    item_ref = urllib.parse.unquote(request.match_info.get("item_ref") or "")
    if not item_ref:
        return web.json_response({"error": "missing item ref"}, status=400)
    try:
        src = get_browse_source(sid, cfg, browse_limit=BROWSE_CIVITAI_LIMIT)
    except KeyError:
        return web.json_response({"error": "unknown source"}, status=404)
    nsfw = (request.query.get("nsfw") or "").lower() in ("1", "true", "yes")
    if cfg.hide_nsfw:
        nsfw = False
    try:
        body = await src.detail(item_ref, nsfw=nsfw)
        return web.json_response(body)
    except ValueError as e:
        return web.json_response({"error": str(e)}, status=400)
    except Exception as e:
        return web.json_response({"error": str(e)}, status=502)


async def handle_browse_search(request: web.Request) -> web.Response:
    """Legacy shim: Civitai ``/at/browse/search``."""
    cfg = load_config()
    try:
        src = get_browse_source("civitai", cfg, browse_limit=BROWSE_CIVITAI_LIMIT)
        page = await src.search(browse_query_dict_from_request(request))
    except Exception as e:
        return web.json_response({"error": str(e)}, status=400)
    return web.json_response(
        {
            "items": page.items,
            "next_page": page.next_page,
            "prev_page": page.prev_page,
        },
    )


async def handle_browse_page(request: web.Request) -> web.Response:
    """Legacy shim: Civitai ``/at/browse/page``."""
    cfg = load_config()
    raw_url = urllib.parse.unquote(request.query.get("url") or "")
    if not raw_url:
        return web.json_response({"error": "missing url"}, status=400)
    try:
        src = get_browse_source("civitai", cfg, browse_limit=BROWSE_CIVITAI_LIMIT)
        page = await src.page(raw_url, browse_query_dict_from_request(request))
    except Exception as e:
        return web.json_response({"error": str(e)}, status=400)
    return web.json_response(
        {
            "items": page.items,
            "next_page": page.next_page,
            "prev_page": page.prev_page,
        },
    )


async def handle_browse_model(request: web.Request) -> web.Response:
    """Legacy shim: Civitai model detail by numeric id."""
    try:
        mid = int(request.match_info["model_id"])
    except (KeyError, ValueError):
        return web.json_response({"error": "bad id"}, status=400)
    cfg = load_config()
    try:
        src = get_browse_source("civitai", cfg, browse_limit=BROWSE_CIVITAI_LIMIT)
    except KeyError:
        return web.json_response({"error": "unknown source"}, status=404)
    nsfw = (request.query.get("nsfw") or "").lower() in ("1", "true", "yes")
    if cfg.hide_nsfw:
        nsfw = False
    try:
        body = await src.detail(str(mid), nsfw=nsfw)
        return web.json_response(body)
    except Exception as e:
        return web.json_response({"error": str(e)}, status=502)


async def handle_downloads_list(_request: web.Request) -> web.Response:
    store = DownloadStore()
    cfg = load_config()
    tasks = store.list_tasks()
    completed_since = store.take_completed_since_marker()
    return web.json_response(
        {
            "tasks": [_download_task_public(t, cfg) for t in tasks],
            "completed_since_last_poll": completed_since,
        },
    )


def _download_task_public(row: Any, _cfg: ATComfyConfig) -> dict[str, Any]:
    from at_comfy.models.download import DownloadRequest

    req = DownloadRequest.model_validate_json(row["request_json"])
    return {
        "id": row["id"],
        "display_name": req.filename,
        "filename": req.filename,
        "state": row["state"],
        "bytes_done": int(row["bytes_done"] or 0),
        "total_bytes": row["total_bytes"],
        "error_message": row["error_message"],
        "cover_thumb_url": _cover_thumb_url(row["cover_thumb_path"]),
        "created_at": row["created_at"],
    }


def _cover_thumb_url(p: str | None) -> str | None:
    if not p:
        return None
    rel = str(p).replace("\\", "/").lstrip("/")
    return f"/at/cache/{rel}"


async def handle_download_post(request: web.Request) -> web.Response:
    cfg = load_config()
    try:
        body = await request.json()
    except json.JSONDecodeError:
        return web.json_response({"error": "invalid json"}, status=400)
    dlr = _get_downloader()
    try:
        tid = await dlr.enqueue_from_body(body, cfg)
        return web.json_response({"ok": True, "task_id": tid})
    except ValueError as e:
        return web.json_response({"error": str(e)}, status=400)


async def handle_download_batch(request: web.Request) -> web.Response:
    cfg = load_config()
    try:
        body = await request.json()
    except json.JSONDecodeError:
        return web.json_response({"error": "invalid json"}, status=400)
    items = body.get("items") if isinstance(body, dict) else None
    if not isinstance(items, list):
        return web.json_response({"error": "items required"}, status=400)
    dlr = _get_downloader()
    ids: list[str] = []
    skipped: list[dict[str, Any]] = []
    for it in items:
        if not isinstance(it, dict):
            continue
        try:
            tid = await dlr.enqueue_from_body(it, cfg, duplicate_resolution=body.get("duplicate_resolution"))
            ids.append(tid)
        except ValueError as e:
            skipped.append({"item": it, "reason": str(e)})
    return web.json_response({"task_ids": ids, "skipped": skipped})


async def handle_download_action(request: web.Request, action: str) -> web.Response:
    tid = request.match_info.get("task_id") or ""
    dlr = _get_downloader()
    if action == "cancel":
        await dlr.cancel(tid)
    elif action == "retry":
        await dlr.retry(tid)
    elif action == "pause":
        await dlr.pause(tid)
    return web.json_response({"ok": True})


async def handle_download_delete(request: web.Request) -> web.Response:
    tid = request.match_info.get("task_id") or ""
    DownloadStore().delete_task(tid)
    return web.json_response({"ok": True})


async def handle_config_get(_request: web.Request) -> web.Response:
    return web.json_response(load_config().to_public_dict())


async def handle_config_put(request: web.Request) -> web.Response:
    from dataclasses import asdict

    try:
        body = await request.json()
    except json.JSONDecodeError:
        return web.json_response({"error": "invalid json"}, status=400)
    if not isinstance(body, dict):
        return web.json_response({"error": "object required"}, status=400)
    cur = load_config()
    d = asdict(cur)
    fields = set(ATComfyConfig.__dataclass_fields__)
    for k, v in body.items():
        if k not in fields:
            continue
        if k == "scan_directories" and isinstance(v, dict):
            d[k] = {**dict(d.get("scan_directories") or {}), **{str(x): (y or None) for x, y in v.items()}}
        else:
            d[k] = v
    nxt = ATComfyConfig.from_dict(d)
    save_config(nxt)
    invalidate_config_cache()
    return web.json_response(nxt.to_public_dict())


async def handle_enrich_post(_request: web.Request) -> web.Response:
    cfg = load_config()
    asyncio.create_task(_get_enrichment().run_batch(cfg))
    return web.json_response({"ok": True})


async def handle_enrich_one(request: web.Request) -> web.Response:
    try:
        aid = int(request.match_info["asset_id"])
    except (KeyError, ValueError):
        return web.json_response({"error": "bad id"}, status=400)
    cfg = load_config()
    asyncio.create_task(_get_enrichment().enrich_asset(aid, cfg))
    return web.json_response({"ok": True})


async def handle_enrich_status(_request: web.Request) -> web.Response:
    return web.json_response(enrichment_public_status())


async def handle_cache_file(request: web.Request) -> web.StreamResponse | web.Response:
    rel = request.match_info.get("path") or ""
    full = cache_dir_safe_path(rel)
    if full is None:
        return web.Response(status=403)
    if not full.is_file():
        return web.Response(status=404)
    return await serve_cache_file(full)


async def handle_dl_cancel(request: web.Request) -> web.Response:
    return await handle_download_action(request, "cancel")


async def handle_dl_retry(request: web.Request) -> web.Response:
    return await handle_download_action(request, "retry")


async def handle_dl_pause(request: web.Request) -> web.Response:
    return await handle_download_action(request, "pause")


def register_all(routes: Any) -> None:
    routes.get("/at/health")(handle_health)
    routes.post("/at/scan")(handle_scan_post)
    routes.get("/at/scan/status")(handle_scan_status)
    routes.get("/at/filters")(handle_filters)
    routes.get("/at/subfolders")(handle_subfolders)
    routes.get("/at/library/clean-preview")(handle_clean_preview)
    routes.post("/at/library/clean")(handle_clean_confirm)
    routes.get("/at/assets")(handle_assets)
    routes.post("/at/assets/batch/re-enrich")(handle_batch_re_enrich)
    routes.get("/at/assets/{asset_id}")(handle_asset_detail)
    routes.post("/at/assets/{asset_id}/re-enrich")(handle_re_enrich_one)
    routes.get("/at/browse/sources")(handle_browse_sources)
    routes.get("/at/browse/civarchive/base-models")(handle_browse_civarchive_base_models)
    routes.post("/at/browse/civarchive/base-models/reset")(handle_browse_civarchive_base_models_reset)
    routes.get("/at/browse/{source}/search")(handle_browse_search_by_source)
    routes.get("/at/browse/{source}/page")(handle_browse_page_by_source)
    routes.get("/at/browse/{source}/detail/{item_ref}")(handle_browse_detail_by_source)
    routes.get("/at/browse/search")(handle_browse_search)
    routes.get("/at/browse/page")(handle_browse_page)
    routes.get("/at/browse/model/{model_id}")(handle_browse_model)
    routes.get("/at/downloads")(handle_downloads_list)
    routes.post("/at/download")(handle_download_post)
    routes.post("/at/download/batch")(handle_download_batch)
    routes.post("/at/downloads/{task_id}/cancel")(handle_dl_cancel)
    routes.post("/at/downloads/{task_id}/retry")(handle_dl_retry)
    routes.post("/at/downloads/{task_id}/pause")(handle_dl_pause)
    routes.delete("/at/downloads/{task_id}")(handle_download_delete)
    routes.get("/at/config")(handle_config_get)
    routes.put("/at/config")(handle_config_put)
    routes.post("/at/enrich")(handle_enrich_post)
    routes.post("/at/enrich/{asset_id}")(handle_enrich_one)
    routes.get("/at/enrich/status")(handle_enrich_status)
    routes.get("/at/cache/{path:.+}")(handle_cache_file)


def mount_on_app(app: web.Application) -> None:
    app.router.add_get("/at/health", handle_health)
    app.router.add_post("/at/scan", handle_scan_post)
    app.router.add_get("/at/scan/status", handle_scan_status)
    app.router.add_get("/at/filters", handle_filters)
    app.router.add_get("/at/subfolders", handle_subfolders)
    app.router.add_get("/at/library/clean-preview", handle_clean_preview)
    app.router.add_post("/at/library/clean", handle_clean_confirm)
    app.router.add_get("/at/assets", handle_assets)
    app.router.add_post("/at/assets/batch/re-enrich", handle_batch_re_enrich)
    app.router.add_get("/at/assets/{asset_id}", handle_asset_detail)
    app.router.add_post("/at/assets/{asset_id}/re-enrich", handle_re_enrich_one)
    app.router.add_get("/at/browse/sources", handle_browse_sources)
    app.router.add_get("/at/browse/civarchive/base-models", handle_browse_civarchive_base_models)
    app.router.add_post("/at/browse/civarchive/base-models/reset", handle_browse_civarchive_base_models_reset)
    app.router.add_get("/at/browse/{source}/search", handle_browse_search_by_source)
    app.router.add_get("/at/browse/{source}/page", handle_browse_page_by_source)
    app.router.add_get("/at/browse/{source}/detail/{item_ref}", handle_browse_detail_by_source)
    app.router.add_get("/at/browse/search", handle_browse_search)
    app.router.add_get("/at/browse/page", handle_browse_page)
    app.router.add_get("/at/browse/model/{model_id}", handle_browse_model)
    app.router.add_get("/at/downloads", handle_downloads_list)
    app.router.add_post("/at/download", handle_download_post)
    app.router.add_post("/at/download/batch", handle_download_batch)
    app.router.add_post("/at/downloads/{task_id}/cancel", handle_dl_cancel)
    app.router.add_post("/at/downloads/{task_id}/retry", handle_dl_retry)
    app.router.add_post("/at/downloads/{task_id}/pause", handle_dl_pause)
    app.router.add_delete("/at/downloads/{task_id}", handle_download_delete)
    app.router.add_get("/at/config", handle_config_get)
    app.router.add_put("/at/config", handle_config_put)
    app.router.add_post("/at/enrich", handle_enrich_post)
    app.router.add_post("/at/enrich/{asset_id}", handle_enrich_one)
    app.router.add_get("/at/enrich/status", handle_enrich_status)
    app.router.add_get("/at/cache/{path:.*}", handle_cache_file)
