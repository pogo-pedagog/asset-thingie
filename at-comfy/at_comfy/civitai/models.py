"""Normalized Civitai API DTOs for the UI layer."""

from __future__ import annotations

import re
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, ValidationError

# Civitai ``GET /api/v1/images`` returns ``meta: { "id": n, "meta": { "prompt": ... } }``;
# ``model-versions`` / ``models`` usually use a flat ``meta`` object. Image rows also often omit
# numeric ``id`` but embed it in the JPEG path (e.g. ``.../74821598.jpeg``).
_IMAGE_ID_SUFFIX_RE = re.compile(r"/(\d+)\.jpe?g(?:\?|$)", re.IGNORECASE)


def normalize_civitai_image_meta_dict(raw: dict[str, Any]) -> dict[str, Any] | None:
    """Return flat generation-metadata dict, unwrapping the images-API nested shape when present."""
    if not raw:
        return None
    if any(k in raw for k in ("prompt", "negativePrompt", "steps", "cfgScale", "sampler", "seed", "Size")):
        return dict(raw)
    inner = raw.get("meta")
    if isinstance(inner, dict) and inner:
        return dict(inner)
    return dict(raw)


def civitai_image_api_numeric_id(*, explicit: int | None = None, url: str = "") -> int | None:
    """Numeric Civitai image id for ``GET /api/v1/images?imageId=`` (JSON field or ``…/12345.jpeg``)."""
    if explicit is not None:
        try:
            return int(explicit)
        except (TypeError, ValueError):
            pass
    m = _IMAGE_ID_SUFFIX_RE.search((url or "").strip())
    return int(m.group(1)) if m else None

SearchType = Literal["model_name", "username", "tag"]
SortType = Literal[
    "Newest",
    "Oldest",
    "Most Downloaded",
    "Highest Rated",
    "Most Liked",
    "Most Buzz",
    "Most Discussed",
    "Most Collected",
    "Most Images",
]
PeriodType = Literal["All Time", "Year", "Month", "Week", "Day"]
ContentType = Literal[
    "Checkpoint",
    "TextualInversion",
    "LORA",
    "LoCon",
    "DoRA",
    "Poses",
    "Controlnet",
    "Hypernetwork",
    "AestheticGradient",
    "VAE",
    "Upscaler",
    "MotionModule",
    "Wildcards",
    "Workflows",
    "Other",
]


class CivitaiImage(BaseModel):
    """Single media sample on a model version (may include generation ``meta``)."""

    url: str
    type: str = "image"
    width: int | None = None
    height: int | None = None
    nsfw_level: int = Field(default=0, alias="nsfwLevel")
    meta: dict[str, Any] | None = None
    id: int | None = None

    model_config = ConfigDict(populate_by_name=True)

    @classmethod
    def from_image_dict(cls, im: dict[str, Any]) -> CivitaiImage:
        meta_raw = im.get("meta")
        meta: dict[str, Any] | None
        if isinstance(meta_raw, dict):
            meta = normalize_civitai_image_meta_dict(meta_raw)
        else:
            meta = None
        ns = im.get("nsfwLevel", 0)
        try:
            nsfw = int(ns) if ns is not None else 0
        except (TypeError, ValueError):
            nsfw = 0
        raw_img_id = im.get("id")
        try:
            image_id = int(raw_img_id) if raw_img_id is not None else None
        except (TypeError, ValueError):
            image_id = None
        image_id = civitai_image_api_numeric_id(explicit=image_id, url=str(im.get("url") or ""))
        return cls.model_validate(
            {
                "url": im.get("url") or "",
                "type": im.get("type") or "image",
                "width": im.get("width"),
                "height": im.get("height"),
                "nsfwLevel": nsfw,
                "meta": meta,
                "id": image_id,
            }
        )


