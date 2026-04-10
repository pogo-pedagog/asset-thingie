/** Shared contracts for multi-source browse (frontend). */

export type BrowseSourceId = "civitai" | "civarchive";

export interface BrowseItemCore {
  source: BrowseSourceId;
  itemRef: string;
  title: string;
  creatorName: string;
  kind: string;
  thumbnailUrl: string | null;
  nsfw: boolean;
}

/** Per-source slice of browse UI state (preserved when switching sources). */
/** Declarative per-source UI (filters registration). */
export interface BrowseSourceDefinition {
  id: BrowseSourceId;
  label: string;
  defaultSearchState: Record<string, unknown>;
  filterSchema: Array<{ id: string; type: "select"; options: string[] }>;
}

export interface BrowseSourceUiState {
  q: string;
  searchType: string;
  contentTypes: string[];
  baseModels: string[];
  sort: string;
  period: string;
  /** CivArchive: search result kind filter (version | file | user). */
  civarchiveKind: string;
  civarchivePage: number;
  civarchiveSort: string;
  civarchiveType: string;
  civarchiveBaseModels: string[];
  civarchiveTags: string;
}
