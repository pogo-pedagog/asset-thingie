"""Shared contracts for multi-source browse."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Protocol, runtime_checkable


@dataclass(frozen=True)
class BrowsePageResult:
    """One page of browse results plus pagination ref for that source."""

    items: list[dict[str, Any]]
    next_page: str | None
    prev_page: str | None = None


@runtime_checkable
class BrowseSource(Protocol):
    """Per-source browse implementation."""

    source_id: str

    async def search(self, query: dict[str, Any]) -> BrowsePageResult: ...

    async def page(self, page_ref: str, query: dict[str, Any]) -> BrowsePageResult: ...

    async def detail(self, item_ref: str, *, nsfw: bool) -> dict[str, Any]: ...
