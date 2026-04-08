"""Civitai CDN image URL normalization for enrichment fetches."""

from __future__ import annotations

from at_comfy.civitai.client import (
    civitai_image_display_url,
    civitai_image_original_fetch_url,
    civitai_image_strip_width_query,
    civitai_image_url_with_width,
)


def test_replace_width_query_instead_of_duplicating() -> None:
    base = "https://image.civitai.com/x/y/original=true/1.jpeg?width=200"
    assert civitai_image_url_with_width(base, 512) == (
        "https://image.civitai.com/x/y/original=true/1.jpeg?width=512"
    )


def test_append_width_when_no_query() -> None:
    base = "https://image.civitai.com/x/y/original=true/1.jpeg"
    assert civitai_image_url_with_width(base, 256) == (
        "https://image.civitai.com/x/y/original=true/1.jpeg?width=256"
    )


def test_display_url_rewrites_path_width_segment() -> None:
    u = "https://image.civitai.com/a/width=64/b.jpg"
    assert civitai_image_display_url(u, natural_width=1024) == "https://image.civitai.com/a/width=1024/b.jpg"


def test_strip_width_query_removes_width_param() -> None:
    base = "https://image.civitai.com/x/y/original=true/1.jpeg?width=200&foo=1"
    out = civitai_image_strip_width_query(base)
    assert "width=" not in out
    assert "foo=1" in out


def test_original_fetch_url_replaces_path_width_with_original_true() -> None:
    u = "https://image.civitai.com/a/width=64/c.jpg?width=100"
    out = civitai_image_original_fetch_url(u, natural_width=512)
    assert "/original=true/" in out
    assert "/width=" not in out
    assert "?width=" not in out
