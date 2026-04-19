"""Per-task download stream, verify, and finish (used by DownloadManager)."""

from __future__ import annotations

import hashlib
import logging
import os
from pathlib import Path
from typing import TYPE_CHECKING

import httpx

from at_comfy.civitai.client import CivitaiClient
from at_comfy.civitai.models import CivitaiModel
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.download_cleanup import remove_partial_artifacts
from at_comfy.enrichment import apply_civarchive_catalog_to_asset, apply_civitai_metadata_from_download
from at_comfy.models.download import (
    DownloadErrorCode,
    DownloadState,
    DownloadTask,
    DuplicateResolution,
    user_message_for_error,
)
from at_comfy.scanner import index_one_file

if TYPE_CHECKING:
    from at_comfy.downloader import DownloadManager

logger = logging.getLogger(__name__)

_TERMINAL_STATES = frozenset(
    {
        DownloadState.COMPLETED,
        DownloadState.FAILED,
        DownloadState.CANCELLED,
        DownloadState.SKIPPED,
    },
)


def _family_for_type(task: DownloadTask) -> str:
    lab = (task.request.content_type_label or "").lower()
    if "checkpoint" in lab:
        return "checkpoints"
    return "loras"


async def process_download(manager: DownloadManager, task: DownloadTask, cfg: ATComfyConfig) -> None:
    """Run one download task to completion, failure, pause, or cancel."""
    from at_comfy.download_store import normalize_download_task_id

    tid = normalize_download_task_id(task.id)

    task = manager.get_task(tid) or task
    if task is None:
        return

    if task.state in _TERMINAL_STATES:
        return

    if task.cancel_requested:
        await _finalize_cancelled(manager, task)
        return

    req = task.request
    if req.duplicate_resolution == DuplicateResolution.SKIP:
        dest = Path(req.install_dir) / req.filename
        if dest.exists() and dest.stat().st_size > 0:
            task.state = DownloadState.SKIPPED
            task.error_message = "Skipped — file already exists at destination."
            task.error_code = DownloadErrorCode.NONE
            await manager.persist(task, "skipped", {})
            return

    dest = Path(req.install_dir) / req.filename
    part = dest.with_suffix(dest.suffix + ".part")
    client = CivitaiClient(api_key=cfg.civitai_api_key, hide_early_access=cfg.hide_early_access)

    try:
        dest.parent.mkdir(parents=True, exist_ok=True)

        if task.resume_verify_only and dest.exists() and dest.stat().st_size > 0:
            task.resume_verify_only = False
            await _run_verify_and_finish(
                manager, task, dest, part, cfg, client, allow_delete_dest_on_cancel=True
            )
            return

        if dest.exists() and dest.stat().st_size > 0 and not part.exists():
            if req.duplicate_resolution == DuplicateResolution.REPLACE:
                try:
                    dest.unlink()
                except OSError as exc:
                    task.state = DownloadState.FAILED
                    task.error_code = DownloadErrorCode.UNKNOWN
                    task.error_message = f"Could not remove existing file: {exc}"
                    await manager.persist(task, "failed", {})
                    return
            else:
                task.bytes_done = dest.stat().st_size
                await _run_verify_and_finish(
                    manager, task, dest, part, cfg, client, allow_delete_dest_on_cancel=False
                )
                return

        task.state = DownloadState.DOWNLOADING
        task.reset_download_rate()
        await manager.persist(task, "downloading", {})

        urls = list(req.candidate_urls)
        ok_stream = False
        async with httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=30.0), follow_redirects=True) as hc:
            for idx, raw_url in enumerate(urls):
                task = manager.get_task(tid) or task
                if task.cancel_requested:
                    await _finalize_cancelled(manager, task)
                    return

                if idx > 0:
                    part.unlink(missing_ok=True)
                    task.bytes_done = 0
                    await manager.persist(task, "mirror_switch", {"index": idx})

                task = manager.get_task(tid) or task
                if task.cancel_requested:
                    await _finalize_cancelled(manager, task)
                    return

                if idx == 0 and (not part.exists() or part.stat().st_size == 0):
                    part.unlink(missing_ok=True)
                    task.bytes_done = 0

                res = await _stream_one_url_to_part(manager, tid, task, cfg, client, hc, raw_url, part)
                task = manager.get_task(tid) or task
                if task.state in (DownloadState.PAUSED, DownloadState.CANCELLED, DownloadState.FAILED):
                    return
                if res == "ok":
                    ok_stream = True
                    break
                if res == "stopped":
                    return

            if not ok_stream:
                task.state = DownloadState.FAILED
                task.error_code = DownloadErrorCode.URL_RESOLVE_FAILED
                task.error_message = "all download candidates failed"
                await manager.persist(task, "failed", {})
                return

        task = manager.get_task(tid) or task
        if task.cancel_requested:
            await _finalize_cancelled(manager, task)
            return

        if not part.exists():
            task.state = DownloadState.FAILED
            task.error_code = DownloadErrorCode.UNKNOWN
            task.error_message = "download finished but partial file missing"
            await manager.persist(task, "failed", {})
            return

        part.replace(dest)
        await _run_verify_and_finish(
            manager, task, dest, part, cfg, client, allow_delete_dest_on_cancel=True
        )

    except Exception as e:
        logger.exception("download failed")
        task = manager.get_task(tid) or task
        task.state = DownloadState.FAILED
        task.error_message = str(e)
        task.error_code = DownloadErrorCode.UNKNOWN
        await manager.persist(task, "failed", {"detail": str(e)})
        part.unlink(missing_ok=True)
    finally:
        await client.aclose()


