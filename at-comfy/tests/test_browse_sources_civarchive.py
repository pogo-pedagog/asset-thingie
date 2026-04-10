"""CivArchive browse adapter via HTTP routes (mocked client)."""

from __future__ import annotations

import pytest
from aiohttp.test_utils import TestClient, TestServer

from at_comfy.routes import create_test_app


@pytest.mark.asyncio
async def test_browse_civarchive_search_next_page(tmp_comfy_base, monkeypatch) -> None:
    hit = {
        "id": "v2",
        "name": "N",
        "type": "LORA",
        "kind": "version",
        "is_nsfw": False,
        "download_count": 3,
        "url": "/models/10?modelVersionId=2",
        "base_model": "SD 1.5",
        "image_url": "https://x/y.jpg",
        "is_deleted": False,
        "created_at": 0,
        "tags": ["a"],
        "username": "u",
        "deleted_at": None,
        "platform": "civitai",
        "video_url": None,
    }

    class FakeClient:
        async def search(self, *, q, kind, page):  # noqa: ANN001
            assert kind == "version"
            assert page == 1
            return {"results": [hit] * 50, "hits": 50, "totalHits": 150}

        async def get_model(self, mid, model_version_id=None):  # noqa: ANN001
            return {
                "id": mid,
                "name": "M",
                "type": "LORA",
                "username": "u",
                "tags": [],
                "version": {
                    "id": model_version_id or 2,
                    "name": "v",
                    "baseModel": "SD 1.5",
                    "files": [
                        {
                            "id": 1,
                            "name": "f.safetensors",
                            "downloadUrl": "https://civitai.com/api/download/models/2",
                            "sha256": "a" * 64,
                            "is_primary": True,
                            "mirrors": [],
                        },
                    ],
                    "images": [],
                    "trigger": [],
                },
            }

        async def get_by_sha256(self, hx):  # noqa: ANN001
            return {"model": {"id": 10, "version": {"id": 2}}}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=test&kind=version&page=1")
        assert r.status == 200
        data = await r.json()
        assert data["items"][0]["id"] == "model:10:version:2"
        assert data["next_page"] == "2"


@pytest.mark.asyncio
async def test_browse_civarchive_detail_sha256_refetches_model(tmp_comfy_base, monkeypatch) -> None:
    calls: list[str] = []

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            return {"results": [], "hits": 0, "totalHits": 0}

        async def get_model(self, mid, model_version_id=None):  # noqa: ANN001
            calls.append(f"model:{mid}:{model_version_id}")
            return {
                "id": mid,
                "name": "Full",
                "type": "LORA",
                "source": "civarchive",
                "username": "u",
                "tags": [],
                "version": {
                    "id": int(model_version_id or 0),
                    "name": "v",
                    "baseModel": "SD 1.5",
                    "files": [
                        {
                            "id": 9,
                            "name": "f.safetensors",
                            "downloadUrl": "https://civitai.com/api/download/models/2",
                            "sha256": "b" * 64,
                            "is_primary": True,
                            "mirrors": [],
                        },
                    ],
                    "images": [{"url": "https://img/z"}],
                    "trigger": ["t"],
                },
            }

        async def get_by_sha256(self, hx):  # noqa: ANN001
            calls.append("sha256")
            return {"model": {"id": 5, "version": {"id": 6}}}  # compact

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )

    hx = "c" * 64
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get(f"/at/browse/civarchive/detail/sha256:{hx}")
        assert r.status == 200
        body = await r.json()
        assert body["source"] == "civarchive"
        assert "sha256" in calls
        assert any(x.startswith("model:5:6") for x in calls)
