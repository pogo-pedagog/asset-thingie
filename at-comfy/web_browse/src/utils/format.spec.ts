import { describe, it, expect } from "vitest";
import { formatBytes, formatDownloadProgressLine, formatRate } from "./format";

describe("formatBytes", () => {
  it("formats zero and small binary units", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(500)).toMatch(/B$/);
    expect(formatBytes(1024)).toContain("KB");
  });

  it("uses one decimal for fractional units", () => {
    expect(formatBytes(1536)).toMatch(/1\.5 KB/);
  });
});

describe("formatRate", () => {
  it("returns empty for non-positive", () => {
    expect(formatRate(0)).toBe("");
    expect(formatRate(-1)).toBe("");
  });

  it("appends per second", () => {
    expect(formatRate(1024)).toMatch(/\/s$/);
  });
});

describe("formatDownloadProgressLine", () => {
  it("shows progress and rate when downloading", () => {
    const s = formatDownloadProgressLine("downloading", 1024 * 1024, 10 * 1024 * 1024, 50 * 1024);
    expect(s).toContain("/");
    expect(s).toContain("·");
  });

  it("shows total only when completed", () => {
    const s = formatDownloadProgressLine("completed", 99, 2048, null);
    expect(s).toBeTruthy();
    expect(s).not.toContain("/");
  });

  it("returns empty when no bytes and no total", () => {
    expect(formatDownloadProgressLine("queued", 0, null, null)).toBe("");
  });
});
