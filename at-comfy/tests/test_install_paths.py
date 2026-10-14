"""Install path resolution by Civitai model type."""

from __future__ import annotations

from pathlib import Path

import pytest
from at_comfy.config import ATComfyConfig
from at_comfy.install_paths import comfy_folder_for_model_type, resolve_install_dir_for_download


@pytest.mark.parametrize(
    ("model_type", "expected"),
    [
        ("LORA", "loras"),
        ("LoCon", "loras"),
        ("DoRA", "loras"),
        ("Checkpoint", "checkpoints"),
        ("VAE", "vae"),
        ("TextualInversion", "embeddings"),
        ("Controlnet", "controlnet"),
        ("Upscaler", "upscale_models"),
        ("Hypernetwork", "hypernetworks"),
        ("MotionModule", "animatediff_models"),
        ("Other", None),
        ("UnknownThing", None),
    ],
)
def test_comfy_folder_for_model_type(model_type: str, expected: str | None) -> None:
    assert comfy_folder_for_model_type(model_type) == expected


def test_resolve_install_unsupported_type_raises() -> None:
    cfg = ATComfyConfig()
    with pytest.raises(ValueError, match="unsupported model type"):
        resolve_install_dir_for_download("Other", cfg, category="General")


def test_resolve_install_vae_requires_comfy_folder(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    cfg = ATComfyConfig()

    def fake_get_folder_paths_list(key: str, _cfg: ATComfyConfig) -> list[str]:
        if key == "vae":
            return []
        return []

    monkeypatch.setattr("at_comfy.comfy_paths.get_folder_paths_list", fake_get_folder_paths_list)
    with pytest.raises(ValueError, match="no folder configured"):
        resolve_install_dir_for_download("VAE", cfg, category="General")


def test_resolve_install_vae_uses_vae_root(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    vae_root = tmp_path / "models" / "vae"
    vae_root.mkdir(parents=True)
    cfg = ATComfyConfig()

    def fake_get_folder_paths_list(key: str, _cfg: ATComfyConfig) -> list[str]:
        if key == "vae":
            return [str(vae_root)]
        return []

    monkeypatch.setattr("at_comfy.comfy_paths.get_folder_paths_list", fake_get_folder_paths_list)
    out = resolve_install_dir_for_download("VAE", cfg, category="General")
    assert str(out.resolve()).startswith(str(vae_root.resolve()))
