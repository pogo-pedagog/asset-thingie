"""SQLite schema smoke tests."""

from __future__ import annotations

import logging
import sqlite3

import pytest
from at_comfy.db import db_conn_for_tests
from at_comfy.schema import _schema_v1, _schema_v2, _set_user_version, migrate


def test_migrate_creates_core_tables(tmp_path) -> None:
    db_file = tmp_path / "t.db"
    db_conn_for_tests(db_file)
    conn = sqlite3.connect(str(db_file))
    try:
        ver = conn.execute("PRAGMA user_version").fetchone()[0]
        assert ver == 6
        names = {
            r[0]
            for r in conn.execute(
                "SELECT name FROM sqlite_master WHERE type='table'",
            ).fetchall()
        }
        for need in (
            "library_files",
            "library_assets",
            "download_tasks",
            "source_metadata",
            "civarchive_base_models",
            "civitai_base_models",
        ):
            assert need in names
    finally:
        conn.close()


def test_schema_v4_adds_raw_snapshot_json_when_missing(tmp_path) -> None:
    """Older DBs can lack ``raw_snapshot_json`` while still at a high ``user_version``."""
    db_file = tmp_path / "legacy.db"
    conn = sqlite3.connect(str(db_file))
    try:
        conn.execute("CREATE TABLE source_metadata (asset_id INTEGER PRIMARY KEY NOT NULL)")
        _set_user_version(conn, 3)
        conn.commit()
        migrate(conn)
        cols = {str(r[1]) for r in conn.execute("PRAGMA table_info(source_metadata)").fetchall()}
        assert "raw_snapshot_json" in cols
        assert conn.execute("PRAGMA user_version").fetchone()[0] == 6
    finally:
        conn.close()


def test_schema_v3_backfills_video_example_paths(tmp_path, monkeypatch: pytest.MonkeyPatch) -> None:
    """Pre-v3 video rows only had ``local_path``; v3 backfill sets playback/poster columns."""
    base = tmp_path / "comfy"
    base.mkdir(parents=True)
    monkeypatch.setattr("at_comfy.config.comfy_base_path", lambda: base.resolve())

    db_file = base / "at.db"
    conn = sqlite3.connect(str(db_file))
    try:
        conn.row_factory = sqlite3.Row
        _schema_v1(conn)
        _schema_v2(conn)
        _set_user_version(conn, 2)
        now = "2026-01-01T00:00:00Z"
        conn.execute(
            """
            INSERT INTO library_files (
                path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "lora.sft"), "lora.sft", "lora", "x", "LORA", "lora", 1, 1.0, now),
        )
        conn.execute(
            """
            INSERT INTO library_assets (
                primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "lora.sft"), "L", "LORA", "lora", "[]", now, now),
        )
        aid = int(conn.execute("SELECT asset_id FROM library_assets LIMIT 1").fetchone()[0])
        ex_dir = base / "at_cache" / "examples" / str(aid)
        ex_dir.mkdir(parents=True)
        (ex_dir / "003.mp4").write_bytes(b"v")

        conn.execute(
            """
            INSERT INTO example_media (
                asset_id, media_type, origin_type, local_path, source_url,
                width, height, caption, metadata_json, sort_order,
                thumbnail_local_path, created_at
            ) VALUES (?, 'video', 'civitai', '003.poster.jpg', 'https://c.test/a.mp4',
                640, 480, NULL, NULL, 0, NULL, ?)
            """,
            (aid, now),
        )
        conn.commit()

        migrate(conn)
        conn.commit()
        row = conn.execute(
            "SELECT playback_local_path, poster_local_path, local_path FROM example_media WHERE asset_id = ?",
            (aid,),
        ).fetchone()
        assert row is not None
        assert row["poster_local_path"] == "003.poster.jpg"
        assert row["playback_local_path"] == "003.mp4"
    finally:
        conn.close()


def test_schema_v3_backfills_playback_when_local_path_is_video_file(
    tmp_path, monkeypatch: pytest.MonkeyPatch
) -> None:
    base = tmp_path / "comfy2"
    base.mkdir(parents=True)
    monkeypatch.setattr("at_comfy.config.comfy_base_path", lambda: base.resolve())

    db_file = base / "at.db"
    conn = sqlite3.connect(str(db_file))
    try:
        conn.row_factory = sqlite3.Row
        _schema_v1(conn)
        _schema_v2(conn)
        _set_user_version(conn, 2)
        now = "2026-01-01T00:00:00Z"
        conn.execute(
            """
            INSERT INTO library_files (
                path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "x.sft"), "x.sft", "x", "y", "LORA", "lora", 1, 1.0, now),
        )
        conn.execute(
            """
            INSERT INTO library_assets (
                primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "x.sft"), "X", "LORA", "lora", "[]", now, now),
        )
        aid = int(conn.execute("SELECT asset_id FROM library_assets LIMIT 1").fetchone()[0])
        conn.execute(
            """
            INSERT INTO example_media (
                asset_id, media_type, origin_type, local_path, source_url,
                width, height, caption, metadata_json, sort_order,
                thumbnail_local_path, created_at
            ) VALUES (?, 'video', 'civitai', '001.webm', 'https://c.test/v.webm',
                640, 480, NULL, NULL, 0, NULL, ?)
            """,
            (aid, now),
        )
        conn.commit()
        migrate(conn)
        row = conn.execute(
            "SELECT playback_local_path, poster_local_path FROM example_media WHERE asset_id = ?",
            (aid,),
        ).fetchone()
        assert row["playback_local_path"] == "001.webm"
        assert row["poster_local_path"] is None
    finally:
        conn.close()


