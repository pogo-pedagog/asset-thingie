"""Civitai download workers (httpx streaming, resume, verify)."""

from __future__ import annotations

import asyncio
import hashlib
import logging
import os
from pathlib import Path
from typing import Any

import httpx

from at_comfy.civitai.client import CivitaiClient, civitai_download_headers
from at_comfy.civitai.models import CivitaiModel
from at_comfy.config import ATComfyConfig, load_config
from at_comfy.db import get_conn
from at_comfy.download_sources.registry import prepare_download
from at_comfy.download_store import DownloadStore, normalize_download_task_id
from at_comfy.enrichment import apply_civarchive_catalog_to_asset, apply_civitai_metadata_from_download
from at_comfy.models.download import (
    DownloadErrorCode,
    DownloadRequest,
    DownloadState,
    DownloadTask,
    DuplicateResolution,
)
from at_comfy.scanner import index_one_file

logger = logging.getLogger(__name__)

_sem: asyncio.Semaphore | None = None
_sem_capacity: int | None = None


def _sem_for(cfg: ATComfyConfig) -> asyncio.Semaphore:
    global _sem, _sem_capacity
    n = max(1, int(cfg.max_parallel_downloads))
    if _sem is None or _sem_capacity != n:
        _sem = asyncio.Semaphore(n)
        _sem_capacity = n
    return _sem


