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
    """Target directory under Comfy ``loras`` or ``checkpoints`` root."""
    from at_comfy.comfy_paths import get_folder_paths_list

    low = (model_type or "").strip().lower()
    if low == "checkpoint":
        roots = get_folder_paths_list("checkpoints", config)
    else:
        roots = get_folder_paths_list("loras", config)
    root = Path(roots[0]).resolve() if roots else Path.cwd()
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
