"""Serialization compatible with AssetThingie ``/api/comfy``."""

from __future__ import annotations

from pathlib import Path

from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.library_repo import get_asset_row
from at_comfy.serial import asset_row_to_dict


def test_locon_row_emits_lora_syntax(tmp_comfy_base: Path, monkeypatch) -> None:
    monkeypatch.setattr(
        "at_comfy.serial.comfy_model_name_for_path",
        lambda *_a, **_k: ("Style/demo.safetensors", None),
    )
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "demo.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "demo.safetensors", "demo", "AA", "LoCon", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "Demo LoCon", "LoCon", "lora", "[]", now, now),
    )
    conn.commit()
    row = get_asset_row(1)
    assert row is not None
    out = asset_row_to_dict(row, ATComfyConfig())
    assert out["lora_syntax"] == "<lora:demo:1.0>"
    assert out["comfy_lora_name"] == "Style/demo.safetensors"
