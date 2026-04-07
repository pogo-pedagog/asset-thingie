"""Smoke tests for at_comfy HTTP API (no Comfy ``PromptServer``)."""

from __future__ import annotations

import pytest
from aiohttp.test_utils import TestClient, TestServer
from at_comfy.routes import create_test_app


@pytest.mark.asyncio
async def test_health(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/health")
        assert r.status == 200
        data = await r.json()
        assert data.get("ok") is True


@pytest.mark.asyncio
async def test_config_get(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/config")
        assert r.status == 200
        data = await r.json()
        assert "scan_on_startup" in data
        assert data.get("civitai_api_key_set") is False


@pytest.mark.asyncio
async def test_assets_empty(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.get("/at/assets?family=lora")
        assert r.status == 200
        data = await r.json()
        assert data["total"] == 0
        assert data["items"] == []