def test_schema_v3_backfill_warns_when_poster_has_no_video(
    tmp_path, monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    base = tmp_path / "comfy3"
    base.mkdir(parents=True)
    monkeypatch.setattr("at_comfy.config.comfy_base_path", lambda: base.resolve())

    db_file = base / "at.db"
    conn = sqlite3.connect(str(db_file))
    try:
        conn.row_factory = sqlite3.Row
        _schema_v1(conn)
        _schema_v2(conn)
        _set_user_version(conn, 2)
        now = "2026-01-01T00:00:00Z"
        conn.execute(
            """
            INSERT INTO library_files (
                path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "m.sft"), "m.sft", "m", "h", "LORA", "lora", 1, 1.0, now),
        )
        conn.execute(
            """
            INSERT INTO library_assets (
                primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "m.sft"), "M", "LORA", "lora", "[]", now, now),
        )
        aid = int(conn.execute("SELECT asset_id FROM library_assets LIMIT 1").fetchone()[0])
        ex_dir = base / "at_cache" / "examples" / str(aid)
        ex_dir.mkdir(parents=True)
        # Poster on disk but no 007.{mp4,webm,mov,mkv} — backfill must not guess and should log.

        conn.execute(
            """
            INSERT INTO example_media (
                asset_id, media_type, origin_type, local_path, source_url,
                width, height, caption, metadata_json, sort_order,
                thumbnail_local_path, created_at
            ) VALUES (?, 'video', 'civitai', '007.poster.jpg', 'https://c.test/x.mp4',
                640, 480, NULL, NULL, 0, NULL, ?)
            """,
            (aid, now),
        )
        conn.commit()

        with caplog.at_level(logging.WARNING):
            migrate(conn)
        row = conn.execute(
            "SELECT playback_local_path, poster_local_path FROM example_media WHERE asset_id = ?",
            (aid,),
        ).fetchone()
        assert row["poster_local_path"] == "007.poster.jpg"
        assert row["playback_local_path"] is None
        assert "no matching video file" in caplog.text
        assert str(ex_dir) in caplog.text
    finally:
        conn.close()


def test_schema_v3_backfill_warns_when_multiple_videos_share_stem(
    tmp_path, monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    base = tmp_path / "comfy4"
    base.mkdir(parents=True)
    monkeypatch.setattr("at_comfy.config.comfy_base_path", lambda: base.resolve())

    db_file = base / "at.db"
    conn = sqlite3.connect(str(db_file))
    try:
        conn.row_factory = sqlite3.Row
        _schema_v1(conn)
        _schema_v2(conn)
        _set_user_version(conn, 2)
        now = "2026-01-01T00:00:00Z"
        conn.execute(
            """
            INSERT INTO library_files (
                path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "d.sft"), "d.sft", "d", "z", "LORA", "lora", 1, 1.0, now),
        )
        conn.execute(
            """
            INSERT INTO library_assets (
                primary_path, display_name, content_type, family, trigger_words, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (str(base / "d.sft"), "D", "LORA", "lora", "[]", now, now),
        )
        aid = int(conn.execute("SELECT asset_id FROM library_assets LIMIT 1").fetchone()[0])
        ex_dir = base / "at_cache" / "examples" / str(aid)
        ex_dir.mkdir(parents=True)
        (ex_dir / "009.webm").write_bytes(b"w")
        (ex_dir / "009.mp4").write_bytes(b"p")

        conn.execute(
            """
            INSERT INTO example_media (
                asset_id, media_type, origin_type, local_path, source_url,
                width, height, caption, metadata_json, sort_order,
                thumbnail_local_path, created_at
            ) VALUES (?, 'video', 'civitai', '009.poster.jpg', 'https://c.test/x.mp4',
                640, 480, NULL, NULL, 0, NULL, ?)
            """,
            (aid, now),
        )
        conn.commit()

        with caplog.at_level(logging.WARNING):
            migrate(conn)
        row = conn.execute(
            "SELECT playback_local_path FROM example_media WHERE asset_id = ?",
            (aid,),
        ).fetchone()
        assert row["playback_local_path"] == "009.mp4"
        assert "multiple local videos" in caplog.text
    finally:
        conn.close()
