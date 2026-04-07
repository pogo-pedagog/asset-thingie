# Asset Thingie

ComfyUI custom nodes for managing models — browse CivitAI, download checkpoints and LoRAs, and load them with drag-and-drop from sidebar panels.

## Nodes

| Node | What it does |
|------|-------------|
| **AT Checkpoint Loader** | Loads a checkpoint with an optional CLIP skip parameter. Supports drag-and-drop from the Checkpoints sidebar. |
| **AT LoraLoader** | Applies one or more LoRAs from a JSON stack. Drag-and-drop from the Loras sidebar. |

## Install

1. Symlink (or clone) this repo into `custom_nodes`:

   ```bash
   ln -s /path/to/asset-thingie /path/to/ComfyUI/custom_nodes/asset-thingie
   ```

2. Install the Python backend (in your ComfyUI Python environment):

   ```bash
   pip install -e /path/to/asset-thingie/at-comfy
   ```

3. Restart ComfyUI. The sidebars and API routes register automatically.

If you want to develop the sidebar frontends, see [`at-comfy/README.md`](at-comfy/README.md) for build instructions.

## Configuration

Settings live in `<ComfyUI base>/at_comfy_config.json`. You can also change them from the Settings sidebar tab or via `PUT /at/config`. See [`at-comfy/README.md`](at-comfy/README.md) for API details.

## Development

```bash
pip install -e ".[dev]"
pip install -e "./at-comfy[dev]"

ruff check .
pytest -q
```

## License

MIT
