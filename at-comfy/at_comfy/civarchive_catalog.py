"""SQLite-backed CivArchive ``base_model`` strings (opportunistic merge from search hits)."""

from __future__ import annotations

from collections.abc import Iterable
from datetime import datetime, timezone

from at_comfy.db import get_conn

# Keep in sync with ``web_browse/src/constants.ts`` ``BROWSE_CIVARCHIVE_DEFAULT_BASE_MODELS``.
FALLBACK_BASE_MODELS: tuple[str, ...] = (
    "Anima",
    "Flux.1 D",
    "Flux.1 S",
    "Flux.2 Klein 4B",
    "Flux.2 Klein 4B-base",
    "Flux.2 Klein 9B",
    "Flux.2 Klein 9B-base",
    "Hunyuan 1",
    "Hunyuan Video",
    "Illustrious",
    "Kling",
    "LTXV 2.3",
    "LTXV2",
    "NoobAI",
    "Other",
    "PixArt E",
    "Pony",
    "Qwen",
    "SD 1.5",
    "SD 2.0 768",
    "SD 2.1",
    "SD 3",
    "SD 3.5",
    "SD 3.5 Large",
    "SD 3.5 Large Turbo",
    "SD 3.5 Medium",
    "SDXL 1.0",
    "SDXL Turbo",
    "Wan Image 2.7",
    "Wan Video",
    "Wan Video 14B i2v 480p",
    "Wan Video 2.2 I2V-A14B",
    "ZImageBase",
    "ZImageTurbo",
)


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def civarchive_base_models_upsert_batch(names: Iterable[str]) -> None:
    now = _utc_now_iso()
    conn = get_conn()
    for raw in names:
        s = str(raw or "").strip()
        if not s:
            continue
        conn.execute(
            """
            INSERT INTO civarchive_base_models (name, first_seen_at, last_seen_at)
            VALUES (?, ?, ?)
            ON CONFLICT(name) DO UPDATE SET last_seen_at = excluded.last_seen_at
            """,
            (s, now, now),
        )
    conn.commit()


def civarchive_base_models_list() -> list[str]:
    """DB names (case-insensitive order) plus fallbacks not yet seen."""
    conn = get_conn()
    rows = conn.execute(
        "SELECT name FROM civarchive_base_models ORDER BY name COLLATE NOCASE",
    ).fetchall()
    seen_lower: set[str] = set()
    out: list[str] = []
    for r in rows:
        n = str(r["name"] or "").strip()
        if not n:
            continue
        low = n.lower()
        if low in seen_lower:
            continue
        seen_lower.add(low)
        out.append(n)
    for fb in FALLBACK_BASE_MODELS:
        low = fb.lower()
        if low not in seen_lower:
            seen_lower.add(low)
            out.append(fb)
    out.sort(key=lambda x: x.lower())
    return out


def civarchive_base_models_clear() -> None:
    conn = get_conn()
    conn.execute("DELETE FROM civarchive_base_models")
    conn.commit()
