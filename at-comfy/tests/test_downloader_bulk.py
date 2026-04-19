"""Bulk download actions."""

from __future__ import annotations

import pytest
from at_comfy.download_store import DownloadStore
from at_comfy.downloader import DownloadManager
from at_comfy.models.download import DownloadRequest, DownloadState, DownloadTask


def _req(tmp: object, filename: str = "a.bin") -> DownloadRequest:
    return DownloadRequest(
        download_url="https://example.test/f",
        model_id=1,
        version_id=1,
        file_id=1,
        filename=filename,
        install_dir=tmp,
    )


@pytest.mark.asyncio
async def test_bulk_pause_marks_queued_and_requests_active(tmp_comfy_base) -> None:
    tq = DownloadTask(request=_req(tmp_comfy_base, "a.bin"), state=DownloadState.QUEUED, queue_position=1)
    td = DownloadTask(request=_req(tmp_comfy_base, "b.bin"), state=DownloadState.DOWNLOADING, queue_position=2)
    store = DownloadStore()
    store.insert_task(tq)
    store.insert_task(td)
    dlr = DownloadManager()
    qt = dlr.get_task(str(tq.id))
    assert qt is not None
    qt.cancel_requested = True
    n = await dlr.bulk_pause()
    assert n >= 2
    q = dlr.get_task(str(tq.id))
    d = dlr.get_task(str(td.id))
    assert q is not None and q.state == DownloadState.PAUSED
    assert q.cancel_requested is False
    assert d is not None and d.pause_requested is True


@pytest.mark.asyncio
async def test_clear_completed_only_completed(tmp_comfy_base) -> None:
    tc = DownloadTask(request=_req(tmp_comfy_base), state=DownloadState.COMPLETED, queue_position=1)
    tf = DownloadTask(request=_req(tmp_comfy_base), state=DownloadState.FAILED, queue_position=2)
    store = DownloadStore()
    store.insert_task(tc)
    store.insert_task(tf)
    dlr = DownloadManager()
    n = await dlr.clear_completed()
    assert n == 1
    assert dlr.get_task(str(tc.id)) is None
    assert dlr.get_task(str(tf.id)) is not None


@pytest.mark.asyncio
async def test_clear_all_terminal(tmp_comfy_base) -> None:
    tc = DownloadTask(request=_req(tmp_comfy_base), state=DownloadState.CANCELLED, queue_position=1)
    store = DownloadStore()
    store.insert_task(tc)
    dlr = DownloadManager()
    n = await dlr.clear_all_terminal()
    assert n == 1
    assert dlr.get_task(str(tc.id)) is None
