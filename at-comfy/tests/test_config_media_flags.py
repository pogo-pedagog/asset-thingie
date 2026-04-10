"""Config fields for media enrichment."""

from __future__ import annotations

from at_comfy.config import ATComfyConfig, clamp_max_example_images


def test_config_media_defaults() -> None:
    c = ATComfyConfig()
    assert c.download_example_videos is False
    assert c.generate_video_posters is True
    assert c.max_example_images == 20
    assert c.enrichment_civarchive_fallback is True


def test_config_from_dict_media_flags() -> None:
    raw = {
        "download_example_videos": True,
        "generate_video_posters": False,
        "max_example_images": 8,
        "enrichment_civarchive_fallback": False,
    }
    c = ATComfyConfig.from_dict(raw)
    assert c.download_example_videos is True
    assert c.generate_video_posters is False
    assert c.max_example_images == 8
    assert c.enrichment_civarchive_fallback is False


def test_clamp_max_example_images() -> None:
    assert clamp_max_example_images(None) == 20
    assert clamp_max_example_images(0) == 1
    assert clamp_max_example_images(999) == 200
    assert clamp_max_example_images("15") == 15
