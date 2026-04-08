import type { AssetDetail, AssetsResponse, FiltersResponse, SubfoldersResponse } from "./types";

export const STORAGE_URL_KEY = "at_assetthingie_url";
export const DEFAULT_BASE_URL = "http://127.0.0.1:8188";
const FETCH_TIMEOUT_MS = 15_000;

export function getBaseUrl(): string {
  if (typeof localStorage === "undefined") {
    return DEFAULT_BASE_URL;
  }
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

async function fetchJson<T>(
  path: string,
  init?: RequestInit & { params?: Record<string, string | number | undefined> },
): Promise<T> {
  const base = getRequestOrigin();
  let url = `${base}${path}`;
  if (init?.params) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(init.params)) {
      if (v === undefined || v === "") continue;
      q.set(k, String(v));
    }
    const s = q.toString();
    if (s) url += `?${s}`;
  }
  const reqInit: RequestInit & { params?: unknown } = { ...(init ?? {}) };
  delete reqInit.params;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      ...reqInit,
      signal: controller.signal,
      headers: { Accept: "application/json", ...reqInit.headers },
    });
  } finally {
    clearTimeout(t);
  }
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid JSON from AssetThingie");
  }
}

export async function fetchHealth(): Promise<{ ok: boolean }> {
  return fetchJson(`${getApiPrefix()}/health`);
}

export async function fetchFilters(
  contentType = "Checkpoint",
  family?: string,
  tag?: string[],
): Promise<FiltersResponse> {
  const sp = new URLSearchParams();
  if (contentType) sp.set("content_type", contentType);
  if (family) sp.set("family", family);
  if (tag?.length) {
    for (const t of tag) {
      const n = t.trim();
      if (n) sp.append("tag", n);
    }
  }
  const base = getRequestOrigin();
  const qs = sp.toString();
  const url = `${base}${getApiPrefix()}/filters${qs ? `?${qs}` : ""}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
    }
    return JSON.parse(text) as FiltersResponse;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchSubfolders(
  parent?: string,
  family = "checkpoint",
): Promise<SubfoldersResponse> {
  const params: Record<string, string> = { family };
  if (parent) params.parent = parent;
  return fetchJson(`${getApiPrefix()}/subfolders`, { params });
}

export interface AssetQueryParams {
  q?: string;
  content_type?: string;
  base_model?: string;
  category?: string;
  path_prefix?: string;
  sort?: string;
  limit?: number;
  offset?: number;
  family?: string;
  tag?: string[];
}

export async function fetchAssets(params: AssetQueryParams): Promise<AssetsResponse> {
  const flat: Record<string, string | number | undefined> = {
    q: params.q,
    content_type: params.content_type,
    base_model: params.base_model,
    category: params.category,
    path_prefix: params.path_prefix,
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    family: params.family,
  };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(flat)) {
    if (v === undefined || v === "") continue;
    sp.set(k, String(v));
  }
  if (params.tag?.length) {
    for (const t of params.tag) {
      if (t) sp.append("tag", t);
    }
  }
  const base = getRequestOrigin();
  const url = `${base}${getApiPrefix()}/assets?${sp.toString()}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
    }
    return JSON.parse(text) as AssetsResponse;
  } finally {
    clearTimeout(timer);
  }
}

export function resolveCoverSrc(coverUrl: string | null | undefined): string | null {
  if (!coverUrl) return null;
  if (coverUrl.startsWith("http://") || coverUrl.startsWith("https://")) {
    return coverUrl;
  }
  return `${getRequestOrigin()}${coverUrl.startsWith("/") ? "" : "/"}${coverUrl}`;
}

export async function fetchAssetDetail(assetId: number): Promise<AssetDetail> {
  return fetchJson(`${getApiPrefix()}/assets/${assetId}`);
}

export interface CleanPreviewResponse {
  stale_count: number;
  stale_assets: Array<{ asset_id: number; display_name: string | null; path: string }>;
  orphan_cache_bytes: number;
}

export async function fetchCleanPreview(): Promise<CleanPreviewResponse> {
  return fetchJson(`${getApiPrefix()}/library/clean-preview`);
}

export async function confirmCleanLibrary(): Promise<{ ok: boolean; removed: number }> {
  return fetchJson(`${getApiPrefix()}/library/clean`, { method: "POST" });
}

export async function reEnrichAsset(assetId: number): Promise<{ ok: boolean }> {
  return fetchJson(`${getApiPrefix()}/assets/${assetId}/re-enrich`, {
    method: "POST",
  });
}

export async function batchReEnrichAssetIds(
  assetIds: number[],
): Promise<{ ok: boolean; processed: number; failed: number }> {
  return fetchJson(`${getApiPrefix()}/assets/batch/re-enrich`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ asset_ids: assetIds }),
  });
}
