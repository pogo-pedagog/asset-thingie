"""Civitai browse: learned base-model catalog (SQLite) and HTTP routes."""

from __future__ import annotations

import pytest
from aiohttp.test_utils import TestClient, TestServer
from at_comfy.civitai.models import CivitaiModel, ModelListPage
from at_comfy.route_handlers import BROWSE_CIVITAI_LIMIT
from at_comfy.routes import create_test_app


@pytest.mark.asyncio
async def test_browse_civitai_search_upserts_base_models_from_versions(tmp_comfy_base, monkeypatch) -> None:
    from at_comfy.civitai_catalog import civitai_base_models_clear, civitai_base_models_list

    civitai_base_models_clear()
    sample = CivitaiModel.from_api(
        {
            "id": 100,
            "name": "M",
            "type": "LORA",
            "modelVersions": [
                {"id": 1, "name": "v1", "baseModel": "Learned Civitai Base XY"},
            ],
            "tags": [],
        },
    )

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def search(self, params):
            assert params.limit == BROWSE_CIVITAI_LIMIT
            return ModelListPage(items=[sample], metadata={})

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr("at_comfy.browse_sources.civitai.CivitaiClient", FakeClient)
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civitai/search?q=z")
        assert r.status == 200
    names = civitai_base_models_list()
    assert any(n == "Learned Civitai Base XY" for n in names)


@pytest.mark.asyncio
async def test_browse_civitai_page_upserts_base_models(tmp_comfy_base, monkeypatch) -> None:
    from at_comfy.civitai_catalog import civitai_base_models_clear, civitai_base_models_list

    civitai_base_models_clear()
    sample = CivitaiModel.from_api(
        {
            "id": 200,
            "name": "P",
            "type": "LORA",
            "modelVersions": [{"id": 2, "name": "v2", "baseModel": "Paged Base ZZ"}],
            "tags": [],
        },
    )

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def fetch_url(self, url: str):
            assert "civitai.com" in url or url.startswith("http")
            return ModelListPage(items=[sample], metadata={})

        async def aclose(self) -> None:
            return None

    monkeypatch.setattr("at_comfy.browse_sources.civitai.CivitaiClient", FakeClient)
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get(
            "/at/browse/civitai/page?url=https%3A%2F%2Fcivitai.com%2Fapi%2Fv1%2Fmodels%3Fcursor%3Dx",
        )
        assert r.status == 200
    assert any(n == "Paged Base ZZ" for n in civitai_base_models_list())


@pytest.mark.asyncio
async def test_browse_civitai_base_models_get_includes_fallback(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/civitai/base-models")
        assert r.status == 200
        data = await r.json()
    assert "SD 1.5" in data["base_models"]


@pytest.mark.asyncio
async def test_browse_civitai_base_models_reset_clears_learned(tmp_comfy_base) -> None:
    from at_comfy.civitai_catalog import civitai_base_models_list, civitai_base_models_upsert_batch

    civitai_base_models_upsert_batch(["ZZZ Custom Civitai Learned"])
    assert any(n == "ZZZ Custom Civitai Learned" for n in civitai_base_models_list())

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/browse/civitai/base-models/reset")
        assert r.status == 200
        data = await r.json()
    assert data.get("ok") is True
    names = data["base_models"]
    assert "ZZZ Custom Civitai Learned" not in names
    assert "SD 1.5" in names
