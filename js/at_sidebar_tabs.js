/**
 * AssetThingie — sidebar tabs (Browse, LoRAs, Checkpoints).
 * All tabs register here in order so the tab strip order is deterministic (Comfy does not sort by filename).
 */
import { app } from "../../scripts/app.js";

const browseVueByEl = new WeakMap();
const lorasVueByEl = new WeakMap();
const checkpointsVueByEl = new WeakMap();

function showBrowseError(root, message, err) {
  root.textContent = message;
  if (err) console.error("[at_comfy/browse]", err);
}

function showAtLorasError(root, message, err) {
  root.textContent = message;
  if (err) console.error("[at_comfy/loras]", err);
}

function showAtCheckpointsError(root, message, err) {
  root.textContent = message;
  if (err) console.error("[at_comfy/checkpoints]", err);
}

app.registerExtension({
  name: "at.sidebar_tabs",
  async setup() {
    app.extensionManager.registerSidebarTab({
      id: "at-browse",
      icon: "pi pi-search",
      title: "AT Browse",
      tooltip: "AssetThingie — Civitai browse and downloads",
      type: "custom",
      render(el) {
        const cssId = "at-browse-stylesheet";
        if (!document.getElementById(cssId)) {
          try {
            const link = document.createElement("link");
            link.id = cssId;
            link.rel = "stylesheet";
            link.href = new URL("./dist/at-browse.css", import.meta.url).href;
            document.head.appendChild(link);
          } catch {
            /* import.meta.url unavailable */
          }
        }

        const prev = browseVueByEl.get(el);
        if (prev) {
          try {
            prev.unmount();
          } catch (unmountErr) {
            console.error("[at_comfy/browse] previous app unmount failed", unmountErr);
          }
          browseVueByEl.delete(el);
        }

        el.replaceChildren();
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.minHeight = "0";
        el.style.flex = "1 1 0%";
        el.style.overflow = "hidden";
        el.style.height = "100%";

        const root = document.createElement("div");
        root.id = "at-browse-root";
        root.style.cssText =
          "flex:1 1 0%;min-height:0;width:100%;overflow:hidden;display:flex;flex-direction:column;font:inherit;color:inherit;";
        el.appendChild(root);

        let hostResizeObserver = null;
        const pinRootToHost = () => {
          const h = el.clientHeight;
          if (h < 24) return;
          root.style.flex = "none";
          root.style.height = `${h}px`;
          root.style.maxHeight = `${h}px`;
        };
        pinRootToHost();
        if (typeof ResizeObserver !== "undefined") {
          hostResizeObserver = new ResizeObserver(() => pinRootToHost());
          hostResizeObserver.observe(el);
        }

        let renderCancelled = false;
        import("./dist/at-browse.js")
          .then((mod) => {
            if (renderCancelled) return;
            if (typeof mod.mount !== "function") {
              showBrowseError(root, "AT Browse: bundle missing mount() export.", null);
              return;
            }
            let vueApp;
            try {
              vueApp = mod.mount(root);
            } catch (mountErr) {
              showBrowseError(
                root,
                `AT Browse: UI failed to start (${mountErr instanceof Error ? mountErr.message : String(mountErr)}).`,
                mountErr,
              );
              return;
            }
            if (renderCancelled) {
              try {
                if (vueApp && typeof vueApp.unmount === "function") vueApp.unmount();
              } catch (e) {
                console.error("[at_comfy/browse] unmount after cancelled render", e);
              }
              return;
            }
            if (vueApp && typeof vueApp.unmount === "function") {
              browseVueByEl.set(el, vueApp);
            }
          })
          .catch((err) => {
            if (renderCancelled) return;
            showBrowseError(
              root,
              `AT Browse: failed to load UI (${err instanceof Error ? err.message : String(err)}). Run npm run build in at-comfy/web_browse.`,
              err,
            );
          });

        return () => {
          renderCancelled = true;
          if (hostResizeObserver) {
            hostResizeObserver.disconnect();
            hostResizeObserver = null;
          }
          const v = browseVueByEl.get(el);
          if (v) {
            try {
              v.unmount();
            } catch (e) {
              console.error("[at_comfy/browse] sidebar cleanup unmount failed", e);
            }
            browseVueByEl.delete(el);
          }
        };
      },
    });

    app.extensionManager.registerSidebarTab({
      id: "at-loras",
      icon: "pi pi-objects-column",
      title: "AT Loras",
      tooltip: "AssetThingie — Browse & use LoRAs",
      type: "custom",
      render(el) {
        const cssId = "at-loras-stylesheet";
        if (!document.getElementById(cssId)) {
          try {
            const link = document.createElement("link");
            link.id = cssId;
            link.rel = "stylesheet";
            link.href = new URL("./dist/at-loras.css", import.meta.url).href;
            document.head.appendChild(link);
          } catch {
            /* import.meta.url unavailable — UI still works, mostly unstyled */
          }
        }

        const prev = lorasVueByEl.get(el);
        if (prev) {
          try {
            prev.unmount();
          } catch (unmountErr) {
            console.error("[at_comfy/loras] previous app unmount failed", unmountErr);
          }
          lorasVueByEl.delete(el);
        }

        el.replaceChildren();
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.minHeight = "0";
        el.style.flex = "1 1 0%";
        el.style.overflow = "hidden";
        el.style.height = "100%";

        const root = document.createElement("div");
        root.id = "at-loras-root";
        root.style.cssText =
          "flex:1 1 0%;min-height:0;width:100%;overflow:hidden;display:flex;flex-direction:column;font:inherit;color:inherit;";
        el.appendChild(root);

        let hostResizeObserver = null;
        const pinRootToHost = () => {
          const h = el.clientHeight;
          if (h < 24) return;
          root.style.flex = "none";
          root.style.height = `${h}px`;
          root.style.maxHeight = `${h}px`;
        };
        pinRootToHost();
        if (typeof ResizeObserver !== "undefined") {
          hostResizeObserver = new ResizeObserver(() => pinRootToHost());
          hostResizeObserver.observe(el);
        }

        let renderCancelled = false;
        import("./dist/at-loras.js")
          .then((mod) => {
            if (renderCancelled) return;
            if (typeof mod.mount !== "function") {
              showAtLorasError(root, "AT Loras: bundle missing mount() export.", null);
              return;
            }
            let vueApp;
            try {
              vueApp = mod.mount(root);
            } catch (mountErr) {
              showAtLorasError(
                root,
                `AT Loras: UI failed to start (${mountErr instanceof Error ? mountErr.message : String(mountErr)}).`,
                mountErr,
              );
              return;
            }
            if (renderCancelled) {
              try {
                if (vueApp && typeof vueApp.unmount === "function") vueApp.unmount();
              } catch (e) {
                console.error("[at_comfy/loras] unmount after cancelled render", e);
              }
              return;
            }
            if (vueApp && typeof vueApp.unmount === "function") {
              lorasVueByEl.set(el, vueApp);
            }
          })
          .catch((err) => {
            if (renderCancelled) return;
            showAtLorasError(
              root,
              `AT Loras: failed to load UI (${err instanceof Error ? err.message : String(err)}). Run npm run build in at-comfy/web_loras.`,
              err,
            );
          });

        return () => {
          renderCancelled = true;
          if (hostResizeObserver) {
            hostResizeObserver.disconnect();
            hostResizeObserver = null;
          }
          const v = lorasVueByEl.get(el);
          if (v) {
            try {
              v.unmount();
            } catch (e) {
              console.error("[at_comfy/loras] sidebar cleanup unmount failed", e);
            }
            lorasVueByEl.delete(el);
          }
        };
      },
    });

    app.extensionManager.registerSidebarTab({
      id: "at-checkpoints",
      icon: "pi pi-box",
      title: "AT Chkpts",
      tooltip: "AssetThingie — Browse & use Checkpoints",
      type: "custom",
      render(el) {
        const cssId = "at-checkpoints-stylesheet";
        if (!document.getElementById(cssId)) {
          try {
            const link = document.createElement("link");
            link.id = cssId;
            link.rel = "stylesheet";
            link.href = new URL("./dist/at-checkpoints.css", import.meta.url).href;
            document.head.appendChild(link);
          } catch {
            /* import.meta.url unavailable */
          }
        }

        const prev = checkpointsVueByEl.get(el);
        if (prev) {
          try {
            prev.unmount();
          } catch (unmountErr) {
            console.error("[at_comfy/checkpoints] previous app unmount failed", unmountErr);
          }
          checkpointsVueByEl.delete(el);
        }

        el.replaceChildren();
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.minHeight = "0";
        el.style.flex = "1 1 0%";
        el.style.overflow = "hidden";
        el.style.height = "100%";

        const root = document.createElement("div");
        root.id = "at-checkpoints-root";
        root.style.cssText =
          "flex:1 1 0%;min-height:0;width:100%;overflow:hidden;display:flex;flex-direction:column;font:inherit;color:inherit;";
        el.appendChild(root);

        let hostResizeObserver = null;
        const pinRootToHost = () => {
          const h = el.clientHeight;
          if (h < 24) return;
          root.style.flex = "none";
          root.style.height = `${h}px`;
          root.style.maxHeight = `${h}px`;
        };
        pinRootToHost();
        if (typeof ResizeObserver !== "undefined") {
          hostResizeObserver = new ResizeObserver(() => pinRootToHost());
          hostResizeObserver.observe(el);
        }

        let renderCancelled = false;
        import("./dist/at-checkpoints.js")
          .then((mod) => {
            if (renderCancelled) return;
            if (typeof mod.mount !== "function") {
              showAtCheckpointsError(root, "AT Checkpoints: bundle missing mount() export.", null);
              return;
            }
            let vueApp;
            try {
              vueApp = mod.mount(root);
            } catch (mountErr) {
              showAtCheckpointsError(
                root,
                `AT Checkpoints: UI failed to start (${mountErr instanceof Error ? mountErr.message : String(mountErr)}).`,
                mountErr,
              );
              return;
            }
            if (renderCancelled) {
              try {
                if (vueApp && typeof vueApp.unmount === "function") vueApp.unmount();
              } catch (e) {
                console.error("[at_comfy/checkpoints] unmount after cancelled render", e);
              }
              return;
            }
            if (vueApp && typeof vueApp.unmount === "function") {
              checkpointsVueByEl.set(el, vueApp);
            }
          })
          .catch((err) => {
            if (renderCancelled) return;
            showAtCheckpointsError(
              root,
              `AT Checkpoints: failed to load UI (${err instanceof Error ? err.message : String(err)}). Run npm run build in at-comfy/web_checkpoints.`,
              err,
            );
          });

        return () => {
          renderCancelled = true;
          if (hostResizeObserver) {
            hostResizeObserver.disconnect();
            hostResizeObserver = null;
          }
          const v = checkpointsVueByEl.get(el);
          if (v) {
            try {
              v.unmount();
            } catch (e) {
              console.error("[at_comfy/checkpoints] sidebar cleanup unmount failed", e);
            }
            checkpointsVueByEl.delete(el);
          }
        };
      },
    });
  },
});
