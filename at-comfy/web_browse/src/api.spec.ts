import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchHealth,
  getBaseUrl,
  setBaseUrl,
  DEFAULT_BASE_URL,
  getApiPrefix,
  browseSearch,
  buildBrowseSearchQuery,
} from "./api";

describe("api", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(JSON.stringify({ ok: true })),
        }),
      ) as unknown as typeof fetch,
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("getBaseUrl uses default (Comfy)", () => {
    expect(getBaseUrl()).toBe(DEFAULT_BASE_URL);
  });

  it("setBaseUrl persists", () => {
    setBaseUrl("http://example.test:8188/");
    expect(getBaseUrl()).toBe("http://example.test:8188");
  });

  it("getApiPrefix is /at", () => {
    expect(getApiPrefix()).toBe("/at");
  });

  it("fetchHealth hits /at/health on default base", async () => {
    const data = await fetchHealth();
    expect(data).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/at\/health$/),
      expect.objectContaining({
        headers: expect.objectContaining({ Accept: "application/json" }),
      }),
    );
  });

  it("buildBrowseSearchQuery includes limit", () => {
    const q = buildBrowseSearchQuery({ limit: 5 });
    expect(q.get("limit")).toBe("5");
  });

  it("browseSearch uses /at when on Comfy", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(
              JSON.stringify({
                items: [],
                next_page: null,
                prev_page: null,
              }),
            ),
        }),
      ) as unknown as typeof fetch,
    );
    await browseSearch({ limit: 5 });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/at\/browse\/search\?limit=5$/),
      expect.any(Object),
    );
  });
});
