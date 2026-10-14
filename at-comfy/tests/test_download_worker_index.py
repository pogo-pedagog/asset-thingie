"""Download worker indexing by model type."""

from __future__ import annotations

from at_comfy.download_worker import _scan_family_for_task
from at_comfy.models.download import DownloadRequest, DownloadTask


def _task(content_type_label: str) -> DownloadTask:
    req = DownloadRequest(
        download_url="https://example.com/x.safetensors",
        source="civitai",
        filename="x.safetensors",
        install_dir="/tmp",
        content_type_label=content_type_label,
        model_id=1,
        version_id=1,
        file_id=1,
    )
    return DownloadTask(request=req)


def test_scan_family_lora_and_checkpoint() -> None:
    assert _scan_family_for_task(_task("LORA")) == "loras"
    assert _scan_family_for_task(_task("Checkpoint")) == "checkpoints"


def test_scan_family_vae_not_indexed() -> None:
    assert _scan_family_for_task(_task("VAE")) is None
