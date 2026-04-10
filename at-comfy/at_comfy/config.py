"""JSON config at ``<comfy_base>/at_comfy_config.json``."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class ATComfyConfig:
    civitai_api_key: str = ""
    scan_on_startup: bool = True
    enrichment_mode: str = "background"  # auto | background | manual
    enrichment_rate_limit_ms: int = 500
    #: Max still-image (and video slot) gallery items to fetch per asset during enrichment / post-download.
    max_example_images: int = 20
    max_parallel_downloads: int = 2
    download_subpath_template: str = "{category}"
    hide_early_access: bool = True
    hide_nsfw: bool = True
    #: When True, enqueue full Civitai gallery video samples into ``at_cache`` during enrichment.
    download_example_videos: bool = False
    #: When True, extract JPEG poster frames (via ffmpeg when available) from local or remote videos.
    generate_video_posters: bool = True
    #: When Civitai hash lookup misses, try CivArchive ``/sha256`` + ``/models`` before marking not_found.
    enrichment_civarchive_fallback: bool = True
    scan_directories: dict[str, str | None] = field(
        default_factory=lambda: {"loras": None, "checkpoints": None},
    )

    def to_public_dict(self) -> dict[str, Any]:
        d = asdict(self)
        d["civitai_api_key"] = ""
        d["civitai_api_key_set"] = bool(self.civitai_api_key.strip())
        return d

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> ATComfyConfig:
        sd = raw.get("scan_directories") if isinstance(raw.get("scan_directories"), dict) else {}
        lora = sd.get("loras") if isinstance(sd, dict) else None
        ckpt = sd.get("checkpoints") if isinstance(sd, dict) else None
        return cls(
            civitai_api_key=str(raw.get("civitai_api_key") or ""),
            scan_on_startup=bool(raw.get("scan_on_startup", True)),
            enrichment_mode=str(raw.get("enrichment_mode") or "background"),
            enrichment_rate_limit_ms=int(raw.get("enrichment_rate_limit_ms") or 500),
            max_example_images=clamp_max_example_images(raw.get("max_example_images")),
            max_parallel_downloads=int(raw.get("max_parallel_downloads") or 2),
            download_subpath_template=str(raw.get("download_subpath_template") or "{category}"),
            hide_early_access=bool(raw.get("hide_early_access", True)),
            hide_nsfw=bool(raw.get("hide_nsfw", True)),
            download_example_videos=bool(raw.get("download_example_videos", False)),
            generate_video_posters=bool(raw.get("generate_video_posters", True)),
            enrichment_civarchive_fallback=bool(raw.get("enrichment_civarchive_fallback", True)),
            scan_directories={
                "loras": str(lora) if lora else None,
                "checkpoints": str(ckpt) if ckpt else None,
            },
        )


def clamp_max_example_images(raw: Any) -> int:
    if raw is None or raw == "":
        return 20
    try:
        n = int(raw)
    except (TypeError, ValueError):
        return 20
    return max(1, min(n, 200))


_cached: ATComfyConfig | None = None


def comfy_base_path() -> Path:
    try:
        import folder_paths  # type: ignore[import-untyped]

        return Path(folder_paths.base_path).resolve()
    except Exception:
        return Path.cwd().resolve()


def config_path() -> Path:
    return comfy_base_path() / "at_comfy_config.json"


def db_path() -> Path:
    return comfy_base_path() / "at_comfy.db"


def cache_root() -> Path:
    return comfy_base_path() / "at_cache"


def load_config(*, reload: bool = False) -> ATComfyConfig:
    global _cached
    if _cached is not None and not reload:
        return _cached
    path = config_path()
    if not path.is_file():
        _cached = ATComfyConfig()
        return _cached
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raw = {}
    _cached = ATComfyConfig.from_dict(raw)
    return _cached


def save_config(cfg: ATComfyConfig) -> None:
    global _cached
    path = config_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    data = {
        "civitai_api_key": cfg.civitai_api_key,
        "scan_on_startup": cfg.scan_on_startup,
        "enrichment_mode": cfg.enrichment_mode,
        "enrichment_rate_limit_ms": cfg.enrichment_rate_limit_ms,
        "max_example_images": cfg.max_example_images,
        "max_parallel_downloads": cfg.max_parallel_downloads,
        "download_subpath_template": cfg.download_subpath_template,
        "hide_early_access": cfg.hide_early_access,
        "hide_nsfw": cfg.hide_nsfw,
        "download_example_videos": cfg.download_example_videos,
        "generate_video_posters": cfg.generate_video_posters,
        "enrichment_civarchive_fallback": cfg.enrichment_civarchive_fallback,
        "scan_directories": dict(cfg.scan_directories),
    }
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    _cached = cfg


def invalidate_config_cache() -> None:
    global _cached
    _cached = None
