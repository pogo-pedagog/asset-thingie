import { describe, it, expect } from "vitest";
import { downloadGateKey, parseDownloadGateKey, taskMatchesGate } from "./useDownloadGate";
import type { DownloadTaskRow } from "../types";

function row(p: Partial<DownloadTaskRow> & Pick<DownloadTaskRow, "id" | "state">): DownloadTaskRow {
  return {
    display_name: "m",
    filename: "m.safetensors",
    bytes_done: 0,
    total_bytes: null,
    error_message: null,
    cover_thumb_url: null,
    created_at: "2026-01-01T00:00:00Z",
    source: "civitai",
    version_id: 1,
    file_id: 2,
    ...p,
  };
}

describe("useDownloadGate helpers", () => {
  it("round-trips gate key", () => {
    const k = downloadGateKey("civitai", 9, 8);
    expect(parseDownloadGateKey(k)).toEqual({ source: "civitai", versionId: 9, fileId: 8 });
  });

  it("taskMatchesGate respects source and ids", () => {
    const k = downloadGateKey("civitai", 1, 2);
    expect(taskMatchesGate(row({ id: "a", state: "queued" }), k)).toBe(true);
    expect(taskMatchesGate(row({ id: "b", state: "queued", version_id: 99 }), k)).toBe(false);
    expect(taskMatchesGate(row({ id: "c", state: "queued", source: "civarchive" }), k)).toBe(false);
  });

  it("taskMatchesGate falls back to basename when ids missing", () => {
    const k = downloadGateKey("civitai", 1, 2);
    const t = row({
      id: "x",
      state: "queued",
      filename: "MyModel.safetensors",
    });
    delete (t as { version_id?: number }).version_id;
    delete (t as { file_id?: number }).file_id;
    expect(taskMatchesGate(t, k, { expectedBasename: "MyModel.safetensors" })).toBe(true);
    expect(taskMatchesGate(t, k, { expectedBasename: "other.safetensors" })).toBe(false);
  });

  it("taskMatchesGate accepts camelCase ids", () => {
    const k = downloadGateKey("civitai", 5, 6);
    expect(
      taskMatchesGate(
        row({ id: "z", state: "queued", version_id: undefined, file_id: undefined, versionId: 5, fileId: 6 }),
        k,
      ),
    ).toBe(true);
  });
});
