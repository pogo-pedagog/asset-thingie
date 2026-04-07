"""Resolve Comfy ``folder_paths`` roots and model names for loader widgets."""

from __future__ import annotations

from pathlib import Path

from at_comfy.config import ATComfyConfig

COMFY_TOPLEVEL_FOR_FOLDER_TYPE: dict[str, frozenset[str]] = {
    "loras": frozenset({"loras", "lora", "lycoris"}),
    "checkpoints": frozenset(
        {"checkpoints", "stable-diffusion", "stable_diffusion", "diffusion_models", "unet"},
    ),
}


def get_folder_paths_list(folder_type: str, config: ATComfyConfig) -> list[str]:
    """``folder_type`` is ``loras`` or ``checkpoints`` (Comfy keys)."""
    try:
        import folder_paths  # type: ignore[import-untyped]

        key = "loras" if folder_type == "loras" else "checkpoints"
        override = config.scan_directories.get(key)
        if override:
            return [override]
        return list(folder_paths.get_folder_paths(key))
    except Exception:
        return []


def install_root_for_family(family: str, config: ATComfyConfig) -> Path | None:
    fam = (family or "").strip().lower()
    if fam == "lora":
        paths = get_folder_paths_list("loras", config)
    elif fam == "checkpoint":
        paths = get_folder_paths_list("checkpoints", config)
    else:
        return None
    if not paths:
        return None
    return Path(paths[0]).resolve()


def comfy_model_name_for_path(
    asset_path: Path | str,
    *,
    comfy_folder_type: str,
    config: ATComfyConfig,
) -> tuple[str | None, str | None]:
    """Return ``(comfy_relative_name, warning)`` for LoRA / Checkpoint loaders."""
    try:
        p = Path(asset_path).resolve()
    except OSError:
        return None, f"bad path: {asset_path}"
    roots = get_folder_paths_list("loras" if comfy_folder_type == "loras" else "checkpoints", config)
    if not roots:
        return None, "folder_paths not available"
    aliases = COMFY_TOPLEVEL_FOR_FOLDER_TYPE.get(comfy_folder_type, frozenset())
    for root_s in roots:
        root = Path(root_s).resolve()
        try:
            rel = p.relative_to(root)
        except ValueError:
            continue
        parts = rel.parts
        if parts:
            first = parts[0].lower().replace("\\", "/")
            if first in aliases and len(parts) > 1:
                rel = Path(*parts[1:])
        return rel.as_posix(), None
    return None, "not under Comfy model folders"
