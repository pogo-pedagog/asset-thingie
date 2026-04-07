"""Checkpoint system fields (mirrors AssetThingie ``CHECKPOINT_SYSTEM_FIELDS``)."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class SystemFieldSpec:
    key: str
    label: str
    kind: str = "text"


CHECKPOINT_SYSTEM_FIELDS: tuple[SystemFieldSpec, ...] = (
    SystemFieldSpec("recommended_sampler", "Recommended sampler"),
    SystemFieldSpec("recommended_scheduler", "Recommended scheduler"),
    SystemFieldSpec("recommended_steps", "Recommended steps", "int"),
    SystemFieldSpec("recommended_cfg", "Recommended CFG", "float"),
    SystemFieldSpec("recommended_clip_skip", "Recommended CLIP skip", "int"),
    SystemFieldSpec("recommended_prompt", "Recommended prompt"),
    SystemFieldSpec("recommended_negative_prompt", "Recommended negative prompt"),
)


@dataclass(frozen=True)
class TypeFamily:
    name: str
    content_type_keys: frozenset[str]
    system_fields: tuple[SystemFieldSpec, ...] = ()


LORA_FAMILY = TypeFamily("lora", frozenset({"lora", "lycoris", "dora", "locon", "hypernetwork"}), ())
CHECKPOINT_FAMILY = TypeFamily("checkpoint", frozenset({"checkpoint"}), CHECKPOINT_SYSTEM_FIELDS)
OTHER_FAMILY = TypeFamily("other", frozenset(), ())


class TypeFamilyRegistry:
    def __init__(self) -> None:
        self._families: tuple[TypeFamily, ...] = (LORA_FAMILY, CHECKPOINT_FAMILY)

    def family_for(self, content_type: str | None) -> TypeFamily:
        if content_type is None:
            return OTHER_FAMILY
        k = str(content_type).strip()
        if not k:
            return OTHER_FAMILY
        low = k.lower()
        for fam in self._families:
            if low in fam.content_type_keys:
                return fam
        return OTHER_FAMILY

    def is_lora_family(self, content_type: str | None) -> bool:
        return self.family_for(content_type).name == "lora"


TYPE_FAMILY_REGISTRY = TypeFamilyRegistry()