async def _finalize_cancelled(manager: DownloadManager, task: DownloadTask) -> None:
    task.state = DownloadState.CANCELLED
    task.error_message = "Cancelled."
    task.error_code = DownloadErrorCode.NONE
    task.cancel_requested = False
    task.pause_requested = False
    remove_partial_artifacts(task.request)
    await manager.persist(task, "cancelled", {})


async def _run_verify_and_finish(
    manager: DownloadManager,
    task: DownloadTask,
    dest: Path,
    _part: Path,
    cfg: ATComfyConfig,
    _client: CivitaiClient,
    *,
    allow_delete_dest_on_cancel: bool,
) -> None:
    from at_comfy.download_store import normalize_download_task_id

    tid = normalize_download_task_id(task.id)
    task.state = DownloadState.VERIFYING
    task.resume_verify_only = False
    await manager.persist(task, "verifying", {})

    try:
        if task.request.expected_sha256:
            hasher = hashlib.sha256()
            with open(dest, "rb") as f:
                while True:
                    live = manager.get_task(tid)
                    if live and live.cancel_requested:
                        task = live
                        if allow_delete_dest_on_cancel:
                            dest.unlink(missing_ok=True)
                        remove_partial_artifacts(task.request)
                        await _finalize_cancelled(manager, task)
                        return
                    if live and live.pause_requested:
                        task = live
                        task.state = DownloadState.PAUSED
                        task.pause_requested = False
                        task.bytes_done = dest.stat().st_size if dest.exists() else task.bytes_done
                        await manager.persist(task, "paused", {})
                        return
                    chunk = f.read(65536)
                    if not chunk:
                        break
                    hasher.update(chunk)
            if hasher.hexdigest().upper() != (task.request.expected_sha256 or "").upper():
                dest.unlink(missing_ok=True)
                task.state = DownloadState.FAILED
                task.error_code = DownloadErrorCode.CHECKSUM_MISMATCH
                task.error_message = user_message_for_error(DownloadErrorCode.CHECKSUM_MISMATCH)
                await manager.persist(task, "failed", {"code": "checksum_mismatch"})
                return

        task.state = DownloadState.COMPLETED
        task.bytes_done = dest.stat().st_size if dest.exists() else 0
        await manager.persist(task, "completed", {"bytes": task.bytes_done})
        manager.mark_completed_public(tid)
        await index_one_file(dest, scan_family=_family_for_type(task), config=cfg, force_hash=True)
        if task.request.source == "civitai":
            try:
                snap = task.request.model_json_snapshot
                items = snap.get("items") if isinstance(snap, dict) else None
                if isinstance(items, list) and items and isinstance(items[0], dict):
                    model = CivitaiModel.model_validate(items[0])
                    row_aid = get_conn().execute(
                        "SELECT asset_id FROM library_assets WHERE primary_path = ?",
                        (str(dest.resolve()),),
                    ).fetchone()
                    if row_aid:
                        await apply_civitai_metadata_from_download(
                            int(row_aid["asset_id"]),
                            model,
                            int(task.request.version_id),
                            cfg,
                        )
            except Exception:
                logger.exception("register download metadata failed")
        elif task.request.source == "civarchive":
            try:
                snap = task.request.model_json_snapshot
                raw = snap.get("civarchive_model") if isinstance(snap, dict) else None
                if isinstance(raw, dict):
                    row_aid = get_conn().execute(
                        "SELECT asset_id FROM library_assets WHERE primary_path = ?",
                        (str(dest.resolve()),),
                    ).fetchone()
                    if row_aid:
                        await apply_civarchive_catalog_to_asset(
                            asset_id=int(row_aid["asset_id"]),
                            raw_model=raw,
                            cfg=cfg,
                            primary_path=str(dest.resolve()),
                            external_file_id=str(int(task.request.file_id)),
                        )
            except Exception:
                logger.exception("register civarchive download metadata failed")
    except Exception as e:
        logger.exception("verify failed")
        task.state = DownloadState.FAILED
        task.error_message = str(e)
        task.error_code = DownloadErrorCode.UNKNOWN
        await manager.persist(task, "failed", {"detail": str(e)})


