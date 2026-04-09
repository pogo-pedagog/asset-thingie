"""Civitai sometimes lists the same version file twice (same SHA, default vs explicit download URL)."""

from __future__ import annotations

from at_comfy.civitai.models import CivitaiModelVersion


def test_model_version_dedupes_identical_sha256_prefers_primary() -> None:
    sha = "73FE71868DDAECF4A8997B506B0B65C693EEB1210BABDA1E1967AE16A7F49CE1"
    raw = {
        "id": 145479,
        "name": "v1",
        "files": [
            {
                "id": 107682,
                "name": "m.safetensors",
                "downloadUrl": "https://civitai.com/api/download/models/145479",
                "hashes": {"SHA256": sha},
                "primary": True,
            },
            {
                "id": 107684,
                "name": "m.safetensors",
                "downloadUrl": (
                    "https://civitai.com/api/download/models/145479?type=Model&format=SafeTensor"
                ),
                "hashes": {"SHA256": sha},
                "primary": False,
            },
        ],
    }
    v = CivitaiModelVersion.from_api(raw)
    assert len(v.files) == 1
    assert v.files[0].id == 107682
    assert v.files[0].primary is True


def test_model_version_keeps_same_name_different_sha() -> None:
    raw = {
        "id": 1,
        "name": "v1",
        "files": [
            {
                "id": 10,
                "name": "m.safetensors",
                "downloadUrl": "https://example/a",
                "hashes": {"SHA256": "AA" * 32},
                "primary": True,
            },
            {
                "id": 11,
                "name": "m.safetensors",
                "downloadUrl": "https://example/b",
                "hashes": {"SHA256": "BB" * 32},
                "primary": False,
            },
        ],
    }
    v = CivitaiModelVersion.from_api(raw)
    assert len(v.files) == 2
    assert {v.files[0].id, v.files[1].id} == {10, 11}
