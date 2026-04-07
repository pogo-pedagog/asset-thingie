"""Acquire (batch download) request models — UI/service boundary for Civitai downloads."""

from __future__ import annotations

from pathlib import Path
from typing import Any  # Any for JSON snapshot dicts
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class AcquireItemSpec(BaseModel):
    """One model + chosen version/file for download."""

    model_id: int
    version_id: int
    file_id: int

    model_json_snapshot: dict[str, Any] | None = None
    """Optional Civitai model payload (``{'items': [model_dict]}``) for sidecar/preview."""
    category: str | None = Field(
        default=None,
        description="When set, overrides :attr:`AcquireOptions.category` for install path only.",
    )
    subcategory: str | None = Field(
        default=None,
        description="When set, overrides :attr:`AcquireOptions.subcategory` for install path only.",
    )


class AcquireOptions(BaseModel):
    """Shared options for one or more downloads (install folder uses each model's ``type``)."""

    library_root: Path
    save_sidecar: bool = True
    subpath_template: str = Field(
        default="",
        description="If set, expanded with category/subcategory tokens for install subpath.",
    )
    category: str = ""
    subcategory: str = Field(
        default="",
        description="Optional hints for subpath_template placeholders.",
    )
    custom: dict[str, str] = Field(
        default_factory=dict,
        description="Values for {custom:key} tokens in subpath_template (string segments).",
    )
    save_example_images: bool = False
    """Download all example/preview images for the version (after main file)."""
    save_example_videos: bool = False
    """Download gallery video samples when saving sidecar media (separate from still images)."""
    batch_tags: list[str] = Field(default_factory=list)
    """Tags to apply to every asset acquired in this batch (additive to source tags)."""


class AcquireBatchMeta(BaseModel):
    """Optional batch id grouping tasks from one user action."""

    batch_id: UUID = Field(default_factory=uuid4)
