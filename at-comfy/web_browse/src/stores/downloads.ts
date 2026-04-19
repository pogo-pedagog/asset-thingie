import { defineStore } from "pinia";
import { computed, ref } from "vue";
import * as api from "../api";
import type { DownloadTaskRow } from "../types";

const POLL_FAST_MS = 1500;
const POLL_SLOW_MS = 10_000;

function isTaskActive(state: string): boolean {
  const s = state.toLowerCase();
  return s === "queued" || s === "downloading" || s === "verifying";
}

/** User-facing message after queueing one or more downloads. */
export function formatQueuedToast(count: number, skipped?: number): string {
  const n = Math.max(0, Math.floor(count));
  const base = n === 1 ? "1 download added" : `${n} downloads added`;
  if (skipped != null && skipped > 0) {
    return `${base} (${skipped} skipped)`;
  }
  return base;
}

function showToast(msg: string, durationMs = 3500): void {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = [
    "position:fixed",
    "bottom:1rem",
    "right:1rem",
    "z-index:99999",
    "background:var(--comfy-menu-bg,#353535)",
    "color:var(--fg-color,#ddd)",
    "padding:0.75rem 1.25rem",
    "border-radius:8px",
    "font-size:0.85rem",
    "box-shadow:0 4px 12px rgba(0,0,0,0.4)",
    "opacity:0",
    "transition:opacity 0.2s ease",
  ].join(";");
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = "1";
  });
  setTimeout(() => {
    el.style.opacity = "0";
         setTimeout(() => el.remove(), 220);
  }, durationMs);
}

export const useDownloadsStore = defineStore("at-downloads", () => {
  const tasks = ref<DownloadTaskRow[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  /** Mirrored from the UI tab so we can toast when queue tab is hidden. */
  const activeTab = ref<"browse" | "downloads" | "settings">("browse");

  function setTab(t: "browse" | "downloads" | "settings"): void {
    activeTab.value = t;
  }

  let pollTimer: ReturnType<typeof setTimeout> | null = null;
  const seenCompleted = ref(new Set<string>());

  function anyActiveTasks(): boolean {
    return tasks.value.some((x) => isTaskActive(x.state));
  }

  function schedulePoll(): void {
    if (pollTimer != null) {
      clearTimeout(pollTimer);
      pollTimer = null;
    }
    const ms = anyActiveTasks() ? POLL_FAST_MS : POLL_SLOW_MS;
    pollTimer = setTimeout(() => {
      void tick();
    }, ms);
  }

  async function tick(): Promise<void> {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      schedulePoll();
      return;
    }
    await refresh({ forPoll: true });
    schedulePoll();
  }

  async function refresh(opts?: { forPoll?: boolean }): Promise<void> {
    const forPoll = opts?.forPoll === true;
    if (!forPoll) loading.value = true;
    error.value = null;
    try {
      const res = await api.fetchDownloads();
      tasks.value = res.tasks;
      for (const id of res.completed_since_last_poll ?? []) {
        if (!seenCompleted.value.has(id)) {
          seenCompleted.value.add(id);
          const t = res.tasks.find((x) => x.id === id);
          const label = t?.filename ?? id.slice(0, 8);
          if (activeTab.value !== "downloads") {
            showToast(`Download completed: ${label}`);
          }
        }
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Queue load failed";
    } finally {
      if (!forPoll) loading.value = false;
    }
  }

  function startPolling(): void {
    if (pollTimer != null) return;
    void refresh({ forPoll: true }).finally(() => schedulePoll());
  }

  function stopPolling(): void {
    if (pollTimer != null) {
      clearTimeout(pollTimer);
      pollTimer = null;
    }
  }

  function stateOf(t: DownloadTaskRow): string {
    return String(t.state || "").toLowerCase();
  }

  const numBulkPause = computed(() =>
    tasks.value.filter((x) => ["queued", "downloading", "verifying"].includes(stateOf(x))).length,
  );
  const numPaused = computed(() => tasks.value.filter((x) => stateOf(x) === "paused").length);
  const numFailed = computed(() => tasks.value.filter((x) => stateOf(x) === "failed").length);
  const numCompleted = computed(() => tasks.value.filter((x) => stateOf(x) === "completed").length);
  const numTerminal = computed(() =>
    tasks.value.filter((x) => ["completed", "failed", "cancelled", "skipped"].includes(stateOf(x))).length,
  );

  return {
    tasks,
    loading,
    error,
    activeTab,
    setTab,
    refresh,
    startPolling,
    stopPolling,
    showToast,
    numBulkPause,
    numPaused,
    numFailed,
    numCompleted,
    numTerminal,
  };
});
