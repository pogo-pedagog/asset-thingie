import type { CivitaiBrowseItem } from "../types";

export function pickDefaultDownloadSpec(
  item: CivitaiBrowseItem,
): { modelId: number; versionId: number; fileId: number } | null {
  const vers = item.modelVersions;
  if (!vers?.length) return null;
  const v = vers[0];
  const files = v.files ?? [];
  if (!files.length) return null;
  const prim = files.findIndex((f) => f.primary);
  const f = files[prim >= 0 ? prim : 0];
  if (!f?.id) return null;
  return { modelId: item.id, versionId: v.id, fileId: f.id };
}
