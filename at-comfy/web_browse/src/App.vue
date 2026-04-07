<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useBrowseStore } from "./stores/browse";
import { useDownloadsStore } from "./stores/downloads";
import * as api from "./api";
import BrowseFilters from "./components/BrowseFilters.vue";
import BrowseResultGrid from "./components/BrowseResultGrid.vue";
import BrowseModelDetail from "./components/BrowseModelDetail.vue";
import ConfigPanel from "./components/ConfigPanel.vue";
import type { CivitaiModelDetail } from "./types";
import { pickDefaultDownloadSpec } from "./utils/downloadSpec";

const browse = useBrowseStore();
const dl = useDownloadsStore();
const {
  items,
  loading,
  error,
  q,
  selected,
  detailLoading,
  batchMode,
  batchIds,
  duplicateResolution,
  nextPage,
} = storeToRefs(browse);
const { tasks, activeTab } = storeToRefs(dl);

onMounted(() => {
  dl.startPolling();
  void browse.search(true);
});

onUnmounted(() => {
  dl.stopPolling();
});

async function onSearch(): Promise<void> {
  await browse.search(true);
}

function onTab(name: "browse" | "downloads" | "settings"): void {
  dl.setTab(name);
  if (name === "downloads") void dl.refresh();
}

async function onDetailDownloaded(): Promise<void> {
  dl.showToast("Download queued");
  void dl.refresh();
}

function onDetailError(msg: string): void {
  dl.showToast(msg);
}

async function batchDownloadSelected(): Promise<void> {
  const payload: Record<string, unknown>[] = [];
  for (const id of batchIds.value) {
    const it = items.value.find((x) => x.id === id);
    if (!it) continue;
    const spec = pickDefaultDownloadSpec(it);
    if (!spec) continue;
    payload.push({
      civitai_model_id: spec.modelId,
      version_id: spec.versionId,
      file_id: spec.fileId,
      category: browse.category.trim() || "General",
    });
  }
  if (!payload.length) {
    dl.showToast("No downloadable files in selection");
    return;
  }
  try {
    await api.postDownloadBatch(payload, duplicateResolution.value);
    dl.showToast(`Queued ${payload.length} download(s)`);
    void dl.refresh();
    browse.clearBatch();
  } catch (e) {
    dl.showToast(e instanceof Error ? e.message : "Batch failed");
  }
}

function canCancel(state: string): boolean {
  const s = state.toLowerCase();
  return s === "queued" || s === "downloading" || s === "verifying";
}

function canPause(state: string): boolean {
  const s = state.toLowerCase();
  return s === "downloading" || s === "verifying";
}

function canRetry(state: string): boolean {
  return state.toLowerCase() === "failed";
}

function canRemove(state: string): boolean {
  const s = state.toLowerCase();
  return s === "completed" || s === "failed" || s === "cancelled" || s === "skipped" || s === "paused";
}

function setDlError(msg: string): void {
  dl.$patch({ error: msg });
}

async function onPause(id: string): Promise<void> {
  try {
    await api.pauseTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Pause failed");
  }
}

async function onCancelDl(id: string): Promise<void> {
  try {
    await api.cancelTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Cancel failed");
  }
}

async function onRetryDl(id: string): Promise<void> {
  try {
    await api.retryTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Retry failed");
  }
}

async function onRemoveDl(id: string): Promise<void> {
  try {
    await api.deleteTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Remove failed");
  }
}
</script>

