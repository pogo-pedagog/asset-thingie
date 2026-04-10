"""CivArchive download preparation."""

from __future__ import annotations

import pytest
from at_comfy.config import ATComfyConfig
from at_comfy.download_sources.civarchive import prepare_civarchive_download


@pytest.mark.asyncio
async def test_prepare_prefers_non_civitai_mirrors_first(monkeypatch) -> None:
    raw_file = {
        "id": 55,
        "name": "x.safetensors",
        "downloadUrl": "https://civitai.com/api/download/models/2",
        "sha256": ("ab" * 32).upper(),
        "is_primary": True,
        "mirrors": [
            {
                "url": "https://huggingface.co/foo/bar/resolve/main/x.safetensors",
                "source": "huggingface",
            },
        ],
    }

    class FakeClient:
        async def get_model(self, mid, model_version_id=None):
            return {
                "id": mid,
                "name": "M",
                "type": "LORA",
                "username": "creator",
                "tags": ["z"],
                "version": {
                    "id": model_version_id,
                    "baseModel": "SD 1.5",
                    "files": [raw_file],
                },
            }

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.download_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )

    cfg = ATComfyConfig()
    cfg.civitai_api_key = "test-key"
    prepared = await prepare_civarchive_download(
        {
            "civarchive_model_id": 1,
            "civarchive_version_id": 2,
            "civarchive_file_id": 55,
            "category": "General",
            "duplicate_resolution": "none",
        },
        cfg,
    )
    assert prepared.source == "civarchive"
    assert prepared.candidate_urls[0].startswith("https://huggingface.co")
    assert prepared.candidate_urls[-1].startswith("https://civitai.com/api/download/")
    assert prepared.headers_by_url[prepared.candidate_urls[-1]].get("Authorization", "").startswith("Bearer")


@pytest.mark.asyncio
async def test_prepare_preferred_mirror_moves_match_to_front(monkeypatch) -> None:
    raw_file = {
        "id": 55,
        "name": "x.safetensors",
        "downloadUrl": "https://mirror-a.example/file",
        "sha256": ("ab" * 32).upper(),
        "is_primary": True,
        "mirrors": [
            {"url": "https://mirror-b.example/file", "source": "b"},
        ],
    }

    class FakeClient:
        async def get_model(self, mid, model_version_id=None):
            return {
                "id": mid,
                "name": "M",
                "type": "LORA",
                "username": "creator",
                "tags": [],
                "version": {
                    "id": model_version_id,
                    "baseModel": "SD 1.5",
                    "files": [raw_file],
                },
            }

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.download_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )

    cfg = ATComfyConfig()
    prepared = await prepare_civarchive_download(
        {
            "civarchive_model_id": 1,
            "civarchive_version_id": 2,
            "civarchive_file_id": 55,
            "category": "General",
            "duplicate_resolution": "none",
            "civarchive_preferred_download_url": "https://mirror-b.example/file",
        },
        cfg,
    )
    assert prepared.candidate_urls[0] == "https://mirror-b.example/file"
    assert "https://mirror-a.example/file" in prepared.candidate_urls


@pytest.mark.asyncio
async def test_prepare_preferred_mirror_accepts_site_relative_url(monkeypatch) -> None:
    raw_file = {
        "id": 55,
        "name": "x.safetensors",
        "downloadUrl": "/api/dl/1",
        "sha256": ("cd" * 32).upper(),
        "is_primary": True,
        "mirrors": [],
    }

    class FakeClient:
        async def get_model(self, mid, model_version_id=None):
            return {
                "id": mid,
                "name": "M",
                "type": "LORA",
                "username": "creator",
                "tags": [],
                "version": {"id": model_version_id, "baseModel": "SD 1.5", "files": [raw_file]},
            }

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.download_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )

    cfg = ATComfyConfig()
    prepared = await prepare_civarchive_download(
        {
            "civarchive_model_id": 1,
            "civarchive_version_id": 2,
            "civarchive_file_id": 55,
            "category": "General",
            "duplicate_resolution": "none",
            "civarchive_preferred_download_url": "/api/dl/1",
        },
        cfg,
    )
    assert prepared.candidate_urls[0] == "https://civarchive.com/api/dl/1"