class Downloader:
    def __init__(self) -> None:
        self._store = DownloadStore()

    async def enqueue_from_body(
        self,
        body: dict[str, Any],
        cfg: ATComfyConfig,
        *,
        duplicate_resolution: str | None = None,
    ) -> str:
        merged = dict(body)
        if duplicate_resolution is not None:
            merged["duplicate_resolution"] = duplicate_resolution
        prepared = await prepare_download(merged, cfg)
        try:
            dup_res = DuplicateResolution(prepared.duplicate_resolution.lower())
        except ValueError:
            dup_res = DuplicateResolution.NONE
        if dup_res not in (DuplicateResolution.NONE, DuplicateResolution.SKIP, DuplicateResolution.REPLACE):
            dup_res = DuplicateResolution.NONE

        req = DownloadRequest(
            download_url=prepared.candidate_urls[0],
            candidate_urls=list(prepared.candidate_urls),
            headers_by_url={u: dict(h) for u, h in prepared.headers_by_url.items()},
            source=prepared.source,
            model_id=int(prepared.model_id or 0),
            version_id=int(prepared.version_id or 0),
            file_id=int(prepared.file_id or 0),
            filename=prepared.filename,
            install_dir=prepared.install_dir,
            expected_sha256=prepared.expected_sha256,
            duplicate_resolution=dup_res,
            save_sidecar=False,
            model_json_snapshot=prepared.metadata_snapshot,
            content_type_label=prepared.content_type_label,
            save_all_example_images=False,
            save_example_videos=False,
            batch_tags=[],
        )
        task = DownloadTask(request=req, state=DownloadState.QUEUED, ui_order=self._next_ui_order())
        self._store.insert_task(task)
        tid = normalize_download_task_id(task.id)
        asyncio.create_task(self._run_worker(tid, cfg))
        return tid

    def _next_ui_order(self) -> int:
        rows = self._store.list_tasks()
        if not rows:
            return 0
        return max(int(r["ui_order"] or 0) for r in rows) + 1

    def _merge_download_headers(
        self,
        task: DownloadTask,
        cfg: ATComfyConfig,
        raw_url: str,
        final_url: str,
    ) -> dict[str, str]:
        extra = dict(task.request.headers_by_url.get(raw_url, {}))
        if final_url.startswith("https://civitai.com/"):
            base = civitai_download_headers(
                api_key=cfg.civitai_api_key,
                user_agent="AssetThingie-Comfy/0.1",
                model_id=task.request.model_id,
                for_url=final_url,
            )
            merged = dict(base)
            merged.update(extra)
            return merged
        out = {"User-Agent": "AssetThingie-Comfy/0.1"}
        out.update(extra)
        return out

    async def _stream_one_url_to_part(
        self,
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
                    self._store.update_task(task)
                    return "stopped"
                return "retry"
        else:
            final_url = raw_url

        hdrs = self._merge_download_headers(task, cfg, raw_url, final_url)
        resume = part.exists() and part.stat().st_size > 0
        mode = "ab" if resume else "wb"
        hdrs2 = dict(hdrs)
        if resume:
            hdrs2["Range"] = f"bytes={part.stat().st_size}-"
        async with hc.stream("GET", final_url, headers=hdrs2) as resp:
            if resp.status_code not in (200, 206):
                return "retry"
            total = int(resp.headers.get("Content-Length") or 0) + (
                part.stat().st_size if resume and resp.status_code == 206 else 0
            )
            task.total_bytes = total or None
            done = part.stat().st_size if resume and part.exists() else 0
            with open(part, mode) as out:
                async for chunk in resp.aiter_bytes():
                    live = self._store.load_task(tid)
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
                        self._store.update_task(task)
                        return "stopped"
                    out.write(chunk)
                    done += len(chunk)
                    task.bytes_done = done
                    if task.total_bytes is None:
                        task.total_bytes = done
                    self._store.update_task(task)
        live = self._store.load_task(tid)
        if live:
            task = live
        if task.cancel_requested:
            task.state = DownloadState.CANCELLED
            self._store.update_task(task)
            return "stopped"
        return "ok"

    async def _run_worker(self, task_id: str, cfg: ATComfyConfig) -> None:
        tid = normalize_download_task_id(task_id)
        async with _sem_for(cfg):
            task = self._store.load_task(tid)
            if task is None:
                return
            if task.cancel_requested:
                task.state = DownloadState.CANCELLED
                self._store.update_task(task)
                return
            live_flags = self._store.load_task(tid)
            if live_flags and live_flags.cancel_requested:
                live_flags.state = DownloadState.CANCELLED
                self._store.update_task(live_flags)
                return
            if live_flags:
                task = live_flags
            task.state = DownloadState.DOWNLOADING
            self._store.update_task(task)
            dest: Path = Path(task.request.install_dir) / task.request.filename
            dest.parent.mkdir(parents=True, exist_ok=True)
            part = dest.with_suffix(dest.suffix + ".part")
            client = CivitaiClient(api_key=cfg.civitai_api_key, hide_early_access=cfg.hide_early_access)
            try:
                urls = list(task.request.candidate_urls)
                ok_stream = False
                async with httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=30.0), follow_redirects=True) as hc:
                    for raw_url in urls:
                        task = self._store.load_task(tid) or task
                        if task.cancel_requested:
                            task.state = DownloadState.CANCELLED
                            self._store.update_task(task)
                            return
                        part.unlink(missing_ok=True)
                        res = await self._stream_one_url_to_part(tid, task, cfg, client, hc, raw_url, part)
                        task = self._store.load_task(tid) or task
                        if task.state in (
                            DownloadState.PAUSED,
                            DownloadState.CANCELLED,
                            DownloadState.FAILED,
                        ):
                            return
                        if res == "ok":
                            ok_stream = True
                            break
                    if not ok_stream:
                        task.state = DownloadState.FAILED
                        task.error_code = DownloadErrorCode.URL_RESOLVE_FAILED
                        task.error_message = "all download candidates failed"
                        self._store.update_task(task)
                        return

                live = self._store.load_task(tid)
                if live:
                    task = live
                if task.cancel_requested:
                    task.state = DownloadState.CANCELLED
                    self._store.update_task(task)
                    return
                if task.request.expected_sha256:
                    task.state = DownloadState.VERIFYING
                    self._store.update_task(task)
                    hasher = hashlib.sha256()
                    with open(part, "rb") as f:
                        for chunk in iter(lambda: f.read(65536), b""):
                            hasher.update(chunk)
                    if hasher.hexdigest().upper() != (task.request.expected_sha256 or "").upper():
                        part.unlink(missing_ok=True)
                        task.state = DownloadState.FAILED
                        task.error_code = DownloadErrorCode.CHECKSUM_MISMATCH
                        self._store.update_task(task)
                        return
                part.replace(dest)
                task.state = DownloadState.COMPLETED
                self._store.update_task(task)
                self._store.mark_completed_public(tid)
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
                logger.exception("download failed")
                task.state = DownloadState.FAILED
                task.error_message = str(e)
                task.error_code = DownloadErrorCode.UNKNOWN
                self._store.update_task(task)
            finally:
                await client.aclose()

    async def cancel(self, task_id: str) -> None:
        t = self._store.load_task(normalize_download_task_id(task_id))
        if t:
            t.cancel_requested = True
            self._store.update_task(t)

    async def pause(self, task_id: str) -> None:
        t = self._store.load_task(normalize_download_task_id(task_id))
        if t:
            t.pause_requested = True
            self._store.update_task(t)

    async def retry(self, task_id: str) -> None:
        tid = normalize_download_task_id(task_id)
        t = self._store.load_task(tid)
        if not t:
            return
        t.state = DownloadState.QUEUED
        t.error_message = None
        t.error_code = DownloadErrorCode.NONE
        t.cancel_requested = False
        t.pause_requested = False
        self._store.update_task(t)
        asyncio.create_task(self._run_worker(tid, load_config()))


def _family_for_type(task: DownloadTask) -> str:
    lab = (task.request.content_type_label or "").lower()
    if "checkpoint" in lab:
        return "checkpoints"
    return "loras"
