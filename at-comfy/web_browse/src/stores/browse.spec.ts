import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useBrowseStore } from "./browse";
describe("browse store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(JSON.stringify({ items: [], next_page: null, prev_page: null })),
        }),
      ) as unknown as typeof fetch,
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("search resets items when reset true", async () => {
    const s = useBrowseStore();
    s.items = [{ id: 1, name: "x", type: "LORA", modelVersions: [] }];
    await s.search(true);
    expect(s.items).toEqual([]);
  });

  it("toggleBatchId adds and removes", () => {
    const s = useBrowseStore();
    s.toggleBatchId(5);
    expect(s.batchIds.has(5)).toBe(true);
    s.toggleBatchId(5);
    expect(s.batchIds.has(5)).toBe(false);
  });

  it("setBatchMode clears selection when disabled", () => {
    const s = useBrowseStore();
    s.toggleBatchId(1);
    s.setBatchMode(false);
    expect(s.batchMode).toBe(false);
    expect(s.batchIds.size).toBe(0);
  });
});
