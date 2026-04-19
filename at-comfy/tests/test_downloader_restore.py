"""restore_queue re-queues interrupted work."""

from __future__ import annotations

import pytest
from at_comfy.config import ATComfyConfig
from at_comfy.downloader import DownloadManager
from at_comfy.download_store import DownloadStore
from at_comfy.models.download import DownloadRequest, DownloadState, DownloadTask


def _req(tmp: object) -> DownloadRequest:
    return DownloadRequest(
        download_url="https://example.test/f",
        model_id=1,
        version_id=1,
        file_id=1,
        filename="a.bin",
        install_dir=tmp,
    )


@pytest.mark.asyncio
async def test_restore_leaves_paused_unchanged(tmp_comfy_base) -> None:
    tp = DownloadTask(request=_req(tmp_comfy_base), state=DownloadState.PAUSED, queue_position=1)
    store = DownloadStore()
    store.insert_task(tp)
    dlr = DownloadManager()
    await dlr.restore_queue()
    t = dlr.get_task(str(tp.id))
    assert t is not None
    assert t.state == DownloadState.PAUSED


@pytest.mark.asyncio
async def test_restore_requeues_downloading(tmp_comfy_base) -> None:
    part = tmp_comfy_base / "a.bin.part"
    part.write_bytes(b"xy")
    td = DownloadTask(
        request=_req(tmp_comfy_base),
        state=DownloadState.DOWNLOADING,
        queue_position=1,
        bytes_done=0,
    )
    store = DownloadStore()
    store.insert_task(td)
    dlr = DownloadManager()
    await dlr.restore_queue()
    t = dlr.get_task(str(td.id))
    assert t is not None
    assert t.state == DownloadState.QUEUED
    assert t.bytes_done == 2
