"""CivArchive browse adapter via HTTP routes (mocked client)."""

from __future__ import annotations

from dataclasses import replace

import pytest
from aiohttp.test_utils import TestClient, TestServer

from at_comfy.config import load_config
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
        async def search(self, **kwargs):  # noqa: ANN003
            assert kwargs.get("kind") == "version"
            assert kwargs.get("page") == 1
            assert kwargs.get("sort") == "newest"
            assert kwargs.get("is_nsfw") is False
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
        assert data["items"][0]["civarchiveHitKind"] == "version"
        assert data["next_page"] == "2"


@pytest.mark.asyncio
async def test_browse_civarchive_search_file_hit_uses_sha256_ref(tmp_comfy_base, monkeypatch) -> None:
    hx = "d" * 64
    hit = {
        "id": "f999",
        "name": "weights",
        "type": "LORA",
        "kind": "file",
        "is_nsfw": False,
        "url": f"/sha256/{hx}",
        "username": "u",
        "tags": [],
    }

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            return {"results": [hit], "hits": 1, "totalHits": 1}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=x&kind=file&page=1")
        assert r.status == 200
        data = await r.json()
        assert data["items"][0]["id"] == f"sha256:{hx}"
        assert data["items"][0]["civarchiveHitKind"] == "file"


@pytest.mark.asyncio
async def test_browse_civarchive_search_user_hit_is_navigational_ref(tmp_comfy_base, monkeypatch) -> None:
    hit = {
        "id": "uSomebody",
        "name": "Somebody",
        "type": "User",
        "kind": "user",
        "username": "Somebody",
        "is_nsfw": False,
        "url": "/users/Somebody",
        "tags": [],
    }

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            return {"results": [hit], "hits": 1, "totalHits": 1}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=x&kind=user&page=1")
        assert r.status == 200
        data = await r.json()
        assert data["items"][0]["id"] == "user:Somebody"
        assert data["items"][0]["civarchiveHitKind"] == "user"


@pytest.mark.asyncio
async def test_browse_civarchive_detail_rejects_user_ref(tmp_comfy_base, monkeypatch) -> None:
    class FakeClient:
        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/detail/user:nobody")
        assert r.status == 400
        body = await r.json()
        assert "user rows" in body.get("error", "")


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


@pytest.mark.asyncio
async def test_browse_civarchive_search_forwards_filter_params(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.clear()
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    monkeypatch.setattr(
        "at_comfy.route_handlers.load_config",
        lambda: replace(load_config(), hide_nsfw=False),
    )

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get(
            "/at/browse/civarchive/search?q=a&kind=version&page=1"
            "&civarchive_sort=downloads&civarchive_type=LORA&civarchive_base_model=SD+1.5"
            "&civarchive_tags=anime&nsfw=true",
        )
        assert r.status == 200
    assert captured.get("sort") == "downloads"
    assert captured.get("model_type") == "LORA"
    assert captured.get("base_model") == "SD 1.5"
    assert captured.get("tags") == "anime"
    assert captured.get("is_nsfw") is None


@pytest.mark.asyncio
async def test_browse_civarchive_search_joins_multiple_base_models(tmp_comfy_base, monkeypatch) -> None:
    """Upstream ``base_model`` accepts comma-separated values (OR); duplicate keys only use the first."""
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.clear()
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get(
            "/at/browse/civarchive/search?q=a&kind=version&page=1"
            "&civarchive_base_model=SD+1.5&civarchive_base_model=Pony",
        )
        assert r.status == 200
    assert captured.get("base_model") == "Pony,SD 1.5"


@pytest.mark.asyncio
async def test_browse_civarchive_deleted_only_sets_is_deleted(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.clear()
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=a&kind=version&page=1&civarchive_deleted_only=1")
        assert r.status == 200
    assert captured.get("is_deleted") is True


@pytest.mark.asyncio
async def test_browse_civarchive_omits_is_deleted_by_default(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=a&kind=version&page=1")
        assert r.status == 200
    assert captured.get("is_deleted") is None


@pytest.mark.asyncio
async def test_browse_civarchive_nsfw_sfw_forces_upstream_false(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    monkeypatch.setattr(
        "at_comfy.route_handlers.load_config",
        lambda: replace(load_config(), hide_nsfw=False),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get(
            "/at/browse/civarchive/search?q=a&kind=version&page=1&civarchive_nsfw=sfw&nsfw=true",
        )
        assert r.status == 200
    assert captured.get("is_nsfw") is False


@pytest.mark.asyncio
async def test_browse_civarchive_sort_passthrough_relevance(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=a&kind=version&page=1&civarchive_sort=relevance")
        assert r.status == 200
    assert captured.get("sort") == "relevance"


@pytest.mark.asyncio
async def test_browse_civarchive_deleted_sort_without_checkbox_omits_is_deleted(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get(
            "/at/browse/civarchive/search?q=a&kind=version&page=1&civarchive_sort=deleted_newest",
        )
        assert r.status == 200
    assert captured.get("sort") == "deleted_newest"
    assert captured.get("is_deleted") is None


@pytest.mark.asyncio
async def test_browse_civarchive_invalid_sort_falls_back(tmp_comfy_base, monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            captured.update(kwargs)
            return {"results": [], "hits": 0, "totalHits": 0}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=a&kind=version&page=1&civarchive_sort=bad-Sort")
        assert r.status == 200
    assert captured.get("sort") == "newest"


@pytest.mark.asyncio
async def test_browse_civarchive_upserts_base_models_from_hits(tmp_comfy_base, monkeypatch) -> None:
    from at_comfy.civarchive_catalog import civarchive_base_models_clear, civarchive_base_models_list

    civarchive_base_models_clear()
    hit = {
        "id": "v2",
        "name": "N",
        "type": "LORA",
        "kind": "version",
        "is_nsfw": False,
        "download_count": 1,
        "url": "/models/10?modelVersionId=2",
        "base_model": "Learned Base XY",
        "username": "u",
        "tags": [],
    }

    class FakeClient:
        async def search(self, **kwargs):  # noqa: ANN003
            return {"results": [hit], "hits": 1, "totalHits": 1}

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr(
        "at_comfy.browse_sources.civarchive.CivArchiveClient",
        lambda *a, **k: FakeClient(),
    )
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/search?q=z&kind=version&page=1")
        assert r.status == 200
    names = civarchive_base_models_list()
    assert any(n == "Learned Base XY" for n in names)


@pytest.mark.asyncio
async def test_browse_civarchive_base_models_get_includes_fallback(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civarchive/base-models")
        assert r.status == 200
        data = await r.json()
    assert "SD 1.5" in data["base_models"]


@pytest.mark.asyncio
async def test_browse_civarchive_base_models_reset_clears_learned(tmp_comfy_base, monkeypatch) -> None:
    from at_comfy.civarchive_catalog import civarchive_base_models_upsert_batch, civarchive_base_models_list

    civarchive_base_models_upsert_batch(["ZZZ Custom Learned"])
    assert any(n == "ZZZ Custom Learned" for n in civarchive_base_models_list())

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/browse/civarchive/base-models/reset")
        assert r.status == 200
        data = await r.json()
    assert data.get("ok") is True
    names = data["base_models"]
    assert "ZZZ Custom Learned" not in names
    assert "SD 1.5" in names
