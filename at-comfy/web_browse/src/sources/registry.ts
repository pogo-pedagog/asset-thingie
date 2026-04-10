import type { BrowseSourceId } from "./types";

/** Registered browse sources (UI order). CivArchive is added when the backend adapter ships. */
export const browseSourceOptions: { id: BrowseSourceId; label: string }[] = [{ id: "civitai", label: "Civitai" }];
