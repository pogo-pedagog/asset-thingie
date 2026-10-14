import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import * as api from "../api";
import { useAssetsStore } from "./assets";

describe("assets store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reset load during in-flight fetch replaces items when newer fetch completes", async () => {
    const store = useAssetsStore();
    store.connected = true;

    let resolve1!: (v: Awaited<ReturnType<typeof api.fetchAssets>>) => void;
    let resolve2!: (v: Awaited<ReturnType<typeof api.fetchAssets>>) => void;
    const spy = vi.spyOn(api, "fetchAssets")
      .mockImplementationOnce(() => new Promise((r) => { resolve1 = r; }))
      .mockImplementationOnce(() => new Promise((r) => { resolve2 = r; }));

    const p1 = store.loadAssets(true);
    const p2 = store.loadAssets(true);

    resolve2!({ total: 1, items: [{ asset_id: 99 } as never], limit: 50, offset: 0 });
    await p2;
    expect(store.items.map((i) => i.asset_id)).toEqual([99]);

    resolve1!({ total: 1, items: [{ asset_id: 1 } as never], limit: 50, offset: 0 });
    await p1;
    expect(store.items.map((i) => i.asset_id)).toEqual([99]);
    expect(store.loading).toBe(false);
    spy.mockRestore();
  });

  it("loadMore result is dropped after reset", async () => {
    const store = useAssetsStore();
    store.connected = true;
    store.items = [{ asset_id: 1 } as never];
    store.total = 10;

    let resolveMore!: (v: Awaited<ReturnType<typeof api.fetchAssets>>) => void;
    const spy = vi.spyOn(api, "fetchAssets")
      .mockImplementationOnce(() => new Promise((r) => { resolveMore = r; }))
      .mockImplementationOnce(() =>
        Promise.resolve({ total: 1, items: [{ asset_id: 50 } as never], limit: 50, offset: 0 }),
      );

    const moreP = store.loadMore();
    void store.loadAssets(true);

    resolveMore!({ total: 10, items: [{ asset_id: 2 } as never], limit: 50, offset: 1 });
    await moreP;
    expect(store.items.map((i) => i.asset_id)).not.toContain(2);

    spy.mockRestore();
  });

  it("loadDetail ignores stale response", async () => {
    const store = useAssetsStore();
    store.connected = true;

    let resolveA!: (v: Awaited<ReturnType<typeof api.fetchAssetDetail>>) => void;
    let resolveB!: (v: Awaited<ReturnType<typeof api.fetchAssetDetail>>) => void;
    const spy = vi.spyOn(api, "fetchAssetDetail")
      .mockImplementationOnce(() => new Promise((r) => { resolveA = r; }))
      .mockImplementationOnce(() => new Promise((r) => { resolveB = r; }));

    store.openDetail(1);
    store.openDetail(2);

    resolveB!({ asset_id: 2, display_name: "B" } as never);
    await vi.waitFor(() => expect(store.detailLoading).toBe(false));
    expect(store.detail?.display_name).toBe("B");

    resolveA!({ asset_id: 1, display_name: "A" } as never);
    await new Promise((r) => setTimeout(r, 0));
    expect(store.detail?.display_name).toBe("B");

    spy.mockRestore();
  });
});
