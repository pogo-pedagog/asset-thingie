"""Config load/save against a temp Comfy base path."""

from __future__ import annotations

import json

import at_comfy.config as cfg
import pytest


@pytest.fixture
def cfg_base(tmp_path, monkeypatch):
    base = tmp_path / "comfy_base"
    base.mkdir(parents=True, exist_ok=True)
    monkeypatch.setattr("at_comfy.config.comfy_base_path", lambda: base.resolve())
    cfg._cached = None
    cfg.invalidate_config_cache()
    yield base
    cfg._cached = None
    cfg.invalidate_config_cache()


def test_save_and_load_roundtrip(cfg_base) -> None:
    path = cfg_base / "at_comfy_config.json"
    c = cfg.ATComfyConfig(
        civitai_api_key="secret",
        scan_on_startup=False,
        max_parallel_downloads=5,
    )
    cfg.save_config(c)
    assert path.is_file()
    raw = json.loads(path.read_text(encoding="utf-8"))
    assert raw["civitai_api_key"] == "secret"
    assert raw["scan_on_startup"] is False
    assert raw["max_parallel_downloads"] == 5

    cfg.invalidate_config_cache()
    loaded = cfg.load_config(reload=True)
    assert loaded.civitai_api_key == "secret"
    assert loaded.scan_on_startup is False
    assert loaded.max_parallel_downloads == 5
