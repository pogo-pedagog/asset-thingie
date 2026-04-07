"""SQLite schema smoke tests."""

from __future__ import annotations

import sqlite3

from at_comfy.db import db_conn_for_tests


def test_migrate_creates_core_tables(tmp_path) -> None:
    db_file = tmp_path / "t.db"
    db_conn_for_tests(db_file)
    conn = sqlite3.connect(str(db_file))
    try:
        ver = conn.execute("PRAGMA user_version").fetchone()[0]
        assert ver >= 2
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
        ):
            assert need in names
    finally:
        conn.close()