class CivitaiFile(BaseModel):
    id: int
    name: str
    download_url: str = Field(alias="downloadUrl")
    size_kb: float | None = Field(default=None, alias="sizeKB")
    primary: bool = False
    sha256: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)

    model_config = ConfigDict(populate_by_name=True)

    @classmethod
    def from_api(cls, raw: dict[str, Any]) -> CivitaiFile:
        if not isinstance(raw, dict):
            raise ValidationError.from_exception_data(
                cls.__name__,
                [{"type": "model_attributes_type", "loc": (), "input": raw}],
            )
        hashes = raw.get("hashes") or {}
        sha_raw = hashes.get("SHA256")
        sha256: str | None
        if sha_raw is None or sha_raw == "":
            sha256 = None
        else:
            sha256 = str(sha_raw).strip().upper() or None
        meta = raw.get("metadata")
        return cls.model_validate(
            {
                "id": raw.get("id"),
                "name": raw.get("name"),
                "downloadUrl": raw.get("downloadUrl") or "",
                "sizeKB": raw.get("sizeKB"),
                "primary": raw.get("primary", False),
                "sha256": sha256,
                "metadata": meta if isinstance(meta, dict) else {},
            }
        )


class CivitaiModelVersion(BaseModel):
    id: int
    name: str
    base_model: str | None = Field(default=None, alias="baseModel")
    published_at: str | None = Field(default=None, alias="publishedAt")
    early_access_deadline: str | None = Field(default=None, alias="earlyAccessDeadline")
    availability: str | None = None
    description: str | None = None
    trained_words: list[str] = Field(default_factory=list, alias="trainedWords")
    images: list[CivitaiImage] = Field(default_factory=list)
    files: list[CivitaiFile] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True)

    def first_static_image_preview_url(self) -> str | None:
        """First gallery URL usable in an ``<img>`` (Civitai may list video samples first)."""
        for im in self.images:
            if (im.type or "image").strip().lower() != "image":
                continue
            u = (im.url or "").strip()
            if u:
                return u
        return None

    def first_video_preview_url(self) -> str | None:
        """First gallery sample URL when ``type`` is video (e.g. mp4)."""
        for im in self.images:
            if (im.type or "").strip().lower() != "video":
                continue
            u = (im.url or "").strip()
            if u:
                return u
        return None

    def has_video_sample(self) -> bool:
        return self.first_video_preview_url() is not None

    @classmethod
    def from_api(cls, raw: dict[str, Any]) -> CivitaiModelVersion:
        if not isinstance(raw, dict):
            raise ValidationError.from_exception_data(
                cls.__name__,
                [{"type": "model_attributes_type", "loc": (), "input": raw}],
            )
        imgs: list[CivitaiImage] = []
        for im in raw.get("images") or []:
            if not isinstance(im, dict):
                continue
            imgs.append(CivitaiImage.from_image_dict(im))
        files: list[CivitaiFile] = []
        for f in raw.get("files") or []:
            if isinstance(f, dict):
                files.append(CivitaiFile.from_api(f))
        return cls.model_validate(
            {
                "id": raw.get("id"),
                "name": raw.get("name") or "",
                "baseModel": raw.get("baseModel"),
                "publishedAt": raw.get("publishedAt"),
                "earlyAccessDeadline": raw.get("earlyAccessDeadline"),
                "availability": raw.get("availability"),
                "description": raw.get("description"),
                "trainedWords": raw.get("trainedWords") or [],
                "images": imgs,
                "files": files,
            }
        )


def normalize_allow_commercial_use(value: Any) -> list[str]:
    """Civitai sometimes returns a list, sometimes a Postgres-style string like '{Image,Rent}'."""
    if value is None:
        return []
    if isinstance(value, list):
        return [str(x) for x in value]
    if isinstance(value, str):
        s = value.strip()
        if len(s) >= 2 and s.startswith("{") and s.endswith("}"):
            inner = s[1:-1].strip()
            if not inner:
                return []
            return [part.strip() for part in inner.split(",") if part.strip()]
        if s:
            return [s]
        return []
    return []


