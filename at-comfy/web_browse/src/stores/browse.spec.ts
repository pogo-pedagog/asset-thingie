import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useBrowseStore, stabilizePaginationChain } from "./browse";
import { browseSourceOptions } from "../sources/registry";

function makeItem(id: number, name = `model-${id}`) {
  return { id, name, type: "LORA", modelVersions: [] as never[] };
}

function stubFetchWith(payload: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(payload)),
      }),
    ) as unknown as typeof fetch,
  );
}

describe("stabilizePaginationChain", () => {
  it("classifies empty response with echoed next URL as repeated token (not empty page)", () => {
    const url = "https://civitai.com/api/v1/models?cursor=broken";
    const dec = stabilizePaginationChain({
      requestedPageUrl: url,
      returnedNextUrl: url,
      returnedItemIds: [],
      lastPageItemIds: [1],
    });
    expect(dec.nextUrl).toBeNull();
    expect(dec.discardPage).toBe(false);
    expect(dec.stopReason).toMatch(/repeated the same next-page token/i);
  });
});

describe("browse sources registry", () => {
  it("includes CivArchive", () => {
    expect(browseSourceOptions.map((o) => o.id)).toEqual(["civitai", "civarchive"]);
  });
});

describe("browse store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    stubFetchWith({ items: [], next_page: null, prev_page: null });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("search resets items when reset true", async () => {
    const s = useBrowseStore();
    s.items = [makeItem(1)];
    await s.search(true);
    expect(s.items).toEqual([]);
  });

  it("search resets stabilization state on reset", async () => {
    const s = useBrowseStore();
    s.lastPageItemIds = ["1", "2", "3"];
    s.stoppedReason = "old";
    stubFetchWith({
      items: [makeItem(9)],
      next_page: null,
      prev_page: null,
    });
    await s.search(true);
    expect(s.stoppedReason).toBeNull();
    expect(s.items.map((i) => i.id)).toContain(9);
  });

  it("search drains first chunk from buffer into items", async () => {
    const many = Array.from({ length: 50 }, (_, i) => makeItem(i + 1));
    stubFetchWith({ items: many, next_page: null, prev_page: null });
    const s = useBrowseStore();
    await s.search(true);
    expect(s.items.length).toBe(25);
    expect(s.buffer.length).toBe(25);
  });

  it("drainBuffer moves chunk from buffer to items", async () => {
    const many = Array.from({ length: 50 }, (_, i) => makeItem(i + 1));
    stubFetchWith({ items: many, next_page: null, prev_page: null });
    const s = useBrowseStore();
    await s.search(true);
    s.drainBuffer();
    expect(s.items.length).toBe(50);
    expect(s.buffer.length).toBe(0);
  });

  it("loadMore drains buffer instantly without waiting for network", async () => {
    const s = useBrowseStore();
    s.items = [makeItem(1)];
    s.buffer = Array.from({ length: 30 }, (_, i) => makeItem(100 + i));
    s.nextPage = "https://civitai.com/api/v1/models?cursor=x";

    stubFetchWith({ items: [], next_page: null, prev_page: null });

    await s.loadMore();
    expect(s.items.length).toBe(26);
    expect(s.buffer.length).toBe(5);
  });

  it("loadMore fetches when buffer is empty", async () => {
    const page2 = Array.from({ length: 10 }, (_, i) => makeItem(200 + i));
    stubFetchWith({ items: page2, next_page: null, prev_page: null });

    const s = useBrowseStore();
    s.items = [makeItem(1)];
    s.buffer = [];
    s.nextPage = "https://civitai.com/api/v1/models?cursor=x";
    s.lastPageItemIds = ["1"];

    await s.loadMore();
    expect(s.items.length).toBeGreaterThan(1);
  });

  it("hasMore is true when buffer has items even without nextPage", () => {
    const s = useBrowseStore();
    s.buffer = [makeItem(1)];
    s.nextPage = null;
    expect(s.hasMore).toBe(true);
  });

  it("hasMore is false when both buffer and nextPage are empty", () => {
    const s = useBrowseStore();
    s.buffer = [];
    s.nextPage = null;
    expect(s.hasMore).toBe(false);
  });

  it("loadMore stops on empty page from Civitai", async () => {
    stubFetchWith({
      items: [],
      next_page: "https://civitai.com/api/v1/models?cursor=more",
      prev_page: null,
    });
    const s = useBrowseStore();
    s.items = [makeItem(1)];
    s.nextPage = "https://civitai.com/api/v1/models?cursor=x";
    s.lastPageItemIds = ["1"];

    await s.loadMore();
    expect(s.nextPage).toBeNull();
    expect(s.stoppedReason).toMatch(/empty page/i);
  });

  it("loadMore stops on duplicate page ids", async () => {
    stubFetchWith({
      items: [makeItem(1), makeItem(2)],
      next_page: "https://civitai.com/api/v1/models?cursor=y",
      prev_page: null,
    });
    const s = useBrowseStore();
    s.items = [makeItem(1), makeItem(2)];
    s.nextPage = "https://civitai.com/api/v1/models?cursor=x";
    s.lastPageItemIds = ["1", "2"];

    await s.loadMore();
    expect(s.nextPage).toBeNull();
    expect(s.stoppedReason).toMatch(/same page/i);
  });

  it("preserves query state per source when switching", () => {
    const s = useBrowseStore();
    s.q = "pony";
    s.setActiveSource("civarchive");
    s.q = "mixplin";
    s.setActiveSource("civitai");
    expect(s.q).toBe("pony");
    s.setActiveSource("civarchive");
    expect(s.q).toBe("mixplin");
  });

  it("searchParams reflects hide_nsfw: nsfw false when hideNsfwFromConfig is true", () => {
    const s = useBrowseStore();
    s.hideNsfwFromConfig = true;
    expect(s.searchParams().nsfw).toBe(false);
  });

  it("searchParams reflects hide_nsfw: nsfw true when hideNsfwFromConfig is false", () => {
    const s = useBrowseStore();
    s.hideNsfwFromConfig = false;
    expect(s.searchParams().nsfw).toBe(true);
  });

  it("toggleBatchId adds and removes", () => {
    const s = useBrowseStore();
    s.toggleBatchId(5);
    expect(s.batchIds.has("5")).toBe(true);
    s.toggleBatchId(5);
    expect(s.batchIds.has("5")).toBe(false);
  });

  it("setBatchMode clears selection when disabled", () => {
    const s = useBrowseStore();
    s.toggleBatchId(1);
    s.setBatchMode(false);
    expect(s.batchMode).toBe(false);
    expect(s.batchIds.size).toBe(0);
  });

  it("concurrent search: first result is discarded when second search starts", async () => {
    const s = useBrowseStore();

    let resolve1!: (v: Response) => void;
    let resolve2!: (v: Response) => void;

    const mockFetch = vi.fn()
      .mockImplementationOnce(() => new Promise<Response>((r) => { resolve1 = r; }))
      .mockImplementationOnce(() => new Promise<Response>((r) => { resolve2 = r; }));
    vi.stubGlobal("fetch", mockFetch as unknown as typeof fetch);

    const p1 = s.search(true);
    const p2 = s.search(true);

    const resp = (items: unknown[]) => ({
      ok: true,
      status: 200,
      text: () => Promise.resolve(JSON.stringify({
        items, next_page: null, prev_page: null,
      })),
    });

    resolve2!(resp([makeItem(99)]) as unknown as Response);
    await new Promise((r) => setTimeout(r, 0));

    resolve1!(resp([makeItem(1), makeItem(2)]) as unknown as Response);
    await Promise.all([p1, p2]);

    expect(s.items.map((i) => i.id)).toEqual([99]);
    expect(s.loading).toBe(false);
  });

  it("superseded load-more clears fetching; search reset clears nextPage before response", async () => {
    const s = useBrowseStore();
    s.items = [makeItem(1)];
    s.buffer = [];
    s.nextPage = "https://civitai.com/api/v1/models?cursor=x";
    s.lastPageItemIds = ["1"];

    let resolvePage!: (v: Response) => void;
    let resolveSearch!: (v: Response) => void;

    const mockFetch = vi.fn()
      .mockImplementationOnce(() => new Promise<Response>((r) => { resolvePage = r; }))
      .mockImplementationOnce(() => new Promise<Response>((r) => { resolveSearch = r; }));
    vi.stubGlobal("fetch", mockFetch as unknown as typeof fetch);

    const loadP = s.loadMore();

    expect(s.fetching).toBe(true);

    const searchP = s.search(true);
    expect(s.nextPage).toBeNull();

    const json = (items: unknown[]) =>
      JSON.stringify({ items, next_page: null, prev_page: null });

    resolvePage!(
      new Response(json([makeItem(200)]), { status: 200 }) as unknown as Response,
    );
    await loadP;

    expect(s.fetching).toBe(false);

    resolveSearch!(
      new Response(json([makeItem(301)]), { status: 200 }) as unknown as Response,
    );
    await searchP;

    expect(s.lastPageItemIds).toEqual(["301"]);
    expect(s.items.map((i) => i.id)).toContain(301);
  });
});
