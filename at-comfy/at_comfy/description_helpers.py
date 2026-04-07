"""HTML description for asset detail (from ``source_metadata``)."""

from __future__ import annotations

from at_comfy.db import get_conn


def description_html_for_asset(asset_id: int) -> str | None:
    row = get_conn().execute(
        "SELECT description_html FROM source_metadata WHERE asset_id = ?",
        (asset_id,),
    ).fetchone()
    if row is None or row["description_html"] is None:
        return None
    s = str(row["description_html"]).strip()
    return s or None