class CivitaiModelStats(BaseModel):
    """Optional aggregate stats from Civitai (field names match API camelCase)."""

    download_count: int = Field(default=0, alias="downloadCount")
    favorite_count: int = Field(default=0, alias="favoriteCount")
    thumbs_up_count: int = Field(default=0, alias="thumbsUpCount")
    thumbs_down_count: int = Field(default=0, alias="thumbsDownCount")
    comment_count: int = Field(default=0, alias="commentCount")
    rating_count: int = Field(default=0, alias="ratingCount")
    rating: float | None = None

    model_config = ConfigDict(populate_by_name=True)


class CivitaiModel(BaseModel):
    id: int
    name: str
    type: str
    nsfw: bool = False
    description: str | None = None
    creator_username: str | None = None
    created_at: str | None = Field(default=None, alias="createdAt")
    updated_at: str | None = Field(default=None, alias="updatedAt")
    stats: CivitaiModelStats | None = None
    tags: list[str] = Field(default_factory=list)
    model_versions: list[CivitaiModelVersion] = Field(default_factory=list, alias="modelVersions")
    allow_commercial_use: list[str] = Field(default_factory=list, alias="allowCommercialUse")
    allow_no_credit: bool = Field(default=False, alias="allowNoCredit")
    allow_derivatives: bool = Field(default=False, alias="allowDerivatives")
    allow_different_license: bool = Field(default=False, alias="allowDifferentLicense")

    model_config = ConfigDict(populate_by_name=True)

    @classmethod
    def from_api(cls, raw: dict[str, Any]) -> CivitaiModel:
        if not isinstance(raw, dict):
            raise ValidationError.from_exception_data(
                cls.__name__,
                [{"type": "model_attributes_type", "loc": (), "input": raw}],
            )
        creator = raw.get("creator") or {}
        if not isinstance(creator, dict):
            creator = {}
        versions: list[CivitaiModelVersion] = []
        for v in raw.get("modelVersions") or []:
            if isinstance(v, dict):
                versions.append(CivitaiModelVersion.from_api(v))
        tags = [t.get("name", str(t)) if isinstance(t, dict) else str(t) for t in raw.get("tags") or []]
        allow = normalize_allow_commercial_use(raw.get("allowCommercialUse"))
        stats: CivitaiModelStats | None = None
        stats_raw = raw.get("stats")
        if isinstance(stats_raw, dict) and stats_raw:
            try:
                stats = CivitaiModelStats.model_validate(stats_raw)
            except ValidationError:
                stats = None
        return cls.model_validate(
            {
                "id": raw.get("id"),
                "name": raw.get("name") or "",
                "type": raw.get("type") or "Other",
                "nsfw": raw.get("nsfw", False),
                "description": raw.get("description"),
                "creator_username": creator.get("username"),
                "createdAt": raw.get("createdAt"),
                "updatedAt": raw.get("updatedAt"),
                "stats": stats,
                "tags": tags,
                "modelVersions": versions,
                "allowCommercialUse": allow,
                "allowNoCredit": raw.get("allowNoCredit", False),
                "allowDerivatives": raw.get("allowDerivatives", False),
                "allowDifferentLicense": raw.get("allowDifferentLicense", False),
            }
        )


class ModelListPage(BaseModel):
    items: list[CivitaiModel]
    metadata: dict[str, Any] = Field(default_factory=dict)

    @property
    def next_page(self) -> str | None:
        return self.metadata.get("nextPage")

    @property
    def prev_page(self) -> str | None:
        return self.metadata.get("prevPage")


class SearchParams(BaseModel):
    search_type: SearchType = "model_name"
    search_term: str = ""
    content_types: list[str] = Field(default_factory=list)
    base_models: list[str] = Field(default_factory=list)
    sort: SortType = "Most Downloaded"
    period: PeriodType = "All Time"
    nsfw: bool = False
    favorites_only: bool = False
    limit: int = Field(default=20, ge=1, le=100)
    hide_early_access: bool = True
