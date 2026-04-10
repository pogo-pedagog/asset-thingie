"""Download task models (queue-ready API)."""

from __future__ import annotations

from datetime import UTC, datetime
from enum import Enum
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field, PrivateAttr, field_validator, model_validator


def _utc_now() -> datetime:
    return datetime.now(UTC)


class DownloadState(str, Enum):
    QUEUED = "queued"
    DOWNLOADING = "downloading"
    VERIFYING = "verifying"
    PAUSED = "paused"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    SKIPPED = "skipped"


class DuplicateResolution(str, Enum):
    """How to handle an existing non-empty destination file at download time."""

    NONE = "none"
    SKIP = "skip"
    REPLACE = "replace"


class DuplicateHashCompare(str, Enum):
    """Whether on-disk hash matches expected Civitai file hash (when file exists)."""

    NA = "na"
    MATCH = "match"
    MISMATCH = "mismatch"
    UNKNOWN = "unknown"


class DuplicateCheckResult(BaseModel):
    """Result of pre-enqueue destination check (path + optional indexed hash)."""

    dest_path: Path
    exists: bool
    hash_compare: DuplicateHashCompare


class DownloadErrorCode(str, Enum):
    """Structured failure categories for UI and logging."""

    NONE = ""
    NO_API_KEY = "no_api_key"
    URL_RESOLVE_FAILED = "url_resolve_failed"
    HTTP_AUTH_FORBIDDEN = "http_auth_forbidden"
    HTTP_NOT_FOUND = "http_not_found"
    HTTP_RATE_LIMIT = "http_rate_limit"
    HTTP_CLIENT = "http_client"
    HTTP_SERVER = "http_server"
    CHECKSUM_MISMATCH = "checksum_mismatch"
    NETWORK = "network"
    RANGE_NOT_SUPPORTED = "range_not_supported"
    INTERRUPTED = "interrupted"
    UNKNOWN = "unknown"


def user_message_for_error(code: DownloadErrorCode, detail: str | None = None) -> str:
    """Human-readable message; `detail` may add HTTP status or server snippet."""
    d = f" ({detail})" if detail else ""
    m = {
        DownloadErrorCode.NONE: "Unknown error",
        DownloadErrorCode.NO_API_KEY: (
            "This download needs a personal Civitai API key. "
            "Open Settings and paste your key (some models/files are auth-gated)."
        ),
        DownloadErrorCode.URL_RESOLVE_FAILED: "Could not resolve the download URL." + d,
        DownloadErrorCode.HTTP_AUTH_FORBIDDEN: (
            "Access was denied (401/403). Check that your API key is valid and that "
            "this file is not restricted or early-access gated." + d
        ),
        DownloadErrorCode.HTTP_NOT_FOUND: "Download link not found (404)." + d,
        DownloadErrorCode.HTTP_RATE_LIMIT: ("Rate limited by the server. Wait a bit and try Retry." + d),
        DownloadErrorCode.HTTP_CLIENT: "Download failed (client error)." + d,
        DownloadErrorCode.HTTP_SERVER: "Download failed (server error). Try again later." + d,
        DownloadErrorCode.CHECKSUM_MISMATCH: (
            "SHA256 checksum did not match after download; file was removed. Retry or re-download from Civitai."
        ),
        DownloadErrorCode.NETWORK: "Network error during download." + d,
        DownloadErrorCode.RANGE_NOT_SUPPORTED: (
            "Server restarted the full file instead of resuming; download continued from scratch."
        ),
        DownloadErrorCode.INTERRUPTED: ("Download or verify was interrupted. Use Retry to continue." + d),
        DownloadErrorCode.UNKNOWN: (detail or "Download failed."),
    }
    return m.get(code, detail or "Download failed.")


