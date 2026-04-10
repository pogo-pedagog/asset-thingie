import type { CivitaiBrowseItem } from "../types";

export function pickDefaultDownloadSpec(
  item: CivitaiBrowseItem,
  opts?: { skipEarlyAccessDownloads?: boolean },
): { modelId: number; versionId: number; fileId: number } | null {
  const skipEa = opts?.skipEarlyAccessDownloads !== false;
  if (typeof item.id !== "number") return null;
  const vers = item.modelVersions;
  if (!vers?.length) return null;
  const v = skipEa ? vers.find((x) => !x.isEarlyAccess) : vers[0];
  if (!v) return null;
  const files = v.files ?? [];
  if (!files.length) return null;
  const prim = files.findIndex((f) => f.primary);
  const f = files[prim >= 0 ? prim : 0];
  if (!f?.id) return null;
  return { modelId: item.id, versionId: v.id, fileId: f.id };
}
