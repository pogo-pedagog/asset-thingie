import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useDownloadsStore } from "./downloads";

describe("downloads store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(JSON.stringify({ tasks: [], completed_since_last_poll: [] })),
        }),
      ) as unknown as typeof fetch,
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("refresh loads tasks", async () => {
    const s = useDownloadsStore();
    await s.refresh();
    expect(s.tasks).toEqual([]);
  });

  it("setTab switches active tab", () => {
    const s = useDownloadsStore();
    s.setTab("downloads");
    expect(s.activeTab).toBe("downloads");
  });
});
