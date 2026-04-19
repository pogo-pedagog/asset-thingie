import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import DownloadsTab from "./DownloadsTab.vue";
import { useDownloadsStore } from "../stores/downloads";
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
    ...p,
  };
}

describe("DownloadsTab", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("shows Pause all when a queued task exists", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "1", state: "queued" })],
    });
    const w = mount(DownloadsTab);
    expect(w.text()).toContain("Pause all");
  });

  it("hides Pause all when no active queued/downloading/verifying tasks", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "1", state: "completed" })],
    });
    const w = mount(DownloadsTab);
    expect(w.text()).not.toContain("Pause all");
  });

  it("shows Resume all when a paused task exists", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "1", state: "paused" })],
    });
    const w = mount(DownloadsTab);
    expect(w.text()).toContain("Resume all");
  });

  it("shows Retry all failed when a failed task exists", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "1", state: "failed" })],
    });
    const w = mount(DownloadsTab);
    expect(w.text()).toContain("Retry all failed");
  });

  it("shows inline Pause and Move to top for queued state", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "1", state: "queued" })],
    });
    const w = mount(DownloadsTab);
    expect(w.text()).toContain("Pause");
    expect(w.text()).toContain("Move to top");
  });

  it("shows Resume for paused state", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "1", state: "paused" })],
    });
    const w = mount(DownloadsTab);
    expect(w.text()).toContain("Resume");
  });

  it("shows progress meter line for downloading task", () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [
        row({
          id: "1",
          state: "downloading",
          bytes_done: 1024,
          total_bytes: 10240,
          rate_bps: 512,
        }),
      ],
    });
    const w = mount(DownloadsTab, { attachTo: document.body });
    const text = w.text();
    expect(text).toContain("/");
    expect(text).toContain("·");
    w.unmount();
  });

  it("opens more menu and closes on Escape", async () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "menu1", state: "queued" })],
    });
    const w = mount(DownloadsTab, { attachTo: document.body });
    const btn = w.find(".at-dl-menu-trigger");
    expect(btn.exists()).toBe(true);
    await btn.trigger("click");
    await flushPromises();
    expect(document.querySelector(".at-dl-menu-flyout")).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await flushPromises();
    expect(document.querySelector(".at-dl-menu-flyout")).toBeNull();
    w.unmount();
  });

  it("closes more menu on outside mousedown", async () => {
    const store = useDownloadsStore();
    store.$patch({
      tasks: [row({ id: "menu2", state: "queued" })],
    });
    const w = mount(DownloadsTab, { attachTo: document.body });
    await w.find(".at-dl-menu-trigger").trigger("click");
    await flushPromises();
    expect(document.querySelector(".at-dl-menu-flyout")).toBeTruthy();
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    await flushPromises();
    expect(document.querySelector(".at-dl-menu-flyout")).toBeNull();
    w.unmount();
  });
});
