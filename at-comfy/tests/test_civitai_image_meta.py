"""Civitai image ``meta`` normalization and image-id discovery (browse / API parity)."""

from __future__ import annotations

from at_comfy.civitai.models import CivitaiImage, civitai_image_api_numeric_id, normalize_civitai_image_meta_dict


def test_normalize_flats_model_version_shape() -> None:
    d = {"prompt": "x", "steps": 20, "cfgScale": 7}
    assert normalize_civitai_image_meta_dict(d) == d


def test_normalize_unwraps_images_api_nested_meta() -> None:
    outer = {
        "id": 74821598,
        "meta": {
            "prompt": "beautiful woman",
            "seed": 1275506908,
            "cfgScale": 5,
        },
    }
    inner = normalize_civitai_image_meta_dict(outer)
    assert inner is not None
    assert inner["prompt"] == "beautiful woman"
    assert inner["seed"] == 1275506908
    assert "id" not in inner


def test_civitai_image_api_numeric_id_from_url_suffix() -> None:
    u = "https://image.civitai.com/x/o/original=true/74821598.jpeg"
    assert civitai_image_api_numeric_id(explicit=None, url=u) == 74821598


def test_civitai_from_image_dict_fills_id_from_url_and_unwraps_meta() -> None:
    im = CivitaiImage.from_image_dict(
        {
            "url": "https://image.civitai.com/x/original=true/74821598.jpeg",
            "type": "image",
            "meta": {"id": 74821598, "meta": {"prompt": "hello", "steps": 1}},
        },
    )
    assert im.id == 74821598
    assert im.meta == {"prompt": "hello", "steps": 1}
