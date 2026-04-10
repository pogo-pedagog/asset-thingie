/** Civitai content-type filter values (``types`` query). */
export const BROWSE_CONTENT_TYPES = [
  "LORA",
  "Checkpoint",
  "LoCon",
  "DoRA",
  "TextualInversion",
  "VAE",
  "Controlnet",
  "Hypernetwork",
  "Upscaler",
  "MotionModule",
  "Other",
] as const;

/** Curated base models (no Civitai list endpoint). */
export const BROWSE_BASE_MODELS = [
  "SD 1.5",
  "SD 2.1",
  "SDXL 1.0",
  "SDXL Turbo",
  "Pony",
  "Flux.1 D",
  "Flux.1 S",
  "SD 3.5",
  "SD 3.5 Large",
] as const;

/**
 * Default CivArchive ``base_model`` filter options when the local DB is empty.
 * Distinct ``base_model`` strings sampled from live ``GET https://civarchive.com/api/search``
 * (browser UA, throttled); opportunistic SQLite merge still adds anything seen in traffic.
 *
 * Keep in sync with ``at_comfy/civarchive_catalog.py`` ``FALLBACK_BASE_MODELS``.
 */
export const BROWSE_CIVARCHIVE_DEFAULT_BASE_MODELS = [
  "Anima",
  "Flux.1 D",
  "Flux.1 S",
  "Flux.2 Klein 4B",
  "Flux.2 Klein 4B-base",
  "Flux.2 Klein 9B",
  "Flux.2 Klein 9B-base",
  "Hunyuan 1",
  "Hunyuan Video",
  "Illustrious",
  "Kling",
  "LTXV 2.3",
  "LTXV2",
  "NoobAI",
  "Other",
  "PixArt E",
  "Pony",
  "Qwen",
  "SD 1.5",
  "SD 2.0 768",
  "SD 2.1",
  "SD 3",
  "SD 3.5",
  "SD 3.5 Large",
  "SD 3.5 Large Turbo",
  "SD 3.5 Medium",
  "SDXL 1.0",
  "SDXL Turbo",
  "Wan Image 2.7",
  "Wan Video",
  "Wan Video 14B i2v 480p",
  "Wan Video 2.2 I2V-A14B",
  "ZImageBase",
  "ZImageTurbo",
] as const;

export const BROWSE_SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "Most Downloaded", label: "Most downloaded" },
  { value: "Highest Rated", label: "Highest rated" },
  { value: "Newest", label: "Newest" },
  { value: "Most Liked", label: "Most liked" },
  { value: "Most Buzz", label: "Most buzz" },
  { value: "Most Discussed", label: "Most discussed" },
  { value: "Most Collected", label: "Most collected" },
  { value: "Most Images", label: "Most images" },
  { value: "Oldest", label: "Oldest" },
];

export const BROWSE_PERIOD_OPTIONS: { value: string; label: string }[] = [
  { value: "All Time", label: "All time" },
  { value: "Year", label: "Year" },
  { value: "Month", label: "Month" },
  { value: "Week", label: "Week" },
  { value: "Day", label: "Day" },
];

/** CivArchive ``GET /api/search`` sort values (not Civitai sort labels). */
export const BROWSE_CIVARCHIVE_SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "downloads", label: "Most downloaded" },
  { value: "relevance", label: "Relevance" },
  { value: "popular", label: "Popular" },
  { value: "trending", label: "Trending" },
   { value: "name", label: "Name" },
  { value: "created", label: "Created" },
  /** Tombstone ordering; use the Deleted only filter for upstream ``is_deleted=true``. */
  { value: "deleted_newest", label: "Recently deleted" },
  { value: "deleted_oldest", label: "Oldest deletion" },
];
