"""Persist download tasks to SQLite."""

from __future__ import annotations

import sqlite3
from datetime import UTC, datetime
from uuid import UUID

from at_comfy.db import get_conn
from at_comfy.models.download import DownloadErrorCode, DownloadRequest, DownloadState, DownloadTask

_completed_since: list[str] = []


def _now_iso() -> str:
    return datetime.now(tz=UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def normalize_download_task_id(task_id: object) -> str:
    """``sqlite3`` cannot bind ``uuid.UUID``; task ids are stored as RFC-4122 strings."""
    if isinstance(task_id, UUID):
        return str(task_id)
    return str(task_id)


class DownloadStore:
    """Queue persistence + completed-since tracking for polling UI."""

    def mark_completed_public(self, task_id: str) -> None:
        _completed_since.append(task_id)

    def take_completed_since_marker(self) -> list[str]:
        out = list(_completed_since)
        _completed_since.clear()
        return out

    def insert_task(self, task: DownloadTask) -> None:
        conn = get_conn()
        req_json = task.request.model_dump_json()
        conn.execute(
            """
            INSERT INTO download_tasks (
                id, request_json, state, bytes_done, total_bytes,
                error_message, error_code, retry_count,
                cancel_requested, pause_requested, cover_thumb_path,
                queue_position, batch_id, ui_order, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                normalize_download_task_id(task.id),
                req_json,
                task.state.value,
                task.bytes_done,
                task.total_bytes,
                task.error_message,
                task.error_code.value,
                task.retry_count,
                1 if task.cancel_requested else 0,
                1 if task.pause_requested else 0,
                task.cover_thumb_path,
                task.queue_position,
                str(task.batch_id) if task.batch_id else None,
                task.ui_order,
                task.created_at.isoformat().replace("+00:00", "Z"),
                task.updated_at.isoformat().replace("+00:00", "Z"),
            ),
        )
        conn.commit()

    def update_task(self, task: DownloadTask) -> None:
        conn = get_conn()
        conn.execute(
            """
            UPDATE download_tasks SET
                state = ?, bytes_done = ?, total_bytes = ?,
                error_message = ?, error_code = ?, retry_count = ?,
                cancel_requested = ?, pause_requested = ?, cover_thumb_path = ?,
                updated_at = ?
            WHERE id = ?
            """,
            (
                task.state.value,
                task.bytes_done,
                task.total_bytes,
                task.error_message,
                task.error_code.value,
                task.retry_count,
                1 if task.cancel_requested else 0,
                1 if task.pause_requested else 0,
                task.cover_thumb_path,
                _now_iso(),
                normalize_download_task_id(task.id),
            ),
        )
        conn.commit()

    def load_task(self, task_id: str | object) -> DownloadTask | None:
        tid = normalize_download_task_id(task_id)
        conn = get_conn()
        row = conn.execute("SELECT * FROM download_tasks WHERE id = ?", (tid,)).fetchone()
        if row is None:
            return None
        return self._row_to_task(row)

    def list_tasks(self) -> list[sqlite3.Row]:
        conn = get_conn()
        return list(
            conn.execute("SELECT * FROM download_tasks ORDER BY ui_order ASC, created_at ASC").fetchall(),
        )

    def delete_task(self, task_id: str | object) -> None:
        conn = get_conn()
        conn.execute("DELETE FROM download_tasks WHERE id = ?", (normalize_download_task_id(task_id),))
        conn.commit()

    def _row_to_task(self, row: sqlite3.Row) -> DownloadTask:
        req = DownloadRequest.model_validate_json(row["request_json"])
        ec_raw = row["error_code"]
        try:
            ec = DownloadErrorCode(str(ec_raw)) if ec_raw else DownloadErrorCode.NONE
        except ValueError:
            ec = DownloadErrorCode.UNKNOWN

        return DownloadTask(
            id=UUID(row["id"]),
            request=req,
            state=DownloadState(str(row["state"])),
            bytes_done=int(row["bytes_done"] or 0),
            total_bytes=row["total_bytes"],
            error_message=row["error_message"],
            error_code=ec,
            retry_count=int(row["retry_count"] or 0),
            cancel_requested=bool(row["cancel_requested"]),
            pause_requested=bool(row["pause_requested"]),
            cover_thumb_path=row["cover_thumb_path"],
            queue_position=int(row["queue_position"] or 0),
            ui_order=int(row["ui_order"] or 0),
            batch_id=UUID(row["batch_id"]) if row["batch_id"] else None,
        )
