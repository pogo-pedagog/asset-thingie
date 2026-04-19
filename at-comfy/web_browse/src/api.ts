import type { BrowseSourceId } from "./sources/types";
import type { CivitaiBrowseResponse, DownloadTaskRow, FiltersResponse, AtComfyPublicConfig } from "./types";

export const STORAGE_URL_KEY = "at_assetthingie_url";
export const DEFAULT_BASE_URL = "http://127.0.0.1:8188";

const FETCH_TIMEOUT_MS = 20_000;

export function getBaseUrl(): string {
  if (typeof localStorage === "undefined") return DEFAULT_BASE_URL;
  const raw = localStorage.getItem(STORAGE_URL_KEY) || DEFAULT_BASE_URL;
  return String(raw).replace(/\/$/, "");
}

export function getApiPrefix(): string {
  return "/at";
}

/**
 * Origin for JSON and relative media URLs. ComfyUI rejects requests when ``Host`` and ``Origin``
 * disagree (e.g. tab is ``localhost:8188`` but fetches use ``127.0.0.1:8188``), so we use the
 * browser tab's origin when available.
 */
export function getRequestOrigin(): string {
  if (
    typeof window !== "undefined" &&
    window.location?.origin &&
    window.location.protocol !== "file:"
  ) {
    return window.location.origin.replace(/\/$/, "");
  }
  return getBaseUrl();
}

