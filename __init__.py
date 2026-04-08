"""AssetThingie for ComfyUI — checkpoint loader, LoRA loader, and browse/download backend."""

from __future__ import annotations

import logging
import sys
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parent
_AT_COMFY_SRC = _REPO_ROOT / "at-comfy"
if _AT_COMFY_SRC.is_dir():
    src = str(_AT_COMFY_SRC)
    if src not in sys.path:
        # Ensure ComfyUI imports this repo's backend package, not an older installed copy.
        sys.path.insert(0, src)

try:
    from .at_checkpoint_loader import ATCheckpointLoader
    from .at_loraloader import ATLoraLoader
except ImportError as exc:
    _msg = str(exc)
    _relative_without_parent = (
        "no known parent package" in _msg or "relative import" in _msg
    )
    if not _relative_without_parent:
        raise
    from at_checkpoint_loader import ATCheckpointLoader
    from at_loraloader import ATLoraLoader

NODE_CLASS_MAPPINGS = {
    "ATCheckpointLoader": ATCheckpointLoader,
    "ATLoraLoader": ATLoraLoader,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ATCheckpointLoader": "AT Checkpoint Loader",
    "ATLoraLoader": "AT LoraLoader",
}

WEB_DIRECTORY = "./js"

__all__ = [
    "NODE_CLASS_MAPPINGS",
    "NODE_DISPLAY_NAME_MAPPINGS",
    "WEB_DIRECTORY",
    "ATCheckpointLoader",
    "ATLoraLoader",
]


def _init_backend() -> None:
    try:
        from at_comfy.routes import register_routes

        register_routes()
    except Exception:
        logging.getLogger("at_comfy").exception("Failed to initialize at_comfy backend")
        raise


_init_backend()
