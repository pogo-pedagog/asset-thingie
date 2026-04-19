"""Download manager: worker pool, pause/resume, restore on startup."""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Iterable
from pathlib import Path
from typing import Any
from at_comfy.config import ATComfyConfig, load_config
from at_comfy.download_cleanup import remove_partial_artifacts
from at_comfy.download_sources.registry import prepare_download
from at_comfy.download_store import DownloadStore, normalize_download_task_id
from at_comfy.models.download import (
    DownloadErrorCode,
    DownloadRequest,
    DownloadState,
    DownloadTask,
    DuplicateResolution,
)

logger = logging.getLogger(__name__)

_TERMINAL = frozenset(
    {
        DownloadState.COMPLETED,
        DownloadState.FAILED,
        DownloadState.CANCELLED,
        DownloadState.SKIPPED,
    },
)


def _queue_sort_key(t: DownloadTask) -> tuple[int, float, str]:
    return (t.queue_position, t.created_at.timestamp(), str(t.id))


class DownloadManager:
    """Async download manager with SQLite-backed tasks and a fixed worker pool."""

    def __init__(self) -> None:
        self._store = DownloadStore()
        self._tasks: dict[str, DownloadTask] = {}
        self._sched = asyncio.Condition()
        self._workers: list[asyncio.Task[None]] = []
        self._in_progress_ids: set[str] = set()
        self._queue_seq = 0
        self._restore_done = False
        self._load_tasks_from_db()
        self._init_queue_seq()

    def _load_tasks_from_db(self) -> None:
        for t in self._store.load_all_tasks():
            self._tasks[normalize_download_task_id(t.id)] = t

    def _init_queue_seq(self) -> None:
        m = 0
        for t in self._tasks.values():
            if t.queue_position > m:
                m = t.queue_position
        self._queue_seq = m

    def _alloc_queue_position(self) -> int:
        self._queue_seq += 1
        return self._queue_seq

    def _tail_ui_order(self) -> int:
        if not self._tasks:
            return 0
        return max(t.ui_order for t in self._tasks.values()) + 1000

    def get_task(self, task_id: str | object) -> DownloadTask | None:
        return self._tasks.get(normalize_download_task_id(task_id))

    def mark_completed_public(self, task_id: str) -> None:
        self._store.mark_completed_public(task_id)

    async def persist(
        self,
        task: DownloadTask,
        log_event: str | None = None,
        log_detail: dict[str, Any] | None = None,
    ) -> None:
        tid = normalize_download_task_id(task.id)
        self._tasks[tid] = task
        self._store.update_task(task)
        if log_event:
            d = dict(log_detail or {})
            d.setdefault("state", task.state.value)
            self._store.append_log(tid, log_event, d)

    def merge_download_headers(
        self,
        task: DownloadTask,
        cfg: ATComfyConfig,
        raw_url: str,
        final_url: str,
    ) -> dict[str, str]:
        from at_comfy.civitai.client import civitai_download_headers

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

    def _eligible_queued(self) -> list[DownloadTask]:
        return [
            t
            for t in self._tasks.values()
            if t.state == DownloadState.QUEUED
            and not t.cancel_requested
            and normalize_download_task_id(t.id) not in self._in_progress_ids
        ]

    def _pick_next_under_lock(self) -> DownloadTask | None:
        pending = self._eligible_queued()
        if not pending:
            return None
        return min(pending, key=_queue_sort_key)

    def start(self, cfg: ATComfyConfig | None = None) -> None:
        c = cfg if cfg is not None else load_config()
        n = max(1, int(c.max_parallel_downloads))
        alive = [w for w in self._workers if not w.done()]
        if len(alive) >= n:
            return
        for w in self._workers:
            if not w.done():
                w.cancel()
        self._workers = [asyncio.create_task(self._worker_loop()) for _ in range(n)]

    async def _worker_loop(self) -> None:
        from at_comfy.download_worker import process_download

        while True:
            picked: DownloadTask | None = None
            try:
                async with self._sched:
                    while True:
                        picked = self._pick_next_under_lock()
                        if picked:
                            self._in_progress_ids.add(normalize_download_task_id(picked.id))
                            break
                        await self._sched.wait()
                if picked:
                    t = self.get_task(picked.id) or picked
                    cfg = load_config()
                    await process_download(self, t, cfg)
            except asyncio.CancelledError:
                raise
            except Exception:
                logger.exception("worker loop error")
            finally:
                if picked is not None:
                    async with self._sched:
                        self._in_progress_ids.discard(normalize_download_task_id(picked.id))
                        self._sched.notify_all()

    def _notify(self) -> None:
        """Schedule notify on the condition (caller may hold lock)."""
        self._sched.notify_all()

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
        task = DownloadTask(
            request=req,
            state=DownloadState.QUEUED,
            ui_order=self._tail_ui_order(),
            queue_position=self._alloc_queue_position(),
        )
        self._store.insert_task(task)
        tid = normalize_download_task_id(task.id)
        self._tasks[tid] = task
        await self.persist(task, "enqueued", {"filename": req.filename})
        async with self._sched:
            self._notify()
        self.start(cfg)
        return tid

    async def cancel(self, task_id: str) -> None:
        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t:
            return
        t.cancel_requested = True
        if t.state == DownloadState.QUEUED and tid not in self._in_progress_ids:
            await self._finish_cancel_not_in_progress(t)
            return
        if t.state == DownloadState.PAUSED and tid not in self._in_progress_ids:
            await self._finish_cancel_not_in_progress(t)
            return
        await self.persist(t, "cancel_requested", {})

    async def _finish_cancel_not_in_progress(self, task: DownloadTask) -> None:
        task.state = DownloadState.CANCELLED
        task.error_message = "Cancelled."
        task.error_code = DownloadErrorCode.NONE
        task.cancel_requested = False
        task.pause_requested = False
        remove_partial_artifacts(task.request)
        await self.persist(task, "cancelled", {})
        async with self._sched:
            self._notify()

    async def pause(self, task_id: str) -> None:
        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t:
            return
        if t.state == DownloadState.PAUSED:
            return
        if t.state == DownloadState.QUEUED and tid not in self._in_progress_ids:
            t.state = DownloadState.PAUSED
            t.pause_requested = False
            t.cancel_requested = False
            await self.persist(t, "paused", {})
            async with self._sched:
                self._notify()
            return
        if t.state in (DownloadState.DOWNLOADING, DownloadState.VERIFYING):
            t.pause_requested = True
            await self.persist(t, "pause_requested", {})
            return

    async def resume(self, task_id: str) -> bool:
        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t or t.state != DownloadState.PAUSED:
            return False
        req = t.request
        dest = Path(req.install_dir) / req.filename
        part = dest.with_suffix(dest.suffix + ".part")
        if t.resume_verify_only and dest.exists() and dest.stat().st_size > 0:
            t.bytes_done = dest.stat().st_size
        elif part.exists():
            t.bytes_done = part.stat().st_size
        elif dest.exists() and not part.exists():
            t.bytes_done = dest.stat().st_size
        else:
            t.bytes_done = 0
        t.state = DownloadState.QUEUED
        t.pause_requested = False
        t.cancel_requested = False
        t.error_message = None
        t.error_code = DownloadErrorCode.NONE
        t.queue_position = self._alloc_queue_position()
        t.ui_order = self._tail_ui_order()
        t.reset_download_rate()
        await self.persist(t, "resumed", {})
        async with self._sched:
            self._notify()
        self.start()
        return True

    async def retry(self, task_id: str) -> None:
        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t:
            return
        if t.state == DownloadState.PAUSED:
            await self.resume(tid)
            return
        if t.state not in (
            DownloadState.FAILED,
            DownloadState.CANCELLED,
            DownloadState.SKIPPED,
        ):
            return
        dest = Path(t.request.install_dir) / t.request.filename
        part = dest.with_suffix(dest.suffix + ".part")
        t.state = DownloadState.QUEUED
        t.error_message = None
        t.error_code = DownloadErrorCode.NONE
        t.cancel_requested = False
        t.pause_requested = False
        t.resume_verify_only = False
        t.request = t.request.model_copy(update={"duplicate_resolution": DuplicateResolution.NONE})
        if part.exists():
            t.bytes_done = part.stat().st_size
        else:
            t.bytes_done = 0
        t.retry_count += 1
        t.total_bytes = None
        t.queue_position = self._alloc_queue_position()
        t.ui_order = self._tail_ui_order()
        t.reset_download_rate()
        await self.persist(t, "retry", {"retry_count": t.retry_count})
        async with self._sched:
            self._notify()
        self.start()

    async def clear_task(self, task_id: str) -> bool:
        """Remove a terminal task row (Clear)."""
        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t or t.state not in _TERMINAL:
            return False
        del self._tasks[tid]
        self._store.delete_task(tid)
        return True

    async def bulk_pause(self) -> int:
        n = 0
        for t in list(self._tasks.values()):
            if t.state in (DownloadState.DOWNLOADING, DownloadState.VERIFYING):
                t.pause_requested = True
                await self.persist(t, "pause_requested", {})
                n += 1
            elif t.state == DownloadState.QUEUED and normalize_download_task_id(t.id) not in self._in_progress_ids:
                t.state = DownloadState.PAUSED
                t.pause_requested = False
                await self.persist(t, "paused", {})
                n += 1
        async with self._sched:
            self._notify()
        return n

    async def bulk_resume(self) -> int:
        n = 0
        for t in list(self._tasks.values()):
            if t.state == DownloadState.PAUSED:
                if await self.resume(normalize_download_task_id(t.id)):
                    n += 1
        return n

    async def bulk_retry_failed(self) -> int:
        n = 0
        for t in list(self._tasks.values()):
            if t.state == DownloadState.FAILED:
                await self.retry(normalize_download_task_id(t.id))
                n += 1
        return n

    async def clear_completed(self) -> int:
        ids = [normalize_download_task_id(t.id) for t in self._tasks.values() if t.state == DownloadState.COMPLETED]
        for tid in ids:
            del self._tasks[tid]
        self._store.delete_tasks_by_states(["completed"])
        return len(ids)

    async def clear_all_terminal(self) -> int:
        states = ["completed", "failed", "cancelled", "skipped"]
        n = self._store.delete_tasks_by_states(states)
        for tid in list(self._tasks.keys()):
            u = self._tasks.get(tid)
            if u and u.state in _TERMINAL:
                del self._tasks[tid]
        return n

    async def move_to_top(self, task_id: str) -> bool:
        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t or t.state != DownloadState.QUEUED:
            return False
        eligible = sorted(
            [
                x
                for x in self._tasks.values()
                if x.state == DownloadState.QUEUED and normalize_download_task_id(x.id) not in self._in_progress_ids
            ],
            key=_queue_sort_key,
        )
        if not eligible:
            return False
        try:
            idx = next(i for i, x in enumerate(eligible) if normalize_download_task_id(x.id) == tid)
        except StopIteration:
            return False
        if idx == 0:
            return True
        reordered = [eligible[idx]] + [x for i, x in enumerate(eligible) if i != idx]
        for i, x in enumerate(reordered, start=1):
            x.queue_position = i
            self._tasks[normalize_download_task_id(x.id)] = x
            self._store.update_task(x)
        async with self._sched:
            self._notify()
        return True

    async def restore_queue(self) -> None:
        if self._restore_done:
            return
        self._restore_done = True
        cfg = load_config()
        for t in list(self._tasks.values()):
            if t.state in _TERMINAL:
                continue
            if t.state == DownloadState.PAUSED:
                t.error_message = None
                t.error_code = DownloadErrorCode.NONE
                await self.persist(t, "recovered", {"state": t.state.value})
                continue

            dest = Path(t.request.install_dir) / t.request.filename
            part = dest.with_suffix(dest.suffix + ".part")

            if t.state == DownloadState.VERIFYING:
                if dest.exists() and dest.stat().st_size > 0:
                    t.state = DownloadState.QUEUED
                    t.resume_verify_only = True
                    t.bytes_done = dest.stat().st_size
                else:
                    t.state = DownloadState.QUEUED
                    t.resume_verify_only = False
                    t.bytes_done = part.stat().st_size if part.exists() else 0
            elif t.state == DownloadState.DOWNLOADING:
                t.state = DownloadState.QUEUED
                t.resume_verify_only = False
                t.bytes_done = part.stat().st_size if part.exists() else 0
            elif t.state == DownloadState.QUEUED:
                t.resume_verify_only = False
                if part.exists():
                    t.bytes_done = part.stat().st_size

            if t.cancel_requested:
                continue

            t.error_message = None
            t.error_code = DownloadErrorCode.NONE
            t.pause_requested = False
            await self.persist(t, "recovered", {"state": t.state.value})

        async with self._sched:
            self._notify()
        self.start(cfg)

    async def _run_worker(self, task_id: str, cfg: ATComfyConfig) -> None:
        """Run one task (used by tests; bypasses worker pool)."""
        from at_comfy.download_worker import process_download

        tid = normalize_download_task_id(task_id)
        t = self.get_task(tid)
        if not t:
            return
        await process_download(self, t, cfg)


# Backwards compatibility
Downloader = DownloadManager
