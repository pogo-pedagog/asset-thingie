.PHONY: build clean

# Frontend sidebar bundles (Vite → js/dist/). Requires Node 18+ and npm on PATH.
build:
	cd at-comfy/web_loras && npm ci && npm run build
	cd at-comfy/web_checkpoints && npm ci && npm run build
	cd at-comfy/web_browse && npm ci && npm run build

# Remove sidebar bundle outputs, per-app node_modules, and Python packaging outputs
# (package-lock.json stays; js/dist/ is emptied but the directory remains).
clean:
	rm -rf at-comfy/web_loras/node_modules
	rm -rf at-comfy/web_checkpoints/node_modules
	rm -rf at-comfy/web_browse/node_modules
	@mkdir -p js/dist
	@find js/dist -mindepth 1 -delete
	@find . -maxdepth 1 \( -name build -o -name dist \) -exec rm -rf {} +
	@find . -maxdepth 1 -type d -name '*.egg-info' -exec rm -rf {} +
	@find at-comfy -maxdepth 1 \( -name build -o -name dist \) -exec rm -rf {} +
	@find at-comfy -maxdepth 1 -type d -name '*.egg-info' -exec rm -rf {} +
