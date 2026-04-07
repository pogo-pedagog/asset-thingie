"""Retry behavior for transient Civitai HTTP failures."""

from __future__ import annotations

import httpx
import pytest

from at_comfy.civitai.client import (
    CivitaiAPIError,
    CivitaiClient,
    civitai_error_message_for_response,
)


def test_civitai_error_message_html_gateway() -> None:
    msg = civitai_error_message_for_response(
        504,
        "<!DOCTYPE html><html><body>timeout</body></html>",
    )
    assert "504" in msg
    assert "try again" in msg.lower()


@pytest.mark.asyncio
async def test_request_json_retries_on_504_then_succeeds() -> None:
    n = 0

    def handler(request: httpx.Request) -> httpx.Response:
        nonlocal n
        n += 1
        if n == 1:
            return httpx.Response(504, content=b"Gateway Timeout")
        return httpx.Response(200, json={"items": [], "metadata": {}})

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport) as http:
        c = CivitaiClient(client=http)
        page = await c.fetch_url("https://civitai.com/api/v1/models?limit=1&nsfw=false")
    assert n == 2
    assert page.items == []


@pytest.mark.asyncio
async def test_request_json_raises_after_retry_exhausted_on_504() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(504, content=b"time out")

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport) as http:
        c = CivitaiClient(client=http)
        with pytest.raises(CivitaiAPIError) as excinfo:
            await c.fetch_url("https://civitai.com/api/v1/models?limit=1&nsfw=false")

    assert excinfo.value.status_code == 504
