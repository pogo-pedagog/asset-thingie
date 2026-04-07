import type { CivitaiBrowseResponse, DownloadTaskRow, FiltersResponse, AtComfyPublicConfig } from "./types";

export const STORAGE_URL_KEY = "at_assetthingie_url";
export const DEFAULT_BASE_URL = "http://127.0.0.1:8188";

const FETCH_TIMEOUT_MS = 20_000;

export function getBaseUrl(): string {
  if (typeof localStorage === "undefined") return DEFAULT_BASE_URL;
  const raw = localStorage.getItem(STORAGE_URL_KEY) || DEFAULT_BASE_URL;
  return String(raw).replace(/\/$/, "");
}

/** ComfyUI default port uses the in-process ``/at`` API; standalone UI uses ``/api/comfy``. */
export function getApiPrefix(): string {
  const base = getBaseUrl();
  try {
    if (new URL(base).port === "8188") return "/at";
  } catch {
    /* fallthrough */
  }
  return "/api/comfy";
}

/** Use the tab origin for ``/at`` so ComfyUI Host/Origin checks pass. */
export function getRequestOrigin(): string {
  if (getApiPrefix() !== "/at") {
    return getBaseUrl();
  }
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
  limit?: number;
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
  sp.set("limit", String(p.limit ?? 20));
  return sp;
}

export async function fetchHealth(): Promise<{ ok: boolean }> {
  return fetchJson(`${getApiPrefix()}/health`);
}

export async function browseSearch(params: BrowseSearchParams): Promise<CivitaiBrowseResponse> {
  const q = buildBrowseSearchQuery(params).toString();
  return fetchJson(`${getApiPrefix()}/browse/search${q ? `?${q}` : ""}`);
}

export async function browsePage(urlParam: string): Promise<CivitaiBrowseResponse> {
  const u = encodeURIComponent(urlParam);
  return fetchJson(`${getApiPrefix()}/browse/page?url=${u}`);
}

export async function browseModel(modelId: number, nsfw = false): Promise<Record<string, unknown>> {
  const q = nsfw ? "?nsfw=true" : "";
  return fetchJson(`${getApiPrefix()}/browse/model/${modelId}${q}`);
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

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${getRequestOrigin()}${getApiPrefix()}/downloads/${dlPathSeg(id)}`, { method: "DELETE" });
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
