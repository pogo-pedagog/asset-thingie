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
from at_comfy.download_store import DownloadStore, normalize_download_task_id
from at_comfy.enrichment import apply_civitai_metadata_from_download
from at_comfy.install_paths import civitai_filename_with_id, first_tag_sorted, resolve_install_dir_for_download
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
        mid = int(body["civitai_model_id"])
        vid = int(body["version_id"])
        fid = int(body["file_id"])
        category = str(body.get("category") or "General")
        dup = DuplicateResolution(str(duplicate_resolution or body.get("duplicate_resolution") or "none").lower())
        if dup not in (DuplicateResolution.NONE, DuplicateResolution.SKIP, DuplicateResolution.REPLACE):
            dup = DuplicateResolution.NONE

        client = CivitaiClient(
            api_key=cfg.civitai_api_key,
            hide_early_access=cfg.hide_early_access,
        )
        try:
            model = await client.get_model(mid, nsfw=cfg.hide_nsfw is False)
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

        req = DownloadRequest(
            download_url=file.download_url,
            source="civitai",
            model_id=mid,
            version_id=vid,
            file_id=fid,
            filename=fname,
            install_dir=install_dir,
            expected_sha256=(file.sha256.strip().upper() if file.sha256 else None),
            duplicate_resolution=dup,
            save_sidecar=False,
            model_json_snapshot={"items": [model.model_dump(mode="json", by_alias=True)]},
            content_type_label=model.type,
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
            # Re-load so a cancel that landed after the first read is not overwritten by
            # the DOWNLOADING row we are about to write.
            live_flags = self._store.load_task(tid)
            if live_flags and live_flags.cancel_requested:
                live_flags.state = DownloadState.CANCELLED
                self._store.update_task(live_flags)
                return
            if live_flags:
                task = live_flags
            task.state = DownloadState.DOWNLOADING
            self._store.update_task(task)
            client = CivitaiClient(api_key=cfg.civitai_api_key, hide_early_access=cfg.hide_early_access)
            try:
                final_url, err = await client.resolve_download_url(task.request.download_url, task.request.model_id)
                if not final_url:
                    task.state = DownloadState.FAILED
                    if err == "NO_API":
                        task.error_code = DownloadErrorCode.NO_API_KEY
                    else:
                        task.error_code = DownloadErrorCode.URL_RESOLVE_FAILED
                    task.error_message = err or "no url"
                    self._store.update_task(task)
                    return
                dest: Path = Path(task.request.install_dir) / task.request.filename
                dest.parent.mkdir(parents=True, exist_ok=True)
                part = dest.with_suffix(dest.suffix + ".part")
                headers = civitai_download_headers(
                    api_key=cfg.civitai_api_key,
                    user_agent="AssetThingie-Comfy/0.1",
                    model_id=task.request.model_id,
                    for_url=final_url,
                )
                async with httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=30.0), follow_redirects=True) as hc:
                    resume = part.exists() and part.stat().st_size > 0
                    mode = "ab" if resume else "wb"
                    hdrs = dict(headers)
                    if resume:
                        hdrs["Range"] = f"bytes={part.stat().st_size}-"
                    async with hc.stream("GET", final_url, headers=hdrs) as resp:
                        if resp.status_code not in (200, 206):
                            task.state = DownloadState.FAILED
                            task.error_message = f"HTTP {resp.status_code}"
                            self._store.update_task(task)
                            return
                        total = int(resp.headers.get("Content-Length") or 0) + (
                            part.stat().st_size if resume and resp.status_code == 206 else 0
                        )
                        task.total_bytes = total or None
                        done = part.stat().st_size if resume and part.exists() else 0
                        with open(part, mode) as out:
                            async for chunk in resp.aiter_bytes():
                                live = self._store.load_task(tid)
                                if live is None:
                                    return
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
                                    return
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
