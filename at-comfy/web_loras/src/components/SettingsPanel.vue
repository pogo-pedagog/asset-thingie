<script setup lang="ts">
import { ref } from "vue";
import * as api from "../api";
import { useAssetsStore } from "../stores/assets";

const store = useAssetsStore();

const preview = ref<api.CleanPreviewResponse | null>(null);
const loadingPreview = ref(false);
const cleaning = ref(false);
const previewError = ref<string | null>(null);

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

async function loadPreview(): Promise<void> {
  previewError.value = null;
  loadingPreview.value = true;
  try {
    preview.value = await api.fetchCleanPreview();
  } catch (e) {
    previewError.value = e instanceof Error ? e.message : "Preview failed";
    preview.value = null;
  } finally {
    loadingPreview.value = false;
  }
}

async function confirmClean(): Promise<void> {
  if (!preview.value?.stale_count) return;
  cleaning.value = true;
  try {
    const r = await api.confirmCleanLibrary();
    store.showToast(`Removed ${r.removed} stale entr${r.removed === 1 ? "y" : "ies"}`);
    preview.value = await api.fetchCleanPreview();
    await store.loadAssets(true);
  } catch (e) {
    store.showToast(e instanceof Error ? e.message : "Clean failed");
  } finally {
    cleaning.value = false;
  }
}

function close(): void {
  store.settingsOpen = false;
}

function save(): void {
  store.saveSettingsUrl();
  store.settingsOpen = false;
}
</script>

<template>
  <div class="at-settings-backdrop" @click.self="close">
    <div class="at-settings" role="dialog" aria-label="AssetThingie settings">
      <h2 class="at-settings__title">AssetThingie</h2>
      <label class="at-settings__label">
        Server URL
        <input v-model="store.baseUrlInput" type="url" class="at-settings__input" />
      </label>
      <p class="at-settings__hint">
        AssetThingie URL. Default
        <code>http://127.0.0.1:8188</code>
      </p>

      <div class="at-settings__section">
        <h3 class="at-settings__subtitle">Library maintenance</h3>
        <p class="at-settings__hint">
          Remove database entries for model files that are no longer on disk, and delete their
          cached cover/example images.
        </p>
        <div class="at-settings__row">
          <button type="button" class="at-settings__btn" :disabled="loadingPreview" @click="loadPreview">
            {{ loadingPreview ? "Checking…" : "Check for missing files" }}
          </button>
        </div>
        <p v-if="previewError" class="at-settings__err">{{ previewError }}</p>
        <template v-else-if="preview">
          <p v-if="preview.stale_count === 0" class="at-settings__ok">
            Library is clean — no missing models found.
          </p>
          <p v-else class="at-settings__warn">
            {{ preview.stale_count }} model{{ preview.stale_count === 1 ? "" : "s" }} missing from disk.
            Cached images: ~{{ formatBytes(preview.orphan_cache_bytes) }}.
          </p>
          <ul v-if="preview.stale_count > 0" class="at-settings__stale-list">
            <li v-for="s in preview.stale_assets.slice(0, 12)" :key="s.asset_id">
              <span class="at-settings__stale-name">{{ s.display_name || s.path }}</span>
            </li>
            <li v-if="preview.stale_assets.length > 12">…</li>
          </ul>
          <button
            type="button"
            class="at-settings__btn at-settings__btn--danger"
            :disabled="preview.stale_count === 0 || cleaning"
            @click="confirmClean"
          >
            {{ cleaning ? "Removing…" : "Confirm removal" }}
          </button>
        </template>
      </div>

      <div class="at-settings__actions">
        <button type="button" class="at-settings__btn" @click="close">Cancel</button>
        <button type="button" class="at-settings__btn at-settings__btn--primary" @click="save">
          Save &amp; reconnect
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.at-settings-backdrop {
  position: fixed;
  top: var(--comfy-topbar-height, 0);
  left: 0;
  right: 0;
  bottom: 0;
  background: color-mix(in srgb, #000 45%, transparent);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}
.at-settings {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border-radius: 8px;
  background: var(--comfy-menu-bg, var(--p-content-background, #2a2a2a));
  color: inherit;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 20%, transparent);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}
.at-settings__title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}
.at-settings__subtitle {
  margin: 0 0 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
}
.at-settings__section {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
}
.at-settings__row {
  margin-top: 0.5rem;
}
.at-settings__stale-list {
  margin: 0.35rem 0 0.5rem;
  padding-left: 1.1rem;
  font-size: 0.72rem;
  max-height: 8rem;
  overflow-y: auto;
  opacity: 0.95;
}
.at-settings__stale-name {
  word-break: break-all;
}
.at-settings__ok {
  font-size: 0.78rem;
  margin: 0.5rem 0 0;
  opacity: 0.9;
}
.at-settings__warn {
  font-size: 0.78rem;
  margin: 0.5rem 0 0;
  color: var(--p-orange-400, #fb923c);
}
.at-settings__err {
  font-size: 0.78rem;
  margin: 0.5rem 0 0;
  color: var(--p-red-400, #f87171);
}
.at-settings__label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
}
.at-settings__input {
  font: inherit;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: var(--comfy-input-bg, #1a1a1a);
  color: inherit;
}
.at-settings__hint {
  font-size: 0.72rem;
  opacity: 0.8;
  margin: 0.5rem 0 0;
}
.at-settings__hint code {
  font-size: 0.68rem;
}
.at-settings__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
.at-settings__btn {
  font: inherit;
  font-size: 0.8rem;
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-settings__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.at-settings__btn--primary {
  border-color: var(--p-primary-color, #6366f1);
  background: color-mix(in srgb, var(--p-primary-color, #6366f1) 20%, transparent);
}
.at-settings__btn--danger {
  border-color: var(--p-red-500, #ef4444);
  background: color-mix(in srgb, var(--p-red-500, #ef4444) 15%, transparent);
  margin-top: 0.35rem;
}
</style>
