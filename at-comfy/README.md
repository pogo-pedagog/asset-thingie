# at-comfy

Python backend package for [Asset Thingie](../README.md). Provides the HTTP API, SQLite database, CivitAI integration, and serves the Vue sidebar apps. Installed as a pip package (`at_comfy`); the ComfyUI entry point is the repo root — this directory is just the backend source.

## What it does

- Scans your Comfy model directories and indexes LoRAs and checkpoints in a local SQLite database.
- Enriches entries with metadata from CivitAI (descriptions, tags, trigger words, preview images).
- Adds three sidebar tabs (Browse, LoRAs, Checkpoints) built with Vue 3. Tab order is fixed in `js/at_sidebar_tabs.js` (single extension); Comfy does not order tabs by script filename.
- Browse tab lets you search CivitAI, view model details, and download files directly into your Comfy model folders.
- Download manager with pause/resume, parallel downloads, and progress tracking.

## Install

Typically you just follow the root [README](../README.md). If you need to install the backend separately:

```bash
pip install -e /path/to/asset-thingie/at-comfy
```

### Building the sidebar UIs (for development)

Each sidebar app lives under `web_loras/`, `web_checkpoints/`, and `web_browse/`. Build output goes to `js/dist/` at the repo root:

```bash
cd at-comfy/web_loras && npm ci && npm run build
cd ../web_checkpoints && npm ci && npm run build
cd ../web_browse && npm ci && npm run build
```

## Configuration

Config file: `<ComfyUI base>/at_comfy_config.json`

| Setting | Default | Description |
|---------|---------|-------------|
| `civitai_api_key` | `""` | API key for higher CivitAI rate limits |
| `scan_on_startup` | `true` | Scan model directories when ComfyUI starts |
| `enrichment_mode` | `"background"` | `auto`, `background`, or `manual` |
| `enrichment_rate_limit_ms` | `500` | Minimum delay between CivitAI API calls |
| `max_parallel_downloads` | `2` | Concurrent download limit |
| `hide_early_access` | `true` | Hide early-access models in browse results |
| `hide_nsfw` | `true` | Hide NSFW content (set to `false` in config to show) |

Database: `<ComfyUI base>/at_comfy.db`
Image cache: `<ComfyUI base>/at_cache/`

## API

All routes are under `/at/` and run on Comfy's aiohttp server (default port 8188).

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/at/health` | Liveness check |
| GET/PUT | `/at/config` | Read or update settings |
| POST | `/at/scan` | Rescan model directories |
| GET | `/at/assets` | List library assets (with search, filters) |
| GET | `/at/filters`, `/at/subfolders` | Filter options for the UI |
| POST | `/at/enrich` | Trigger CivitAI metadata enrichment |
| POST | `/at/assets/{id}/re-enrich` | Re-fetch metadata for one asset |
| GET | `/at/browse/search` | Search CivitAI |
| GET | `/at/browse/model/{id}` | CivitAI model detail |
| GET/POST/DELETE | `/at/downloads`, `/at/download` | Download manager |
| GET | `/at/cache/{path}` | Serve cached images |
| POST | `/at/library/clean` | Remove stale entries and orphaned cache |

## Development

```bash
pip install -e "../[dev]"
pip install -e ".[dev]"

ruff check .
pytest -q tests/
```

Frontend apps: `npm ci && npm run lint && npm run typecheck && npm run build` in each `web_*` directory.

## License

MIT
