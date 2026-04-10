"""Tests for ``CivArchiveClient`` (mocked HTTP)."""

from __future__ import annotations

import pytest
import httpx

from at_comfy.civarchive_client import CivArchiveClient


@pytest.mark.asyncio
async def test_search_kind_version_uses_page_param() -> None:
    seen: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(str(request.url))
        return httpx.Response(
            200,
            json={
                "results": [],
                "hits": 0,
                "totalHits": 0,
            },
        )

    c = CivArchiveClient(transport=httpx.MockTransport(handler))
    try:
        await c.search(q="pony", kind="version", page=2)
    finally:
        await c.aclose()
    assert len(seen) == 1
    assert "page=2" in seen[0]
    assert "kind=version" in seen[0]


@pytest.mark.asyncio
async def test_get_model_adds_model_version_id_query() -> None:
    seen: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(str(request.url))
        return httpx.Response(200, json={"id": 1, "name": "x", "version": {}})

    c = CivArchiveClient(transport=httpx.MockTransport(handler))
    try:
        await c.get_model(99, 1001)
    finally:
        await c.aclose()
    assert "models/99" in seen[0]
    assert "modelVersionId=1001" in seen[0]


@pytest.mark.asyncio
async def test_sha256_invalid_length_raises() -> None:
    c = CivArchiveClient(transport=httpx.MockTransport(lambda r: httpx.Response(200, json={})))
    with pytest.raises(ValueError, match="64 hex"):
        try:
            await c.get_by_sha256("abcd")
        finally:
            await c.aclose()


@pytest.mark.asyncio
async def test_get_by_sha256_hits_endpoint() -> None:
    hx = "a" * 64
    seen: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(str(request.url))
        return httpx.Response(200, json={"model": {"id": 1, "version": {"id": 2, "files": []}}})

    c = CivArchiveClient(transport=httpx.MockTransport(handler))
    try:
        out = await c.get_by_sha256(hx)
    finally:
        await c.aclose()
    assert f"/sha256/{hx}" in seen[0]
    assert out["model"]["id"] == 1
