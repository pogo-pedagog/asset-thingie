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
}

export interface ExampleMediaItem {
  media_id: number;
  url: string | null;
  thumbnail_url: string | null;
  media_type: string;
  width: number | null;
  height: number | null;
  caption: string | null;
  /** Parsed Civitai / API snapshot for this example image, when present. */
  generation_params?: Record<string, unknown> | null;
  playback_url?: string | null;
}

export interface AssetDetail extends AssetItem {
  path: string;
  notes: string | null;
  source_url: string | null;
  source_creator_name: string | null;
  cover_url_full: string | null;
  /** When true, Civitai enrichment skips overwriting display name / base model / trigger JSON. */
  user_edited?: boolean;
  example_media: ExampleMediaItem[];
  description_html: string | null;
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
  /** Absolute path on the server that was used as the parent for ``folders``. */
  parent_path: string;
}

export type SortKey = "path" | "most_used" | "recently_used";
export type ViewMode = "grid" | "list";

/** Payload for lm:add-to-stack and drag-drop */
export interface StackLoraPayload {
  lora_name: string;
  strength_model: number;
  strength_clip: number;
  trigger_words: string[];
  display_name: string | null;
}
