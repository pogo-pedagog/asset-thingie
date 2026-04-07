"""Read ``__metadata__`` from local ``.safetensors`` files (header only, no tensor load)."""

from __future__ import annotations

import json
import logging
import struct
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)

_MAX_HEADER_BYTES = 100 * 1024 * 1024

_LORA_FAMILY_CT = frozenset({"lora", "lycoris", "dora", "locon", "hypernetwork"})


def is_lora_family_content_type(content_type: str | None) -> bool:
    """True when ``content_type`` belongs to the LoRA-style family (incl. LyCORIS / DoRA)."""
    if content_type is None:
        return False
    k = str(content_type).strip().lower()
    return k in _LORA_FAMILY_CT


def read_safetensors_metadata(path: Path) -> dict[str, str] | None:
    try:
        with open(path, "rb") as f:
            prefix = f.read(8)
            if len(prefix) < 8:
                return None
            (n,) = struct.unpack("<Q", prefix)
            if n == 0 or n > _MAX_HEADER_BYTES:
                return None
            blob = f.read(n)
            if len(blob) < n:
                return None
            header = json.loads(blob.decode("utf-8"))
    except (OSError, json.JSONDecodeError, UnicodeDecodeError, struct.error) as e:
        logger.debug("safetensors header read failed for %s: %s", path, e)
        return None
    if not isinstance(header, dict):
        return None
    raw_meta = header.get("__metadata__")
    if raw_meta is None:
        return {}
    if not isinstance(raw_meta, dict):
        return {}
    out: dict[str, str] = {}
    for k, v in raw_meta.items():
        if k is None:
            continue
        key = str(k)
        if isinstance(v, str):
            out[key] = v
        else:
            try:
                out[key] = json.dumps(v)
            except (TypeError, ValueError):
                out[key] = str(v)
    return out


def _parse_int(s: str, *, field: str, raw: dict[str, str]) -> int | None:
    try:
        return int(float(s.strip()))
    except (ValueError, TypeError):
        logger.debug("normalize_lora_metadata: skip bad int %s=%r", field, raw.get(field))
        return None


def _parse_float(s: str, *, field: str, raw: dict[str, str]) -> float | None:
    try:
        return float(s.strip())
    except (ValueError, TypeError):
        logger.debug("normalize_lora_metadata: skip bad float %s=%r", field, raw.get(field))
        return None


def _get(raw: dict[str, str], key: str) -> str | None:
    v = raw.get(key)
    if v is None:
        return None
    s = str(v).strip()
    return s or None


def _json_subtree(raw: dict[str, str], key: str) -> Any | None:
    s = _get(raw, key)
    if s is None:
        return None
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        logger.debug("normalize_lora_metadata: %s not valid JSON", key)
        return None


def normalize_lora_metadata(raw: dict[str, str]) -> dict[str, Any]:
    out: dict[str, Any] = {}
    if x := _get(raw, "ss_network_module"):
        out["network_module"] = x
    if x := _get(raw, "ss_output_name"):
        out["output_name"] = x
    if x := _get(raw, "ss_sd_model_name"):
        out["training_model_name"] = x
    if x := _get(raw, "ss_resolution"):
        out["training_resolution"] = x
    for src, dst in (
        ("ss_network_dim", "network_rank"),
        ("ss_clip_skip", "clip_skip"),
        ("ss_num_epochs", "num_epochs"),
        ("ss_max_train_steps", "max_train_steps"),
    ):
        s = _get(raw, src)
        if s is not None:
            val = _parse_int(s, field=src, raw=raw)
            if val is not None:
                out[dst] = val
    for src, dst in (
        ("ss_network_alpha", "network_alpha"),
        ("ss_learning_rate", "learning_rate"),
    ):
        s = _get(raw, src)
        if s is not None:
            val = _parse_float(s, field=src, raw=raw)
            if val is not None:
                out[dst] = val
    for src, dst in (
        ("ss_training_started_at", "training_started_at"),
        ("ss_training_finished_at", "training_finished_at"),
    ):
        s = _get(raw, src)
        if s is not None:
            val = _parse_float(s, field=src, raw=raw)
            if val is not None:
                out[dst] = val
    bs = _get(raw, "ss_batch_size") or _get(raw, "ss_total_batch_size")
    if bs is not None:
        v = _parse_int(bs, field="ss_batch_size", raw=raw)
        if v is not None:
            out["batch_size"] = v
    if (data := _json_subtree(raw, "ss_tag_frequency")) is not None:
        out["tag_frequency"] = data
    if (data := _json_subtree(raw, "ss_dataset_dirs")) is not None:
        out["dataset_dirs"] = data
    return out
