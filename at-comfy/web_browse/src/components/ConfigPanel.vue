<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as api from "../api";
import type { AtComfyPublicConfig } from "../types";
import { useBrowseStore } from "../stores/browse";

const browse = useBrowseStore();

const loading = ref(false);
const error = ref<string | null>(null);
const config = ref<AtComfyPublicConfig | null>(null);
const baseUrlInput = ref(api.getBaseUrl());
const apiKeyInput = ref("");
const scanStatus = ref<Record<string, unknown> | null>(null);
const enrichStatus = ref<Record<string, unknown> | null>(null);
let statusTimer: ReturnType<typeof setInterval> | null = null;

async function loadAll(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    config.value = await api.fetchConfig();
    if (config.value) {
      if (typeof config.value.download_example_videos !== "boolean") {
        config.value.download_example_videos = false;
      }
      if (typeof config.value.generate_video_posters !== "boolean") {
        config.value.generate_video_posters = true;
      }
      if (typeof config.value.max_example_images !== "number" || !Number.isFinite(config.value.max_example_images)) {
        config.value.max_example_images = 20;
      }
    }
    baseUrlInput.value = api.getBaseUrl();
    apiKeyInput.value = "";
    browse.hideNsfwFromConfig = Boolean(config.value?.hide_nsfw);
    browse.hideEarlyAccessFromConfig = config.value?.hide_early_access !== false;
    scanStatus.value = await api.fetchScanStatus();
    enrichStatus.value = await api.fetchEnrichStatus();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Load failed";
  } finally {
    loading.value = false;
  }
}

function applyServerUrl(): void {
  api.setBaseUrl(baseUrlInput.value || api.DEFAULT_BASE_URL);
  baseUrlInput.value = api.getBaseUrl();
}

async function saveConfig(): Promise<void> {
  if (!config.value) return;
  loading.value = true;
  error.value = null;
  try {
    const body: Record<string, unknown> = {
      scan_on_startup: config.value.scan_on_startup,
      enrichment_mode: config.value.enrichment_mode,
      enrichment_rate_limit_ms: config.value.enrichment_rate_limit_ms,
      max_example_images: config.value.max_example_images,
      max_parallel_downloads: config.value.max_parallel_downloads,
      download_subpath_template: config.value.download_subpath_template,
      hide_early_access: config.value.hide_early_access,
      hide_nsfw: config.value.hide_nsfw,
      download_example_videos: config.value.download_example_videos,
      generate_video_posters: config.value.generate_video_posters,
    };
    if (apiKeyInput.value.trim()) body.civitai_api_key = apiKeyInput.value.trim();
    config.value = await api.putConfig(body);
    apiKeyInput.value = "";
    browse.hideNsfwFromConfig = Boolean(config.value?.hide_nsfw);
    browse.hideEarlyAccessFromConfig = config.value?.hide_early_access !== false;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Save failed";
  } finally {
    loading.value = false;
  }
}

async function triggerScan(): Promise<void> {
  try {
    await api.postScan();
    scanStatus.value = await api.fetchScanStatus();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Scan failed";
  }
}

async function triggerEnrich(): Promise<void> {
  try {
    await api.postEnrich();
    enrichStatus.value = await api.fetchEnrichStatus();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Enrich failed";
  }
}

async function resetCivarchiveBaseModels(): Promise<void> {
  if (
    !confirm(
      "Clear the CivArchive base model list learned from search? The dropdown will fall back to defaults until new searches add names again.",
    )
  ) {
    return;
  }
  try {
    await api.postCivarchiveBaseModelsReset();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Reset failed";
  }
}

async function tickStatus(): Promise<void> {
  try {
    scanStatus.value = await api.fetchScanStatus();
    enrichStatus.value = await api.fetchEnrichStatus();
  } catch {
    /* ignore poll errors */
  }
}

onMounted(() => {
  void loadAll();
  statusTimer = setInterval(() => void tickStatus(), 4000);
});

onUnmounted(() => {
  if (statusTimer) clearInterval(statusTimer);
});
</script>

