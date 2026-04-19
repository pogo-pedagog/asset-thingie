<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import * as api from "../api";
import { useDownloadsStore } from "../stores/downloads";
import type { DownloadTaskRow } from "../types";
import { formatDownloadProgressLine } from "../utils/format";

const dl = useDownloadsStore();
const {
  tasks,
  error,
  numBulkPause,
  numPaused,
  numFailed,
  numCompleted,
  numTerminal,
} = storeToRefs(dl);

function setDlError(msg: string): void {
  dl.$patch({ error: msg });
}

function norm(state: string): string {
  return String(state || "").toLowerCase();
}

function canPause(state: string): boolean {
  const s = norm(state);
  return s === "queued" || s === "downloading" || s === "verifying";
}

function canResume(state: string): boolean {
  return norm(state) === "paused";
}

function canRetry(state: string): boolean {
  const s = norm(state);
  return s === "failed" || s === "cancelled";
}

function canClear(state: string): boolean {
  return ["completed", "failed", "cancelled", "skipped"].includes(norm(state));
}

function showClearInline(state: string): boolean {
  return norm(state) === "completed" || norm(state) === "skipped";
}

function showMoveTopInline(state: string): boolean {
  return norm(state) === "queued";
}

function hasOverflow(t: DownloadTaskRow): boolean {
  const s = norm(t.state);
  if (s === "queued" || s === "downloading" || s === "verifying") return true;
  if (s === "paused") return true;
  if (s === "failed" || s === "cancelled") return true;
  return false;
}

function showOverflowCancel(t: DownloadTaskRow): boolean {
  const s = norm(t.state);
  return s === "queued" || s === "downloading" || s === "verifying";
}

function progressLine(t: DownloadTaskRow): string {
  return formatDownloadProgressLine(t.state, t.bytes_done, t.total_bytes, t.rate_bps ?? null);
}

const menuTaskId = ref<string | null>(null);
const menuPos = ref({ top: "0px", left: "0px", minWidth: "168px" });
const menuPopoverEl = ref<HTMLElement | null>(null);

const menuTask = computed(() => tasks.value.find((x) => x.id === menuTaskId.value) ?? null);

function closeMenu(): void {
  menuTaskId.value = null;
}

function toggleMoreMenu(t: DownloadTaskRow, ev: MouseEvent): void {
  ev.preventDefault();
  ev.stopPropagation();
  if (menuTaskId.value === t.id) {
    menuTaskId.value = null;
    return;
  }
  const btn = ev.currentTarget as HTMLElement;
  const r = btn.getBoundingClientRect();
  const width = 168;
  const left = Math.min(window.innerWidth - width - 8, Math.max(8, r.right - width));
  const top = r.bottom + 4;
  menuPos.value = { top: `${top}px`, left: `${left}px`, minWidth: `${width}px` };
  menuTaskId.value = t.id;
}

function onDocMouseDown(ev: MouseEvent): void {
  if (!menuTaskId.value) return;
  const el = ev.target as Node | null;
  if (menuPopoverEl.value?.contains(el)) return;
  const t = ev.target as HTMLElement | null;
  if (t?.closest?.(".at-dl-menu-trigger")) return;
  closeMenu();
}

function onDocKeyDown(ev: KeyboardEvent): void {
  if (ev.key === "Escape" && menuTaskId.value) {
    closeMenu();
  }
}

watch(menuTaskId, (id) => {
  document.removeEventListener("mousedown", onDocMouseDown, true);
  document.removeEventListener("keydown", onDocKeyDown);
  window.removeEventListener("resize", closeMenu);
  window.removeEventListener("scroll", closeMenu, true);
  if (!id) return;
  document.addEventListener("mousedown", onDocMouseDown, true);
  document.addEventListener("keydown", onDocKeyDown);
  window.addEventListener("resize", closeMenu);
  window.addEventListener("scroll", closeMenu, true);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", onDocMouseDown, true);
  document.removeEventListener("keydown", onDocKeyDown);
  window.removeEventListener("resize", closeMenu);
  window.removeEventListener("scroll", closeMenu, true);
});

async function onPause(id: string): Promise<void> {
  try {
    await api.pauseTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Pause failed");
  }
}

async function onResume(id: string): Promise<void> {
  try {
    await api.resumeTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Resume failed");
  }
}

async function onCancel(id: string): Promise<void> {
  try {
    await api.cancelTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Cancel failed");
  }
}

async function onRetry(id: string): Promise<void> {
  try {
    await api.retryTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Retry failed");
  }
}

