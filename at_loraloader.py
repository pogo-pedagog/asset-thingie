"""AT LoraLoader — apply multiple LoRAs from a JSON snapshot (sidebar / manual)."""

from __future__ import annotations

import json
from typing import Any


def _normalize_entries(raw_list: list[Any]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for x in raw_list:
        if not isinstance(x, dict):
            continue
        name = x.get("lora_name")
        if not name or not str(name).strip():
            continue
        sm = float(x.get("strength_model", 1.0))
        sc = float(x.get("strength_clip", sm))
        entry: dict[str, Any] = {
            "lora_name": str(name).strip().replace("\\", "/"),
            "strength_model": sm,
            "strength_clip": sc,
        }
        phrase = x.get("preferred_trigger_phrase")
        if phrase is not None and str(phrase).strip():
            entry["preferred_trigger_phrase"] = str(phrase).strip()
        tw = x.get("trigger_words")
        if isinstance(tw, list) and tw:
            words = [str(w).strip() for w in tw if str(w).strip()]
            if words:
                entry["trigger_words"] = words
        if x.get("enabled", True) is False:
            entry["enabled"] = False
        out.append(entry)
    return out


def _active_stack_entries(stack: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [e for e in stack if e.get("enabled", True) is not False]


def _parse_snapshot(stack_snapshot: str) -> tuple[list[dict[str, Any]], str]:
    t = (stack_snapshot or "").strip()
    if not t:
        return [], "[]"
    try:
        data = json.loads(t)
    except json.JSONDecodeError:
        return [], stack_snapshot
    if not isinstance(data, list):
        return [], stack_snapshot
    norm = _normalize_entries(data)
    return norm, json.dumps(norm)


def _apply_lora_stack(model: Any, clip: Any, stack: list[dict[str, Any]]) -> tuple[Any, Any]:
    from nodes import LoraLoader  # type: ignore[import-not-found]

    loader = LoraLoader()
    for entry in stack:
        model, clip = loader.load_lora(
            model,
            clip,
            entry["lora_name"],
            entry["strength_model"],
            entry["strength_clip"],
        )
    return model, clip


class ATLoraLoader:
    """Apply LoRAs from ``stack_snapshot`` JSON (same shape as AssetThingie Set Loader)."""

    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "stack_snapshot": ("STRING", {"default": "[]"}),
            },
        }

    RETURN_TYPES = ("MODEL", "CLIP")
    RETURN_NAMES = ("model", "clip")
    FUNCTION = "apply"
    CATEGORY = "loaders"

    def apply(self, model: Any, clip: Any, stack_snapshot: str) -> tuple[Any, Any]:
        stack, _stack_out = _parse_snapshot(stack_snapshot)
        active = _active_stack_entries(stack)
        if not active:
            return model, clip
        model, clip = _apply_lora_stack(model, clip, active)
        return model, clip
