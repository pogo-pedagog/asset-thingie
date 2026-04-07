"""AT Checkpoint Loader — Comfy-style checkpoint load with optional CLIP skip (no separate CLIPSetLastLayer)."""

from __future__ import annotations

from typing import Any


class ATCheckpointLoader:
    @classmethod
    def INPUT_TYPES(cls) -> dict[str, Any]:
        import folder_paths  # type: ignore[import-not-found]

        return {
            "required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), {}),
                "clip_skip": (
                    "INT",
                    {
                        "default": 0,
                        "min": -24,
                        "max": 0,
                        "step": 1,
                        "tooltip": "0 = all CLIP layers. Negative values match CLIP Set Last Layer (e.g. -2).",
                    },
                ),
            }
        }

    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    RETURN_NAMES = ("model", "clip", "vae")
    FUNCTION = "load_checkpoint"
    CATEGORY = "loaders"

    def load_checkpoint(self, ckpt_name: str, clip_skip: int) -> tuple[Any, Any, Any]:
        import comfy.sd  # type: ignore[import-not-found]
        import folder_paths  # type: ignore[import-not-found]

        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(
            ckpt_path,
            output_vae=True,
            output_clip=True,
        )
        model, clip, vae = out[0], out[1], out[2]

        if int(clip_skip) < 0:
            clip = clip.clone()
            # ComfyUI CLIP.clip_layer only assigns self.layer_idx (in-place, returns None).
            # Capture a return value if a fork ever returns a new CLIP instance.
            _layered = clip.clip_layer(int(clip_skip))
            if _layered is not None:
                clip = _layered

        return (model, clip, vae)
