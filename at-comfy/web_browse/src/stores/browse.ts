import { defineStore } from "pinia";
import { computed, ref } from "vue";
import * as api from "../api";
import type { CivitaiBrowseItem, CivitaiModelDetail, SearchType } from "../types";

/** How many items to move from buffer into the rendered list per scroll tick. */
const RENDER_CHUNK = 25;
/** When fewer than this many items remain in the buffer, start a background prefetch. */
const PREFETCH_THRESHOLD = 15;

function normalizeForMatch(s: string): string {
  return s.replace(/[^a-z0-9]+/gi, "").toLowerCase();
}

function stabilizePaginationChain(opts: {
  requestedPageUrl: string | null;
  returnedNextUrl: string | null;
  returnedItemIds: number[];
  lastPageItemIds: number[] | null;
}): { nextUrl: string | null; discardPage: boolean; stopReason: string | null } {
  const { requestedPageUrl, returnedNextUrl, returnedItemIds, lastPageItemIds } = opts;
  if (returnedItemIds.length === 0) {
    return {
      nextUrl: null,
      discardPage: true,
      stopReason: "Civitai returned an empty page; stopping pagination.",
    };
  }
  if (
    lastPageItemIds !== null &&
    returnedItemIds.length === lastPageItemIds.length &&
    returnedItemIds.every((id, i) => id === lastPageItemIds[i]!)
  ) {
    return {
      nextUrl: null,
      discardPage: true,
      stopReason: "Civitai repeated the same page; stopping pagination.",
    };
  }
  if (requestedPageUrl && returnedNextUrl && requestedPageUrl === returnedNextUrl) {
    return {
      nextUrl: null,
      discardPage: false,
      stopReason: "Civitai repeated the same next-page token; stopping pagination.",
    };
  }
  return { nextUrl: returnedNextUrl, discardPage: false, stopReason: null };
}

function stopReasonForUnrelatedAppendPage(
  searchType: SearchType,
  searchTerm: string,
  items: CivitaiBrowseItem[],
): string | null {
  if (searchType !== "model_name") return null;
  const term = normalizeForMatch(searchTerm.trim());
  if (!term) return null;
  for (const model of items) {
    const creator =
      model.creator_username ?? (model.creator && typeof model.creator === "object" ? model.creator.username : null) ?? "";
    const candidates = [model.name ?? "", String(creator), ...(model.tags ?? [])];
    if (candidates.some((c) => normalizeForMatch(String(c)).includes(term))) {
      return null;
    }
  }
  return "Civitai returned unrelated tail results; stopping pagination.";
}

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
  const fetching = ref(false);
  const error = ref<string | null>(null);

  /** Monotonic counter incremented on every new search; stale responses are discarded. */
  let searchGeneration = 0;

  /** Items currently rendered in the grid. */
  const items = ref<CivitaiBrowseItem[]>([]);
  /** Items fetched from Civitai but not yet shown — drainBuffer moves them to items. */
  const buffer = ref<CivitaiBrowseItem[]>([]);

  const nextPage = ref<string | null>(null);
  const lastPageItemIds = ref<number[]>([]);
  const stoppedReason = ref<string | null>(null);

  /** True when the user can scroll to get more items (buffer has items OR more pages exist). */
  const hasMore = computed(
    () => (buffer.value.length > 0 || !!nextPage.value) && !loading.value,
  );

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
    };
  }

  function _applyFetchedPage(
    fetchedItems: CivitaiBrowseItem[],
    requestedUrl: string | null,
    returnedNextPage: string | null,
  ): boolean {
    const rawIds = fetchedItems.map((i) => i.id);
    let dec = stabilizePaginationChain({
      requestedPageUrl: requestedUrl,
      returnedNextUrl: returnedNextPage,
      returnedItemIds: rawIds,
      lastPageItemIds: lastPageItemIds.value.length ? [...lastPageItemIds.value] : null,
    });
    if (requestedUrl) {
      const unrelated = stopReasonForUnrelatedAppendPage(searchType.value, q.value, fetchedItems);
      if (unrelated) {
        dec = { nextUrl: null, discardPage: true, stopReason: unrelated };
      }
    }
    if (dec.discardPage) {
      nextPage.value = null;
      stoppedReason.value = dec.stopReason;
      return false;
    }
    buffer.value = [...buffer.value, ...fetchedItems];
    nextPage.value = dec.nextUrl;
    lastPageItemIds.value = rawIds;
    stoppedReason.value = dec.stopReason;
    return true;
  }

  function _maybePrefetch(): void {
    if (fetching.value || !nextPage.value) return;
    if (buffer.value.length >= PREFETCH_THRESHOLD) return;
    void _fetchNextPage();
  }

  async function _fetchNextPage(): Promise<void> {
    if (fetching.value || !nextPage.value) return;
    const gen = searchGeneration;
    const requested = nextPage.value;
    fetching.value = true;
    try {
      const res = await api.browsePage(requested, searchParams());
      if (gen !== searchGeneration) return;
      _applyFetchedPage(res.items, requested, res.next_page ?? null);
    } catch (e) {
      if (gen !== searchGeneration) return;
      error.value = e instanceof Error ? e.message : "Load more failed";
    } finally {
      if (gen === searchGeneration) {
        fetching.value = false;
      }
    }
  }

  /**
   * Move up to RENDER_CHUNK items from buffer into the rendered list.
   * Returns the number of items drained (0 if buffer is empty).
   * Triggers a background prefetch when buffer runs low.
   */
  function drainBuffer(): number {
    if (buffer.value.length === 0) return 0;
    const chunk = buffer.value.slice(0, RENDER_CHUNK);
    buffer.value = buffer.value.slice(RENDER_CHUNK);
    items.value = [...items.value, ...chunk];
    _maybePrefetch();
    return chunk.length;
  }

  async function search(reset: boolean): Promise<void> {
    const gen = ++searchGeneration;
    loading.value = true;
    error.value = null;
    if (reset) {
      stoppedReason.value = null;
      lastPageItemIds.value = [];
      buffer.value = [];
    }
    try {
      const res = await api.browseSearch(searchParams());
      if (gen !== searchGeneration) return;
      if (reset) {
        items.value = [];
        buffer.value = [];
        lastPageItemIds.value = [];
      }
      _applyFetchedPage(res.items, null, res.next_page ?? null);
      drainBuffer();
    } catch (e) {
      if (gen !== searchGeneration) return;
      error.value = e instanceof Error ? e.message : "Search failed";
      if (reset) {
        items.value = [];
        buffer.value = [];
      }
    } finally {
      if (gen === searchGeneration) {
        loading.value = false;
      }
    }
  }

  /**
   * Called by the scroll handler. Drains buffer first (instant); if buffer
   * is empty and there's a next page, fetches from Civitai then drains.
   */
  async function loadMore(): Promise<void> {
    if (loading.value) return;
    if (buffer.value.length > 0) {
      drainBuffer();
      return;
    }
    if (!nextPage.value || fetching.value) return;
    await _fetchNextPage();
    drainBuffer();
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
    fetching,
    error,
    items,
    buffer,
    nextPage,
    lastPageItemIds,
    stoppedReason,
    hasMore,
    selected,
    detailLoading,
    category,
    duplicateResolution,
    batchMode,
    batchIds,
    search,
    loadMore,
    drainBuffer,
    openModel,
    closeDetail,
    toggleBatchId,
    clearBatch,
    setBatchMode,
    searchParams,
  };
});
