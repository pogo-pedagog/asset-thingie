import { describe, it, expect } from "vitest";
import { isRemoteMediaUrl, resolveMediaSrc } from "../../web_shared/media";

describe("@at-shared/media", () => {
  const origin = "http://127.0.0.1:8188";

  it("isRemoteMediaUrl detects http(s) and protocol-relative", () => {
    expect(isRemoteMediaUrl("https://civitai.com/x")).toBe(true);
    expect(isRemoteMediaUrl("http://x.test/y")).toBe(true);
    expect(isRemoteMediaUrl("//cdn.example/z")).toBe(true);
    expect(isRemoteMediaUrl("  https://a  ")).toBe(true);
    expect(isRemoteMediaUrl("/at/cache/covers/1.jpg")).toBe(false);
    expect(isRemoteMediaUrl("relative")).toBe(false);
    expect(isRemoteMediaUrl("")).toBe(false);
  });

  it("resolveMediaSrc returns null for empty input", () => {
    expect(resolveMediaSrc(null, origin, true)).toBeNull();
    expect(resolveMediaSrc(undefined, origin, false)).toBeNull();
    expect(resolveMediaSrc("  ", origin, true)).toBeNull();
  });

  it("resolveMediaSrc blocks remote URLs when allowRemote is false", () => {
    expect(resolveMediaSrc("https://civitai.com/a.jpg", origin, false)).toBeNull();
    expect(resolveMediaSrc("//x/y", origin, false)).toBeNull();
  });

  it("resolveMediaSrc allows remote when flag is true", () => {
    expect(resolveMediaSrc("https://civitai.com/a.jpg", origin, true)).toBe("https://civitai.com/a.jpg");
    expect(resolveMediaSrc("//host/p", origin, true)).toBe("//host/p");
  });

  it("resolveMediaSrc joins relative paths with origin for local cache", () => {
    expect(resolveMediaSrc("/at/cache/covers/3.jpg", origin, false)).toBe(
      "http://127.0.0.1:8188/at/cache/covers/3.jpg",
    );
    expect(resolveMediaSrc("/at/cache/covers/3.jpg", origin, true)).toBe(
      "http://127.0.0.1:8188/at/cache/covers/3.jpg",
    );
  });

  it("resolveMediaSrc strips trailing slash from origin once", () => {
    expect(resolveMediaSrc("/foo", "http://127.0.0.1:8188/", true)).toBe("http://127.0.0.1:8188/foo");
  });
});
