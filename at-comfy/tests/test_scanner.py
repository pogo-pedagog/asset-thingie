"""Filesystem scanner tests."""

from __future__ import annotations

from pathlib import Path

import pytest
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.scanner import (
    clean_stale_assets,
    compute_stale_assets,
    orphan_cache_bytes_for_asset_ids,
    run_full_scan,
)


@pytest.mark.asyncio
async def test_run_full_scan_indexes_lora_file(tmp_comfy_base: Path, monkeypatch) -> None:
    lora = tmp_comfy_base / "loras"
    lora.mkdir(parents=True)
    f = lora / "demo.safetensors"
    f.write_bytes(b"x" * 64)

    def fake_scan_dirs(_cfg):
        return {"loras": [str(lora.resolve())], "checkpoints": []}

    monkeypatch.setattr("at_comfy.scanner.get_scan_dirs", fake_scan_dirs)

    await run_full_scan(config=ATComfyConfig(enrichment_mode="manual"))

    conn = get_conn()
    row = conn.execute(
        "SELECT stem, content_type FROM library_files WHERE path = ?",
        (str(f.resolve()),),
    ).fetchone()
    assert row is not None
    assert row["stem"] == "demo"
    assert row["content_type"] == "LORA"


@pytest.mark.asyncio
async def test_prune_missing_removes_stale(tmp_comfy_base: Path, monkeypatch) -> None:
    lora = tmp_comfy_base / "loras2"
    lora.mkdir(parents=True)
    f = lora / "gone.safetensors"
    f.write_bytes(b"y" * 32)

    def fake_scan_dirs(_cfg):
        return {"loras": [str(lora.resolve())], "checkpoints": []}

    monkeypatch.setattr("at_comfy.scanner.get_scan_dirs", fake_scan_dirs)
    await run_full_scan(config=ATComfyConfig(enrichment_mode="manual"))

    f.unlink()
    await run_full_scan(config=ATComfyConfig(enrichment_mode="manual"))

    conn = get_conn()
    n = conn.execute("SELECT COUNT(*) AS c FROM library_files WHERE stem = 'gone'").fetchone()
    assert int(n["c"]) == 1
    removed = clean_stale_assets()
    assert removed >= 1
    n2 = conn.execute("SELECT COUNT(*) AS c FROM library_files WHERE stem = 'gone'").fetchone()
    assert int(n2["c"]) == 0


@pytest.mark.asyncio
async def test_compute_stale_assets_finds_missing(tmp_comfy_base: Path, monkeypatch) -> None:
    lora = tmp_comfy_base / "loras3"
    lora.mkdir(parents=True)
    f = lora / "missing.safetensors"
    f.write_bytes(b"z" * 32)

    def fake_scan_dirs(_cfg):
        return {"loras": [str(lora.resolve())], "checkpoints": []}

    monkeypatch.setattr("at_comfy.scanner.get_scan_dirs", fake_scan_dirs)
    await run_full_scan(config=ATComfyConfig(enrichment_mode="manual"))
    f.unlink()
    stale = compute_stale_assets()
    assert len(stale) == 1
    assert stale[0]["path"] == str(f.resolve())


@pytest.mark.asyncio
async def test_clean_stale_assets_removes_cache(tmp_comfy_base: Path, monkeypatch) -> None:
    lora = tmp_comfy_base / "loras4"
    lora.mkdir(parents=True)
    f = lora / "cached.safetensors"
    f.write_bytes(b"w" * 32)

    def fake_scan_dirs(_cfg):
        return {"loras": [str(lora.resolve())], "checkpoints": []}

    monkeypatch.setattr("at_comfy.scanner.get_scan_dirs", fake_scan_dirs)
    await run_full_scan(config=ATComfyConfig(enrichment_mode="manual"))
    conn = get_conn()
    aid = int(
        conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (str(f.resolve()),)).fetchone()[0],
    )
    cache = tmp_comfy_base / "at_cache"
    cov = cache / "covers" / f"{aid}.jpg"
    cov.parent.mkdir(parents=True, exist_ok=True)
    cov.write_bytes(b"jpeg")
    ex = cache / "examples" / str(aid) / "001.jpg"
    ex.parent.mkdir(parents=True, exist_ok=True)
    ex.write_bytes(b"pic")
    sz = orphan_cache_bytes_for_asset_ids({aid})
    assert sz > 0
    f.unlink()
    n = clean_stale_assets()
    assert n == 1
    assert not cov.is_file()
    assert not ex.is_file()
