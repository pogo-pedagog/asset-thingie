"""Unit tests for Comfy AT Checkpoint Loader node (no Comfy runtime)."""

from __future__ import annotations

import sys
from pathlib import Path
from types import ModuleType

_fp = ModuleType("folder_paths")


def _get_filename_list(kind: str) -> list[str]:
    return ["test.safetensors"]


def _get_full_path(kind: str, name: str) -> str:
    return f"/models/{kind}/{name}"


_fp.get_filename_list = _get_filename_list
_fp.get_full_path = _get_full_path
sys.modules["folder_paths"] = _fp


class _FakeClip:
    def __init__(self, label: str = "clip0", *, clip_layer_returns_new: bool = False) -> None:
        self.label = label
        self.layer_calls: list[int] = []
        self._clip_layer_returns_new = clip_layer_returns_new

    def clone(self) -> _FakeClip:
        return _FakeClip(
            self.label + ":clone",
            clip_layer_returns_new=self._clip_layer_returns_new,
        )

    def clip_layer(self, layer: int):
        self.layer_calls.append(int(layer))
        if self._clip_layer_returns_new:
            layered = _FakeClip(self.label + ":layered", clip_layer_returns_new=False)
            layered.layer_calls = list(self.layer_calls)
            return layered
        return None


def _fake_load_checkpoint_guess_config(
    ckpt_path: str,
    *,
    output_vae: bool = True,
    output_clip: bool = True,
) -> tuple:
    clip = _FakeClip(clip_layer_returns_new=False)
    return ("MODEL", clip, "VAE")


def _fake_load_returning_clip_that_returns_new_from_clip_layer(
    ckpt_path: str,
    *,
    output_vae: bool = True,
    output_clip: bool = True,
) -> tuple:
    clip = _FakeClip(clip_layer_returns_new=True)
    return ("MODEL", clip, "VAE")


_comfy_sd = ModuleType("comfy.sd")
_comfy_sd.load_checkpoint_guess_config = _fake_load_checkpoint_guess_config
sys.modules["comfy"] = ModuleType("comfy")
sys.modules["comfy"].sd = _comfy_sd
sys.modules["comfy.sd"] = _comfy_sd

_REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_REPO_ROOT))

from at_checkpoint_loader import ATCheckpointLoader  # noqa: E402


def teardown_module() -> None:
    sys.path.pop(0)
    for name in ("comfy.sd", "comfy", "folder_paths"):
        sys.modules.pop(name, None)


def test_at_checkpoint_loader_clip_skip_zero_unchanged_clip() -> None:
    n = ATCheckpointLoader()
    m, clip, v = n.load_checkpoint("test.safetensors", 0)
    assert m == "MODEL"
    assert v == "VAE"
    assert isinstance(clip, _FakeClip)
    assert clip.layer_calls == []


def test_at_checkpoint_loader_negative_clip_skip_clones_and_sets_layer() -> None:
    n = ATCheckpointLoader()
    m, clip, v = n.load_checkpoint("test.safetensors", -2)
    assert m == "MODEL"
    assert v == "VAE"
    assert isinstance(clip, _FakeClip)
    assert ":clone" in clip.label
    assert clip.layer_calls == [-2]


def test_at_checkpoint_loader_uses_clip_layer_return_value_when_non_none() -> None:
    """If clip_layer returns a new clip (unlike upstream Comfy), that object is returned."""
    _comfy_sd.load_checkpoint_guess_config = _fake_load_returning_clip_that_returns_new_from_clip_layer
    try:
        n = ATCheckpointLoader()
        m, clip, v = n.load_checkpoint("test.safetensors", -1)
        assert m == "MODEL"
        assert v == "VAE"
        assert isinstance(clip, _FakeClip)
        assert clip.label.endswith(":layered")
        assert clip.layer_calls == [-1]
    finally:
        _comfy_sd.load_checkpoint_guess_config = _fake_load_checkpoint_guess_config


def test_at_checkpoint_loader_returns_three_outputs() -> None:
    n = ATCheckpointLoader()
    out = n.load_checkpoint("test.safetensors", 0)
    assert len(out) == 3
