"""Cache path safety."""

from __future__ import annotations

from pathlib import Path

from at_comfy.cache import cache_dir_safe_path


def test_cache_dir_rejects_dotdot(tmp_comfy_base: Path, monkeypatch) -> None:
    cache = tmp_comfy_base / "at_cache"
    cache.mkdir(parents=True)
    monkeypatch.setattr("at_comfy.cache.cache_root", lambda: cache.resolve())
    assert cache_dir_safe_path("foo/../../../etc/passwd") is None


def test_cache_dir_accepts_normal_relative(tmp_comfy_base: Path, monkeypatch) -> None:
    cache = tmp_comfy_base / "at_cache"
    sub = cache / "covers"
    sub.mkdir(parents=True)
    (sub / "1.jpg").write_bytes(b"x")
    monkeypatch.setattr("at_comfy.cache.cache_root", lambda: cache.resolve())
    p = cache_dir_safe_path("covers/1.jpg")
    assert p is not None
    assert p.is_file()
