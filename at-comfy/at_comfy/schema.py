"""SQLite DDL and migrations (``PRAGMA user_version``)."""

from __future__ import annotations

import logging
import sqlite3
from collections.abc import Callable
from pathlib import Path

logger = logging.getLogger(__name__)

_VIDEO_FILE_SUFFIXES = (".mp4", ".webm", ".mov", ".mkv")


def _user_version(conn: sqlite3.Connection) -> int:
    row = conn.execute("PRAGMA user_version").fetchone()
    return int(row[0]) if row else 0


def _set_user_version(conn: sqlite3.Connection, v: int) -> None:
    conn.execute(f"PRAGMA user_version = {int(v)}")


def _schema_v1(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        CREATE TABLE library_files (
            path TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            stem TEXT NOT NULL,
            sha256 TEXT,
            content_type TEXT,
            family TEXT,
            file_size_bytes INTEGER,
            mtime REAL NOT NULL,
            source TEXT,
            civitai_model_id INTEGER,
            civitai_version_id INTEGER,
            scanned_at TEXT NOT NULL,
            enrichment_status TEXT
        );
        CREATE INDEX idx_lf_sha ON library_files(sha256);
        CREATE INDEX idx_lf_family ON library_files(family);
        CREATE INDEX idx_lf_civitai ON library_files(civitai_model_id);

        CREATE TABLE library_assets (
            asset_id INTEGER PRIMARY KEY AUTOINCREMENT,
            primary_path TEXT NOT NULL UNIQUE,
            display_name TEXT,
            content_type TEXT,
            family TEXT,
            base_model TEXT,
            category TEXT,
            is_favorite INTEGER NOT NULL DEFAULT 0,
            notes TEXT,
            trigger_words TEXT,
            default_strength REAL,
            usage_count INTEGER NOT NULL DEFAULT 0,
            last_used_at TEXT,
            cover_media_id INTEGER,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            user_edited INTEGER NOT NULL DEFAULT 0
        );
        CREATE INDEX idx_assets_path ON library_assets(primary_path);
        CREATE INDEX idx_assets_family ON library_assets(family);
        CREATE INDEX idx_assets_base_model ON library_assets(base_model);

        CREATE TABLE source_metadata (
            asset_id INTEGER PRIMARY KEY REFERENCES library_assets(asset_id) ON DELETE CASCADE,
            source TEXT NOT NULL,
            external_model_id TEXT,
            external_version_id TEXT,
            external_file_id TEXT,
            creator_name TEXT,
            source_url TEXT,
            title TEXT,
            description_html TEXT,
            raw_snapshot_json TEXT,
            fetched_at TEXT NOT NULL
        );
        CREATE INDEX idx_source_meta_source ON source_metadata(source);

        CREATE TABLE example_media (
            example_media_id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_id INTEGER NOT NULL REFERENCES library_assets(asset_id) ON DELETE CASCADE,
            media_type TEXT NOT NULL DEFAULT 'image',
            origin_type TEXT NOT NULL DEFAULT 'civitai',
            local_path TEXT,
            source_url TEXT,
            width INTEGER,
            height INTEGER,
            caption TEXT,
            metadata_json TEXT,
            sort_order INTEGER NOT NULL DEFAULT 0,
            sha256 TEXT,
            thumbnail_local_path TEXT,
            created_at TEXT NOT NULL
        );
        CREATE INDEX idx_example_media_asset ON example_media(asset_id);

        CREATE TABLE tags (
            tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL COLLATE NOCASE UNIQUE
        );

        CREATE TABLE asset_tags (
            asset_id INTEGER NOT NULL REFERENCES library_assets(asset_id) ON DELETE CASCADE,
            tag_id INTEGER NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
            origin TEXT NOT NULL DEFAULT 'source',
            UNIQUE(asset_id, tag_id)
        );
        CREATE INDEX idx_asset_tags_tag ON asset_tags(tag_id);

        CREATE TABLE trigger_words (
            trigger_word_id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL,
            asset_id INTEGER NOT NULL REFERENCES library_assets(asset_id) ON DELETE CASCADE,
            UNIQUE(word, asset_id)
        );
        CREATE INDEX idx_tw_asset ON trigger_words(asset_id);
        CREATE INDEX idx_tw_word ON trigger_words(word);

        CREATE TABLE artifact_metadata (
            artifact_id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_id INTEGER NOT NULL UNIQUE REFERENCES library_assets(asset_id) ON DELETE CASCADE,
            artifact_type TEXT NOT NULL DEFAULT 'safetensors_header',
            raw_metadata TEXT,
            normalized TEXT,
            file_mtime REAL,
            extracted_at TEXT NOT NULL,
            parser_version INTEGER NOT NULL DEFAULT 1
        );
        CREATE INDEX idx_artifact_asset ON artifact_metadata(asset_id);

        CREATE TABLE system_field_values (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_id INTEGER NOT NULL REFERENCES library_assets(asset_id) ON DELETE CASCADE,
            field_key TEXT NOT NULL,
            value_json TEXT,
            UNIQUE(asset_id, field_key)
        );
        CREATE INDEX idx_sfv_asset ON system_field_values(asset_id);

        CREATE TABLE download_tasks (
            id TEXT PRIMARY KEY,
            request_json TEXT NOT NULL,
            state TEXT NOT NULL,
            bytes_done INTEGER NOT NULL DEFAULT 0,
            total_bytes INTEGER,
            error_message TEXT,
            error_code TEXT,
            retry_count INTEGER NOT NULL DEFAULT 0,
            cancel_requested INTEGER NOT NULL DEFAULT 0,
            pause_requested INTEGER NOT NULL DEFAULT 0,
            cover_thumb_path TEXT,
            queue_position INTEGER NOT NULL DEFAULT 0,
            batch_id TEXT,
            ui_order INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
        CREATE INDEX idx_dl_updated ON download_tasks(updated_at DESC);
        CREATE INDEX idx_dl_state ON download_tasks(state);

        CREATE TABLE download_operation_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id TEXT NOT NULL,
            event TEXT NOT NULL,
            detail_json TEXT,
            at TEXT NOT NULL
        );
        CREATE INDEX idx_dl_log_task ON download_operation_log(task_id, id DESC);
        """,
    )


def _schema_v2(conn: sqlite3.Connection) -> None:
    cols = {str(r[1]) for r in conn.execute("PRAGMA table_info(library_assets)").fetchall()}
    if "user_edited" not in cols:
        conn.execute(
            "ALTER TABLE library_assets ADD COLUMN user_edited INTEGER NOT NULL DEFAULT 0",
        )


def _backfill_example_media_video_paths(conn: sqlite3.Connection) -> None:
    """Set ``playback_local_path`` / ``poster_local_path`` for pre-v3 video rows (were only in ``local_path``)."""
    conn.execute(
        """
        UPDATE example_media
        SET playback_local_path = local_path
        WHERE media_type = 'video'
          AND playback_local_path IS NULL
          AND local_path IS NOT NULL
          AND trim(local_path) != ''
          AND (
            lower(local_path) LIKE '%.mp4'
            OR lower(local_path) LIKE '%.webm'
            OR lower(local_path) LIKE '%.mov'
            OR lower(local_path) LIKE '%.mkv'
          )
        """,
    )
    conn.execute(
        """
        UPDATE example_media
        SET poster_local_path = local_path
        WHERE media_type = 'video'
          AND poster_local_path IS NULL
          AND local_path IS NOT NULL
          AND trim(local_path) != ''
          AND instr(local_path, '.poster.') > 0
        """,
    )
    from at_comfy.config import cache_root

    rows = conn.execute(
        """
        SELECT example_media_id, asset_id, local_path
        FROM example_media
        WHERE media_type = 'video'
          AND playback_local_path IS NULL
          AND local_path IS NOT NULL
          AND trim(local_path) != ''
          AND instr(local_path, '.poster.') > 0
        """,
    ).fetchall()
    ex_root = cache_root() / "examples"
    for row in rows:
        lp = str(row["local_path"] or "").strip()
        if ".poster." not in lp:
            continue
        stem, _, rest = lp.partition(".poster.")
        if not stem or not rest:
            continue
        aid = int(row["asset_id"])
        d: Path = ex_root / str(aid)
        for ext in _VIDEO_FILE_SUFFIXES:
            cand = f"{stem}{ext}"
            if (d / cand).is_file():
                conn.execute(
                    "UPDATE example_media SET playback_local_path = ? WHERE example_media_id = ?",
                    (cand, int(row["example_media_id"])),
                )
                break


def _schema_v3(conn: sqlite3.Connection) -> None:
    cols = {str(r[1]) for r in conn.execute("PRAGMA table_info(example_media)").fetchall()}
    if "playback_local_path" not in cols:
        conn.execute("ALTER TABLE example_media ADD COLUMN playback_local_path TEXT")
    if "poster_local_path" not in cols:
        conn.execute("ALTER TABLE example_media ADD COLUMN poster_local_path TEXT")
    _backfill_example_media_video_paths(conn)


def migrate(conn: sqlite3.Connection) -> None:
    """Apply pending migrations in order; each step commits DDL + PRAGMA user_version together."""
    steps: list[tuple[int, Callable[[sqlite3.Connection], None]]] = [
        (1, _schema_v1),
        (2, _schema_v2),
        (3, _schema_v3),
    ]
    for target, schema_fn in steps:
        if _user_version(conn) >= target:
            continue
        logger.info("at_comfy: applying schema v%s", target)
        schema_fn(conn)
        _set_user_version(conn, target)
        conn.commit()
