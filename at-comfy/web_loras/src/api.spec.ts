import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchHealth,
  fetchAssetDetail,
  getBaseUrl,
  setBaseUrl,
  DEFAULT_BASE_URL,
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

  it("getBaseUrl uses default", () => {
    expect(getBaseUrl()).toBe(DEFAULT_BASE_URL);
  });

  it("setBaseUrl persists", () => {
    setBaseUrl("http://example.test:9999/");
    expect(getBaseUrl()).toBe("http://example.test:9999");
  });

  it("fetchHealth requests /at/health", async () => {
    const data = await fetchHealth();
    expect(data).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/at\/health$/),
      expect.objectContaining({
        headers: expect.objectContaining({ Accept: "application/json" }),
      }),
    );
  });

  it("fetchAssetDetail requests detail endpoint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(
              JSON.stringify({
                asset_id: 7,
                example_media: [],
                description_html: null,
                cover_url_full: null,
              }),
            ),
        }),
      ) as unknown as typeof fetch,
    );
    const d = await fetchAssetDetail(7);
    expect(d.asset_id).toBe(7);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/at\/assets\/7$/),
      expect.any(Object),
    );
  });
});