<template>
  <div class="config-panel">
    <p v-if="error" class="at-err">{{ error }}</p>
    <p v-if="loading && !config" class="at-muted">Loading…</p>

    <template v-if="config">
      <label class="at-label">
        Server URL
        <input v-model="baseUrlInput" class="at-input" type="url" autocomplete="off" />
      </label>
      <p class="at-hint">
        Default: <code>http://127.0.0.1:8188</code>
      </p>
      <button type="button" class="at-btn at-btn--ghost" @click="applyServerUrl">Apply server URL</button>

      <label class="at-label">
        Civitai API key
        <input
          v-model="apiKeyInput"
          class="at-input"
          type="password"
          autocomplete="off"
          :placeholder="config.civitai_api_key_set ? '(unchanged — enter new key to replace)' : 'Optional'"
        />
      </label>

      <label class="at-label at-label--row">
        <input v-model="config.scan_on_startup" type="checkbox" />
        Scan library on startup
      </label>

      <label class="at-label">
        Enrichment mode
        <select v-model="config.enrichment_mode" class="at-input">
          <option value="auto">Auto (during scan)</option>
          <option value="background">Background (after scan)</option>
          <option value="manual">Manual only</option>
        </select>
      </label>

      <label class="at-label">
        Enrichment rate limit (ms)
        <input v-model.number="config.enrichment_rate_limit_ms" class="at-input" type="number" min="200" step="100" />
      </label>

      <label class="at-label">
        Max example images per asset
        <input
          v-model.number="config.max_example_images"
          class="at-input"
          type="number"
          min="1"
          max="200"
          step="1"
        />
      </label>
      <p class="at-hint">
        Gallery stills (and video slots) to download during enrichment or after a Civitai download. Range 1–200.
      </p>

      <label class="at-label">
        Max parallel downloads
        <input v-model.number="config.max_parallel_downloads" class="at-input" type="number" min="1" max="8" />
      </label>

      <label class="at-label">
        Download subpath template
        <input v-model="config.download_subpath_template" class="at-input" placeholder="{category}" />
      </label>

      <label class="at-label at-label--row">
        <input v-model="config.hide_early_access" type="checkbox" />
        Skip early-access downloads (Civitai)
      </label>

      <label class="at-label at-label--row">
        <input v-model="config.hide_nsfw" type="checkbox" />
        Hide NSFW from Civitai (browse search, detail, and related API calls)
      </label>

      <p class="at-hint">
        CivArchive browse accumulates <strong>base model</strong> strings from search results into SQLite. Use reset
        if the dropdown grows stale.
      </p>
      <button type="button" class="at-btn at-btn--ghost" @click="resetCivarchiveBaseModels">
        Reset CivArchive base model list
      </button>

      <label class="at-label at-label--row">
        <input v-model="config.download_example_videos" type="checkbox" />
        Download gallery video samples during enrichment (uses more disk; enables offline video in sidebars)
      </label>

      <label class="at-label at-label--row">
        <input v-model="config.generate_video_posters" type="checkbox" />
        Generate JPEG poster frames for video samples (uses ffmpeg when available; still images work without it)
      </label>

      <div class="config-panel__actions">
        <button type="button" class="at-btn" :disabled="loading" @click="saveConfig">Save settings</button>
        <button type="button" class="at-btn" @click="triggerScan">Scan now</button>
        <button type="button" class="at-btn" @click="triggerEnrich">Enrich now</button>
        <button type="button" class="at-btn at-btn--ghost" @click="loadAll">Reload</button>
      </div>

      <div class="config-panel__status">
        <h4>Scan</h4>
        <pre class="config-panel__pre">{{ JSON.stringify(scanStatus, null, 2) }}</pre>
        <h4>Enrichment</h4>
        <pre class="config-panel__pre">{{ JSON.stringify(enrichStatus, null, 2) }}</pre>
      </div>
    </template>
  </div>
</template>

<style scoped>
.config-panel {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 0.85rem;
}
.at-err {
  color: #f66;
  margin: 0;
}
.at-muted {
  margin: 0;
  opacity: 0.75;
}
.at-hint {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.8;
  line-height: 1.35;
}
.at-hint code {
  font-size: 0.72rem;
}
.at-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.at-label--row {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
.at-input {
  font: inherit;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: var(--comfy-input-bg, #1a1a1a);
  color: inherit;
}
.at-btn {
  font: inherit;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-btn--ghost {
  opacity: 0.85;
}
.config-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.config-panel__status h4 {
  margin: 0.5rem 0 0.2rem;
  font-size: 0.8rem;
}
.config-panel__pre {
  font-size: 0.7rem;
  margin: 0;
  padding: 0.35rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
  max-height: 9rem;
  overflow: auto;
}
</style>
