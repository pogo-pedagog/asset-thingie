"""Type family registry (LoRA vs checkpoint)."""

from __future__ import annotations

from at_comfy.type_families import TYPE_FAMILY_REGISTRY


def test_locon_is_lora_family() -> None:
    assert TYPE_FAMILY_REGISTRY.is_lora_family("LoCon")


def test_hypernetwork_is_lora_family() -> None:
    assert TYPE_FAMILY_REGISTRY.is_lora_family("Hypernetwork")


def test_checkpoint_not_lora() -> None:
    assert not TYPE_FAMILY_REGISTRY.is_lora_family("Checkpoint")
    assert TYPE_FAMILY_REGISTRY.family_for("Checkpoint").name == "checkpoint"


def test_unknown_content_type() -> None:
    assert TYPE_FAMILY_REGISTRY.family_for("VAE").name == "other"
