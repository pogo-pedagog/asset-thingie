"""example_media JSON for detail API (metadata_json shapes)."""

from __future__ import annotations

import json
import sqlite3

from at_comfy.serial import example_media_to_dict


def test_example_media_to_dict_unwraps_nested_civitai_meta() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE example_media (
            example_media_id INTEGER,
            asset_id INTEGER,
            media_type TEXT,
            origin_type TEXT,
            local_path TEXT,
            source_url TEXT,
            width INTEGER,
            height INTEGER,
            caption TEXT,
            metadata_json TEXT,
            sort_order INTEGER,
            thumbnail_local_path TEXT,
            playback_local_path TEXT,
            poster_local_path TEXT
        )
        """
    )
    nested = json.dumps({"id": 99, "meta": {"prompt": "hello", "steps": 20}})
    conn.execute(
        """
        INSERT INTO example_media VALUES
        (1, 7, 'image', 'civitai', '001.jpg', '', 512, 512, NULL, ?, 0, '001.thumb.jpg', NULL, NULL)
        """,
        (nested,),
    )
    row = conn.execute("SELECT * FROM example_media").fetchone()
    d = example_media_to_dict(row, 7)
    gp = d["generation_params"]
    assert gp is not None
    assert gp["prompt"] == "hello"
    assert gp["steps"] == 20


def test_example_media_to_dict_video_urls() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE example_media (
            example_media_id INTEGER,
            asset_id INTEGER,
            media_type TEXT,
            origin_type TEXT,
            local_path TEXT,
            source_url TEXT,
            width INTEGER,
            height INTEGER,
            caption TEXT,
            metadata_json TEXT,
            sort_order INTEGER,
            thumbnail_local_path TEXT,
            playback_local_path TEXT,
            poster_local_path TEXT
        )
        """
    )
    conn.execute(
        """
        INSERT INTO example_media VALUES
        (2, 7, 'video', 'civitai', '001.poster.jpg', 'https://c.example/v.mp4', 640, 480, NULL, NULL,
         0, '001.thumb.jpg', '001.mp4', '001.poster.jpg')
        """
    )
    row = conn.execute("SELECT * FROM example_media WHERE example_media_id = 2").fetchone()
    d = example_media_to_dict(row, 7)
    assert d["media_type"] == "video"
    assert d["playback_url"] == "/at/cache/examples/7/001.mp4"
    assert d["poster_url"] == "/at/cache/examples/7/001.poster.jpg"
    assert d["url"] == "/at/cache/examples/7/001.mp4"
    assert d["thumbnail_url"] == "/at/cache/examples/7/001.thumb.jpg"


def test_example_media_to_dict_video_remote_playback_fallback() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE example_media (
            example_media_id INTEGER,
            asset_id INTEGER,
            media_type TEXT,
            origin_type TEXT,
            local_path TEXT,
            source_url TEXT,
            width INTEGER,
            height INTEGER,
            caption TEXT,
            metadata_json TEXT,
            sort_order INTEGER,
            thumbnail_local_path TEXT,
            playback_local_path TEXT,
            poster_local_path TEXT
        )
        """
    )
    conn.execute(
        """
        INSERT INTO example_media VALUES
        (3, 7, 'video', 'civitai', '001.poster.jpg', 'https://c.example/v.mp4', 640, 480, NULL, NULL,
         0, '001.thumb.jpg', NULL, '001.poster.jpg')
        """
    )
    row = conn.execute("SELECT * FROM example_media WHERE example_media_id = 3").fetchone()
    d = example_media_to_dict(row, 7)
    assert d["media_type"] == "video"
    assert d["playback_url"] == "https://c.example/v.mp4"
    assert d["poster_url"] == "/at/cache/examples/7/001.poster.jpg"
    assert d["url"] == "/at/cache/examples/7/001.poster.jpg"
    assert d["thumbnail_url"] == "/at/cache/examples/7/001.thumb.jpg"
