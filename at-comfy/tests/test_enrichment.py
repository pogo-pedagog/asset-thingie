"""Enrichment helpers (no live Civitai)."""

from __future__ import annotations

from at_comfy.enrichment import enrichment_public_status


def test_enrichment_public_status_keys() -> None:
    s = enrichment_public_status()
    assert isinstance(s["pending"], int)
    assert isinstance(s["running"], bool)
