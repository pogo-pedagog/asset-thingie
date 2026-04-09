/** Civitai browse + download queue types (API uses camelCase via ``by_alias``). */

export type SearchType = "model_name" | "username" | "tag";

export type SortType =
  | "Newest"
  | "Oldest"
  | "Most Downloaded"
  | "Highest Rated"
  | "Most Liked"
  | "Most Buzz"
  | "Most Discussed"
  | "Most Collected"
  | "Most Images";

export type PeriodType = "All Time" | "Year" | "Month" | "Week" | "Day";

export interface CivitaiModelStats {
  downloadCount?: number;
  rating?: number | null;
  ratingCount?: number;
  thumbsUpCount?: number;
}

export interface CivitaiImageSummary {
  url: string;
  type?: string;
  width?: number | null;
  height?: number | null;
  meta?: Record<string, unknown> | null;
  id?: number | null;
}

export interface CivitaiFileSummary {
  id: number;
  name: string;
  downloadUrl?: string;
  /** Civitai file role (JSON ``type``); often ``Model`` even for pruned vs full — see ``metadata.size``. */
  type?: string | null;
  /** Per-file hints, e.g. ``{ size: \"pruned\" | \"full\", fp: \"fp16\", format: \"SafeTensor\" }``. */
  metadata?: Record<string, unknown> | null;
  primary?: boolean;
  sizeKB?: number | null;
  sha256?: string | null;
}

export interface CivitaiVersionSummary {
  id: number;
  name: string;
  baseModel?: string | null;
  trainedWords?: string[];
  files: CivitaiFileSummary[];
  images: CivitaiImageSummary[];
  /** Present on model detail: Civitai early-access (not used in grid search items). */
  isEarlyAccess?: boolean;
}

/** One row from ``/at/browse/search`` (full Civitai model JSON). */
export interface CivitaiBrowseItem {
  id: number;
  name: string;
  type: string;
  nsfw?: boolean;
  description?: string | null;
  creator_username?: string | null;
  /** Present in some API payloads (alias JSON); prefer ``creator_username``. */
  creator?: { username?: string | null };
  stats?: CivitaiModelStats | null;
  tags?: string[];
  modelVersions?: CivitaiVersionSummary[];
}

export interface CivitaiBrowseResponse {
  items: CivitaiBrowseItem[];
  next_page: string | null;
  prev_page: string | null;
}

export interface CivitaiModelDetail extends CivitaiBrowseItem {
  modelVersions: CivitaiVersionSummary[];
  allowCommercialUse?: string[];
  allowNoCredit?: boolean;
}

export interface DownloadTaskRow {
  id: string;
  display_name: string;
  filename: string;
  state: string;
  bytes_done: number;
  total_bytes: number | null;
  error_message: string | null;
  cover_thumb_url: string | null;
  created_at: string;
}

/** Legacy alias used in early scaffold */
export type BrowseListItem = CivitaiBrowseItem;

export interface TagFilterRow {
  tag_id: number;
  name: string;
  count: number;
}

export interface FiltersResponse {
  content_types: string[];
  base_models: string[];
  categories: string[];
  tags: TagFilterRow[];
}

export interface AtComfyPublicConfig {
  civitai_api_key: string;
  civitai_api_key_set: boolean;
  scan_on_startup: boolean;
  enrichment_mode: string;
  enrichment_rate_limit_ms: number;
  max_parallel_downloads: number;
  download_subpath_template: string;
  hide_early_access: boolean;
  hide_nsfw: boolean;
  download_example_videos: boolean;
  generate_video_posters: boolean;
  scan_directories: Record<string, string | null>;
}
