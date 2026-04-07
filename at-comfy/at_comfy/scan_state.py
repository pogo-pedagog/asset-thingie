"""In-memory scan progress (``GET /at/scan/status``)."""

from __future__ import annotations

import threading
from typing import Any

_lock = threading.Lock()
_state: dict[str, Any] = {
    "running": False,
    "phase": "",
    "done": 0,
    "total": 0,
    "message": "",
}


def scan_status() -> dict[str, Any]:
    with _lock:
        return dict(_state)


def scan_set(**kwargs: Any) -> None:
    with _lock:
        _state.update(kwargs)


def scan_reset() -> None:
    with _lock:
        _state.update(
            {
                "running": False,
                "phase": "",
                "done": 0,
                "total": 0,
                "message": "",
            },
        )