async def _stream_one_url_to_part(
    manager: DownloadManager,
    tid: str,
    task: DownloadTask,
    cfg: ATComfyConfig,
    client: CivitaiClient,
    hc: httpx.AsyncClient,
    raw_url: str,
    part: Path,
) -> str:
    """Stream one mirror to ``part``. Returns ``ok``, ``retry``, or ``stopped``."""
    if raw_url.startswith("https://civitai.com/api/download/"):
        final_url, err = await client.resolve_download_url(raw_url, task.request.model_id)
        if not final_url:
            if err == "NO_API":
                task.state = DownloadState.FAILED
                task.error_code = DownloadErrorCode.NO_API_KEY
                task.error_message = err or "no url"
                await manager.persist(task, "failed", {})
                return "stopped"
            return "retry"
    else:
        final_url = raw_url

    hdrs = manager.merge_download_headers(task, cfg, raw_url, final_url)

    start = part.stat().st_size if part.exists() else 0
    if start > 0 and task.bytes_done > start:
        start = int(task.bytes_done)
    elif task.bytes_done > 0 and not part.exists():
        start = 0
        task.bytes_done = 0

    while True:
        hdrs2 = dict(hdrs)
        if start > 0:
            hdrs2["Range"] = f"bytes={start}-"
        async with hc.stream("GET", final_url, headers=hdrs2) as resp:
            if resp.status_code == 416 and start > 0:
                part.unlink(missing_ok=True)
                start = 0
                task.bytes_done = 0
                await manager.persist(task, "range_restart", {"note": "416"})
                continue

            if resp.status_code == 200 and start > 0:
                await resp.aread()
                part.unlink(missing_ok=True)
                start = 0
                task.bytes_done = 0
                await manager.persist(task, "range_restart", {"note": "server_returned_200_full"})
                logger.info("Server ignored Range; restarting full download task=%s", tid)
                continue

            if resp.status_code not in (200, 206):
                return "retry"

            if resp.status_code == 206:
                cr = resp.headers.get("Content-Range", "")
                if "/" in cr:
                    try:
                        task.total_bytes = int(cr.rsplit("/", 1)[-1])
                    except ValueError:
                        pass
            else:
                cl = resp.headers.get("Content-Length")
                if cl:
                    try:
                        task.total_bytes = int(cl)
                    except ValueError:
                        pass
                else:
                    task.total_bytes = None

            mode = "ab" if start > 0 and part.exists() else "wb"
            if mode == "wb":
                start = 0
            done = start

            with open(part, mode) as out:
                async for chunk in resp.aiter_bytes():
                    live = manager.get_task(tid)
                    if live is None:
                        return "stopped"
                    if live.cancel_requested:
                        task = live
                        break
                    if live.pause_requested:
                        out.flush()
                        try:
                            os.fsync(out.fileno())
                        except OSError:
                            pass
                        done = part.stat().st_size if part.exists() else done
                        task = live
                        task.bytes_done = done
                        task.state = DownloadState.PAUSED
                        task.pause_requested = False
                        task.error_message = None
                        task.error_code = DownloadErrorCode.NONE
                        await manager.persist(task, "paused", {})
                        return "stopped"
                    out.write(chunk)
                    done += len(chunk)
                    task.bytes_done = done
                    task.touch_download_rate(done)
                    if task.total_bytes is None:
                        task.total_bytes = done
                    await manager.persist(task)

        live = manager.get_task(tid)
        if live:
            task = live
        if task.cancel_requested:
            await _finalize_cancelled(manager, task)
            return "stopped"
        break

    return "ok"
