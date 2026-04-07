"""SQLite access for at_comfy (WAL, single connection per process)."""

from __future__ import annotations

import sqlite3
import threading
from pathlib import Path
from typing import Any

from at_comfy.config import db_path
from at_comfy.schema import migrate

_lock = threading.Lock()
_conn: sqlite3.Connection | None = None


def _open(path: Path) -> sqlite3.Connection:
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(path), check_same_thread=False, isolation_level=None)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    migrate(conn)
    return conn


def get_conn() -> sqlite3.Connection:
    global _conn
    with _lock:
        if _conn is None:
            _conn = _open(db_path())
        return _conn


def reset_conn_for_tests(path: Path | None = None) -> None:
    """Close and re-open DB (tests)."""
    global _conn
    with _lock:
        if _conn is not None:
            try:
                _conn.close()
            except Exception:
                pass
            _conn = None
        if path is not None:
            _conn = _open(path)


def db_conn_for_tests(path: Path) -> sqlite3.Connection:
    """Use a specific DB file (pytest)."""
    reset_conn_for_tests(path)
    return get_conn()


def exec_fetchall(sql: str, params: tuple[Any, ...] = ()) -> list[sqlite3.Row]:
    cur = get_conn().execute(sql, params)
    return list(cur.fetchall())
