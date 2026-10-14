"""Synchronous file hashing helpers (call via ``asyncio.to_thread`` from async code)."""

from __future__ import annotations

import hashlib
from collections.abc import Callable
from pathlib import Path

_CHUNK = 65536
_INTERRUPT_CHUNK = 1024 * 1024


def file_sha256_sync(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(_CHUNK), b""):
            h.update(chunk)
    return h.hexdigest().upper()


def file_sha256_interruptible(path: Path, should_stop: Callable[[], bool]) -> str | None:
    """Hash ``path``; return ``None`` if ``should_stop()`` becomes true between blocks."""
    hasher = hashlib.sha256()
    with open(path, "rb") as f:
        while True:
            if should_stop():
                return None
            chunk = f.read(_INTERRUPT_CHUNK)
            if not chunk:
                break
            hasher.update(chunk)
    return hasher.hexdigest().upper()
