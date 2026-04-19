import { computed, ref, watch, type Ref } from "vue";
import type { DownloadTaskRow } from "../types";
import * as api from "../api";

export function downloadGateKey(source: string, versionId: number, fileId: number): string {
  return `${source}|${versionId}|${fileId}`;
}

export function parseDownloadGateKey(key: string): { source: string; versionId: number; fileId: number } | null {
  const parts = key.split("|");
  if (parts.length !== 3) return null;
  const versionId = Number(parts[1]);
  const fileId = Number(parts[2]);
  if (!Number.isFinite(versionId) || !Number.isFinite(fileId)) return null;
  return { source: parts[0], versionId, fileId };
}

function isActivelyQueuedState(state: string): boolean {
  const s = state.toLowerCase();
  return ["queued", "downloading", "verifying", "paused"].includes(s);
}

function taskId(
  t: DownloadTaskRow,
  k: "version_id" | "file_id",
): number | null {
  const row = t as unknown as Record<string, unknown>;
  const camel = k === "version_id" ? "versionId" : "fileId";
  const raw = row[k] ?? row[camel];
  if (raw == null || raw === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function basenameOnly(name: string): string {
  return name.trim().toLowerCase().replace(/^.*[/\\]/, "");
}

/** Whether a task row matches the same logical file as the gate key (ids first, then filename). */
export function taskMatchesGate(
  t: DownloadTaskRow,
  key: string,
  opts?: { expectedBasename?: string },
): boolean {
  const parsed = parseDownloadGateKey(key);
  if (!parsed) return false;
  const src = (t.source || "civitai").toLowerCase();
  if (src !== parsed.source.toLowerCase()) return false;

  const vid = taskId(t, "version_id");
  const fid = taskId(t, "file_id");
  if (vid != null && fid != null) {
    return vid === parsed.versionId && fid === parsed.fileId;
  }

  const exp = opts?.expectedBasename?.trim();
  if (exp && t.filename) {
    return basenameOnly(exp) === basenameOnly(t.filename);
  }
  return false;
}

/**
 * Library presence (version-level) + queue + optimistic "just queued" for the Download button.
 */
export function useDownloadGate(options: {
  effectiveSource: Ref<string>;
  versions: Ref<{ id: number; isEarlyAccess?: boolean; files?: { id?: number; primary?: boolean }[] }[]>;
  hideEarlyAccess: Ref<boolean>;
  tasks: Ref<DownloadTaskRow[]>;
  pickVersionAndFileIds: () => { versionId: number; fileId: number; basename: string } | null;
}) {
  const libraryPresent = ref<Set<string>>(new Set());
  const justQueued = ref<Set<string>>(new Set());
  /** Basename captured when a key was added to ``justQueued`` (for queue match before ids appear on task rows). */
  const justQueuedBasenames = ref<Map<string, string>>(new Map());

  async function refreshLibraryPresence(): Promise<void> {
    const src = options.effectiveSource.value;
    const vers = options.versions.value.filter((v) => {
      if (options.hideEarlyAccess.value && v.isEarlyAccess) return false;
      return Boolean(v.files?.length);
    });
    const items = vers.map((v) => {
      const files = v.files ?? [];
      const primaryI = files.findIndex((f) => f.primary);
      const f = files[primaryI >= 0 ? primaryI : 0];
      return { source: src, version_id: v.id, file_id: f?.id ?? null };
    });
    if (!items.length) {
      libraryPresent.value = new Set();
      return;
    }
    try {
      const res = await api.postLibraryPresence(items);
      const next = new Set<string>();
      for (const idx of res.present) {
        const it = items[idx];
        if (it) next.add(`${src}:${it.version_id}`);
      }
      libraryPresent.value = next;
    } catch {
      libraryPresent.value = new Set();
    }
  }

  watch(
    [options.effectiveSource, options.versions, options.hideEarlyAccess],
    () => {
      void refreshLibraryPresence();
    },
    { deep: true, immediate: true },
  );

  watch(
    () => options.tasks.value,
    (list) => {
      const s = new Set(justQueued.value);
      const bnMap = new Map(justQueuedBasenames.value);
      let changed = false;
      for (const key of s) {
        const bn = bnMap.get(key);
        const hit = list.some(
          (t) => taskMatchesGate(t, key, { expectedBasename: bn }) && isActivelyQueuedState(t.state),
        );
        if (hit) {
          s.delete(key);
          bnMap.delete(key);
          changed = true;
        }
      }
      if (changed) {
        justQueued.value = s;
        justQueuedBasenames.value = bnMap;
      }
    },
    { deep: true },
  );

  const currentGateKey = computed(() => {
    const spec = options.pickVersionAndFileIds();
    if (!spec) return null;
    return downloadGateKey(options.effectiveSource.value, spec.versionId, spec.fileId);
  });

  const inLibrary = computed(() => {
    const spec = options.pickVersionAndFileIds();
    if (!spec) return false;
    const src = options.effectiveSource.value;
    const vid = spec.versionId;
    return libraryPresent.value.has(`${src}:${vid}`) || libraryPresent.value.has(`${src}:${String(vid)}`);
  });

  const inQueue = computed(() => {
    const spec = options.pickVersionAndFileIds();
    const key = currentGateKey.value;
    if (!key || !spec) return false;
    return options.tasks.value.some(
      (t) => taskMatchesGate(t, key, { expectedBasename: spec.basename }) && isActivelyQueuedState(t.state),
    );
  });

  const justQueuedActive = computed(() => {
    const key = currentGateKey.value;
    if (!key) return false;
    return justQueued.value.has(key);
  });

  const downloadDisabled = computed(() => inLibrary.value || inQueue.value || justQueuedActive.value);

  const downloadDisabledTitle = computed(() => {
    if (inLibrary.value) return "Already in library";
    if (inQueue.value) return "Already in queue";
    if (justQueuedActive.value) return "Queued — refreshing…";
    return "";
  });

  function markJustQueued(): void {
    const key = currentGateKey.value;
    const spec = options.pickVersionAndFileIds();
    if (!key || !spec) return;
    const s = new Set(justQueued.value);
    s.add(key);
    justQueued.value = s;
    const m = new Map(justQueuedBasenames.value);
    m.set(key, spec.basename);
    justQueuedBasenames.value = m;
  }

  function clearJustQueued(): void {
    const key = currentGateKey.value;
    if (!key) return;
    const s = new Set(justQueued.value);
    s.delete(key);
    justQueued.value = s;
    const m = new Map(justQueuedBasenames.value);
    m.delete(key);
    justQueuedBasenames.value = m;
  }

  return {
    libraryPresent,
    refreshLibraryPresence,
    downloadDisabled,
    downloadDisabledTitle,
    markJustQueued,
    clearJustQueued,
    newVersionCountForAll: computed(() => {
      const src = options.effectiveSource.value;
      let n = 0;
      for (const v of options.versions.value) {
        if (options.hideEarlyAccess.value && v.isEarlyAccess) continue;
        if (!v.files?.length) continue;
        if (!libraryPresent.value.has(`${src}:${v.id}`)) n += 1;
      }
      return n;
    }),
  };
}
