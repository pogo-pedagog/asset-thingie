/** Pure helpers for resolving media URLs (local cache paths vs remote CDN). */

export function isRemoteMediaUrl(url: string): boolean {
  const t = url.trim();
  if (!t) return false;
  return (
    t.startsWith("http://") ||
    t.startsWith("https://") ||
    t.startsWith("//")
  );
}

/**
 * Resolve a media URL for the browser.
 * When ``allowRemote`` is false, absolute remote URLs return null; relative
 * paths are still joined with ``origin`` (same-host AssetThingie cache).
 */
export function resolveMediaSrc(
  url: string | null | undefined,
  origin: string,
  allowRemote: boolean,
): string | null {
  if (url == null) return null;
  const raw = String(url).trim();
  if (!raw) return null;
  if (!allowRemote && isRemoteMediaUrl(raw)) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("//")) return raw;
  const base = origin.replace(/\/$/, "");
  return `${base}${raw.startsWith("/") ? "" : "/"}${raw}`;
}
