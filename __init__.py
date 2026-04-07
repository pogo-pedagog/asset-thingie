"""AssetThingie for ComfyUI — checkpoint loader, LoRA loader, and browse/download backend."""

from __future__ import annotations

import logging

# Absolute imports: ComfyUI loads this file as a top-level module (not always as a package),
# and pytest must be able to import this module from the repo root.
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
