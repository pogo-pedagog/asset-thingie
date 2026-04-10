"""Shared contracts for source-aware download preparation."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Protocol, runtime_checkable


@dataclass(frozen=True)
class PreparedDownload:
    """Everything the shared worker needs after source-specific resolution."""

    source: str
    filename: str
    install_dir: Path
    candidate_urls: list[str]
    expected_sha256: str | None
    headers_by_url: dict[str, dict[str, str]]
    metadata_snapshot: dict[str, Any] | None
    source_item_ref: str
    source_version_ref: str | None = None
    source_file_ref: str | None = None
    duplicate_resolution: str = "none"
    category: str = "General"
    content_type_label: str | None = None
    model_id: int | None = None
    version_id: int | None = None
    file_id: int | None = None


@runtime_checkable
class DownloadSourcePreparer(Protocol):
    """Build a PreparedDownload from a POST body (and config)."""

    source_id: str

    async def prepare(self, body: dict[str, Any], cfg: Any) -> PreparedDownload: ...
