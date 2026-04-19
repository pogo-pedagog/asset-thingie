"""Download enqueue with mocked Civitai client."""

from __future__ import annotations

import pytest
from at_comfy.civitai.models import CivitaiFile, CivitaiModel, CivitaiModelVersion
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.downloader import Downloader


@pytest.mark.asyncio
async def test_enqueue_from_body_creates_task(tmp_comfy_base, monkeypatch) -> None:
    ver = CivitaiModelVersion(
        id=10,
        name="v1",
        base_model="SD 1.5",
        files=[
            CivitaiFile(
                id=99,
                name="model.safetensors",
                download_url="https://example.test/file.bin",
                sha256="A" * 64,
                primary=True,
            ),
        ],
        images=[],
    )
    model = CivitaiModel(
        id=1,
        name="M",
        type="LORA",
        model_versions=[ver],
        tags=["anime"],
        creator_username="creator",
    )

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def get_model(self, mid: int, nsfw: bool = False):
            assert mid == 1
            return model

        async def aclose(self):
            return None

    monkeypatch.setattr("at_comfy.download_sources.civitai.CivitaiClient", FakeClient)
    monkeypatch.setattr("at_comfy.download_worker.CivitaiClient", FakeClient)
    monkeypatch.setattr(
        "at_comfy.downloader.DownloadManager.start",
        lambda self, cfg=None: None,
    )

    dlr = Downloader()
    cfg = ATComfyConfig()
    tid = await dlr.enqueue_from_body(
        {
            "civitai_model_id": 1,
            "version_id": 10,
            "file_id": 99,
            "category": "Test",
            "duplicate_resolution": "skip",
        },
        cfg,
    )
    assert tid
    row = get_conn().execute("SELECT id, state FROM download_tasks WHERE id = ?", (tid,)).fetchone()
    assert row is not None
    assert row["state"] in ("queued", "downloading", "failed", "completed", "cancelled")


@pytest.mark.asyncio
async def test_enqueue_rejects_bad_version(tmp_comfy_base, monkeypatch) -> None:
    model = CivitaiModel(id=1, name="M", type="LORA", model_versions=[], tags=[])

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def get_model(self, mid: int, nsfw: bool = False):
            return model

        async def aclose(self):
            return None

    monkeypatch.setattr("at_comfy.download_sources.civitai.CivitaiClient", FakeClient)
    dlr = Downloader()
    cfg = ATComfyConfig()
    with pytest.raises(ValueError, match="version not found"):
        await dlr.enqueue_from_body(
            {"civitai_model_id": 1, "version_id": 2, "file_id": 3, "category": "X"},
            cfg,
        )
