"""Pause / resume updates task state and bytes_done from partial file."""

from __future__ import annotations

import pytest
from at_comfy.download_store import DownloadStore
from at_comfy.downloader import DownloadManager
from at_comfy.models.download import DownloadRequest, DownloadState, DownloadTask


@pytest.mark.asyncio
async def test_resume_sets_queued_and_bytes_from_part(tmp_comfy_base) -> None:
    (tmp_comfy_base / "a.bin.part").write_bytes(b"12345")
    req = DownloadRequest(
        download_url="https://example.test/f",
        model_id=1,
        version_id=1,
        file_id=1,
        filename="a.bin",
        install_dir=tmp_comfy_base,
    )
    t = DownloadTask(request=req, state=DownloadState.PAUSED, queue_position=1, bytes_done=0)
    store = DownloadStore()
    store.insert_task(t)
    dlr = DownloadManager()
    ok = await dlr.resume(str(t.id))
    assert ok is True
    live = dlr.get_task(str(t.id))
    assert live is not None
    assert live.state == DownloadState.QUEUED
    assert live.bytes_done == 5
