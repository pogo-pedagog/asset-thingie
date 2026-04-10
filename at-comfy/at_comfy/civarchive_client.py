"""Thin HTTP client for CivArchive public API (https://civarchive.com/api)."""

from __future__ import annotations

import logging
from typing import Any

import httpx

logger = logging.getLogger(__name__)

DEFAULT_BASE_URL = "https://civarchive.com/api"
HTTP_TIMEOUT = httpx.Timeout(60.0, connect=30.0)


class CivArchiveClient:
    """Async JSON client for search, model detail, and SHA256 lookup."""

    def __init__(
        self,
        base_url: str = DEFAULT_BASE_URL,
        *,
        transport: httpx.MockTransport | None = None,
    ) -> None:
        self._base = base_url.rstrip("/")
        self._transport = transport
        self._client: httpx.AsyncClient | None = None

    async def _hc(self) -> httpx.AsyncClient:
        if self._client is None or self._client.is_closed:
            kw: dict[str, Any] = {"timeout": HTTP_TIMEOUT, "follow_redirects": True}
            if self._transport is not None:
                kw["transport"] = self._transport
            self._client = httpx.AsyncClient(**kw)
        return self._client

    async def aclose(self) -> None:
        if self._client is not None and not self._client.is_closed:
            await self._client.aclose()
        self._client = None

    async def search(
        self,
        *,
        q: str,
        kind: str | None = None,
        page: int | None = 1,
        sort: str | None = None,
        model_type: str | None = None,
        base_model: str | None = None,
        tags: str | None = None,
        is_nsfw: bool | None = None,
        is_deleted: bool | None = None,
    ) -> dict[str, Any]:
        """GET /search — returns ``results``, ``hits``, ``totalHits``.

        ``model_type`` is sent as the API's ``type`` query key (CivArchive naming).
        """
        hc = await self._hc()
        params: dict[str, str] = {"q": q or ""}
        if kind:
            params["kind"] = kind.strip()
        if page is not None:
            params["page"] = str(max(1, int(page)))
        if sort and str(sort).strip():
            params["sort"] = str(sort).strip()
        if model_type and str(model_type).strip():
            params["type"] = str(model_type).strip()
        if base_model and str(base_model).strip():
            params["base_model"] = str(base_model).strip()
        if tags and str(tags).strip():
            params["tags"] = str(tags).strip()
        if is_nsfw is not None:
            params["is_nsfw"] = "true" if is_nsfw else "false"
        if is_deleted is not None:
            params["is_deleted"] = "true" if is_deleted else "false"
        r = await hc.get(f"{self._base}/search", params=params)
        r.raise_for_status()
        return r.json()

    async def get_model(self, model_id: int | str, model_version_id: int | str | None = None) -> dict[str, Any]:
        """GET /models/{id} with optional ``modelVersionId``."""
        hc = await self._hc()
        params: dict[str, str] = {}
        if model_version_id is not None:
            params["modelVersionId"] = str(model_version_id)
        r = await hc.get(f"{self._base}/models/{int(model_id)}", params=params)
        r.raise_for_status()
        return r.json()

    async def get_by_sha256(self, sha256_hex: str) -> dict[str, Any]:
        """GET /sha256/{hex} — may return a compact ``model`` payload."""
        hx = sha256_hex.strip().lower()
        if len(hx) != 64 or any(c not in "0123456789abcdef" for c in hx):
            raise ValueError("sha256 must be 64 hex characters")
        hc = await self._hc()
        r = await hc.get(f"{self._base}/sha256/{hx}")
        r.raise_for_status()
        return r.json()
