"""Early-access filtering and deadline parsing for Civitai list/detail payloads."""

from __future__ import annotations

import logging
from datetime import UTC, datetime, timedelta

import pytest

from at_comfy.civitai.client import (
    _collect_excluded_early_access_variants,
    _filter_early_access,
    _filter_early_access_single_item,
    _prepare_browse_list_items,
    _prepare_or_filter_models_page_items,
    _raw_item_for_browse_detail,
    civitai_version_is_active_early_access,
    parse_civitai_early_access_deadline,
)


def test_parse_deadline_without_fractional_seconds() -> None:
    dt = parse_civitai_early_access_deadline("2027-01-15T12:00:00Z")
    assert dt is not None
    assert dt.tzinfo is not None


def test_parse_deadline_with_fractional_seconds() -> None:
    dt = parse_civitai_early_access_deadline("2027-01-15T12:00:00.123Z")
    assert dt is not None


def test_parse_deadline_invalid(caplog: pytest.LogCaptureFixture) -> None:
    with caplog.at_level(logging.WARNING):
        assert parse_civitai_early_access_deadline("not-a-date") is None
    assert "Unparseable Civitai earlyAccessDeadline" in caplog.text
    assert "not-a-date" in caplog.text
    assert parse_civitai_early_access_deadline(None) is None


def _dummy_file() -> dict:
    return {"id": 1, "name": "model.safetensors", "type": "Model", "sizeKB": 1}


def test_filter_mixed_versions_hides_active_ea() -> None:
    future = (datetime.now(UTC) + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    item = {
        "id": 573152,
        "name": "Test",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 99,
                "name": "V7 EA",
                "publishedAt": "2026-02-01T00:00:00.000Z",
                "earlyAccessDeadline": future,
                "files": [_dummy_file()],
            },
            {
                "id": 88,
                "name": "V6",
                "publishedAt": "2026-01-01T00:00:00.000Z",
                "files": [_dummy_file()],
            },
        ],
    }
    now = datetime.now(UTC)
    out = _filter_early_access_single_item(item, hide=True, now=now)
    assert out is not None
    vids = [v["id"] for v in out["modelVersions"]]
    assert vids == [88]
    ea = _collect_excluded_early_access_variants(item, now)
    assert len(ea) == 1
    assert ea[0]["id"] == 99
    assert ea[0]["earlyAccessDeadline"] == future


def test_filter_deadline_in_past_keeps_version() -> None:
    past = (datetime.now(UTC) - timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%SZ")
    item = {
        "id": 1,
        "name": "Test",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 10,
                "name": "V1",
                "publishedAt": "2026-02-01T00:00:00.000Z",
                "earlyAccessDeadline": past,
                "files": [_dummy_file()],
            },
        ],
    }
    now = datetime.now(UTC)
    out = _filter_early_access_single_item(item, hide=True, now=now)
    assert out is not None
    assert len(out["modelVersions"]) == 1


def test_unparseable_deadline_not_treated_as_ea() -> None:
    now = datetime.now(UTC)
    v = {
        "id": 1,
        "earlyAccessDeadline": "not-a-date",
        "files": [_dummy_file()],
    }
    assert not civitai_version_is_active_early_access(v, now=now)


def test_availability_earlyaccess_without_deadline() -> None:
    """Civitai often sends ``availability: EarlyAccess`` with null ``earlyAccessDeadline``."""
    now = datetime.now(UTC)
    item = {
        "id": 1,
        "name": "Test",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 2808677,
                "name": "APEX (V8)",
                "publishedAt": "2026-03-29T17:14:39.553Z",
                "availability": "EarlyAccess",
                "earlyAccessDeadline": None,
                "files": [_dummy_file()],
            },
            {
                "id": 88,
                "name": "Older public",
                "publishedAt": "2025-01-01T00:00:00.000Z",
                "availability": "Public",
                "files": [_dummy_file()],
            },
        ],
    }
    out = _filter_early_access_single_item(item, hide=True, now=now)
    assert out is not None
    assert [v["id"] for v in out["modelVersions"]] == [88]
    ea = _collect_excluded_early_access_variants(item, now)
    assert len(ea) == 1
    assert ea[0]["id"] == 2808677


def test_early_access_deadline_instant_is_public() -> None:
    """At the deadline timestamp itself, early access has ended (interval is [start, deadline))."""
    deadline = datetime(2027, 1, 15, 12, 0, 0, tzinfo=UTC)
    v = {
        "id": 1,
        "earlyAccessDeadline": "2027-01-15T12:00:00Z",
        "files": [_dummy_file()],
    }
    assert not civitai_version_is_active_early_access(v, now=deadline)
    assert civitai_version_is_active_early_access(
        v, now=deadline - timedelta(milliseconds=1)
    )


def test_parsed_deadline_in_past_overrides_earlyaccess_availability() -> None:
    """If deadline is parseable and in the past, version is public even if availability string is odd."""
    now = datetime.now(UTC)
    past = (now - timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%SZ")
    v = {
        "id": 1,
        "availability": "EarlyAccess",
        "earlyAccessDeadline": past,
        "files": [_dummy_file()],
    }
    assert not civitai_version_is_active_early_access(v, now=now)


def test_filter_hide_false_passthrough() -> None:
    item = {
        "id": 1,
        "name": "Test",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 10,
                "name": "V1",
                "publishedAt": "2026-02-01T00:00:00.000Z",
                "files": [_dummy_file()],
            },
        ],
    }
    now = datetime.now(UTC)
    out = _filter_early_access_single_item(item, hide=False, now=now)
    assert out is item


