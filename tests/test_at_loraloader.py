"""Unit tests for AT LoraLoader node (no Comfy runtime)."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from types import ModuleType

_nodes_mod = ModuleType("nodes")


class _FakeLoraLoader:
    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        return (f"{model}+{lora_name}", f"{clip}+{lora_name}")


_nodes_mod.LoraLoader = _FakeLoraLoader
sys.modules["nodes"] = _nodes_mod

_REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_REPO_ROOT))

from at_loraloader import ATLoraLoader  # noqa: E402


def teardown_module() -> None:
    sys.path.pop(0)
    sys.modules.pop("nodes", None)


def test_empty_snapshot_returns_inputs_unchanged() -> None:
    loader = ATLoraLoader()
    model, clip = loader.apply("M", "C", "[]")
    assert model == "M"
    assert clip == "C"


def test_single_lora_applied() -> None:
    stack = [{"lora_name": "MyLora.safetensors", "strength_model": 0.8, "strength_clip": 0.6}]
    loader = ATLoraLoader()
    model, clip = loader.apply("M", "C", json.dumps(stack))
    assert "MyLora.safetensors" in model
    assert "MyLora.safetensors" in clip


def test_disabled_entries_skipped() -> None:
    stack = [
        {"lora_name": "A.safetensors", "strength_model": 1.0, "strength_clip": 1.0},
        {"lora_name": "B.safetensors", "strength_model": 1.0, "strength_clip": 1.0, "enabled": False},
    ]
    loader = ATLoraLoader()
    model, _clip = loader.apply("M", "C", json.dumps(stack))
    assert "A.safetensors" in model
    assert "B.safetensors" not in model


def test_multiple_loras_chained() -> None:
    stack = [
        {"lora_name": "A.safetensors", "strength_model": 1.0, "strength_clip": 1.0},
        {"lora_name": "B.safetensors", "strength_model": 0.5, "strength_clip": 0.5},
    ]
    loader = ATLoraLoader()
    model, clip = loader.apply("M", "C", json.dumps(stack))
    assert "A.safetensors" in model
    assert "B.safetensors" in model
    assert "A.safetensors" in clip
    assert "B.safetensors" in clip


def test_invalid_json_returns_inputs_unchanged() -> None:
    loader = ATLoraLoader()
    model, clip = loader.apply("M", "C", "not json")
    assert model == "M"
    assert clip == "C"


def test_returns_two_outputs() -> None:
    loader = ATLoraLoader()
    out = loader.apply("M", "C", "[]")
    assert len(out) == 2