<template>
  <div class="at-browse-app">
    <header class="at-browse-app__tabs">
      <button type="button" :class="{ active: activeTab === 'browse' }" @click="onTab('browse')">Browse</button>
      <button type="button" :class="{ active: activeTab === 'downloads' }" @click="onTab('downloads')">Downloads</button>
      <button
        type="button"
        class="at-browse-app__tabs-settings"
        :class="{ active: activeTab === 'settings' }"
        title="Settings"
        aria-label="Settings"
        @click="onTab('settings')"
      >
        ⚙
      </button>
    </header>

    <div v-if="activeTab === 'browse'" class="at-browse-app__panel at-browse-app__panel--browse">
      <div class="at-browse-app__browse-chrome">
        <div class="at-browse-app__search">
          <input v-model="q" class="at-input" placeholder="Search Civitai…" @keyup.enter="onSearch" />
          <button type="button" class="at-btn" :disabled="loading" @click="onSearch">Search</button>
          <button
            type="button"
            class="at-btn"
            :class="{ 'at-btn--on': batchMode }"
            @click="browse.setBatchMode(!batchMode)"
          >
            {{ batchMode ? "Exit batch" : "Batch select" }}
          </button>
        </div>

        <BrowseFilters />

        <div v-if="batchMode && batchIds.size" :key="'browse-batch-bar'" class="at-batch-bar">
          <span>{{ batchIds.size }} selected</span>
          <button type="button" class="at-btn at-btn--sm" @click="batchDownloadSelected">Download selected</button>
          <button type="button" class="at-btn at-btn--sm at-btn--ghost" @click="browse.clearBatch">Clear</button>
        </div>

        <p v-if="error" :key="'browse-search-error'" class="at-err">{{ error }}</p>
      </div>

      <div v-if="detailLoading || selected" :key="'browse-detail-panel'" class="at-browse-app__detail-panel">
        <p v-if="detailLoading" class="at-muted">Loading model…</p>
        <BrowseModelDetail
          v-else-if="selected"
          :model="selected as CivitaiModelDetail"
          @close="browse.closeDetail()"
          @downloaded="onDetailDownloaded()"
          @error="onDetailError"
        />
      </div>

      <div class="at-browse-app__browse-scroll">
        <BrowseResultGrid />

        <button v-if="nextPage" type="button" class="at-btn at-btn--block" :disabled="loading" @click="browse.loadMore()">
          Load more
        </button>
      </div>
    </div>

    <div v-else-if="activeTab === 'downloads'" class="at-browse-app__panel">
      <p v-if="dl.error" class="at-err">{{ dl.error }}</p>
      <ul class="at-dl-list">
        <li v-for="t in tasks" :key="t.id" class="at-dl">
          <div class="at-dl__row">
            <img
              v-if="api.resolveCacheUrl(t.cover_thumb_url)"
              class="at-dl__thumb"
              :src="api.resolveCacheUrl(t.cover_thumb_url)!"
              alt=""
            />
            <div class="at-dl__main">
              <div class="at-dl__title">{{ t.display_name || t.filename }} — {{ t.state }}</div>
              <div v-if="t.error_message" class="at-dl__err">{{ t.error_message }}</div>
              <div v-if="t.total_bytes" class="at-dl__bar">
                <div
                  class="at-dl__fill"
                  :style="{ width: `${Math.min(100, Math.round((100 * t.bytes_done) / (t.total_bytes || 1)))}%` }"
                />
              </div>
            </div>
          </div>
          <div class="at-dl__actions">
            <button v-if="canCancel(t.state)" type="button" class="at-btn at-btn--sm" @click="onCancelDl(t.id)">Cancel</button>
            <button v-if="canPause(t.state)" type="button" class="at-btn at-btn--sm" @click="onPause(t.id)">Pause</button>
            <button v-if="canRetry(t.state)" type="button" class="at-btn at-btn--sm" @click="onRetryDl(t.id)">Retry</button>
            <button v-if="canRemove(t.state)" type="button" class="at-btn at-btn--sm" @click="onRemoveDl(t.id)">Remove</button>
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="at-browse-app__panel at-browse-app__panel--scroll">
      <ConfigPanel />
    </div>
  </div>
</template>

<style scoped>
.at-browse-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  font-size: 14px;
}
.at-browse-app__tabs {
  display: flex;
  gap: 0.25rem;
  padding: 0.35rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #888) 20%, transparent);
}
.at-browse-app__tabs button {
  flex: 1;
  font: inherit;
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-browse-app__tabs button.active {
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
}
.at-browse-app__tabs button.at-browse-app__tabs-settings {
  flex: 0 0 auto;
  min-width: 2.25rem;
  font-size: 1.1rem;
  line-height: 1;
  padding-inline: 0.35rem;
}
.at-browse-app__panel {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.at-browse-app__panel--browse {
  overflow: hidden;
  padding: 0;
  gap: 0;
}
.at-browse-app__browse-chrome {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0.45rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #888) 18%, transparent);
  background: var(--comfy-input-bg, #1a1a1a);
  background-clip: padding-box;
  z-index: 1;
}
.at-browse-app__detail-panel {
  flex-shrink: 0;
  max-height: min(50vh, 28rem);
  min-height: 0;
  overflow: hidden auto;
  padding: 0.5rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #888) 18%, transparent);
  background: color-mix(in srgb, var(--fg-color, #fff) 5%, var(--comfy-input-bg, #1a1a1a));
}
.at-browse-app__browse-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.at-browse-app__panel--scroll {
  overflow: auto;
}
.at-browse-app__search {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.at-input {
  flex: 1;
  min-width: 120px;
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
.at-btn--on {
  background: color-mix(in srgb, #6af 22%, transparent);
}
.at-btn--block {
  width: 100%;
}
.at-btn--sm {
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
}
.at-btn--ghost {
  opacity: 0.85;
}
.at-err {
  color: #f66;
  font-size: 0.8rem;
  margin: 0;
}
.at-muted {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.75;
}
.at-batch-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem;
  border-radius: 6px;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
  font-size: 0.8rem;
}
.at-dl-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.at-dl {
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  border-radius: 6px;
  padding: 0.4rem;
  margin-bottom: 0.35rem;
}
.at-dl__row {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}
.at-dl__thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.at-dl__main {
  flex: 1;
  min-width: 0;
}
.at-dl__title {
  font-size: 0.8rem;
}
.at-dl__err {
  font-size: 0.72rem;
  color: #f88;
  margin-top: 0.2rem;
}
.at-dl__bar {
  height: 4px;
  background: color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  border-radius: 2px;
  margin: 0.35rem 0 0;
  overflow: hidden;
}
.at-dl__fill {
  height: 100%;
  background: color-mix(in srgb, #6af 60%, transparent);
}
.at-dl__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.35rem;
}
</style>
