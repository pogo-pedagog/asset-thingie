"""Test fixtures for at_comfy."""

from __future__ import annotations

import pytest


@pytest.fixture
def tmp_comfy_base(tmp_path, monkeypatch):
    base = tmp_path / "comfy_base"
    base.mkdir(parents=True, exist_ok=True)
    monkeypatch.setattr("at_comfy.config.comfy_base_path", lambda: base.resolve())
    import at_comfy.config as cfg

    cfg._cached = None
    from at_comfy.db import reset_conn_for_tests

    reset_conn_for_tests(base / "at_comfy.db")
    yield base
    cfg._cached = None
    reset_conn_for_tests(None)
