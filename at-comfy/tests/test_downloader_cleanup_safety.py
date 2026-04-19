"""Cancel never deletes a pre-existing destination model file."""

from __future__ import annotations

import pytest
from at_comfy.downloader import DownloadManager
from at_comfy.download_store import DownloadStore
from at_comfy.models.download import DownloadRequest, DownloadState, DownloadTask


@pytest.mark.asyncio
async def test_cancel_queued_does_not_remove_existing_dest(tmp_comfy_base) -> None:
    dest = tmp_comfy_base / "a.bin"
    dest.write_bytes(b"preinstalled")
    req = DownloadRequest(
        download_url="https://example.test/f",
        model_id=1,
        version_id=1,
        file_id=1,
        filename="a.bin",
        install_dir=tmp_comfy_base,
    )
    t = DownloadTask(request=req, state=DownloadState.QUEUED, queue_position=1)
    store = DownloadStore()
    store.insert_task(t)
    dlr = DownloadManager()
    await dlr.cancel(str(t.id))
    assert dest.exists()
    assert dest.read_bytes() == b"preinstalled"
