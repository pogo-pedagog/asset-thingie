import type { CivitaiBrowseItem, CivitaiImageSummary } from "../types";

/** CivArchive JSON often uses site-relative CDN paths; the browse tab needs an absolute origin. */
export function expandCivArchiveUrl(url: string): string {
  const u = url.trim();
  if (!u) return u;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("//")) return `https:${u}`;
  if (u.startsWith("/")) return `https://civarchive.com${u}`;
  return u;
}

/** Resolve thumbnail / gallery URL for grid and detail (CivArchive relatives → absolute). */
export function mediaDisplayUrl(url: string | undefined | null, source: string | undefined | null): string {
  const u = (url ?? "").trim();
  if (!u) return "";
  if (source === "civarchive") return expandCivArchiveUrl(u);
  return thumbUrl(u);
}

export function creatorNameFromItem(item: CivitaiBrowseItem): string | null {
  const u = item.creator?.username;
  if (u) return String(u);
  if (item.creator_username) return String(item.creator_username);
  return null;
}

export function coverMediaFromBrowseItem(item: CivitaiBrowseItem): CivitaiImageSummary | null {
  const top = item.image_url;
  if (typeof top === "string" && top.trim()) {
    return { url: top.trim(), type: "image" };
  }
  const vers = item.modelVersions;
  if (!vers?.length) return null;
  for (const v of vers) {
    const ims = v.images as CivitaiImageSummary[] | undefined;
    if (!ims?.length) continue;
    for (const im of ims) {
      const t = (im.type || "image").toLowerCase();
      if (t === "video") continue;
      if (im.url) return im;
    }
    if (ims[0]?.url) return ims[0];
  }
  return null;
}

export function coverUrlFromBrowseItem(item: CivitaiBrowseItem): string | null {
  return coverMediaFromBrowseItem(item)?.url ?? null;
}

export function thumbUrl(url: string): string {
  const u = url.trim();
  if (!u) return u;
  // Civitai image CDN URLs vary; use original to avoid broken transformations.
  return u;
}
