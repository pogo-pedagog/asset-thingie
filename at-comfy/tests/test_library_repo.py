"""Library list/search SQL."""

from __future__ import annotations

from pathlib import Path

from at_comfy.db import get_conn
from at_comfy.library_repo import count_assets, list_assets


def _insert_asset(
    conn,
    *,
    path: Path,
    stem: str,
    display_name: str,
    content_type: str = "LORA",
    category: str | None = None,
    title: str | None = None,
    creator: str | None = None,
) -> None:
    now = "2025-01-01T00:00:00Z"
    sp = str(path.resolve())
    conn.execute(
        """
        INSERT INTO library_files (
            path, filename, stem, sha256, content_type, family, file_size_bytes, mtime, scanned_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, f"{stem}.safetensors", stem, "AA", content_type, "lora", 10, 1.0, now),
    )
    conn.execute(
        """
        INSERT INTO library_assets (
            primary_path, display_name, content_type, family, category, trigger_words, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (sp, display_name, content_type, "lora", category, "[]", now, now),
    )
    aid_row = conn.execute("SELECT asset_id FROM library_assets WHERE primary_path = ?", (sp,)).fetchone()
    assert aid_row is not None
    aid = int(aid_row["asset_id"])
    if title is not None or creator is not None:
        conn.execute(
            """
            INSERT INTO source_metadata (
                asset_id, source, external_model_id, title, creator_name,
                source_url, description_html, raw_snapshot_json, fetched_at
            ) VALUES (?, 'civitai', '1', ?, ?, '', NULL, NULL, ?)
            """,
            (aid, title or "", creator or "", now),
        )
    conn.commit()


def test_path_prefix_matches_exact_file_path(tmp_comfy_base: Path) -> None:
    conn = get_conn()
    root = tmp_comfy_base / "loras"
    a = root / "folder" / "a.safetensors"
    a.parent.mkdir(parents=True)
    _insert_asset(conn, path=a, stem="a", display_name="A")
    prefix = str(a.parent.resolve())
    assert count_assets(path_prefix=prefix, family="lora") == 1
    rows = list_assets(path_prefix=prefix, family="lora", limit=10)
    assert len(rows) == 1


def test_search_name_scope(tmp_comfy_base: Path) -> None:
    conn = get_conn()
    root = tmp_comfy_base / "loras"
    p1 = root / "a.safetensors"
    p2 = root / "b.safetensors"
    root.mkdir(parents=True)
    _insert_asset(conn, path=p1, stem="a", display_name="alpha")
    _insert_asset(conn, path=p2, stem="b", display_name="beta", title="alpha civitai title")
    assert count_assets(q="name:alpha", family="lora") == 2


def test_search_comma_and_terms(tmp_comfy_base: Path) -> None:
    conn = get_conn()
    root = tmp_comfy_base / "loras"
    p1 = root / "only.safetensors"
    root.mkdir(parents=True)
    _insert_asset(conn, path=p1, stem="only", display_name="foo bar", category="Anime")
    assert count_assets(q="foo, category:Anime", family="lora") == 1
    assert count_assets(q="foo, category:Portrait", family="lora") == 0
