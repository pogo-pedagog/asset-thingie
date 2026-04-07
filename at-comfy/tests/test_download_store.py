"""Download task persistence."""

from __future__ import annotations

from pathlib import Path
from uuid import uuid4

from at_comfy.download_store import DownloadStore
from at_comfy.models.download import DownloadRequest, DownloadState, DownloadTask


def test_load_task_accepts_uuid_parameter(tmp_comfy_base: Path) -> None:
    """``sqlite3`` cannot bind ``uuid.UUID``; store must coerce to string."""
    uid = uuid4()
    req = DownloadRequest(
        download_url="https://example.test/f",
        model_id=1,
        version_id=1,
        file_id=1,
        filename="a.bin",
        install_dir=tmp_comfy_base,
    )
    task = DownloadTask(id=uid, request=req, state=DownloadState.QUEUED)
    store = DownloadStore()
    store.insert_task(task)
    loaded = store.load_task(uid)
    assert loaded is not None
    assert loaded.id == uid