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
