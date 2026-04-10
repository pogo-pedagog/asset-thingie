"""Cover URL helpers for list/detail API."""

from __future__ import annotations

import sqlite3
from json import dumps
from pathlib import Path

from at_comfy.config import ATComfyConfig
from at_comfy.serial import asset_row_to_dict, cover_urls_for_asset


def test_cover_urls_image_only(tmp_comfy_base: Path) -> None:
    cov = tmp_comfy_base / "at_cache" / "covers"
    cov.mkdir(parents=True)
    (cov / "5.jpg").write_bytes(b"jpeg")
    d = cover_urls_for_asset(5)
    assert d["cover_url"] == "/at/cache/covers/5.jpg"
    assert d["cover_playback_url"] is None
    assert d["cover_media_type"] == "image"


def test_cover_urls_with_video_file(tmp_comfy_base: Path) -> None:
    cov = tmp_comfy_base / "at_cache" / "covers"
    cov.mkdir(parents=True)
    (cov / "8.jpg").write_bytes(b"jpeg")
    (cov / "8.mp4").write_bytes(b"mp4")
    d = cover_urls_for_asset(8)
    assert d["cover_url"] == "/at/cache/covers/8.jpg"
    assert d["cover_playback_url"] == "/at/cache/covers/8.mp4"
    assert d["cover_media_type"] == "video"


def test_asset_row_to_dict_uses_remote_cover_video_when_no_local_mp4(tmp_comfy_base: Path) -> None:
    cov = tmp_comfy_base / "at_cache" / "covers"
    cov.mkdir(parents=True)
    (cov / "9.jpg").write_bytes(b"jpeg")

    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE rows (
            asset_id INTEGER,
            primary_path TEXT,
            display_name TEXT,
            filename TEXT,
            stem TEXT,
            content_type TEXT,
            base_model TEXT,
            category TEXT,
            notes TEXT,
            trigger_words TEXT,
            default_strength REAL,
            is_favorite INTEGER,
            usage_count INTEGER,
            last_used_at TEXT,
            mtime REAL,
            sha256 TEXT,
            source_url TEXT,
            creator_name TEXT,
            title TEXT,
            raw_snapshot_json TEXT,
            asset_tag_names TEXT,
            cover_example_id INTEGER,
            user_edited INTEGER
        )
        """
    )
    snapshot = dumps(
        {
            "model": {
                "modelVersions": [
                    {
                        "id": 123,
                        "images": [
                            {"type": "video", "url": "https://c.example/cover.mp4"},
                            {"type": "image", "url": "https://c.example/cover.jpg"},
                        ],
                    }
                ]
            },
            "version": {"id": 123},
        }
    )
    conn.execute(
        """
        INSERT INTO rows VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            9,
            str(tmp_comfy_base / "loras" / "x.safetensors"),
            "n",
            "x.safetensors",
            "x",
            "LORA",
            None,
            None,
            None,
            "[]",
            1.0,
            0,
            0,
            None,
            0.0,
            "AA",
            "https://civitai.com/models/1",
            "c",
            "t",
            snapshot,
            None,
            None,
            0,
        ),
    )
    row = conn.execute("SELECT * FROM rows").fetchone()
    d = asset_row_to_dict(row, ATComfyConfig())
    assert d["cover_url"] == "/at/cache/covers/9.jpg"
    assert d["cover_playback_url"] == "https://c.example/cover.mp4"
    assert d["cover_media_type"] == "video"
