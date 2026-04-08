"""Config fields for media enrichment."""

from __future__ import annotations

from at_comfy.config import ATComfyConfig


def test_config_media_defaults() -> None:
    c = ATComfyConfig()
    assert c.download_example_videos is False
    assert c.generate_video_posters is True


def test_config_from_dict_media_flags() -> None:
    raw = {
        "download_example_videos": True,
        "generate_video_posters": False,
    }
    c = ATComfyConfig.from_dict(raw)
    assert c.download_example_videos is True
    assert c.generate_video_posters is False