export function setBaseUrl(url: string): void {
  localStorage.setItem(STORAGE_URL_KEY, url.replace(/\/$/, ""));
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getRequestOrigin()}${path}`;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
    return JSON.parse(text) as T;
  } finally {
    clearTimeout(t);
  }
}

export interface BrowseSearchParams {
  q?: string;
  search_type?: string;
  content_types?: string[];
  base_models?: string[];
  sort?: string;
  period?: string;
  nsfw?: boolean;
  /** CivArchive ``/api/search`` kind filter (version | file | user). */
  kind?: string;
  /** CivArchive page index (1-based). */
  page?: string | number;
  /** CivArchive-only: ``sort`` query param for ``/api/search`` (newest | oldest | downloads). */
  civarchive_sort?: string;
  civarchive_type?: string;
  /** CivArchive ``base_model`` filter; multiple values are joined upstream with commas (OR). */
  civarchive_base_models?: string[];
  civarchive_tags?: string;
  /** When true, upstream ``is_deleted=true`` (tombstoned rows only). */
  civarchive_deleted_only?: boolean;
  /** CivArchive NSFW filter when browse config allows NSFW: ``all`` \| ``sfw`` \| ``nsfw``. */
  civarchive_nsfw?: "all" | "sfw" | "nsfw";
}

export function buildBrowseSearchQuery(p: BrowseSearchParams): URLSearchParams {
  const sp = new URLSearchParams();
  if (p.q?.trim()) sp.set("q", p.q.trim());
  if (p.search_type) sp.set("search_type", p.search_type);
  for (const t of p.content_types ?? []) {
    if (t) sp.append("content_types", t);
  }
  for (const bm of p.base_models ?? []) {
    if (bm) sp.append("base_models", bm);
  }
  if (p.sort) sp.set("sort", p.sort);
  if (p.period) sp.set("period", p.period);
  if (p.nsfw) sp.set("nsfw", "true");
  if (p.kind?.trim()) sp.set("kind", p.kind.trim());
  if (p.page != null && String(p.page).trim() !== "") sp.set("page", String(p.page));
  if (p.civarchive_sort?.trim()) sp.set("civarchive_sort", p.civarchive_sort.trim());
  if (p.civarchive_type?.trim()) sp.set("civarchive_type", p.civarchive_type.trim());
  for (const bm of p.civarchive_base_models ?? []) {
    const s = String(bm).trim();
    if (s) sp.append("civarchive_base_model", s);
  }
  if (p.civarchive_tags?.trim()) sp.set("civarchive_tags", p.civarchive_tags.trim());
  if (p.civarchive_deleted_only) sp.set("civarchive_deleted_only", "1");
  if (p.civarchive_nsfw) sp.set("civarchive_nsfw", p.civarchive_nsfw);
  return sp;
}

export async function fetchHealth(): Promise<{ ok: boolean }> {
  return fetchJson(`${getApiPrefix()}/health`);
}

export async function browseSearch(
  source: BrowseSourceId,
  params: BrowseSearchParams,
): Promise<CivitaiBrowseResponse> {
  const q = buildBrowseSearchQuery(params).toString();
  return fetchJson(`${getApiPrefix()}/browse/${source}/search${q ? `?${q}` : ""}`);
}

export async function browsePage(
  source: BrowseSourceId,
  urlParam: string,
  params: BrowseSearchParams,
): Promise<CivitaiBrowseResponse> {
  const sp = buildBrowseSearchQuery(params);
  sp.set("url", urlParam);
  return fetchJson(`${getApiPrefix()}/browse/${source}/page?${sp.toString()}`);
}

export async function fetchCivarchiveBaseModels(): Promise<{ base_models: string[] }> {
  return fetchJson(`${getApiPrefix()}/browse/civarchive/base-models`);
}

export async function postCivarchiveBaseModelsReset(): Promise<{ ok: boolean; base_models: string[] }> {
  return fetchJson(`${getApiPrefix()}/browse/civarchive/base-models/reset`, { method: "POST" });
}

export async function fetchCivitaiBaseModels(): Promise<{ base_models: string[] }> {
  return fetchJson(`${getApiPrefix()}/browse/civitai/base-models`);
}

export async function postCivitaiBaseModelsReset(): Promise<{ ok: boolean; base_models: string[] }> {
  return fetchJson(`${getApiPrefix()}/browse/civitai/base-models/reset`, { method: "POST" });
}

export async function browseDetail(
  source: BrowseSourceId,
  itemRef: string,
  nsfw = false,
): Promise<Record<string, unknown>> {
  const enc = encodeURIComponent(itemRef);
  const q = nsfw ? "?nsfw=true" : "";
  return fetchJson(`${getApiPrefix()}/browse/${source}/detail/${enc}${q}`);
}

/** @deprecated Prefer ``browseDetail("civitai", String(modelId), nsfw)``. */
export async function browseModel(modelId: number, nsfw = false): Promise<Record<string, unknown>> {
  return browseDetail("civitai", String(modelId), nsfw);
}

export async function fetchFilters(params?: { family?: string }): Promise<FiltersResponse> {
  const sp = new URLSearchParams();
  if (params?.family) sp.set("family", params.family);
  const q = sp.toString();
  return fetchJson(`${getApiPrefix()}/filters${q ? `?${q}` : ""}`);
}

export async function postDownload(body: Record<string, unknown>): Promise<{ ok: boolean; task_id: string }> {
  return fetchJson(`${getApiPrefix()}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function postDownloadBatch(
  items: Record<string, unknown>[],
  duplicate_resolution?: string,
): Promise<{ task_ids: string[]; skipped: { item: unknown; reason: string }[] }> {
  return fetchJson(`${getApiPrefix()}/download/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, duplicate_resolution: duplicate_resolution ?? "skip" }),
  });
}

export interface LibraryPresenceItem {
  source: string;
  version_id: number | string;
  file_id?: number | string | null;
}

export async function postLibraryPresence(
  items: LibraryPresenceItem[],
): Promise<{ present: number[] }> {
  return fetchJson(`${getApiPrefix()}/library/presence`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
}

export async function fetchDownloads(): Promise<{
  tasks: DownloadTaskRow[];
  completed_since_last_poll: string[];
}> {
  return fetchJson(`${getApiPrefix()}/downloads`);
}

function dlPathSeg(id: string): string {
  return encodeURIComponent(id);
}

export async function cancelTask(id: string): Promise<void> {
  await fetchJson(`${getApiPrefix()}/downloads/${dlPathSeg(id)}/cancel`, { method: "POST" });
}

export async function retryTask(id: string): Promise<void> {
  await fetchJson(`${getApiPrefix()}/downloads/${dlPathSeg(id)}/retry`, { method: "POST" });
}

export async function pauseTask(id: string): Promise<void> {
  await fetchJson(`${getApiPrefix()}/downloads/${dlPathSeg(id)}/pause`, { method: "POST" });
}

/** Remove a terminal task row only (HTTP 409 if still active). */
export async function clearTask(id: string): Promise<void> {
  await fetch(`${getRequestOrigin()}${getApiPrefix()}/downloads/${dlPathSeg(id)}`, { method: "DELETE" });
}

export async function resumeTask(id: string): Promise<void> {
  const data = await fetchJson<{ ok: boolean }>(`${getApiPrefix()}/downloads/${dlPathSeg(id)}/resume`, {
    method: "POST",
  });
  if (!data.ok) {
    throw new Error("Could not resume: task is not paused or no longer exists.");
  }
}

export async function moveTaskToTop(id: string): Promise<void> {
  const data = await fetchJson<{ ok: boolean }>(`${getApiPrefix()}/downloads/${dlPathSeg(id)}/move-to-top`, {
    method: "POST",
  });
  if (!data.ok) {
    throw new Error("Could not move to top: task is not queued or could not be reordered.");
  }
}

export async function bulkPauseDownloads(): Promise<{ ok: boolean; count: number }> {
  return fetchJson(`${getApiPrefix()}/downloads/bulk/pause`, { method: "POST" });
}

export async function bulkResumeDownloads(): Promise<{ ok: boolean; count: number }> {
  return fetchJson(`${getApiPrefix()}/downloads/bulk/resume`, { method: "POST" });
}

export async function bulkRetryFailedDownloads(): Promise<{ ok: boolean; count: number }> {
  return fetchJson(`${getApiPrefix()}/downloads/bulk/retry-failed`, { method: "POST" });
}

export async function bulkClearFinishedDownloads(): Promise<{ ok: boolean; count: number }> {
  return fetchJson(`${getApiPrefix()}/downloads/bulk/clear-finished`, { method: "POST" });
}

export async function bulkClearDoneDownloads(): Promise<{ ok: boolean; count: number }> {
  return fetchJson(`${getApiPrefix()}/downloads/bulk/clear-done`, { method: "POST" });
}

export async function fetchConfig(): Promise<AtComfyPublicConfig> {
  return fetchJson(`${getApiPrefix()}/config`);
}

export async function putConfig(body: Record<string, unknown>): Promise<AtComfyPublicConfig> {
  return fetchJson(`${getApiPrefix()}/config`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function postScan(): Promise<{ ok?: boolean; started?: boolean }> {
  return fetchJson(`${getApiPrefix()}/scan`, { method: "POST" });
}

export async function fetchScanStatus(): Promise<Record<string, unknown>> {
  return fetchJson(`${getApiPrefix()}/scan/status`);
}

export async function postEnrich(): Promise<{ ok?: boolean }> {
  return fetchJson(`${getApiPrefix()}/enrich`, { method: "POST" });
}

export async function fetchEnrichStatus(): Promise<Record<string, unknown>> {
  return fetchJson(`${getApiPrefix()}/enrich/status`);
}

/** Prefix relative ``/at/cache/...`` URLs with the request origin (Comfy tab). */
export function resolveCacheUrl(path: string | null): string | null {
  if (!path) return null;
  const p = path.trim();
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return `${getRequestOrigin()}${p.startsWith("/") ? "" : "/"}${p}`;
}
