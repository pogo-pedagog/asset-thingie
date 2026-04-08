"""Enrichment DB writes (no network)."""

from __future__ import annotations

from pathlib import Path

import pytest
from at_comfy.civitai.models import CivitaiModel, CivitaiModelVersion
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.enrichment import EnrichmentService, _fetch_cover


def test_apply_civitai_writes_source_metadata_and_syncs_file_content_type(tmp_comfy_base: Path) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "dl.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "dl.safetensors", "dl", "AA", "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "stem name", "LORA", "lora", "[]", now, now),
    )
    conn.commit()
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])

    model = CivitaiModel(
        id=99,
        name="Remote Name",
        type="DoRA",
        creator_username="creator1",
        tags=["t1"],
        model_versions=[
            CivitaiModelVersion(
                id=555,
                name="v1",
                base_model="SDXL 1.0",
                trained_words=["worda"],
                images=[],
                files=[],
            ),
        ],
    )
    raw_ver = {"id": 555, "modelId": 99}
    svc = EnrichmentService()
    svc._apply_civitai_db(model, raw_ver, aid, ver=model.model_versions[0])
    sm = conn.execute("SELECT title FROM source_metadata WHERE asset_id = ?", (aid,)).fetchone()
    assert sm is not None
    assert sm["title"] == "Remote Name"
    lf = conn.execute("SELECT content_type FROM library_files WHERE path = ?", (sp,)).fetchone()
    assert lf is not None
    assert lf["content_type"] == "DoRA"
    la = conn.execute("SELECT content_type FROM library_assets WHERE asset_id = ?", (aid,)).fetchone()
    assert la is not None
    assert la["content_type"] == "DoRA"


def test_apply_civitai_skips_display_name_when_user_edited(tmp_comfy_base: Path) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "ue.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "ue.safetensors", "ue", "BB", "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at,
            user_edited
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "User Title", "LORA", "lora", "[]", now, now, 1),
    )
    conn.commit()
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])

    model = CivitaiModel(
        id=88,
        name="Remote Name",
        type="LORA",
        creator_username="c",
        tags=[],
        model_versions=[
            CivitaiModelVersion(
                id=1,
                name="v",
                base_model="SD 1.5",
                trained_words=[],
                images=[],
                files=[],
            ),
        ],
    )
    svc = EnrichmentService()
    svc._apply_civitai_db(model, {"id": 1, "modelId": 88}, aid, ver=model.model_versions[0])
    dn = conn.execute("SELECT display_name, base_model FROM library_assets WHERE asset_id = ?", (aid,)).fetchone()
    assert dn is not None
    assert dn["display_name"] == "User Title"
    assert dn["base_model"] is None


@pytest.mark.asyncio
async def test_re_enrich_clears_metadata_and_calls_enrich_row(tmp_comfy_base: Path, monkeypatch) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "re.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-02T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at,
            enrichment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "re.safetensors", "re", "CC", "LORA", "lora", 10, 1.0, now, "found"),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at,
            user_edited
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "x", "LORA", "lora", "[]", now, now, 1),
    )
    conn.commit()
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])
    conn.execute(
        """
        INSERT INTO source_metadata (
            asset_id, source, external_model_id, creator_name, source_url, title,
            description_html, raw_snapshot_json, fetched_at
        ) VALUES (?, 'civitai', '1', 'a', 'u', 't', '', '{}', ?)
        """,
        (aid, now),
    )
    conn.execute(
        """
        INSERT INTO example_media (
            asset_id, media_type, origin_type, local_path, sort_order, created_at
        ) VALUES (?, 'image', 'civitai', '001.jpg', 0, ?)
        """,
        (aid, now),
    )
    conn.commit()

    rows_seen: list[dict] = []

    async def fake_enrich_row(self, row, cfg, *, client=None):
        rows_seen.append(dict(row))

    monkeypatch.setattr(EnrichmentService, "_enrich_row", fake_enrich_row)

    svc = EnrichmentService()
    await svc.re_enrich_asset(aid, ATComfyConfig())

    assert not conn.execute("SELECT 1 FROM source_metadata WHERE asset_id = ?", (aid,)).fetchone()
    assert not conn.execute("SELECT 1 FROM example_media WHERE asset_id = ?", (aid,)).fetchone()
    ue = conn.execute("SELECT user_edited FROM library_assets WHERE asset_id = ?", (aid,)).fetchone()
    assert int(ue["user_edited"]) == 0
    assert len(rows_seen) == 1


@pytest.mark.asyncio
async def test_fetch_cover_prefers_video_when_poster_can_be_generated(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    model = CivitaiModel(
        id=321,
        name="m",
        type="LORA",
        creator_username="c",
        tags=[],
        model_versions=[
            CivitaiModelVersion(
                id=11,
                name="v1",
                base_model="SDXL 1.0",
                trained_words=[],
                images=[
                    {"type": "image", "url": "https://example.test/cover.jpg", "width": 1024, "height": 1024},
                    {"type": "video", "url": "https://example.test/cover.mp4", "width": 1024, "height": 1024},
                ],
                files=[],
            ),
        ],
    )

    def fake_poster(url: str, dest_jpg: Path, *, headers=None) -> bool:
        assert url.endswith(".mp4")
        dest_jpg.parent.mkdir(parents=True, exist_ok=True)
        dest_jpg.write_bytes(b"poster")
        return True

    class FailIfImageFetchClient:
        def __init__(self, *args, **kwargs):
            raise AssertionError("image cover fetch should not run when video poster succeeded")

    monkeypatch.setattr("at_comfy.enrichment.poster_jpeg_from_video_url", fake_poster)
    monkeypatch.setattr("at_comfy.enrichment.httpx.AsyncClient", FailIfImageFetchClient)

    await _fetch_cover(77, model, ATComfyConfig(generate_video_posters=True, download_example_videos=False))

    cov = tmp_comfy_base / "at_cache" / "covers"
    assert (cov / "77.jpg").read_bytes() == b"poster"
    assert not (cov / "77.mp4").exists()

