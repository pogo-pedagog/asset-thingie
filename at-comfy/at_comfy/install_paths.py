"""Install directory and filename helpers for Civitai downloads."""

from __future__ import annotations

from pathlib import Path

from at_comfy.config import ATComfyConfig


def civitai_filename_with_id(original_name: str, file_id: int) -> str:
    """``{stem}_{file_id}{suffix}``."""
    p = Path(original_name)
    return f"{p.stem}_{file_id}{p.suffix}"


def expand_subpath_template(template: str, *, category: str, base_model: str, creator: str, first_tag: str) -> str:
    """Expand ``{category}``, ``{base_model}``, ``{creator}``, ``{first_tag}``."""
    t = template or "{category}"
    cat = (category or "General").strip() or "General"
    bm = (base_model or "unknown").strip().replace("/", "-")
    cr = (creator or "unknown").strip().replace("/", "-")
    ft = (first_tag or "tag").strip().replace("/", "-")
    return (
        t.replace("{category}", cat)
        .replace("{base_model}", bm)
        .replace("{creator}", cr)
        .replace("{first_tag}", ft)
    )


def sanitize_path_segment(s: str) -> str:
    out = "".join(c if c.isalnum() or c in " ._-()" else "_" for c in s.strip())[:120]
    return out.strip() or "item"


def first_tag_sorted(tags: list[str]) -> str:
    if not tags:
        return ""
    return sorted((str(t) for t in tags), key=str.lower)[0]


def comfy_folder_for_model_type(model_type: str) -> str | None:
    """Map Civitai model ``type`` string to a Comfy ``folder_paths`` key."""
    low = (model_type or "").strip().lower().replace(" ", "").replace("_", "")
    if low in ("lora", "locon", "dora", "lycoris"):
        return "loras"
    if low == "checkpoint":
        return "checkpoints"
    if low == "textualinversion":
        return "embeddings"
    if low == "vae":
        return "vae"
    if low == "controlnet":
        return "controlnet"
    if low == "upscaler":
        return "upscale_models"
    if low == "hypernetwork":
        return "hypernetworks"
    if low == "motionmodule":
        return "animatediff_models"
    if low == "other":
        return None
    return None


def resolve_install_dir_for_download(
    model_type: str,
    config: ATComfyConfig,
    *,
    category: str,
    subcategory: str = "",
    creator: str = "",
    base_model: str = "",
    first_tag: str = "",
    subpath_template: str = "{category}",
) -> Path:
    """Target directory under the Comfy folder root for ``model_type``."""
    from at_comfy.comfy_paths import get_folder_paths_list

    folder_key = comfy_folder_for_model_type(model_type)
    if folder_key is None:
        raise ValueError(f"unsupported model type: {model_type or 'unknown'}")
    roots = get_folder_paths_list(folder_key, config)
    if not roots:
        if folder_key in ("loras", "checkpoints"):
            root = Path.cwd()
        else:
            raise ValueError(f"Comfy has no folder configured for {folder_key} ({model_type})")
    else:
        root = Path(roots[0]).resolve()
    cat = (category or "General").strip() or "General"
    sub = (subcategory or "").strip()
    nested = expand_subpath_template(
        subpath_template,
        category=cat,
        base_model=base_model or "unknown",
        creator=creator or "unknown",
        first_tag=first_tag or "tag",
    )
    if sub:
        nested = str(Path(nested) / sanitize_path_segment(sub))
    parts = [sanitize_path_segment(p) for p in Path(nested).parts if p and p not in (".", "..")]
    out = root.joinpath(*parts) if parts else root
    out.mkdir(parents=True, exist_ok=True)
    return out.resolve()
