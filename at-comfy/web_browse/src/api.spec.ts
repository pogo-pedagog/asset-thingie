import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchHealth,
  getBaseUrl,
  setBaseUrl,
  DEFAULT_BASE_URL,
  getApiPrefix,
  browseSearch,
  browsePage,
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

  it("buildBrowseSearchQuery does not send limit", () => {
    const q = buildBrowseSearchQuery({ q: "x" });
    expect(q.has("limit")).toBe(false);
    expect(q.get("q")).toBe("x");
  });

  it("buildBrowseSearchQuery encodes civarchive filter keys", () => {
    const q = buildBrowseSearchQuery({
      q: "a",
      kind: "version",
      page: 1,
      civarchive_sort: "oldest",
      civarchive_type: "Checkpoint",
      civarchive_base_models: ["SD 1.5", "Pony"],
      civarchive_tags: "foo",
    });
    expect(q.get("civarchive_sort")).toBe("oldest");
    expect(q.get("civarchive_type")).toBe("Checkpoint");
    expect(q.getAll("civarchive_base_model")).toEqual(["SD 1.5", "Pony"]);
    expect(q.get("civarchive_tags")).toBe("foo");
  });

  it("browseSearch uses /at when on Comfy (no limit in query)", async () => {
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
    await browseSearch("civitai", {});
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/at\/browse\/civitai\/search$/),
      expect.any(Object),
    );
    const calledUrl = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).not.toMatch(/limit=/);
  });

  it("browsePage sends url and filters as query params", async () => {
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
    await browsePage("civitai", "https://civitai.com/api/v1/models?cursor=1", { q: "foo" });
    const calledUrl = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(calledUrl).toContain("/at/browse/civitai/page?");
    expect(calledUrl).toContain("url=");
    expect(calledUrl).toContain("q=foo");
  });
});