async function onClear(id: string): Promise<void> {
  try {
    await api.clearTask(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Clear failed");
  }
}

async function onMoveTop(id: string): Promise<void> {
  try {
    await api.moveTaskToTop(id);
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Move failed");
  }
}

async function menuCancel(t: DownloadTaskRow): Promise<void> {
  closeMenu();
  await onCancel(t.id);
}

async function menuMoveTop(t: DownloadTaskRow): Promise<void> {
  closeMenu();
  await onMoveTop(t.id);
}

async function menuClear(t: DownloadTaskRow): Promise<void> {
  closeMenu();
  await onClear(t.id);
}

async function onBulkPause(): Promise<void> {
  try {
    await api.bulkPauseDownloads();
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Bulk pause failed");
  }
}

async function onBulkResume(): Promise<void> {
  try {
    await api.bulkResumeDownloads();
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Bulk resume failed");
  }
}

async function onBulkRetryFailed(): Promise<void> {
  try {
    await api.bulkRetryFailedDownloads();
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Bulk retry failed");
  }
}

async function onBulkClearFinished(): Promise<void> {
  try {
    await api.bulkClearFinishedDownloads();
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Clear finished failed");
  }
}

async function onBulkClearInactive(): Promise<void> {
  try {
    await api.bulkClearDoneDownloads();
    void dl.refresh();
  } catch (e) {
    setDlError(e instanceof Error ? e.message : "Clear inactive failed");
  }
}
</script>

<template>
  <div class="at-downloads-tab">
    <p v-if="error" class="at-err">{{ error }}</p>

    <div v-if="numBulkPause + numPaused + numFailed + numCompleted + numTerminal > 0" class="at-dl-bulk">
      <button v-if="numBulkPause > 0" type="button" class="at-btn at-btn--sm" @click="onBulkPause">Pause all</button>
      <button v-if="numPaused > 0" type="button" class="at-btn at-btn--sm" @click="onBulkResume">Resume all</button>
      <button v-if="numFailed > 0" type="button" class="at-btn at-btn--sm" @click="onBulkRetryFailed">Retry all failed</button>
      <button
        v-if="numCompleted > 0"
        type="button"
        class="at-btn at-btn--sm"
        title="Remove completed downloads from the list only"
        @click="onBulkClearFinished"
      >
        Clear finished
      </button>
      <button
        v-if="numTerminal > 0"
        type="button"
        class="at-btn at-btn--sm"
        title="Remove completed, failed, cancelled, and skipped rows from the list"
        @click="onBulkClearInactive"
      >
        Clear inactive
      </button>
    </div>

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
            <div v-if="progressLine(t)" class="at-dl__meter">{{ progressLine(t) }}</div>
            <div v-if="t.error_message" class="at-dl__err">{{ t.error_message }}</div>
            <div v-if="t.total_bytes || t.bytes_done" class="at-dl__bar">
              <div
                class="at-dl__fill"
                :style="{ width: `${Math.min(100, Math.round((100 * t.bytes_done) / (t.total_bytes || 1)))}%` }"
              />
            </div>
          </div>
        </div>
        <div class="at-dl__actions">
          <button v-if="canPause(t.state)" type="button" class="at-btn at-btn--sm" @click="onPause(t.id)">Pause</button>
          <button
            v-if="showMoveTopInline(t.state)"
            type="button"
            class="at-btn at-btn--sm"
            @click="onMoveTop(t.id)"
          >
            Move to top
          </button>
          <button v-if="canResume(t.state)" type="button" class="at-btn at-btn--sm" @click="onResume(t.id)">Resume</button>
          <button v-if="canRetry(t.state)" type="button" class="at-btn at-btn--sm" @click="onRetry(t.id)">Retry</button>
          <button
            v-if="canClear(t.state) && showClearInline(t.state)"
            type="button"
            class="at-btn at-btn--sm"
            @click="onClear(t.id)"
          >
            Clear
          </button>

          <button
            v-if="hasOverflow(t)"
            type="button"
            class="at-btn at-btn--sm at-dl-menu-trigger"
            :aria-expanded="menuTaskId === t.id"
            aria-haspopup="menu"
            aria-label="More actions"
            @click="toggleMoreMenu(t, $event)"
          >
            ⋯
          </button>
        </div>
      </li>
    </ul>

    <Teleport to="body">
      <div
        v-if="menuTaskId && menuTask"
        ref="menuPopoverEl"
        class="at-dl-menu-flyout"
        :style="{ top: menuPos.top, left: menuPos.left, minWidth: menuPos.minWidth }"
        role="menu"
        @mousedown.stop
      >
        <button
          v-if="menuTask && showOverflowCancel(menuTask)"
          type="button"
          class="at-dl-menu-flyout__item"
          role="menuitem"
          @click="menuCancel(menuTask)"
        >
          Cancel
        </button>
        <template v-if="menuTask && norm(menuTask.state) === 'paused'">
          <button type="button" class="at-dl-menu-flyout__item" role="menuitem" @click="menuMoveTop(menuTask)">
            Move to top
          </button>
          <button type="button" class="at-dl-menu-flyout__item" role="menuitem" @click="menuCancel(menuTask)">
            Cancel
          </button>
        </template>
        <button
          v-if="menuTask && (norm(menuTask.state) === 'failed' || norm(menuTask.state) === 'cancelled')"
          type="button"
          class="at-dl-menu-flyout__item"
          role="menuitem"
          @click="menuClear(menuTask)"
        >
          Clear
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.at-downloads-tab {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.at-dl-bulk {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
}
.at-dl-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.at-dl {
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
  padding: 0.35rem 0;
}
.at-dl__row {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}
.at-dl__thumb {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.at-dl__main {
  flex: 1;
  min-width: 0;
}
.at-dl__title {
  font-weight: 500;
}
.at-dl__meter {
  font-size: 0.78rem;
  opacity: 0.82;
  margin-top: 0.12rem;
}
.at-dl__err {
  color: #f66;
  font-size: 0.85em;
  margin-top: 0.15rem;
}
.at-dl__bar {
  height: 4px;
  background: color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  border-radius: 2px;
  margin-top: 0.25rem;
  overflow: hidden;
}
.at-dl__fill {
  height: 100%;
  background: color-mix(in srgb, var(--fg-color, #888) 55%, transparent);
}
.at-dl__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  margin-top: 0.35rem;
}
</style>

<style>
/* Teleported — not scoped */
.at-dl-menu-flyout {
  position: fixed;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0.25rem 0;
  margin: 0;
  background: var(--comfy-menu-bg, #353535);
  color: var(--fg-color, #ddd);
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  min-width: 168px;
}
.at-dl-menu-flyout__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.4rem 0.75rem;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.at-dl-menu-flyout__item:hover {
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
}
</style>
