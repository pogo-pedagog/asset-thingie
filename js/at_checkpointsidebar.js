/**
 * AssetThingie — AT Checkpoints sidebar tab (Vue bundle in ./dist/).
 * https://docs.comfy.org/custom-nodes/js/javascript_sidebar_tabs
 */
import { app } from "../../scripts/app.js";

const EXTENSION_NAME = "at.checkpoints";
const SIDEBAR_TAB_ID = "at-checkpoints";

const vueAppBySidebarContainer = new WeakMap();

function showAtCheckpointsError(root, message, err) {
  root.textContent = message;
  if (err) console.error("[at_comfy/checkpoints]", err);
}

app.registerExtension({
  name: EXTENSION_NAME,
  async setup() {
    app.extensionManager.registerSidebarTab({
      id: SIDEBAR_TAB_ID,
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

        const prev = vueAppBySidebarContainer.get(el);
        if (prev) {
          try {
            prev.unmount();
          } catch (unmountErr) {
            console.error("[at_comfy/checkpoints] previous app unmount failed", unmountErr);
          }
          vueAppBySidebarContainer.delete(el);
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
              showAtCheckpointsError(
                root,
                "AT Checkpoints: bundle missing mount() export.",
                null,
              );
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
                if (vueApp && typeof vueApp.unmount === "function") {
                  vueApp.unmount();
                }
              } catch (e) {
                console.error("[at_comfy/checkpoints] unmount after cancelled render", e);
              }
              return;
            }
            if (vueApp && typeof vueApp.unmount === "function") {
              vueAppBySidebarContainer.set(el, vueApp);
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
          const v = vueAppBySidebarContainer.get(el);
          if (v) {
            try {
              v.unmount();
            } catch (e) {
              console.error("[at_comfy/checkpoints] sidebar cleanup unmount failed", e);
            }
            vueAppBySidebarContainer.delete(el);
          }
        };
      },
    });
  },
});
