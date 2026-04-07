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
            thumbnail_local_path TEXT
        )
        """
    )
    nested = json.dumps({"id": 99, "meta": {"prompt": "hello", "steps": 20}})
    conn.execute(
        """
        INSERT INTO example_media VALUES
        (1, 7, 'image', 'civitai', '001.jpg', '', 512, 512, NULL, ?, 0, '001.thumb.jpg')
        """,
        (nested,),
    )
    row = conn.execute("SELECT * FROM example_media").fetchone()
    d = example_media_to_dict(row, 7)
    gp = d["generation_params"]
    assert gp is not None
    assert gp["prompt"] == "hello"
    assert gp["steps"] == 20
