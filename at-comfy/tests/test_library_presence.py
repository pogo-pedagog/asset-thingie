"""POST /at/library/presence — version-level library membership."""

from __future__ import annotations

import pytest
from aiohttp.test_utils import TestClient, TestServer
from at_comfy.civitai.models import CivitaiModel, CivitaiModelVersion
from at_comfy.db import get_conn
from at_comfy.enrichment import EnrichmentService
from at_comfy.library_repo import library_presence_indices
from at_comfy.routes import create_test_app


def _insert_civitai_asset(conn, *, path: str, version_id: int) -> None:
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
        ) VALUES (?, 'civitai', '1', ?, NULL, NULL, '', '', NULL, NULL, ?)
        """,
        (aid, str(version_id), now),
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


def test_presence_after_enrichment_apply_civitai_db(tmp_comfy_base) -> None:
    conn = get_conn()
    p = str(tmp_comfy_base / "enriched.safetensors")
    now = "2025-01-01T00:00:00Z"
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (p, "x", "LORA", "lora", "[]", now, now),
    )
    conn.commit()
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (p,)).fetchone()[0])
    model = CivitaiModel(
        id=42,
        name="M",
        type="LORA",
        creator_username="u",
        tags=[],
        model_versions=[
            CivitaiModelVersion(
                id=777, name="v", base_model="SD 1.5", trained_words=[], images=[], files=[]
            ),
        ],
    )
    EnrichmentService()._apply_civitai_db(model, {"id": 777}, aid, ver=model.model_versions[0])
    present = library_presence_indices(
        [
            {"source": "civitai", "version_id": 777},
            {"source": "civitai", "version_id": 1},
        ],
    )
    assert present == [0]


@pytest.mark.asyncio
async def test_presence_civitai_hit_and_miss(tmp_comfy_base) -> None:
    conn = get_conn()
    _insert_civitai_asset(conn, path=str(tmp_comfy_base / "a.safetensors"), version_id=999)

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
    _insert_civitai_asset(conn, path=str(tmp_comfy_base / "c1.safetensors"), version_id=10)
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
