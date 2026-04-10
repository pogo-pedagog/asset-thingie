import { civarchiveSource } from "./civarchive/index";
import type { BrowseSourceId } from "./types";

/** Registered browse sources (UI order). */
export const browseSourceOptions: { id: BrowseSourceId; label: string }[] = [
  { id: "civitai", label: "Civitai" },
  { id: civarchiveSource.id, label: civarchiveSource.label },
];
