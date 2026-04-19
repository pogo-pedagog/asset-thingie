"""Remove on-disk artifacts for an abandoned or cancelled download (never the final installed file)."""

from __future__ import annotations

from pathlib import Path

from at_comfy.models.download import DownloadRequest


def sidecar_json_path(dest: Path) -> Path:
    """JSON sidecar next to the model file (loramaster-compatible naming)."""
    return dest.with_suffix(".json")


def remove_partial_artifacts(req: DownloadRequest) -> None:
    """Best-effort delete of ``.part``, sidecar JSON, preview, and example files beside ``dest``.

    Never deletes the final ``dest`` file (installed library asset). Cancel cleanup only removes
    incomplete transfer artifacts.
    """
    dest = Path(req.install_dir) / req.filename
    tmp = dest.with_suffix(dest.suffix + ".part")
    tmp.unlink(missing_ok=True)
    stem = dest.stem
    parent = dest.parent
    try:
        (parent / f"{stem}.preview.png").unlink(missing_ok=True)
    except OSError:
        pass
    try:
        for p in parent.glob(f"{stem}_example*"):
            if p.is_file():
                p.unlink(missing_ok=True)
    except OSError:
        pass
    try:
        sidecar_json_path(dest).unlink(missing_ok=True)
    except OSError:
        pass
