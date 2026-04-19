import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import * as api from "../api";
import type { BrowseSourceId } from "../sources/types";
import type { CivitaiBrowseItem, CivitaiModelDetail, SearchType } from "../types";

/** How many items to move from buffer into the rendered list per scroll tick. */
const RENDER_CHUNK = 25;
/** When fewer than this many items remain in the buffer, start a background prefetch. */
const PREFETCH_THRESHOLD = 15;

function normalizeForMatch(s: string): string {
  return s.replace(/[^a-z0-9]+/gi, "").toLowerCase();
}

/** Exported for unit tests; stabilizes Civitai cursor chains (duplicate page, broken token loop, empty page). */
export function stabilizePaginationChain(opts: {
  requestedPageUrl: string | null;
  returnedNextUrl: string | null;
  returnedItemIds: (number | string)[];
  lastPageItemIds: (number | string)[] | null;
}): { nextUrl: string | null; discardPage: boolean; stopReason: string | null } {
  const { requestedPageUrl, returnedNextUrl, returnedItemIds, lastPageItemIds } = opts;
  const ret = returnedItemIds.map((x) => String(x));
  const last = lastPageItemIds?.map((x) => String(x)) ?? null;
  if (last !== null && ret.length === last.length && ret.every((id, i) => id === last[i]!)) {
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
  if (returnedItemIds.length === 0) {
    return {
      nextUrl: null,
      discardPage: true,
      stopReason: "Civitai returned an empty page; stopping pagination.",
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

type BrowseSlice = {
  q: string;
  searchType: SearchType;
  contentTypes: string[];
  baseModels: string[];
  sort: string;
  period: string;
  civarchiveKind: string;
  civarchivePage: number;
  /** CivArchive API ``sort`` (newest | oldest | downloads). */
  civarchiveSort: string;
  civarchiveType: string;
  civarchiveBaseModels: string[];
  civarchiveTags: string;
  civarchiveDeletedOnly: boolean;
  /** CivArchive ``civarchive_nsfw`` when NSFW is allowed in browse config. */
  civarchiveNsfw: "all" | "sfw" | "nsfw";
  items: CivitaiBrowseItem[];
  buffer: CivitaiBrowseItem[];
  nextPage: string | null;
  lastPageItemIds: string[];
  stoppedReason: string | null;
  selected: CivitaiModelDetail | null;
  batchIds: Set<string>;
};

function emptySlice(): BrowseSlice {
  return {
    q: "",
    searchType: "model_name",
    contentTypes: [],
    baseModels: [],
    sort: "Most Downloaded",
    period: "All Time",
    civarchiveKind: "version",
    civarchivePage: 1,
    civarchiveSort: "newest",
    civarchiveType: "",
    civarchiveBaseModels: [],
    civarchiveTags: "",
    civarchiveDeletedOnly: false,
    civarchiveNsfw: "all",
    items: [],
    buffer: [],
    nextPage: null,
    lastPageItemIds: [],
    stoppedReason: null,
    selected: null,
    batchIds: new Set(),
  };
}

export const useBrowseStore = defineStore("at-browse", () => {
  const activeSource = ref<BrowseSourceId>("civitai");
  const slices = reactive<Record<BrowseSourceId, BrowseSlice>>({
    civitai: emptySlice(),
    civarchive: emptySlice(),
  });

  function sl(): BrowseSlice {
    return slices[activeSource.value];
  }

  const q = computed({
    get: () => sl().q,
    set: (v: string) => {
      sl().q = v;
    },
  });
  const searchType = computed({
    get: () => sl().searchType,
    set: (v: SearchType) => {
      sl().searchType = v;
    },
  });
  const contentTypes = computed({
    get: () => sl().contentTypes,
    set: (v: string[]) => {
      sl().contentTypes = v;
    },
  });
  const baseModels = computed({
    get: () => sl().baseModels,
    set: (v: string[]) => {
      sl().baseModels = v;
    },
  });
  const sort = computed({
    get: () => sl().sort,
    set: (v: string) => {
      sl().sort = v;
    },
  });
  const period = computed({
    get: () => sl().period,
    set: (v: string) => {
      sl().period = v;
    },
  });
  const civarchiveKind = computed({
    get: () => sl().civarchiveKind,
    set: (v: string) => {
      sl().civarchiveKind = v;
    },
  });
  const civarchivePage = computed({
    get: () => sl().civarchivePage,
    set: (v: number) => {
      sl().civarchivePage = v;
    },
  });
  const civarchiveSort = computed({
    get: () => sl().civarchiveSort,
    set: (v: string) => {
      sl().civarchiveSort = v;
    },
  });
  const civarchiveType = computed({
    get: () => sl().civarchiveType,
    set: (v: string) => {
      sl().civarchiveType = v;
    },
  });
  const civarchiveBaseModels = computed({
    get: () => sl().civarchiveBaseModels,
    set: (v: string[]) => {
      sl().civarchiveBaseModels = v;
    },
  });
  const civarchiveTags = computed({
    get: () => sl().civarchiveTags,
    set: (v: string) => {
      sl().civarchiveTags = v;
    },
  });
  const civarchiveDeletedOnly = computed({
    get: () => sl().civarchiveDeletedOnly,
    set: (v: boolean) => {
      sl().civarchiveDeletedOnly = v;
    },
  });
  const civarchiveNsfw = computed({
    get: () => sl().civarchiveNsfw,
    set: (v: "all" | "sfw" | "nsfw") => {
      sl().civarchiveNsfw = v;
    },
  });

  const hideNsfwFromConfig = ref(true);
  const hideEarlyAccessFromConfig = ref(true);

  const loading = ref(false);
  const fetching = ref(false);
  const error = ref<string | null>(null);

  const searchGeneration = reactive<Record<BrowseSourceId, number>>({
    civitai: 0,
    civarchive: 0,
  });

  const items = computed({
    get: () => sl().items,
    set: (v: CivitaiBrowseItem[]) => {
      sl().items = v;
    },
  });
  const buffer = computed({
    get: () => sl().buffer,
    set: (v: CivitaiBrowseItem[]) => {
      sl().buffer = v;
    },
  });
  const nextPage = computed({
    get: () => sl().nextPage,
    set: (v: string | null) => {
      sl().nextPage = v;
    },
  });
  const lastPageItemIds = computed({
    get: () => sl().lastPageItemIds,
    set: (v: (number | string)[]) => {
      sl().lastPageItemIds = v.map((x) => String(x));
    },
  });
  const stoppedReason = computed({
    get: () => sl().stoppedReason,
    set: (v: string | null) => {
      sl().stoppedReason = v;
    },
  });

  const hasMore = computed(
    () => (buffer.value.length > 0 || !!nextPage.value) && !loading.value,
  );

  const selected = computed({
    get: () => sl().selected,
    set: (v: CivitaiModelDetail | null) => {
      sl().selected = v;
    },
  });

  const detailLoading = ref(false);
  const category = ref("General");
  const duplicateResolution = ref<"skip" | "replace">("skip");

  const batchMode = ref(false);
  const batchIds = computed({
    get: () => sl().batchIds,
    set: (v: Set<string>) => {
      sl().batchIds = v;
    },
  });

  function setActiveSource(id: BrowseSourceId): void {
    activeSource.value = id;
  }

  function searchParams(): api.BrowseSearchParams {
    const s = sl();
    if (activeSource.value === "civarchive") {
      const sort = s.civarchiveSort.trim() || "newest";
      const p: api.BrowseSearchParams = {
        q: s.q,
        nsfw: !hideNsfwFromConfig.value,
        kind: s.civarchiveKind,
        page: s.civarchivePage,
        civarchive_sort: sort,
      };
      const ct = s.civarchiveType.trim();
      if (ct) p.civarchive_type = ct;
      const bms = s.civarchiveBaseModels.map((x) => x.trim()).filter(Boolean);
      if (bms.length) p.civarchive_base_models = bms;
      const tg = s.civarchiveTags.trim();
      if (tg) p.civarchive_tags = tg;
      if (s.civarchiveDeletedOnly) p.civarchive_deleted_only = true;
      if (!hideNsfwFromConfig.value) p.civarchive_nsfw = s.civarchiveNsfw;
      return p;
    }
    return {
      q: s.q,
      search_type: s.searchType,
      content_types: [...s.contentTypes],
      base_models: [...s.baseModels],
      sort: s.sort,
      period: s.period,
      nsfw: !hideNsfwFromConfig.value,
    };
  }

  function _applyFetchedPage(
    fetchedItems: CivitaiBrowseItem[],
    requestedUrl: string | null,
    returnedNextPage: string | null,
  ): boolean {
    const s = sl();
    const rawIds = fetchedItems.map((i) => String(i.id));
    let dec = stabilizePaginationChain({
      requestedPageUrl: requestedUrl,
      returnedNextUrl: returnedNextPage,
      returnedItemIds: rawIds,
      lastPageItemIds: s.lastPageItemIds.length ? [...s.lastPageItemIds] : null,
    });
    if (requestedUrl && activeSource.value === "civitai") {
      const unrelated = stopReasonForUnrelatedAppendPage(s.searchType, s.q, fetchedItems);
      if (unrelated) {
        dec = { nextUrl: null, discardPage: true, stopReason: unrelated };
      }
    }
    if (dec.discardPage) {
      s.nextPage = null;
      s.stoppedReason = dec.stopReason;
      return false;
    }
    s.buffer = [...s.buffer, ...fetchedItems];
    s.nextPage = dec.nextUrl;
    s.lastPageItemIds = rawIds;
    s.stoppedReason = dec.stopReason;
    return true;
  }

  function _maybePrefetch(): void {
    const s = sl();
    if (fetching.value || !s.nextPage) return;
    if (s.buffer.length >= PREFETCH_THRESHOLD) return;
    void _fetchNextPage();
  }

  async function _fetchNextPage(): Promise<void> {
    const src = activeSource.value;
    const s = sl();
    if (fetching.value || !s.nextPage) return;
    const gen = searchGeneration[src];
    const requested = s.nextPage;
    fetching.value = true;
    try {
      const res = await api.browsePage(src, requested, searchParams());
      if (gen !== searchGeneration[src]) return;
      _applyFetchedPage(res.items, requested, res.next_page ?? null);
    } catch (e) {
      if (gen !== searchGeneration[src]) return;
      error.value = e instanceof Error ? e.message : "Load more failed";
    } finally {
      fetching.value = false;
    }
  }

  function drainBuffer(): number {
    const s = sl();
    if (s.buffer.length === 0) return 0;
    const chunk = s.buffer.slice(0, RENDER_CHUNK);
    s.buffer = s.buffer.slice(RENDER_CHUNK);
    s.items = [...s.items, ...chunk];
    _maybePrefetch();
    return chunk.length;
  }

  async function search(reset: boolean): Promise<void> {
    const src = activeSource.value;
    const s = sl();
    const gen = ++searchGeneration[src];
    loading.value = true;
    error.value = null;
    if (reset) {
      s.stoppedReason = null;
      s.nextPage = null;
      s.buffer = [];
      if (src === "civarchive") {
        s.civarchivePage = 1;
      }
    }
    try {
      const res = await api.browseSearch(src, searchParams());
      if (gen !== searchGeneration[src]) return;
      if (reset) {
        s.items = [];
        s.buffer = [];
        s.lastPageItemIds = [];
      }
      _applyFetchedPage(res.items, null, res.next_page ?? null);
      drainBuffer();
    } catch (e) {
      if (gen !== searchGeneration[src]) return;
      error.value = e instanceof Error ? e.message : "Search failed";
      if (reset) {
        s.items = [];
        s.buffer = [];
      }
    } finally {
      if (gen === searchGeneration[src]) {
        loading.value = false;
      }
    }
  }

  async function loadMore(): Promise<void> {
    const s = sl();
    if (loading.value) return;
    if (s.buffer.length > 0) {
      drainBuffer();
      return;
    }
    if (!s.nextPage || fetching.value) return;
    await _fetchNextPage();
    drainBuffer();
  }

  async function openModel(id: number | string): Promise<void> {
    const src = activeSource.value;
    const itemRef = String(id);
    error.value = null;
    detailLoading.value = true;
    sl().selected = null;
    try {
      const raw = await api.browseDetail(src, itemRef, !hideNsfwFromConfig.value);
      sl().selected = raw as unknown as CivitaiModelDetail;
      error.value = null;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Detail failed";
    } finally {
      detailLoading.value = false;
    }
  }

  /** Routes grid open: CivArchive user hits re-run search instead of opening detail. */
  async function openResult(item: CivitaiBrowseItem): Promise<void> {
    if (
      activeSource.value === "civarchive" &&
      (item.civarchiveHitKind === "user" || String(item.id).startsWith("user:"))
    ) {
      const fromRef = String(item.id).replace(/^user:/i, "").trim();
      const username =
        (item.creator_username ?? "").trim() ||
        (item.creator && typeof item.creator === "object" ? String(item.creator.username ?? "").trim() : "") ||
        fromRef;
      sl().q = username;
      sl().civarchiveKind = "version";
      closeDetail();
      await search(true);
      return;
    }
    await openModel(item.id);
  }

  function closeDetail(): void {
    sl().selected = null;
  }

  function toggleBatchId(id: number | string): void {
    const s = sl();
    const key = String(id);
    const next = new Set(s.batchIds);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    s.batchIds = next;
  }

  function clearBatch(): void {
    sl().batchIds = new Set();
  }

  function setBatchMode(on: boolean): void {
    batchMode.value = on;
    if (!on) clearBatch();
  }

  return {
    activeSource,
    setActiveSource,
    slices,
    q,
    searchType,
    contentTypes,
    baseModels,
    sort,
    period,
    civarchiveKind,
    civarchivePage,
    civarchiveSort,
    civarchiveType,
    civarchiveBaseModels,
    civarchiveTags,
    civarchiveDeletedOnly,
    civarchiveNsfw,
    hideNsfwFromConfig,
    hideEarlyAccessFromConfig,
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
    openResult,
    closeDetail,
    toggleBatchId,
    clearBatch,
    setBatchMode,
    searchParams,
  };
});