class DownloadRequest(BaseModel):
    """What to download and where."""

    download_url: str
    source: str = "civitai"
    """Remote source key (existing persisted tasks default to Civitai)."""
    model_id: int
    version_id: int
    file_id: int
    filename: str
    install_dir: Path
    """Ordered mirrors / fallbacks; defaults to ``[download_url]`` when empty (legacy rows)."""
    candidate_urls: list[str] = Field(default_factory=list)
    """Extra headers per candidate URL (e.g. bearer for gated Civitai mirrors)."""
    headers_by_url: dict[str, dict[str, str]] = Field(default_factory=dict)
    expected_sha256: str | None = None
    duplicate_resolution: DuplicateResolution = DuplicateResolution.NONE
    """If SKIP, worker completes as SKIPPED; if REPLACE, existing dest may be overwritten."""
    save_sidecar: bool = True
    model_json_snapshot: dict[str, Any] | None = None
    content_type_label: str | None = None
    """Civitai model type when known (for index registration / UX)."""
    save_all_example_images: bool = False
    """If True, save all version preview images beside the model file (not only .preview.png)."""
    save_example_videos: bool = False
    """If True, save gallery video samples as ``{stem}_example_video_N.*`` beside the model file."""
    batch_tags: list[str] = Field(default_factory=list)
    """Tags to apply on library registration (from batch acquire)."""

    @model_validator(mode="after")
    def _default_candidate_urls(self) -> DownloadRequest:
        if not self.candidate_urls:
            self.candidate_urls = [self.download_url]
        return self

    @field_validator("download_url")
    @classmethod
    def _validate_download_url(cls, v: object) -> str:
        s = str(v).strip()
        p = urlparse(s)
        if p.scheme not in ("http", "https") or not p.netloc:
            raise ValueError("download_url must be an http(s) URL with a host")
        return s

    @field_validator("filename")
    @classmethod
    def _validate_filename(cls, v: object) -> str:
        s = str(v).strip()
        if not s or s in (".", ".."):
            raise ValueError("filename must be non-empty")
        if "/" in s or "\\" in s:
            raise ValueError("filename must not contain path separators")
        if "\x00" in s:
            raise ValueError("filename must not contain NUL")
        return s


class DownloadTask(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    request: DownloadRequest
    state: DownloadState = DownloadState.QUEUED
    bytes_done: int = 0
    total_bytes: int | None = None
    error_message: str | None = None
    error_code: DownloadErrorCode = DownloadErrorCode.NONE
    retry_count: int = 0
    """Times user (or system) retried after failure."""
    cancel_requested: bool = False
    """User asked to cancel; worker checks this and persisted state."""
    pause_requested: bool = False
    """User asked to pause during active transfer; co-operative stop."""
    cover_thumb_path: str | None = None
    """Optional local path to cached cover JPEG for offline Downloads UI."""
    rate_bps: float | None = None
    """Recent smoothed download speed (bytes/s); not persisted."""
    resume_verify_only: bool = False
    """After crash during verify: skip HTTP download and run hash/sidecar only."""
    queue_position: int = 0
    """Order among queued tasks (lower runs first)."""
    ui_order: int = 0
    """Stable Downloads grid sort key; resynced only after user queue reorder (see DownloadManager)."""
    batch_id: UUID | None = None
    """Optional grouping id for batch acquire."""
    created_at: datetime = Field(default_factory=_utc_now)
    updated_at: datetime = Field(default_factory=_utc_now)

    model_config = ConfigDict(populate_by_name=True)

    _rate_clock: float = PrivateAttr(default=0.0)
    _rate_bytes: int = PrivateAttr(default=0)

    def touch_download_rate(self, bytes_done: int) -> None:
        """Update :attr:`rate_bps` from progress (sampled ~0.5s)."""
        import time

        now = time.monotonic()
        if self._rate_clock <= 0.0:
            self._rate_clock = now
            self._rate_bytes = bytes_done
            self.rate_bps = None
            return
        if now - self._rate_clock >= 0.5:
            dt = now - self._rate_clock
            db = bytes_done - self._rate_bytes
            if db >= 0 and dt > 0:
                self.rate_bps = float(db) / float(dt)
            self._rate_clock = now
            self._rate_bytes = bytes_done

    def reset_download_rate(self) -> None:
        self._rate_clock = 0.0
        self._rate_bytes = 0
        self.rate_bps = None
