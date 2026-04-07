/**
 * AssetThingie — AT Loras sidebar tab (Vue bundle in ./dist/).
 * https://docs.comfy.org/custom-nodes/js/javascript_sidebar_tabs
 */
import { app } from "../../scripts/app.js";

const EXTENSION_NAME = "at.loras";
const SIDEBAR_TAB_ID = "at-loras";

/** Vue app instance per sidebar panel container (Comfy may call ``render(el)`` again when revisiting the tab). */
const vueAppBySidebarContainer = new WeakMap();

function showAtLorasError(root, message, err) {
  root.textContent = message;
  if (err) console.error("[at_comfy/loras]", err);
}

app.registerExtension({
  name: EXTENSION_NAME,
  async setup() {
    app.extensionManager.registerSidebarTab({
      id: SIDEBAR_TAB_ID,
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

        const prev = vueAppBySidebarContainer.get(el);
        if (prev) {
          try {
            prev.unmount();
          } catch (unmountErr) {
            console.error("[at_comfy/loras] previous app unmount failed", unmountErr);
          }
          vueAppBySidebarContainer.delete(el);
        }

        el.replaceChildren();
        /* Comfy’s tab body is often a flex child with min-height:0 — reinforce so inner overflow:auto works. */
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

        /** When % / flex heights don’t resolve on `el`, pin Vue root to the tab’s pixel height. */
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
              showAtLorasError(
                root,
                "AT Loras: bundle missing mount() export.",
                null,
              );
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
                if (vueApp && typeof vueApp.unmount === "function") {
                  vueApp.unmount();
                }
              } catch (e) {
                console.error("[at_comfy/loras] unmount after cancelled render", e);
              }
              return;
            }
            if (vueApp && typeof vueApp.unmount === "function") {
              vueAppBySidebarContainer.set(el, vueApp);
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
          const v = vueAppBySidebarContainer.get(el);
          if (v) {
            try {
              v.unmount();
            } catch (e) {
              console.error("[at_comfy/loras] sidebar cleanup unmount failed", e);
            }
            vueAppBySidebarContainer.delete(el);
          }
        };
      },
    });
  },
});
