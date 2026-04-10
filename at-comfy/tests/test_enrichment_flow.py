"""Enrichment DB writes (no network)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import pytest
from at_comfy.civitai.models import CivitaiModel, CivitaiModelVersion
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.enrichment import (
    EnrichmentService,
    _example_media_source_key,
    _fetch_cover,
    _upsert_example_row,
    apply_civarchive_catalog_to_asset,
)


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


@pytest.mark.asyncio
async def test_fetch_cover_falls_back_to_image_when_video_poster_fails(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    model = CivitaiModel(
        id=322,
        name="m",
        type="LORA",
        creator_username="c",
        tags=[],
        model_versions=[
            CivitaiModelVersion(
                id=12,
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

    def poster_from_file_fails(video: Path, dest_jpg: Path) -> bool:
        return False

    def poster_fails(url: str, dest_jpg: Path, *, headers=None) -> bool:
        return False

    image_payload = b"\xff\xd8_fallback_from_image"

    cov = tmp_comfy_base / "at_cache" / "covers"
    cov.mkdir(parents=True, exist_ok=True)
    (cov / "78.mp4").write_bytes(b"prior_cached_mp4")

    class FakeImageOnlyClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *args):
            pass

        async def get(self, url, headers=None):
            class R:
                is_success = True
                content = image_payload

            return R()

    monkeypatch.setattr("at_comfy.enrichment.poster_jpeg_from_video_file", poster_from_file_fails)
    monkeypatch.setattr("at_comfy.enrichment.poster_jpeg_from_video_url", poster_fails)
    monkeypatch.setattr("at_comfy.enrichment.httpx.AsyncClient", FakeImageOnlyClient)

    await _fetch_cover(78, model, ATComfyConfig(generate_video_posters=True, download_example_videos=False))

    assert (cov / "78.jpg").read_bytes() == image_payload
    assert (cov / "78.mp4").read_bytes() == b"prior_cached_mp4"


@pytest.mark.asyncio
async def test_fetch_cover_image_fallback_keeps_downloaded_mp4(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    model = CivitaiModel(
        id=323,
        name="m",
        type="LORA",
        creator_username="c",
        tags=[],
        model_versions=[
            CivitaiModelVersion(
                id=13,
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

    def poster_from_file_fails(video: Path, dest_jpg: Path) -> bool:
        return False

    image_payload = b"\xff\xd8_fallback_with_mp4"

    class FakeVideoThenImageClient:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *args):
            pass

        async def get(self, url, headers=None):
            u = str(url)

            class R:
                pass

            r = R()
            if u.endswith(".mp4"):
                r.is_success = True
                r.content = b"local_mp4_bytes"
            else:
                r.is_success = True
                r.content = image_payload
            return r

    monkeypatch.setattr("at_comfy.enrichment.poster_jpeg_from_video_file", poster_from_file_fails)
    monkeypatch.setattr("at_comfy.enrichment.httpx.AsyncClient", FakeVideoThenImageClient)

    await _fetch_cover(
        79,
        model,
        ATComfyConfig(generate_video_posters=True, download_example_videos=True),
    )

    cov = tmp_comfy_base / "at_cache" / "covers"
    assert (cov / "79.jpg").read_bytes() == image_payload
    assert (cov / "79.mp4").read_bytes() == b"local_mp4_bytes"


@pytest.mark.asyncio
async def test_fetch_cover_downloaded_mp4_falls_back_to_url_poster_when_file_extract_fails(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    """If local ffmpeg frame grab fails, still try URL-based poster (video-only cover)."""
    model = CivitaiModel(
        id=324,
        name="m",
        type="LORA",
        creator_username="c",
        tags=[],
        model_versions=[
            CivitaiModelVersion(
                id=14,
                name="v1",
                base_model="SDXL 1.0",
                trained_words=[],
                images=[
                    {"type": "video", "url": "https://example.test/cover.mp4", "width": 1024, "height": 1024},
                ],
                files=[],
            ),
        ],
    )

    def poster_from_file_fails(video: Path, dest_jpg: Path) -> bool:
        return False

    def poster_from_url_ok(url: str, dest_jpg: Path, *, headers=None) -> bool:
        assert url.endswith(".mp4")
        dest_jpg.parent.mkdir(parents=True, exist_ok=True)
        dest_jpg.write_bytes(b"\xff\xd8_from_url_poster")
        return True

    class FakeMp4Client:
        def __init__(self, *args, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *args):
            pass

        async def get(self, url, headers=None):
            u = str(url)

            class R:
                is_success = True
                content = b"downloaded_mp4" if u.endswith(".mp4") else b""

            return R()

    monkeypatch.setattr("at_comfy.enrichment.poster_jpeg_from_video_file", poster_from_file_fails)
    monkeypatch.setattr("at_comfy.enrichment.poster_jpeg_from_video_url", poster_from_url_ok)
    monkeypatch.setattr("at_comfy.enrichment.httpx.AsyncClient", FakeMp4Client)

    await _fetch_cover(
        80,
        model,
        ATComfyConfig(generate_video_posters=True, download_example_videos=True),
    )

    cov = tmp_comfy_base / "at_cache" / "covers"
    assert (cov / "80.jpg").read_bytes() == b"\xff\xd8_from_url_poster"
    assert (cov / "80.mp4").read_bytes() == b"downloaded_mp4"


def test_example_media_upsert_dedupes_width_query_variants(tmp_comfy_base: Path) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "ex.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "ex.safetensors", "ex", "BB", "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "n", "LORA", "lora", "[]", now, now),
    )
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])
    conn.execute(
        """
        INSERT INTO example_media (
            asset_id, media_type, origin_type, local_path, source_url,
            width, height, caption, metadata_json, sort_order,
            thumbnail_local_path, playback_local_path, poster_local_path, created_at
        ) VALUES (?, 'image', 'civitai', '001.jpg', ?, 1024, 1024, NULL, NULL, 0,
                  NULL, NULL, NULL, ?)
        """,
        (aid, "https://image.example/img?width=512", now),
    )
    conn.commit()

    key = _example_media_source_key("image", "https://image.example/img?width=200", natural_width=1024)
    _upsert_example_row(
        conn,
        asset_id=aid,
        media_type="image",
        source_url=key,
        local_path="002.jpg",
        thumb_name="002.thumb.jpg",
        playback_name=None,
        poster_name=None,
        caption=None,
        meta_json=None,
        sort_order=1,
        width=1024,
        height=1024,
        now=now,
    )
    conn.commit()
    n = int(conn.execute("SELECT COUNT(*) AS n FROM example_media WHERE asset_id = ?", (aid,)).fetchone()["n"])
    assert n == 1
    row = conn.execute("SELECT local_path, source_url FROM example_media WHERE asset_id = ?", (aid,)).fetchone()
    assert row["local_path"] == "002.jpg"
    assert row["source_url"] == key


@pytest.mark.asyncio
async def test_enrich_asset_civarchive_fallback_after_civitai_miss(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "ca_fb.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    hx = "a" * 64
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "ca_fb.safetensors", "ca_fb", hx, "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "local", "LORA", "lora", "[]", now, now),
    )
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])
    conn.commit()

    class FakeCivitai:
        def __init__(self, *a, **k):
            pass

        async def model_version_by_hash(self, sha):
            return None

        async def aclose(self):
            pass

    monkeypatch.setattr("at_comfy.enrichment.CivitaiClient", FakeCivitai)

    class FakeCivArchive:
        def __init__(self, *a, **k):
            pass

        async def get_by_sha256(self, hx_arg):
            assert hx_arg == hx.lower()
            return {"model": {"id": 501, "version": {"id": 902}}}

        async def get_model(self, mid, vid):
            return {
                "id": mid,
                "name": "CA LoRA",
                "type": "LORA",
                "username": "u1",
                "tags": ["arch"],
                "is_nsfw": False,
                "version": {
                    "id": vid,
                    "name": "v1",
                    "baseModel": "SD 1.5",
                    "trigger": ["tw"],
                    "files": [],
                    "images": [{"image_url": "https://example.test/img.jpg"}],
                },
            }

        async def aclose(self):
            pass

    monkeypatch.setattr("at_comfy.enrichment.CivArchiveClient", FakeCivArchive)

    gallery_calls: list[dict[str, Any]] = []

    async def capture_gallery(**kwargs: Any) -> None:
        gallery_calls.append(kwargs)

    monkeypatch.setattr("at_comfy.enrichment._fetch_civitai_cover_and_example_gallery", capture_gallery)

    svc = EnrichmentService()
    await svc.enrich_asset(aid, ATComfyConfig())

    sm = conn.execute(
        "SELECT source, title, source_url FROM source_metadata WHERE asset_id = ?",
        (aid,),
    ).fetchone()
    assert sm is not None
    assert sm["source"] == "civarchive"
    assert sm["title"] == "CA LoRA"
    assert "civarchive.com/models/501" in (sm["source_url"] or "")
    assert "modelVersionId=902" in (sm["source_url"] or "")
    lf = conn.execute("SELECT enrichment_status FROM library_files WHERE path = ?", (sp,)).fetchone()
    assert lf["enrichment_status"] == "found"
    assert len(gallery_calls) == 1
    assert gallery_calls[0]["rich_gallery"] is False
    assert gallery_calls[0]["client"] is None


@pytest.mark.asyncio
async def test_enrich_asset_skips_civarchive_when_fallback_disabled(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "no_ca.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    hx = "b" * 64
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "no_ca.safetensors", "no_ca", hx, "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "local", "LORA", "lora", "[]", now, now),
    )
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])
    conn.commit()

    class FakeCivitai:
        def __init__(self, *a, **k):
            pass

        async def model_version_by_hash(self, sha):
            return None

        async def aclose(self):
            pass

    monkeypatch.setattr("at_comfy.enrichment.CivitaiClient", FakeCivitai)

    def boom_civarchive(*a: Any, **k: Any) -> None:
        raise AssertionError("CivArchiveClient should not be constructed when fallback is off")

    monkeypatch.setattr("at_comfy.enrichment.CivArchiveClient", boom_civarchive)

    svc = EnrichmentService()
    await svc.enrich_asset(aid, ATComfyConfig(enrichment_civarchive_fallback=False))

    assert conn.execute("SELECT 1 FROM source_metadata WHERE asset_id = ?", (aid,)).fetchone() is None
    lf = conn.execute("SELECT enrichment_status FROM library_files WHERE path = ?", (sp,)).fetchone()
    assert lf["enrichment_status"] == "not_found"


@pytest.mark.asyncio
async def test_apply_civarchive_catalog_to_asset_sets_source_and_file_id(
    tmp_comfy_base: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    """Post-download path uses same catalog apply as enrichment; persists CivArchive file id."""
    conn = get_conn()
    p = tmp_comfy_base / "loras" / "ca_dl_meta.safetensors"
    p.parent.mkdir(parents=True)
    now = "2025-01-01T00:00:00Z"
    sp = str(p.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "ca_dl_meta.safetensors", "ca_dl_meta", "c" * 64, "LORA", "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, "local", "LORA", "lora", "[]", now, now),
    )
    aid = int(conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()[0])
    conn.commit()

    raw_model = {
        "id": 601,
        "name": "DL Meta LoRA",
        "type": "LORA",
        "username": "creator_dl",
        "tags": ["x"],
        "is_nsfw": False,
        "version": {
            "id": 702,
            "name": "v1",
            "baseModel": "SDXL 1.0",
            "trigger": ["word"],
            "files": [{"id": 55, "name": "w.safetensors", "is_primary": True}],
            "images": [{"image_url": "https://example.test/dl.jpg"}],
        },
    }

    async def noop_gallery(**kwargs: Any) -> None:
        pass

    monkeypatch.setattr("at_comfy.enrichment._fetch_civitai_cover_and_example_gallery", noop_gallery)

    ok = await apply_civarchive_catalog_to_asset(
        asset_id=aid,
        raw_model=raw_model,
        cfg=ATComfyConfig(),
        primary_path=sp,
        external_file_id="55",
    )
    assert ok is True
    sm = conn.execute(
        "SELECT source, title, external_file_id, source_url FROM source_metadata WHERE asset_id = ?",
        (aid,),
    ).fetchone()
    assert sm["source"] == "civarchive"
    assert sm["title"] == "DL Meta LoRA"
    assert sm["external_file_id"] == "55"
    assert "civarchive.com/models/601" in (sm["source_url"] or "")
    assert "modelVersionId=702" in (sm["source_url"] or "")
    lf = conn.execute("SELECT enrichment_status FROM library_files WHERE path = ?", (sp,)).fetchone()
    assert lf["enrichment_status"] == "found"

