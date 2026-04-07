export interface CheckpointMeta {
  recommended_sampler?: string;
  recommended_scheduler?: string;
  recommended_steps?: number;
  recommended_cfg?: number;
  recommended_clip_skip?: number;
  recommended_prompt?: string;
  recommended_negative_prompt?: string;
}

export interface AssetItem {
  asset_id: number;
  display_name: string | null;
  filename: string;
  stem: string;
  content_type: string | null;
  base_model: string | null;
  category: string | null;
  subcategory: string | null;
  trigger_words: string[];
  default_strength: number | null;
  is_favorite: boolean;
  usage_count: number;
  last_used_at: string | null;
  cover_url: string | null;
  tags: string[];
  lora_syntax: string | null;
  comfy_lora_name: string | null;
  comfy_checkpoint_name: string | null;
  checkpoint_meta: CheckpointMeta | null;
}

export interface ExampleMediaItem {
  media_id: number;
  url: string | null;
  thumbnail_url: string | null;
  media_type: string;
  width: number | null;
  height: number | null;
  caption: string | null;
  generation_params?: Record<string, unknown> | null;
  playback_url?: string | null;
}

export interface AssetDetail extends AssetItem {
  path: string;
  notes: string | null;
  source_url: string | null;
  source_creator_name: string | null;
  cover_url_full: string | null;
  user_edited?: boolean;
  example_media: ExampleMediaItem[];
  description_html: string | null;
  /** Detail-only: all system fields for this asset's type family */
  system_fields?: Record<string, unknown>;
}

export interface AssetsResponse {
  total: number;
  limit: number;
  offset: number;
  items: AssetItem[];
}

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

export interface SubfoldersResponse {
  folders: string[];
  parent_path: string;
}

export type SortKey = "path" | "most_used" | "recently_used";
export type ViewMode = "grid" | "list";
