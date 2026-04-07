/**
 * AssetThingie — canvas drop target for AT Checkpoint Loader (application/x-at-checkpoint).
 */
import { app } from "../../scripts/app.js";

const NODE_CLASS = "ATCheckpointLoader";
const STOCK_CHECKPOINT = "CheckpointLoaderSimple";
const MIME = "application/x-at-checkpoint";

let canvasDropInstalled = false;

function initCanvasCheckpointDrop() {
  if (canvasDropInstalled) return;
  canvasDropInstalled = true;
  const canvasEl = document.getElementById("graph-canvas");
  if (!canvasEl) return;

  let highlightNode = null;
  let prevColor = undefined;

  const clearHighlight = () => {
    if (highlightNode && prevColor !== undefined) {
      highlightNode.color = prevColor;
      highlightNode = null;
      prevColor = undefined;
      app.graph?.setDirtyCanvas(true, true);
    }
  };

  const isCheckpointTarget = (n) =>
    n &&
    (n.comfyClass === NODE_CLASS ||
      n.type === NODE_CLASS ||
      n.comfyClass === STOCK_CHECKPOINT ||
      n.type === STOCK_CHECKPOINT);

  canvasEl.addEventListener("dragover", (e) => {
    if (!e.dataTransfer?.types?.includes(MIME)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    const c = app.canvas;
    if (!c?.convertEventToCanvasOffset || !app.graph?.getNodeOnPos) return;
    const [gx, gy] = c.convertEventToCanvasOffset(e);
    const n = app.graph.getNodeOnPos(gx, gy);
    const ok = isCheckpointTarget(n);
    if (!ok) {
      clearHighlight();
      return;
    }
    if (highlightNode !== n) {
      clearHighlight();
      highlightNode = n;
      prevColor = n.color;
      n.color = "#3d6b4f";
      app.graph.setDirtyCanvas(true, true);
    }
  });

  canvasEl.addEventListener("dragleave", (e) => {
    if (!e.relatedTarget || !canvasEl.contains(e.relatedTarget)) clearHighlight();
  });

  canvasEl.addEventListener("drop", (e) => {
    clearHighlight();
    if (!e.dataTransfer?.types?.includes(MIME)) return;
    e.preventDefault();
    const c = app.canvas;
    if (!c?.convertEventToCanvasOffset || !app.graph?.getNodeOnPos) return;
    const [gx, gy] = c.convertEventToCanvasOffset(e);
    const n = app.graph.getNodeOnPos(gx, gy);
    if (!isCheckpointTarget(n)) return;

    let data;
    try {
      data = JSON.parse(e.dataTransfer.getData(MIME));
    } catch {
      return;
    }

    const ckptName = data?.comfy_checkpoint_name;
    if (!ckptName || typeof ckptName !== "string") return;

    const ckptWidget = n.widgets?.find((w) => w.name === "ckpt_name");
    if (ckptWidget) {
      ckptWidget.value = ckptName;
      ckptWidget.callback?.(ckptWidget.value);
    }

    const isOurs = n.comfyClass === NODE_CLASS || n.type === NODE_CLASS;
    if (isOurs) {
      const clipSkipWidget = n.widgets?.find((w) => w.name === "clip_skip");
      if (
        clipSkipWidget &&
        data.recommended_clip_skip != null &&
        typeof data.recommended_clip_skip === "number"
      ) {
        clipSkipWidget.value = data.recommended_clip_skip;
        clipSkipWidget.callback?.(clipSkipWidget.value);
      }
    }

    app.graph.setDirtyCanvas(true, true);
  });
}

app.registerExtension({
  name: "at.checkpointloader",
  async setup() {
    initCanvasCheckpointDrop();
  },
});
