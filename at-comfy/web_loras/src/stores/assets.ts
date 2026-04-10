import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import * as api from "../api";
import type { AssetDetail, AssetItem, FiltersResponse, ViewMode } from "../types";

export type FilterSection = "" | "folder" | "tag" | "category";

const VIEW_STORAGE_KEY = "at_loras_view_mode";
const GRID_COLUMNS_STORAGE_KEY = "at_loras_grid_columns";
const USE_REMOTE_IMAGES_KEY = "at_loras_use_remote_images";
const DEFAULT_GRID_COLUMNS = 2;
const MIN_GRID_COLUMNS = 1;
const MAX_GRID_COLUMNS = 20;
const PAGE_SIZE = 40;

function clampGridColumns(n: number): number {
  if (!Number.isFinite(n)) return DEFAULT_GRID_COLUMNS;
  return Math.min(MAX_GRID_COLUMNS, Math.max(MIN_GRID_COLUMNS, Math.round(n)));
}

export interface StackNodeOption {
  nodeId: number;
  title: string;
}

/** at_comfy v1 does not ship AT LoRA Stack wiring; stubs keep the UI compiling. */
export const useAssetsStore = defineStore("at-loras-assets", () => {
  const connected = ref(false);
  const items = ref<AssetItem[]>([]);
  const total = ref(0);
  const offset = ref(0);
  const limit = ref(PAGE_SIZE);
  const loading = ref(false);
  const loadingMore = ref(false);
  const error = ref<string | null>(null);

  const searchQuery = ref("");
  const debouncedSearch = ref("");
  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  watch(searchQuery, (q) => {
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      debouncedSearch.value = q;
      searchDebounceTimer = null;
      void loadAssets(true);
    }, 300);
  });

  const baseModel = ref("");
  const filterOptions = ref<FiltersResponse | null>(null);

  /** Absolute path prefix for asset filter (empty = none). */
  const folderPath = ref("");
  /** Server browse parent from last subfolders response. */
  const browseParentPath = ref("");
  const libraryRootPath = ref("");
  const subfolders = ref<string[]>([]);
  const selectedTags = ref<string[]>([]);
  const selectedCategory = ref("");
  const openFilterSection = ref<FilterSection>("");
  const tagFilterText = ref("");

  const viewMode = ref<ViewMode>("grid");
  const gridColumnCount = ref(DEFAULT_GRID_COLUMNS);
  const settingsOpen = ref(false);
  const baseUrlInput = ref(api.getBaseUrl());
  const toast = ref<string | null>(null);

  const selectedAssetId = ref<number | null>(null);
  const detail = ref<AssetDetail | null>(null);
  const detailLoading = ref(false);

  const stackNodes = ref<StackNodeOption[]>([]);
  const lorasInStackSet = ref<Set<string>>(new Set());
  const stackPickerOpen = ref(false);
  const stackPickerItem = ref<AssetItem | null>(null);

  const selectionMode = ref(false);
  const selectedIds = ref<Set<number>>(new Set());

  const useRemoteImages = ref(true);

  try {
    const v = localStorage.getItem(VIEW_STORAGE_KEY);
    if (v === "list" || v === "grid") viewMode.value = v;
    const gc = localStorage.getItem(GRID_COLUMNS_STORAGE_KEY);
    if (gc != null) gridColumnCount.value = clampGridColumns(parseInt(gc, 10));
    if (localStorage.getItem(USE_REMOTE_IMAGES_KEY) === "false") {
      useRemoteImages.value = false;
    }
  } catch {
    /* ignore */
  }

  watch(useRemoteImages, (on) => {
    try {
      localStorage.setItem(USE_REMOTE_IMAGES_KEY, on ? "true" : "false");
    } catch {
      /* ignore */
    }
  });

  const hasMore = computed(() => items.value.length < total.value);
  const lorasInStack = computed(() => lorasInStackSet.value);
  const selectedCount = computed(() => selectedIds.value.size);

  function isAssetSelected(assetId: number): boolean {
    return selectedIds.value.has(assetId);
  }

  function toggleAssetSelect(assetId: number): void {
    const s = new Set(selectedIds.value);
    if (s.has(assetId)) s.delete(assetId);
    else s.add(assetId);
    selectedIds.value = s;
  }

  function clearAssetSelection(): void {
    selectedIds.value = new Set();
  }

  function toggleSelectionMode(): void {
    selectionMode.value = !selectionMode.value;
    if (!selectionMode.value) clearAssetSelection();
  }

  function selectAllVisibleAssets(): void {
    const s = new Set(selectedIds.value);
    for (const it of items.value) s.add(it.asset_id);
    selectedIds.value = s;
  }

  async function batchReEnrichSelected(): Promise<void> {
    const ids = [...selectedIds.value];
    if (!ids.length) {
      showToast("No assets selected");
      return;
    }
    try {
      const r = await api.batchReEnrichAssetIds(ids);
      showToast(`Re-enrich: ${r.processed} ok${r.failed ? `, ${r.failed} failed` : ""}`);
      clearAssetSelection();
      selectionMode.value = false;
      await loadAssets(true);
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Batch re-enrich failed");
    }
  }

  function refreshStackState(): void {
    stackNodes.value = [];
    lorasInStackSet.value = new Set();
  }

  async function checkHealth(): Promise<void> {
    try {
      const h = await api.fetchHealth();
      connected.value = Boolean(h.ok);
      error.value = null;
    } catch (e) {
      connected.value = false;
      error.value = e instanceof Error ? e.message : "Connection failed";
    }
  }

  async function loadFilters(): Promise<void> {
    try {
      const tagsForFacet =
        selectedTags.value.length > 0 ? [...selectedTags.value] : undefined;
      filterOptions.value = await api.fetchFilters(undefined, "lora", tagsForFacet);
    } catch {
      filterOptions.value = null;
    }
  }

  async function loadSubfolders(): Promise<void> {
    if (!connected.value) return;
    try {
      const res = await api.fetchSubfolders(folderPath.value || undefined, "lora");
      subfolders.value = res.folders;
      browseParentPath.value = res.parent_path;
      if (!libraryRootPath.value) {
        libraryRootPath.value = res.parent_path;
      }
    } catch {
      subfolders.value = [];
    }
  }

  function toggleFilterSection(section: Exclude<FilterSection, "">): void {
    openFilterSection.value = openFilterSection.value === section ? "" : section;
    if (openFilterSection.value === "folder") {
      void loadSubfolders();
    } else if (openFilterSection.value === "tag") {
      void loadFilters();
    }
  }

  function drillFolder(segment: string): void {
    const base = browseParentPath.value.replace(/\/$/, "");
    folderPath.value = `${base}/${segment}`;
    void loadSubfolders();
    void loadAssets(true);
  }

  function navigateFolderToAbsolute(path: string): void {
    folderPath.value = path;
    void loadSubfolders();
    void loadAssets(true);
  }

  function resetFolderPath(): void {
    folderPath.value = "";
    void loadSubfolders();
    void loadAssets(true);
  }

  function toggleTag(name: string): void {
    const n = name.trim();
    if (!n) return;
    const cur = selectedTags.value;
    const i = cur.indexOf(n);
    if (i >= 0) {
      selectedTags.value = cur.filter((_, j) => j !== i);
    } else {
      selectedTags.value = [...cur, n];
    }
    void loadAssets(true);
    void loadFilters();
  }

  function resetSelectedTags(): void {
    selectedTags.value = [];
    tagFilterText.value = "";
    void loadAssets(true);
    void loadFilters();
  }

  function setCategory(cat: string): void {
    const c = cat.trim();
    if (selectedCategory.value === c) {
      selectedCategory.value = "";
    } else {
      selectedCategory.value = c;
    }
    void loadAssets(true);
  }

  function resetCategory(): void {
    selectedCategory.value = "";
    void loadAssets(true);
  }

  function effectiveSearchQuery(): string | undefined {
    const raw = debouncedSearch.value.trim();
    if (!raw) return undefined;
    const prefixRe = /^(name|trigger|category|tag):$/i;
    const hasActionableTerm = raw.split(",").some((part) => {
      const t = part.trim();
      return t !== "" && !prefixRe.test(t);
    });
    return hasActionableTerm ? raw : undefined;
  }

  function assetQueryBody() {
    const tags =
      selectedTags.value.length > 0 ? [...selectedTags.value] : undefined;
    return {
      q: effectiveSearchQuery(),
      family: "lora" as const,
      base_model: baseModel.value.trim() || undefined,
      category: selectedCategory.value.trim() || undefined,
      path_prefix: folderPath.value.trim() || undefined,
      tag: tags,
      sort: "path",
      limit: limit.value,
    };
  }

  async function loadAssets(reset: boolean): Promise<void> {
    if (!connected.value && reset) {
      await checkHealth();
      if (!connected.value) return;
    }
    if (reset) {
      offset.value = 0;
      items.value = [];
    }
    if (loading.value || loadingMore.value) return;
    loading.value = true;
    error.value = null;
    try {
      const res = await api.fetchAssets({
        ...assetQueryBody(),
        offset: offset.value,
      });
      total.value = res.total;
      if (reset) {
        items.value = res.items;
      } else {
        items.value = [...items.value, ...res.items];
      }
      refreshStackState();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Load failed";
      if (reset) items.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function loadMore(): Promise<void> {
    if (!hasMore.value || loading.value || loadingMore.value) return;
    loadingMore.value = true;
    offset.value = items.value.length;
    try {
      const res = await api.fetchAssets({
        ...assetQueryBody(),
        offset: offset.value,
      });
      total.value = res.total;
      items.value = [...items.value, ...res.items];
      refreshStackState();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Load failed";
    } finally {
      loadingMore.value = false;
    }
  }

  function resetFilters(): void {
    searchQuery.value = "";
    debouncedSearch.value = "";
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = null;
    }
    baseModel.value = "";
    folderPath.value = "";
    browseParentPath.value = "";
    libraryRootPath.value = "";
    subfolders.value = [];
    selectedTags.value = [];
    selectedCategory.value = "";
    openFilterSection.value = "";
    tagFilterText.value = "";
    void loadAssets(true);
    if (connected.value) {
      void loadSubfolders();
      void loadFilters();
    }
  }

  function setViewMode(m: ViewMode): void {
    viewMode.value = m;
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }

  function setGridColumnCount(n: number): void {
    const c = clampGridColumns(n);
    gridColumnCount.value = c;
    try {
      localStorage.setItem(GRID_COLUMNS_STORAGE_KEY, String(c));
    } catch {
      /* ignore */
    }
  }

  function showToast(msg: string): void {
    toast.value = msg;
    setTimeout(() => {
      toast.value = null;
    }, 2000);
  }

  function saveSettingsUrl(): void {
    api.setBaseUrl(baseUrlInput.value);
    void bootstrap();
  }

  function requestAddToStack(item: AssetItem): void {
    if (!item.comfy_lora_name?.trim()) {
      showToast("No Comfy LoRA name for this asset");
      return;
    }
    showToast("LoRA Stack shortcut is not available in at_comfy v1.");
  }

  function confirmStackPicker(): void {
    stackPickerOpen.value = false;
    stackPickerItem.value = null;
  }

  function cancelStackPicker(): void {
    stackPickerOpen.value = false;
    stackPickerItem.value = null;
  }

  function openDetail(assetId: number): void {
    selectedAssetId.value = assetId;
    detail.value = null;
    void loadDetail();
  }

  function closeDetail(): void {
    selectedAssetId.value = null;
    detail.value = null;
  }

  async function loadDetail(): Promise<void> {
    const id = selectedAssetId.value;
    if (id == null) return;
    detailLoading.value = true;
    try {
      detail.value = await api.fetchAssetDetail(id);
      refreshStackState();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Detail load failed");
      detail.value = null;
    } finally {
      detailLoading.value = false;
    }
  }

  async function bootstrap(): Promise<void> {
    baseUrlInput.value = api.getBaseUrl();
    await checkHealth();
    if (!connected.value) return;
    await loadFilters();
    refreshStackState();
    await loadSubfolders();
    await loadAssets(true);
  }

  return {
    connected,
    items,
    total,
    offset,
    limit,
    loading,
    loadingMore,
    error,
    searchQuery,
    baseModel,
    filterOptions,
    folderPath,
    browseParentPath,
    libraryRootPath,
    subfolders,
    selectedTags,
    selectedCategory,
    openFilterSection,
    tagFilterText,
    viewMode,
    gridColumnCount,
    settingsOpen,
    baseUrlInput,
    toast,
    hasMore,
    selectedAssetId,
    detail,
    detailLoading,
    stackNodes,
    lorasInStack,
    stackPickerOpen,
    stackPickerItem,
    selectionMode,
    selectedIds,
    useRemoteImages,
    selectedCount,
    isAssetSelected,
    toggleAssetSelect,
    clearAssetSelection,
    toggleSelectionMode,
    selectAllVisibleAssets,
    batchReEnrichSelected,
    checkHealth,
    loadFilters,
    loadSubfolders,
    toggleFilterSection,
    drillFolder,
    navigateFolderToAbsolute,
    resetFolderPath,
    toggleTag,
    resetSelectedTags,
    setCategory,
    resetCategory,
    loadAssets,
    loadMore,
    resetFilters,
    setViewMode,
    setGridColumnCount,
    showToast,
    saveSettingsUrl,
    bootstrap,
    refreshStackState,
    requestAddToStack,
    confirmStackPicker,
    cancelStackPicker,
    openDetail,
    closeDetail,
    loadDetail,
  };
});