def test_sort_visible_by_published_at_desc() -> None:
    future = (datetime.now(UTC) + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    item = {
        "id": 1,
        "name": "Test",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 3,
                "name": "older public",
                "publishedAt": "2025-01-01T00:00:00.000Z",
                "files": [_dummy_file()],
            },
            {
                "id": 2,
                "name": "ea mid",
                "publishedAt": "2026-06-01T00:00:00.000Z",
                "earlyAccessDeadline": future,
                "files": [_dummy_file()],
            },
            {
                "id": 1,
                "name": "newest public",
                "publishedAt": "2025-12-01T00:00:00.000Z",
                "files": [_dummy_file()],
            },
        ],
    }
    now = datetime.now(UTC)
    out = _filter_early_access_single_item(item, hide=True, now=now)
    assert out is not None
    assert [v["id"] for v in out["modelVersions"]] == [1, 3]


def test_filter_early_access_list_skips_empty_models() -> None:
    future = (datetime.now(UTC) + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    items = [
        {
            "id": 1,
            "name": "Only EA",
            "type": "Checkpoint",
            "modelVersions": [
                {
                    "id": 10,
                    "earlyAccessDeadline": future,
                    "files": [_dummy_file()],
                },
            ],
        },
        {
            "id": 2,
            "name": "Public",
            "type": "Checkpoint",
            "modelVersions": [{"id": 20, "files": [_dummy_file()]}],
        },
    ]
    out = _filter_early_access(items, hide=True)
    assert len(out) == 1
    assert out[0]["id"] == 2


def test_prepare_or_filter_models_page_items_hide_true_matches_batch_behavior() -> None:
    """When hiding EA, batch id-list path must drop EA-only versions like ``get_model``."""
    now = datetime.now(UTC)
    future = (now + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    items = [
        {
            "id": 1,
            "name": "Only EA",
            "type": "Checkpoint",
            "modelVersions": [
                {
                    "id": 10,
                    "earlyAccessDeadline": future,
                    "files": [_dummy_file()],
                },
            ],
        },
        {
            "id": 2,
            "name": "Public",
            "type": "Checkpoint",
            "modelVersions": [{"id": 20, "files": [_dummy_file()]}],
        },
    ]
    out = _prepare_or_filter_models_page_items(items, hide_early_access=True, now=now)
    assert len(out) == 1
    assert out[0]["id"] == 2


def test_prepare_browse_list_items_keeps_only_ea_model() -> None:
    """List path no longer drops models whose only versions are early access."""
    now = datetime.now(UTC)
    future = (now + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    items = [
        {
            "id": 1,
            "name": "Only EA",
            "type": "Checkpoint",
            "modelVersions": [
                {
                    "id": 10,
                    "earlyAccessDeadline": future,
                    "files": [_dummy_file()],
                },
            ],
        },
    ]
    out = _prepare_browse_list_items(items, now=now)
    assert len(out) == 1
    assert out[0]["modelVersions"][0]["isEarlyAccess"] is True


def test_raw_item_for_browse_detail_sets_is_early_access_and_sorts() -> None:
    future = (datetime.now(UTC) + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    item = {
        "id": 1,
        "name": "M",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 20,
                "name": "older",
                "publishedAt": "2025-01-01T00:00:00.000Z",
                "availability": "Public",
                "files": [_dummy_file()],
            },
            {
                "id": 99,
                "name": "ea newest",
                "publishedAt": "2026-04-01T00:00:00.000Z",
                "availability": "EarlyAccess",
                "files": [_dummy_file()],
            },
            {
                "id": 10,
                "name": "deadline ea",
                "publishedAt": "2026-03-01T00:00:00.000Z",
                "earlyAccessDeadline": future,
                "files": [_dummy_file()],
            },
        ],
    }
    now = datetime.now(UTC)
    out = _raw_item_for_browse_detail(item, now=now)
    assert out is not None
    vers = out["modelVersions"]
    assert [v["id"] for v in vers] == [99, 10, 20]
    assert vers[0]["isEarlyAccess"] is True
    assert vers[1]["isEarlyAccess"] is True
    assert vers[2]["isEarlyAccess"] is False


def test_raw_item_for_browse_detail_stable_sort_same_published_at() -> None:
    """Tie-break on version id so order does not depend on API list order."""
    ts = "2026-01-01T00:00:00.000Z"
    base = {
        "id": 1,
        "name": "M",
        "type": "Checkpoint",
        "modelVersions": [
            {
                "id": 5,
                "publishedAt": ts,
                "availability": "Public",
                "files": [_dummy_file()],
            },
            {
                "id": 100,
                "publishedAt": ts,
                "availability": "Public",
                "files": [_dummy_file()],
            },
        ],
    }
    now = datetime.now(UTC)
    lo_first = _raw_item_for_browse_detail(base, now=now)
    hi_first = _raw_item_for_browse_detail(
        {**base, "modelVersions": list(reversed(base["modelVersions"]))},
        now=now,
    )
    assert lo_first is not None and hi_first is not None
    assert [v["id"] for v in lo_first["modelVersions"]] == [100, 5]
    assert [v["id"] for v in hi_first["modelVersions"]] == [100, 5]


def test_filter_early_access_hide_off_returns_original() -> None:
    future = (datetime.now(UTC) + timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")
    items = [
        {
            "id": 1,
            "name": "EA",
            "type": "Checkpoint",
            "modelVersions": [
                {
                    "id": 10,
                    "earlyAccessDeadline": future,
                    "files": [_dummy_file()],
                },
            ],
        },
    ]
    out = _filter_early_access(items, hide=False)
    assert out == items
