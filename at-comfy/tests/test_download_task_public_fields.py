"""``_download_task_public`` exposes source and ids for browse/queue correlation."""

from __future__ import annotations

from pathlib import Path

from at_comfy.models.download import DownloadRequest
from at_comfy.route_handlers import _download_task_public


def test_download_task_public_includes_source_and_ids() -> None:
    req = DownloadRequest(
        download_url="https://example.com/f.safetensors",
        source="civitai",
        model_id=7,
        version_id=42,
        file_id=99,
        filename="f.safetensors",
        install_dir=Path("/tmp"),
    )
    row = {
        "id": "abc",
        "request_json": req.model_dump_json(),
        "state": "queued",
        "bytes_done": 0,
        "total_bytes": None,
        "error_message": None,
        "cover_thumb_path": None,
        "created_at": "2026-01-01T00:00:00Z",
        "queue_position": 1,
    }
    out = _download_task_public(row, None)  # type: ignore[arg-type]
    assert out["source"] == "civitai"
    assert out["model_id"] == 7
    assert out["version_id"] == 42
    assert out["file_id"] == 99
