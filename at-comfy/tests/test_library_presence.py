"""POST /at/library/presence — version-level library membership."""

from __future__ import annotations

import pytest
from aiohttp.test_utils import TestClient, TestServer

from at_comfy.db import get_conn
from at_comfy.routes import create_test_app


def _insert_civitai_version(conn, *, path: str, version_id: int) -> None:
    now = "2025-01-01T00:00:00Z"
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime,
            source, civitai_model_id, civitai_version_id, scanned_at, enrichment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (path, "x.safetensors", "x", None, "LORA", "lora", 10, 1.0, None, 1, version_id, now, None),
    )
    conn.commit()


def _insert_civarchive_asset(conn, *, path: str, external_version_id: str) -> None:
    now = "2025-01-01T00:00:00Z"
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, category, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (path, "x", "LORA", "lora", None, "[]", now, now),
    )
    aid = int(conn.execute("SELECT last_insert_rowid()").fetchone()[0])
    conn.execute(
        """
        INSERT INTO source_metadata (
            asset_id, source, external_model_id, external_version_id, external_file_id,
            creator_name, source_url, title, description_html, raw_snapshot_json, fetched_at
        ) VALUES (?, 'civarchive', 'm1', ?, NULL, NULL, '', '', NULL, NULL, ?)
        """,
        (aid, external_version_id, now),
    )
    conn.commit()


@pytest.mark.asyncio
async def test_presence_civitai_hit_and_miss(tmp_comfy_base) -> None:
    conn = get_conn()
    _insert_civitai_version(conn, path=str(tmp_comfy_base / "a.safetensors"), version_id=999)

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post(
            "/at/library/presence",
            json={
                "items": [
                    {"source": "civitai", "version_id": 999, "file_id": 1},
                    {"source": "civitai", "version_id": 111, "file_id": 2},
                ],
            },
        )
        assert r.status == 200
        data = await r.json()
        assert data["present"] == [0]


@pytest.mark.asyncio
async def test_presence_civarchive_hit(tmp_comfy_base) -> None:
    conn = get_conn()
    p = str(tmp_comfy_base / "ca.safetensors")
    _insert_civarchive_asset(conn, path=p, external_version_id="555")

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post(
            "/at/library/presence",
            json={"items": [{"source": "civarchive", "version_id": 555, "file_id": 1}]},
        )
        assert r.status == 200
        data = await r.json()
        assert data["present"] == [0]


@pytest.mark.asyncio
async def test_presence_mixed_batch(tmp_comfy_base) -> None:
    conn = get_conn()
    _insert_civitai_version(conn, path=str(tmp_comfy_base / "c1.safetensors"), version_id=10)
    _insert_civarchive_asset(conn, path=str(tmp_comfy_base / "c2.safetensors"), external_version_id="20")

    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post(
            "/at/library/presence",
            json={
                "items": [
                    {"source": "civitai", "version_id": 99},
                    {"source": "civitai", "version_id": 10},
                    {"source": "civarchive", "version_id": "20"},
                    {"source": "civarchive", "version_id": "30"},
                ],
            },
        )
        assert r.status == 200
        data = await r.json()
        assert sorted(data["present"]) == [1, 2]


@pytest.mark.asyncio
async def test_presence_invalid_json(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/library/presence", data="not-json")
        assert r.status == 400


@pytest.mark.asyncio
async def test_presence_items_required(tmp_comfy_base) -> None:
    app = create_test_app()
    async with TestClient(TestServer(app)) as client:
        r = await client.post("/at/library/presence", json={})
        assert r.status == 400
