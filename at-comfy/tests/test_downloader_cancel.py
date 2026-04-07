"""Cancel must persist as terminal state (not stuck ``queued`` with flag only)."""

from __future__ import annotations

import pytest
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.download_store import DownloadStore
from at_comfy.downloader import Downloader
from at_comfy.models.download import DownloadRequest, DownloadState, DownloadTask


@pytest.mark.asyncio
async def test_cancel_before_worker_runs_marks_cancelled(tmp_comfy_base) -> None:
    """Worker used to ``return`` on ``cancel_requested`` without setting ``state``."""
    req = DownloadRequest(
        download_url="https://example.test/f",
        model_id=1,
        version_id=1,
        file_id=1,
        filename="a.bin",
        install_dir=tmp_comfy_base,
    )
    task = DownloadTask(request=req, state=DownloadState.QUEUED)
    DownloadStore().insert_task(task)
    tid = str(task.id)
    dlr = Downloader()
    await dlr.cancel(tid)
    await dlr._run_worker(tid, ATComfyConfig())
    row = get_conn().execute("SELECT state FROM download_tasks WHERE id = ?", (tid,)).fetchone()
    assert row is not None
    assert str(row["state"]) == "cancelled"
