"""Additional route handler coverage (mocked Civitai where needed)."""

from __future__ import annotations

import urllib.parse

import pytest
from aiohttp.test_utils import TestClient, TestServer
from at_comfy.civitai.models import CivitaiModel, CivitaiModelVersion, ModelListPage
from at_comfy.db import get_conn
from at_comfy.enrichment import EnrichmentService
from at_comfy.route_handlers import BROWSE_CIVITAI_LIMIT
from at_comfy.routes import create_test_app


@pytest.mark.asyncio
async def test_filters_shape(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/filters?family=lora")
        assert r.status == 200
        data = await r.json()
        for k in ("content_types", "base_models", "categories", "tags"):
            assert k in data


@pytest.mark.asyncio
async def test_subfolders_root(tmp_comfy_base, monkeypatch) -> None:
    def fake_list_subfolders(parent: str, family: str, cfg):
        return (["a", "b"], "/models/loras")

    monkeypatch.setattr("at_comfy.route_handlers.list_subfolders", fake_list_subfolders)
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/subfolders?family=lora")
        assert r.status == 200
        data = await r.json()
        assert data["folders"] == ["a", "b"]


@pytest.mark.asyncio
async def test_asset_detail_not_found(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/assets/99999")
        assert r.status == 404


@pytest.mark.asyncio
async def test_browse_sources_lists_civitai(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/sources")
        assert r.status == 200
        data = await r.json()
        assert data["sources"][0]["id"] == "civitai"
        assert data["sources"][1]["id"] == "civarchive"


@pytest.mark.asyncio
async def test_browse_search_uses_mock_client(tmp_comfy_base, monkeypatch) -> None:
    sample = CivitaiModel.from_api(
        {
            "id": 42,
            "name": "Test",
            "type": "LORA",
            "modelVersions": [],
            "tags": [],
        },
    )

    received_params: list = []

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def search(self, params):
            received_params.append(params)
            return ModelListPage(items=[sample], metadata={"nextPage": None, "prevPage": None})

        async def aclose(self):
            return None

    monkeypatch.setattr("at_comfy.browse_sources.civitai.CivitaiClient", FakeClient)
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/search?limit=5&q=test")
        assert r.status == 200
        data = await r.json()
        assert len(data["items"]) == 1
        assert data["items"][0]["id"] == 42
        assert len(received_params) == 1
        assert received_params[0].limit == BROWSE_CIVITAI_LIMIT


@pytest.mark.asyncio
async def test_browse_page_merges_url_with_search_params(tmp_comfy_base, monkeypatch) -> None:
    sample = CivitaiModel.from_api(
        {
            "id": 7,
            "name": "Paged",
            "type": "LORA",
            "modelVersions": [],
            "tags": [],
        },
    )
    fetched_urls: list[str] = []

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def fetch_url(self, url: str, **_kwargs):
            fetched_urls.append(url)
            return ModelListPage(
                items=[sample],
                metadata={
                    "nextPage": "https://civitai.com/api/v1/models?cursor=next",
                    "prevPage": None,
                },
            )

        async def aclose(self):
            return None

    monkeypatch.setattr("at_comfy.browse_sources.civitai.CivitaiClient", FakeClient)
    app = create_test_app()
    next_raw = "https://civitai.com/api/v1/models?cursor=abc"
    qstr = urllib.parse.urlencode({"url": next_raw, "q": "myterm", "search_type": "model_name"})
    async with TestClient(TestServer(app)) as client:
        r = await client.get(f"/at/browse/page?{qstr}")
        assert r.status == 200
        data = await r.json()
        assert len(fetched_urls) == 1
        assert f"limit={BROWSE_CIVITAI_LIMIT}" in fetched_urls[0]
        assert "query=myterm" in fetched_urls[0] or "query=myterm&" in fetched_urls[0]
        np = data.get("next_page") or ""
        assert f"limit={BROWSE_CIVITAI_LIMIT}" in np
        assert "cursor=next" in np


@pytest.mark.asyncio
async def test_browse_model_enriches_versions_for_image_meta(tmp_comfy_base, monkeypatch) -> None:
    """``/at/browse/model`` merges ``/model-versions/{id}`` so gallery images include ``meta``."""

    slim_ver: dict = {
        "id": 99,
        "name": "v1",
        "images": [{"url": "https://image.civitai.com/x", "type": "image"}],
        "files": [{"id": 1, "name": "x.safetensors", "downloadUrl": "https://dl.example/f", "primary": True}],
    }
    rich_ver: dict = {
        **slim_ver,
        "images": [
            {
                "url": "https://image.civitai.com/x",
                "type": "image",
                "meta": {"prompt": "a scenic test", "cfgScale": 7},
            },
        ],
    }
    model_raw = {
        "id": 7,
        "name": "M",
        "type": "LORA",
        "modelVersions": [slim_ver],
        "tags": [],
    }

    class FakeClient:
        def __init__(self, *a, **k):
            pass

        async def get_model(self, mid: int, nsfw: bool = False):
            assert mid == 7
            return CivitaiModel.from_api(model_raw)

        async def get_model_detail_payload(self, mid: int, nsfw: bool = False):
            assert mid == 7
            return CivitaiModel.from_api(model_raw)

        async def get_version_detail(self, vid: int, nsfw: bool = False):
            assert vid == 99
            return CivitaiModelVersion.from_api(rich_ver)

        async def aclose(self):
            return None

    monkeypatch.setattr("at_comfy.browse_sources.civitai.CivitaiClient", FakeClient)
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/model/7")
        assert r.status == 200
        data = await r.json()
        im0 = data["modelVersions"][0]["images"][0]
        assert im0.get("meta", {}).get("prompt") == "a scenic test"


@pytest.mark.asyncio
async def test_browse_model_non_numeric_id_returns_400(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/browse/model/not-a-model-id")
        assert r.status == 400
        data = await r.json()
        assert data.get("error") == "bad id"


@pytest.mark.asyncio
async def test_put_config_persists(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.put(
            "/at/config",
            json={"hide_nsfw": True, "scan_on_startup": False},
        )
        assert r.status == 200
        data = await r.json()
        assert data["hide_nsfw"] is True
        assert data["scan_on_startup"] is False


@pytest.mark.asyncio
async def test_download_batch_validation(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/download/batch", json={})
        assert r.status == 400


@pytest.mark.asyncio
async def test_enrich_status(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/enrich/status")
        assert r.status == 200
        data = await r.json()
        assert "pending" in data


@pytest.mark.asyncio
async def test_scan_status(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/scan/status")
        assert r.status == 200


@pytest.mark.asyncio
async def test_clean_preview(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/library/clean-preview")
        assert r.status == 200
        data = await r.json()
        assert data["stale_count"] == 0
        assert data["orphan_cache_bytes"] == 0


@pytest.mark.asyncio
async def test_re_enrich_one_not_found(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/assets/99999/re-enrich")
        assert r.status == 404


@pytest.mark.asyncio
async def test_batch_re_enrich_validation(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/assets/batch/re-enrich", json={})
        assert r.status == 400
        r2 = await client.post("/at/assets/batch/re-enrich", json={"asset_ids": []})
        assert r2.status == 400


@pytest.mark.asyncio
async def test_batch_re_enrich_dispatches(tmp_comfy_base, monkeypatch) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "br.safetensors"
    p.parent.mkdir(parents=True)
    p.write_bytes(b"x" * 32)
    now = "2025-01-03T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "br.safetensors", "br", "DD", "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "b", "LORA", "lora", "[]", now, now),
    )
    conn.commit()
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])

    called: list[int] = []

    async def fake_re(self, asset_id: int, cfg):
        called.append(int(asset_id))

    monkeypatch.setattr(EnrichmentService, "re_enrich_asset", fake_re)
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/assets/batch/re-enrich", json={"asset_ids": [aid]})
        assert r.status == 200
        data = await r.json()
        assert data["ok"] is True
        assert data["processed"] == 1
        assert data["failed"] == 0
        assert called == [aid]
