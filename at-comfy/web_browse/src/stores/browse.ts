import { defineStore } from "pinia";
import { ref } from "vue";
import * as api from "../api";
import type { CivitaiBrowseItem, CivitaiModelDetail, SearchType } from "../types";

export const useBrowseStore = defineStore("at-browse", () => {
  const q = ref("");
  const searchType = ref<SearchType>("model_name");
  const contentTypes = ref<string[]>([]);
  const baseModels = ref<string[]>([]);
  const sort = ref<string>("Most Downloaded");
  const period = ref<string>("All Time");
  /** When server config ``hide_nsfw`` is true, searches force SFW regardless. */
  const nsfw = ref(false);
  const hideNsfwLocked = ref(false);

  const loading = ref(false);
  const error = ref<string | null>(null);
  const items = ref<CivitaiBrowseItem[]>([]);
  const nextPage = ref<string | null>(null);

  const selected = ref<CivitaiModelDetail | null>(null);
  const detailLoading = ref(false);
  const category = ref("General");
  const duplicateResolution = ref<"skip" | "replace">("skip");

  const batchMode = ref(false);
  const batchIds = ref<Set<number>>(new Set());

  function searchParams(): api.BrowseSearchParams {
    return {
      q: q.value,
      search_type: searchType.value,
      content_types: [...contentTypes.value],
      base_models: [...baseModels.value],
      sort: sort.value,
      period: period.value,
      nsfw: hideNsfwLocked.value ? false : nsfw.value,
      limit: 20,
    };
  }

  async function search(reset: boolean): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.browseSearch(searchParams());
      items.value = reset ? res.items : [...items.value, ...res.items];
      nextPage.value = res.next_page ?? null;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Search failed";
      if (reset) items.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function loadMore(): Promise<void> {
    if (!nextPage.value || loading.value) return;
    loading.value = true;
    error.value = null;
    try {
      const res = await api.browsePage(nextPage.value);
      items.value = [...items.value, ...res.items];
      nextPage.value = res.next_page ?? null;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Load more failed";
    } finally {
      loading.value = false;
    }
  }

  async function openModel(id: number): Promise<void> {
    detailLoading.value = true;
    selected.value = null;
    try {
      const raw = await api.browseModel(id, hideNsfwLocked.value ? false : nsfw.value);
      selected.value = raw as unknown as CivitaiModelDetail;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Detail failed";
    } finally {
      detailLoading.value = false;
    }
  }

  function closeDetail(): void {
    selected.value = null;
  }

  function toggleBatchId(id: number): void {
    const s = new Set(batchIds.value);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    batchIds.value = s;
  }

  function clearBatch(): void {
    batchIds.value = new Set();
  }

  function setBatchMode(on: boolean): void {
    batchMode.value = on;
    if (!on) clearBatch();
  }

  return {
    q,
    searchType,
    contentTypes,
    baseModels,
    sort,
    period,
    nsfw,
    hideNsfwLocked,
    loading,
    error,
    items,
    nextPage,
    selected,
    detailLoading,
    category,
    duplicateResolution,
    batchMode,
    batchIds,
    search,
    loadMore,
    openModel,
    closeDetail,
    toggleBatchId,
    clearBatch,
    setBatchMode,
    searchParams,
  };
});
