/**
 * Canvas-native AT LoraLoader UI (LiteGraph draw/computeSize, rgthree-style hit areas).
 * Patterns adapted from ref/rgthree-comfy (utils_widgets.js, utils_canvas.js, power_lora_loader.js).
 */
import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

const NODE_CLASS = "ATLoraLoader";

/* ─── Canvas helpers (from rgthree utils_canvas.js, inlined to avoid extension dependency) ─── */

function binarySearch(max, getValue, match) {
  let min = 0;
  while (min <= max) {
    const guess = Math.floor((min + max) / 2);
    const compareVal = getValue(guess);
    if (compareVal === match) return guess;
    if (compareVal < match) min = guess + 1;
    else max = guess - 1;
  }
  return max;
}

function measureText(ctx, str) {
  return ctx.measureText(str).width;
}

export function fitString(ctx, str, maxWidth) {
  let width = ctx.measureText(str).width;
  const ellipsis = "…";
  const ellipsisWidth = measureText(ctx, ellipsis);
  if (width <= maxWidth || width <= ellipsisWidth) return str;
  const index = binarySearch(str.length, (g) => measureText(ctx, str.substring(0, g)), maxWidth - ellipsisWidth);
  return str.substring(0, index) + ellipsis;
}

function isLowQuality() {
  const sc = app.canvas?.ds?.scale || 1;
  return sc <= 0.5;
}

function drawRoundedRectangle(ctx, options) {
  const lowQuality = isLowQuality();
  const o = { ...options };
  ctx.save();
  ctx.strokeStyle = o.colorStroke || LiteGraph.WIDGET_OUTLINE_COLOR;
  ctx.fillStyle = o.colorBackground || LiteGraph.WIDGET_BGCOLOR;
  ctx.beginPath();
  ctx.roundRect(
    ...o.pos,
    ...o.size,
    lowQuality ? [0] : o.borderRadius ? [o.borderRadius] : [o.size[1] * 0.5],
  );
  ctx.fill();
  if (!lowQuality) ctx.stroke();
  ctx.restore();
}

function drawNumberWidgetPart(ctx, options) {
  const arrowWidth = 9;
  const arrowHeight = 10;
  const innerMargin = 3;
  const numberWidth = 32;
  const xBoundsArrowLess = [0, 0];
  const xBoundsNumber = [0, 0];
  const xBoundsArrowMore = [0, 0];
  ctx.save();
  let posX = options.posX;
  const { posY, height, value, textColor } = options;
  const midY = posY + height / 2;
  const arrowFill = textColor || LiteGraph.WIDGET_TEXT_COLOR;
  if (options.direction === -1) {
    posX = posX - arrowWidth - innerMargin - numberWidth - innerMargin - arrowWidth;
  }
  ctx.fillStyle = arrowFill;
  ctx.fill(new Path2D(`M ${posX} ${midY} l ${arrowWidth} ${arrowHeight / 2} l 0 -${arrowHeight} L ${posX} ${midY} z`));
  xBoundsArrowLess[0] = posX;
  xBoundsArrowLess[1] = arrowWidth;
  posX += arrowWidth + innerMargin;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const oldTc = ctx.fillStyle;
  if (textColor) ctx.fillStyle = textColor;
  ctx.fillText(fitString(ctx, Number(value).toFixed(2), numberWidth), posX + numberWidth / 2, midY);
  ctx.fillStyle = oldTc;
  xBoundsNumber[0] = posX;
  xBoundsNumber[1] = numberWidth;
  posX += numberWidth + innerMargin;
  ctx.fill(new Path2D(`M ${posX} ${midY - arrowHeight / 2} l ${arrowWidth} ${arrowHeight / 2} l -${arrowWidth} ${arrowHeight / 2} v -${arrowHeight} z`));
  xBoundsArrowMore[0] = posX;
  xBoundsArrowMore[1] = arrowWidth;
  ctx.restore();
  return [xBoundsArrowLess, xBoundsNumber, xBoundsArrowMore];
}
drawNumberWidgetPart.WIDTH_TOTAL = 9 + 3 + 32 + 3 + 9;

function drawTogglePart(ctx, options) {
  const lowQuality = isLowQuality();
  ctx.save();
  const { posX, posY, height, value } = options;
  const toggleRadius = height * 0.36;
  const toggleBgWidth = height * 1.5;
  if (!lowQuality) {
    ctx.beginPath();
    ctx.roundRect(posX + 4, posY + 4, toggleBgWidth - 8, height - 8, [height * 0.5]);
    ctx.globalAlpha = app.canvas.editor_alpha * 0.25;
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fill();
    ctx.globalAlpha = app.canvas.editor_alpha;
  }
  ctx.fillStyle = value === true ? "#89B" : "#888";
  const toggleX =
    lowQuality || value === false
      ? posX + height * 0.5
      : value === true
        ? posX + height
        : posX + height * 0.75;
  ctx.beginPath();
  ctx.arc(toggleX, posY + height * 0.5, toggleRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  return [posX, toggleBgWidth];
}

function drawWidgetButton(ctx, options, text, isMouseDownedAndOver) {
  const borderRadius = isLowQuality() ? 0 : options.borderRadius ?? 4;
  ctx.save();
  if (!isLowQuality() && !isMouseDownedAndOver) {
    drawRoundedRectangle(ctx, {
      size: [options.size[0] - 2, options.size[1]],
      pos: [options.pos[0] + 1, options.pos[1] + 1],
      borderRadius,
      colorBackground: "#000000aa",
      colorStroke: "#000000aa",
    });
  }
  drawRoundedRectangle(ctx, {
    size: options.size,
    pos: [options.pos[0], options.pos[1] + (isMouseDownedAndOver ? 1 : 0)],
    borderRadius,
    colorBackground: isMouseDownedAndOver ? "#444" : LiteGraph.WIDGET_BGCOLOR,
    colorStroke: "transparent",
  });
  if (!isLowQuality() && text) {
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = LiteGraph.WIDGET_TEXT_COLOR;
    ctx.fillText(text, options.pos[0] + options.size[0] / 2, options.pos[1] + options.size[1] / 2 + (isMouseDownedAndOver ? 1 : 0));
  }
  ctx.restore();
}

/* ─── Base widget (from rgthree utils_widgets.js) ─── */

class AtBaseWidget {
  constructor(name) {
    this.type = "custom";
    this.options = { serialize: false };
    this.y = 0;
    this.last_y = 0;
    this.mouseDowned = null;
    this.isMouseDownedAndOver = false;
    this.hitAreas = {};
    this.downedHitAreasForMove = [];
    this.downedHitAreasForClick = [];
    this.name = name;
  }

  clickWasWithinBounds(pos, bounds) {
    let xStart = bounds[0];
    let xEnd = xStart + (bounds.length > 2 ? bounds[2] : bounds[1]);
    const clickedX = pos[0] >= xStart && pos[0] <= xEnd;
    if (bounds.length === 2) return clickedX;
    return clickedX && pos[1] >= bounds[1] && pos[1] <= bounds[1] + bounds[3];
  }

  mouse(event, pos, node) {
    const canvas = app.canvas;
    if (event.type === "pointerdown") {
      this.mouseDowned = [...pos];
      this.isMouseDownedAndOver = true;
      this.downedHitAreasForMove.length = 0;
      this.downedHitAreasForClick.length = 0;
      let anyHandled = false;
      for (const part of Object.values(this.hitAreas)) {
        if (this.clickWasWithinBounds(pos, part.bounds)) {
          if (part.onMove) this.downedHitAreasForMove.push(part);
          if (part.onClick) this.downedHitAreasForClick.push(part);
          if (part.onDown) {
            const h = part.onDown.apply(this, [event, pos, node, part]);
            anyHandled = anyHandled || h === true;
          }
          part.wasMouseClickedAndIsOver = true;
        }
      }
      return this.onMouseDown?.(event, pos, node) ?? anyHandled;
    }
    if (event.type === "pointerup") {
      if (!this.mouseDowned) return true;
      this.downedHitAreasForMove.length = 0;
      const wasOver = this.isMouseDownedAndOver;
      this.cancelMouseDown();
      let anyHandled = false;
      for (const part of Object.values(this.hitAreas)) {
        if (part.onUp && this.clickWasWithinBounds(pos, part.bounds)) {
          const h = part.onUp.apply(this, [event, pos, node, part]);
          anyHandled = anyHandled || h === true;
        }
        part.wasMouseClickedAndIsOver = false;
      }
      for (const part of this.downedHitAreasForClick) {
        if (this.clickWasWithinBounds(pos, part.bounds)) {
          const h = part.onClick.apply(this, [event, pos, node, part]);
          anyHandled = anyHandled || h === true;
        }
      }
      this.downedHitAreasForClick.length = 0;
      if (wasOver) {
        const h = this.onMouseClick?.(event, pos, node);
        anyHandled = anyHandled || h === true;
      }
      return this.onMouseUp?.(event, pos, node) ?? anyHandled;
    }
    if (event.type === "pointermove") {
      this.isMouseDownedAndOver = !!this.mouseDowned;
      if (
        this.mouseDowned &&
        (pos[0] < 15 ||
          pos[0] > node.size[0] - 15 ||
          pos[1] < this.last_y ||
          pos[1] > this.last_y + LiteGraph.NODE_WIDGET_HEIGHT)
      ) {
        this.isMouseDownedAndOver = false;
      }
      for (const part of Object.values(this.hitAreas)) {
        if (this.downedHitAreasForMove.includes(part)) part.onMove.apply(this, [event, pos, node, part]);
        if (this.downedHitAreasForClick.includes(part)) {
          part.wasMouseClickedAndIsOver = this.clickWasWithinBounds(pos, part.bounds);
        }
      }
      return this.onMouseMove?.(event, pos, node) ?? true;
    }
    return false;
  }

  cancelMouseDown() {
    this.mouseDowned = null;
    this.isMouseDownedAndOver = false;
    this.downedHitAreasForMove.length = 0;
  }
}

class AtDividerWidget extends AtBaseWidget {
  constructor(opts) {
    super("at_divider");
    this.value = {};
    this.options = { serialize: false };
    this.widgetOptions = { marginTop: 4, marginBottom: 4, marginLeft: 15, marginRight: 15, color: LiteGraph.WIDGET_OUTLINE_COLOR, thickness: 0 };
    Object.assign(this.widgetOptions, opts || {});
  }
  draw() {}
  computeSize(width) {
    return [width, this.widgetOptions.marginTop + this.widgetOptions.marginBottom + this.widgetOptions.thickness];
  }
}

class AtStatusWidget extends AtBaseWidget {
  constructor(getText, getErr) {
    super("at_status");
    this.getText = getText;
    this.getErr = getErr;
    this.options = { serialize: false };
  }
  draw(ctx, node, width, posY, height) {
    ctx.save();
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.getErr() ? "#f66" : LiteGraph.WIDGET_SECONDARY_TEXT_COLOR;
    const t = fitString(ctx, this.getText() || "", width - 30);
    ctx.fillText(t, 15, posY + height / 2);
    ctx.restore();
  }
  computeSize(width) {
    return [width, 18];
  }
}

class AtButtonWidget extends AtBaseWidget {
  constructor(name, label, onClick) {
    super(name);
    this.label = label || name;
    this._onClick = onClick;
  }
  computeSize(width) {
    return [width, LiteGraph.NODE_WIDGET_HEIGHT];
  }
  draw(ctx, node, width, y, height) {
    drawWidgetButton(ctx, { size: [width - 30, height], pos: [15, y] }, this.label, this.isMouseDownedAndOver);
  }
  onMouseClick() {
    return this._onClick() === true;
  }
}

/** Row above slots: toggle all on/off + M / C column labels. */
class AtToggleAllHeaderWidget extends AtBaseWidget {
  constructor(node, onChange) {
    super("at_toggle_all_header");
    this.node = node;
    this.onChange = onChange;
    this.hitAreas = {
      toggle: { bounds: [0, 0], onDown: this.onToggleDown },
    };
  }
  computeSize(width) {
    return [width, LiteGraph.NODE_WIDGET_HEIGHT];
  }
  draw(ctx, node, w, y, height) {
    const margin = 10;
    const H = LiteGraph.NODE_WIDGET_HEIGHT;
    const innerMargin = margin * 0.33;
    let posX = margin;
    this.hitAreas.toggle.bounds = drawTogglePart(ctx, {
      posX,
      posY: y,
      height: H,
      value: this._majorityOn(),
    });
    posX += this.hitAreas.toggle.bounds[1] + innerMargin * 2;
    ctx.save();
    ctx.fillStyle = LiteGraph.WIDGET_TEXT_COLOR;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Toggle all", posX, y + H * 0.5);
    let rposX = node.size[0] - margin - innerMargin * 2;
    const colW = drawNumberWidgetPart.WIDTH_TOTAL;
    rposX -= colW;
    ctx.textAlign = "center";
    ctx.font = `${Math.max(10, LiteGraph.NODE_SUBTEXT_SIZE || 12)}px Arial`;
    ctx.fillStyle = LiteGraph.WIDGET_SECONDARY_TEXT_COLOR;
    ctx.fillText("M", rposX + colW / 2, y + H * 0.5);
    rposX -= innerMargin * 2 + colW;
    ctx.fillText("C", rposX + colW / 2, y + H * 0.5);
    ctx.restore();
  }
  _slots() {
    return (this.node.widgets || []).filter((x) => x.atIsSlot);
  }
  _majorityOn() {
    const slots = this._slots();
    if (!slots.length) return true;
    let on = 0;
    for (const s of slots) {
      if (s.value?.enabled !== false) on++;
    }
    return on * 2 >= slots.length;
  }
  onToggleDown() {
    const slots = this._slots();
    if (!slots.length) {
      this.cancelMouseDown();
      return true;
    }
    let on = 0;
    for (const s of slots) {
      if (s.value?.enabled !== false) on++;
    }
    const turnOn = on * 2 < slots.length;
    for (const s of slots) {
      s.value.enabled = turnOn;
    }
    this.cancelMouseDown();
    this.onChange();
    return true;
  }
}

/* ─── Shared API helpers ─── */

const LORA_DISPLAY_ROOT_SEGMENTS = new Set(["loras", "lora", "lycoris"]);

export function normPath(p) {
  return String(p ?? "")
    .trim()
    .replace(/\\/g, "/");
}

function loraDisplayLabel(fullPath) {
  const p = normPath(fullPath);
  if (!p) return "";
  const parts = p.split("/").filter(Boolean);
  if (parts.length > 1 && LORA_DISPLAY_ROOT_SEGMENTS.has(parts[0].toLowerCase())) {
    return parts.slice(1).join("/");
  }
  return p;
}

function _parseJsonResponseBody(text, source) {
  const raw = String(text ?? "");
  if (!raw.trim()) throw new Error(`${source}: empty body`);
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`${source}: invalid JSON — ${raw.slice(0, 200)}`);
  }
}

async function fetchLoraNames() {
  const r = await api.fetchApi("/object_info", { cache: "no-store" });
  const text = await r.text();
  if (!r.ok) throw new Error(`object_info: HTTP ${r.status}`);
  const j = _parseJsonResponseBody(text, "object_info");
  const tryKeys = ["LoraLoader", "LoraLoaderModelOnly", "LoadLora"];
  for (const k of tryKeys) {
    const spec = j[k]?.input?.required?.lora_name;
    if (!spec) continue;
    const list = Array.isArray(spec[0]) ? spec[0] : spec;
    if (Array.isArray(list) && list.length) return list.slice();
  }
  for (const [k, v] of Object.entries(j)) {
    const spec = v?.input?.required?.lora_name;
    if (!spec || !/lora/i.test(k)) continue;
    const list = Array.isArray(spec[0]) ? spec[0] : spec;
    if (Array.isArray(list) && list.length) return list.slice();
  }
  return [];
}

function showLoraMenu(event, loras, callback) {
  const canvas = app.canvas;
  const list = ["", ...loras.map((f) => String(f))];
  new LiteGraph.ContextMenu(list, {
    event,
    title: "LoRA",
    scale: Math.max(1, canvas.ds?.scale || 1),
    className: "dark",
    callback,
  });
}

/* ─── Slot row (Power Lora–style) ─── */

class AtSlotRowWidget extends AtBaseWidget {
  constructor(name, node, onChange) {
    super(name);
    this.node = node;
    this.onChange = onChange;
    this.haveMouseMovedStrength = false;
    this._lmDragLastSmX = null;
    this._lmDragLastScX = null;
    this.showModelAndClip = true;
    this._value = {
      enabled: true,
      lora_name: "",
      strength_model: 1,
      strength_clip: 1,
      preferred_trigger_phrase: undefined,
      trigger_words: [],
    };
    this.hitAreas = {
      toggle: { bounds: [0, 0], onDown: this.onToggleDown },
      remove: { bounds: [0, 0, 0, 0], onClick: this.onRemoveClick },
      lora: { bounds: [0, 0], onClick: this.onLoraClick },
      smDec: { bounds: [0, 0], onClick: this.onSmDec },
      smVal: { bounds: [0, 0], onClick: this.onSmVal },
      smInc: { bounds: [0, 0], onClick: this.onSmInc },
      smAny: { bounds: [0, 0], onMove: this.onSmMove },
      scDec: { bounds: [0, 0], onClick: this.onScDec },
      scVal: { bounds: [0, 0], onClick: this.onScVal },
      scInc: { bounds: [0, 0], onClick: this.onScInc },
      scAny: { bounds: [0, 0], onMove: this.onScMove },
    };
  }

  get value() {
    return this._value;
  }
  set value(v) {
    this._value =
      v && typeof v === "object"
        ? {
            enabled: v.enabled !== false,
            lora_name: String(v.lora_name || ""),
            strength_model: Number.isFinite(Number(v.strength_model)) ? Number(v.strength_model) : 1,
            strength_clip: Number.isFinite(Number(v.strength_clip)) ? Number(v.strength_clip) : 1,
            preferred_trigger_phrase: v.preferred_trigger_phrase,
            trigger_words: Array.isArray(v.trigger_words) ? v.trigger_words.slice() : [],
          }
        : {
            enabled: true,
            lora_name: "",
            strength_model: 1,
            strength_clip: 1,
            preferred_trigger_phrase: undefined,
            trigger_words: [],
          };
  }

  computeSize(width) {
    return [width, LiteGraph.NODE_WIDGET_HEIGHT];
  }

  draw(ctx, node, w, y, widgetHeight) {
    const margin = 10;
    const innerMargin = margin * 0.33;
    const lowQuality = isLowQuality();
    const H = LiteGraph.NODE_WIDGET_HEIGHT;

    drawRoundedRectangle(ctx, { pos: [margin, y], size: [node.size[0] - margin * 2, widgetHeight] });

    let posX = margin;
    this.hitAreas.toggle.bounds = drawTogglePart(ctx, { posX, posY: y, height: H, value: this.value.enabled });
    posX += this.hitAreas.toggle.bounds[1] + innerMargin;

    const rmW = 14;
    this.hitAreas.remove.bounds = [posX, y, rmW, H];
    if (!lowQuality) {
      ctx.save();
      ctx.fillStyle = this.value.enabled ? LiteGraph.WIDGET_TEXT_COLOR : LiteGraph.WIDGET_SECONDARY_TEXT_COLOR;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("×", posX + rmW / 2, y + H / 2);
      ctx.restore();
    }
    posX += rmW + innerMargin;

    ctx.save();
    if (!this.value.enabled) ctx.globalAlpha = app.canvas.editor_alpha * 0.4;
    ctx.fillStyle = LiteGraph.WIDGET_TEXT_COLOR;

    let rposX = node.size[0] - margin - innerMargin * 2;
    const scVal = Number(this.value.strength_clip ?? 1);
    const [scL, scT, scR] = drawNumberWidgetPart(ctx, {
      posX: rposX,
      posY: y,
      height: H,
      value: scVal,
      direction: -1,
    });
    this.hitAreas.scDec.bounds = scL;
    this.hitAreas.scVal.bounds = scT;
    this.hitAreas.scInc.bounds = scR;
    this.hitAreas.scAny.bounds = [scL[0], scR[0] + scR[1] - scL[0]];
    rposX = scL[0] - innerMargin * 2;
    const smVal_ = Number(this.value.strength_model ?? 1);
    const [smL, smT, smR] = drawNumberWidgetPart(ctx, {
      posX: rposX,
      posY: y,
      height: H,
      value: smVal_,
      direction: -1,
    });
    this.hitAreas.smDec.bounds = smL;
    this.hitAreas.smVal.bounds = smT;
    this.hitAreas.smInc.bounds = smR;
    this.hitAreas.smAny.bounds = [smL[0], smR[0] + smR[1] - smL[0]];
    rposX = smL[0] - innerMargin;

    const loraWidth = Math.max(24, rposX - posX - innerMargin);
    const label = this.value.lora_name ? loraDisplayLabel(this.value.lora_name) : "— LoRA —";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = LiteGraph.WIDGET_TEXT_COLOR;
    ctx.fillText(fitString(ctx, label, loraWidth), posX, y + H * 0.5);
    this.hitAreas.lora.bounds = [posX, loraWidth];
    ctx.restore();
  }

  onToggleDown() {
    this.value.enabled = !this.value.enabled;
    this.cancelMouseDown();
    this.onChange();
    return true;
  }

  onRemoveClick() {
    const slots = this.node.widgets.filter((x) => x.atIsSlot);
    if (slots.length <= 1) {
      this.value = {
        enabled: true,
        lora_name: "",
        strength_model: 1,
        strength_clip: 1,
        preferred_trigger_phrase: undefined,
        trigger_words: [],
      };
      this.onChange();
      return true;
    }
    this.node.widgets = this.node.widgets.filter((x) => x !== this);
    this.onChange();
    return true;
  }

  onLoraClick(event) {
    const loras = this.node.atState?.loras || [];
    showLoraMenu(event, loras, (v) => {
      if (typeof v === "string") {
        this.value.lora_name = v;
        this.value.preferred_trigger_phrase = undefined;
        this.value.trigger_words = [];
        this.onChange();
      }
      this.node.graph?.setDirtyCanvas(true, true);
    });
    this.cancelMouseDown();
  }

  stepStrength(delta, clip) {
    const key = clip ? "strength_clip" : "strength_model";
    const cur = Number(this.value[key] ?? 1);
    this.value[key] = Math.round((cur + delta * 0.05) * 100) / 100;
    this.onChange();
  }

  onSmDec() {
    this.stepStrength(-1, false);
  }
  onSmInc() {
    this.stepStrength(1, false);
  }
  onScDec() {
    this.stepStrength(-1, true);
  }
  onScInc() {
    this.stepStrength(1, true);
  }

  onSmMove(_event, pos) {
    if (this._lmDragLastSmX == null) {
      this._lmDragLastSmX = pos[0];
      return;
    }
    const dx = pos[0] - this._lmDragLastSmX;
    if (dx === 0) return;
    this._lmDragLastSmX = pos[0];
    this.haveMouseMovedStrength = true;
    this.value.strength_model =
      Math.round((Number(this.value.strength_model ?? 1) + dx * 0.05) * 100) / 100;
    this.onChange();
  }
  onScMove(_event, pos) {
    if (this._lmDragLastScX == null) {
      this._lmDragLastScX = pos[0];
      return;
    }
    const dx = pos[0] - this._lmDragLastScX;
    if (dx === 0) return;
    this._lmDragLastScX = pos[0];
    this.haveMouseMovedStrength = true;
    this.value.strength_clip =
      Math.round((Number(this.value.strength_clip ?? 1) + dx * 0.05) * 100) / 100;
    this.onChange();
  }

  onSmVal(event) {
    if (this.haveMouseMovedStrength) return;
    app.canvas.prompt("model strength", String(this.value.strength_model ?? 1), (v) => {
      const n = Number(v);
      if (Number.isFinite(n)) {
        this.value.strength_model = n;
        this.onChange();
      }
    }, event);
  }
  onScVal(event) {
    if (this.haveMouseMovedStrength) return;
    app.canvas.prompt("clip strength", String(this.value.strength_clip ?? 1), (v) => {
      const n = Number(v);
      if (Number.isFinite(n)) {
        this.value.strength_clip = n;
        this.onChange();
      }
    }, event);
  }

  onMouseUp(event, pos, node) {
    const superHandled = super.onMouseUp?.(event, pos, node) === true;
    const didStrengthDrag =
      this.haveMouseMovedStrength ||
      this._lmDragLastSmX != null ||
      this._lmDragLastScX != null;
    this.haveMouseMovedStrength = false;
    this._lmDragLastSmX = null;
    this._lmDragLastScX = null;
    if (superHandled || didStrengthDrag) return true;
    return undefined;
  }
}

/* ─── Node wiring ─── */

function insertWidgetBefore(node, widget, beforeWidget) {
  const list = node.widgets || [];
  node.widgets = list.filter((w) => w !== widget);
  let idx = beforeWidget != null ? node.widgets.indexOf(beforeWidget) : -1;
  if (idx < 0 && beforeWidget != null) {
    const sw = node.widgets.find((w) => w.name === "stack_snapshot");
    if (sw) idx = node.widgets.indexOf(sw);
  }
  if (idx < 0) idx = node.widgets.length;
  node.widgets.splice(idx, 0, widget);
}

/** Header row → slots → footer → stack_snapshot. Merge trailing slots. */
function normalizeAtWidgetOrder(node, stackW) {
  const list = node.widgets || [];
  if (!stackW) return;
  const si = list.indexOf(stackW);
  if (si < 0) return;

  const before = list.slice(0, si);
  const trailing = list.slice(si + 1);

  const rest = [];
  const header = [];
  const slots = [];
  const footer = [];
  for (const w of before) {
    if (!w || w === stackW) continue;
    if (w.atIsSlot) slots.push(w);
    else if (w.atManaged && w.atStackHeader) header.push(w);
    else if (w.atManaged) footer.push(w);
    else rest.push(w);
  }
  for (const w of trailing) {
    if (w?.atIsSlot) slots.push(w);
  }

  const trailRest = trailing.filter((w) => w && !w.atIsSlot);
  node.widgets = [...rest, ...header, ...slots, ...footer, stackW, ...trailRest];
}

function collapseStackSnapshotForNative(stackW) {
  stackW.type = "custom";
  stackW.draw = () => {};
  stackW.computeSize = (width) => [width, 0];
  stackW.options = stackW.options || {};
  try {
    stackW.hidden = true;
  } catch {
    /* ignore */
  }
  const hideEl = (el) => {
    if (el && el.style) {
      el.style.display = "none";
      el.style.minHeight = "0";
      el.style.height = "0";
      el.style.padding = "0";
      el.style.margin = "0";
      el.style.overflow = "hidden";
    }
  };
  hideEl(stackW.element);
  hideEl(stackW.inputEl);
}

function syncStackFromSlots(node, stackW) {
  const entries = [];
  for (const w of node.widgets || []) {
    if (!w.atIsSlot) continue;
    const v = w.value;
    const name = normPath(v.lora_name);
    if (!name) continue;
    const e = { lora_name: name, strength_model: v.strength_model, strength_clip: v.strength_clip };
    if (v.preferred_trigger_phrase) e.preferred_trigger_phrase = v.preferred_trigger_phrase;
    if (v.trigger_words?.length) e.trigger_words = v.trigger_words.slice();
    if (v.enabled === false) e.enabled = false;
    entries.push(e);
  }
  const json = JSON.stringify(entries);
  stackW.value = json;
  if (typeof stackW.callback === "function") stackW.callback(json);
}

function stripManagedWidgets(node, stackW) {
  node.widgets = (node.widgets || []).filter((w) => w === stackW || !w.atManaged);
}

function resizeNode(node) {
  try {
    if (typeof node.setSize === "function" && typeof node.computeSize === "function") {
      const sz = node.computeSize();
      if (Array.isArray(node.size) || node.size instanceof Float32Array) {
        node.size[0] = Math.max(node.size[0], sz[0]);
        node.size[1] = Math.max(node.size[1], sz[1]);
      }
    }
  } catch {
    /* ignore */
  }
  node.graph?.setDirtyCanvas(true, true);
}

function ensureATLoraLoaderMap() {
  if (typeof window === "undefined") return null;
  if (!window.__atLoraLoaderNodes) window.__atLoraLoaderNodes = new Map();
  return window.__atLoraLoaderNodes;
}

/** Drop map entries for nodes no longer on the graph (load/undo replace ids; onRemoved can miss). */
function pruneStaleATLoraLoaderMapEntries() {
  const m = ensureATLoraLoaderMap();
  if (!m || !app.graph?._nodes) return;
  const live = new Set();
  for (const x of app.graph._nodes) {
    if (x && (x.comfyClass === NODE_CLASS || x.type === NODE_CLASS)) live.add(x.id);
  }
  for (const id of [...m.keys()]) {
    if (!live.has(id)) m.delete(id);
  }
}

export function bindATLoraLoaderNode(node) {
  if (node.atLoraUiReady) return;
  const stackW = node.widgets?.find((w) => w.name === "stack_snapshot");
  if (!stackW) return;

  node.atLoraUiReady = true;
  collapseStackSnapshotForNative(stackW);

  const state = {
    loras: [],
    slotCounter: 0,
    statusText: "",
    statusErr: false,
  };
  node.atState = state;

  const setStatus = (text, err) => {
    state.statusText = text;
    state.statusErr = !!err;
    node.graph?.setDirtyCanvas(true, true);
  };

  function existingLoraNames() {
    const s = new Set();
    for (const w of node.widgets || []) {
      if (!w.atIsSlot) continue;
      const n = normPath(w.value.lora_name);
      if (n) s.add(n);
    }
    return s;
  }

  function pushSharedMap() {
    pruneStaleATLoraLoaderMapEntries();
    const m = ensureATLoraLoaderMap();
    if (!m) return;
    m.set(node.id, {
      nodeId: node.id,
      title: node.title,
      loraNames: existingLoraNames(),
    });
  }

  const onStackChange = () => {
    normalizeAtWidgetOrder(node, stackW);
    syncStackFromSlots(node, stackW);
    resizeNode(node);
    pushSharedMap();
  };

  function slotInsertAnchor() {
    return node.atFooterAnchor || stackW;
  }

  function addSlotFromItem(item) {
    state.slotCounter += 1;
    const slot = new AtSlotRowWidget(`at_slot_${state.slotCounter}`, node, onStackChange);
    slot.atManaged = true;
    slot.atIsSlot = true;
    if (item) {
      slot.value = {
        lora_name: item.lora_name,
        strength_model: item.strength_model,
        strength_clip: item.strength_clip,
        preferred_trigger_phrase: item.preferred_trigger_phrase,
        trigger_words: item.trigger_words,
        enabled: item.enabled !== false,
      };
    }
    node.addCustomWidget(slot);
    insertWidgetBefore(node, slot, slotInsertAnchor());
  }

  function addToggleHeader() {
    const tw = new AtToggleAllHeaderWidget(node, onStackChange);
    tw.atManaged = true;
    tw.atStackHeader = true;
    node.addCustomWidget(tw);
    insertWidgetBefore(node, tw, stackW);
  }

  function addFooter() {
    const d = new AtDividerWidget({ marginTop: 6, marginBottom: 2, thickness: 0 });
    d.atManaged = true;
    node.addCustomWidget(d);
    insertWidgetBefore(node, d, stackW);
    node.atFooterAnchor = d;

    const bSlot = new AtButtonWidget("at_add_slot_btn", "+ Slot", () => {
      addSlotFromItem(null);
      onStackChange();
      return true;
    });
    bSlot.atManaged = true;
    node.addCustomWidget(bSlot);
    insertWidgetBefore(node, bSlot, stackW);

    const st = new AtStatusWidget(
      () => state.statusText,
      () => state.statusErr,
    );
    st.atManaged = true;
    node.atStatusWidget = st;
    node.addCustomWidget(st);
    insertWidgetBefore(node, st, stackW);
  }

  function rebuildFromEntries(entries) {
    stripManagedWidgets(node, stackW);
    addToggleHeader();
    if (!Array.isArray(entries) || entries.length === 0) {
      addSlotFromItem(null);
    } else {
      for (const e of entries) {
        if (!e || typeof e !== "object") continue;
        addSlotFromItem({
          lora_name: e.lora_name,
          strength_model: e.strength_model,
          strength_clip: e.strength_clip,
          preferred_trigger_phrase: e.preferred_trigger_phrase,
          trigger_words: e.trigger_words,
          enabled: e.enabled,
        });
      }
    }
    addFooter();
    onStackChange();
  }

  function onAddToStackEvent(e) {
    const d = e.detail;
    if (!d || d.targetNodeId !== node.id) return;
    const exist = existingLoraNames();
    const n = normPath(d.lora_name);
    if (!n) {
      setStatus("Missing lora name", true);
      return;
    }
    if (exist.has(n)) {
      setStatus("Already in stack", false);
      return;
    }
    addSlotFromItem({
      lora_name: d.lora_name,
      strength_model: d.strength_model ?? 1,
      strength_clip: d.strength_clip ?? d.strength_model ?? 1,
      trigger_words: Array.isArray(d.trigger_words) ? d.trigger_words : [],
      enabled: true,
    });
    if (!node.atFooterAnchor) addFooter();
    onStackChange();
    const label = d.display_name || d.lora_name || "";
    setStatus(`Added: ${label}`, false);
  }

  window.addEventListener("at:add-to-stack", onAddToStackEvent);
  node.atOnAddToStack = onAddToStackEvent;

  node.atDeserialize = () => {
    collapseStackSnapshotForNative(stackW);
    let entries = [];
    try {
      const raw = String(stackW?.value ?? "[]").trim();
      if (raw) entries = JSON.parse(raw);
    } catch {
      entries = [];
    }
    if (!Array.isArray(entries)) entries = [];
    rebuildFromEntries(entries);
  };

  const prevOnRemoved = node.onRemoved;
  node.onRemoved = function (...args) {
    const m = ensureATLoraLoaderMap();
    if (m) m.delete(node.id);
    if (node.atOnAddToStack) {
      window.removeEventListener("at:add-to-stack", node.atOnAddToStack);
      node.atOnAddToStack = undefined;
    }
    node.atScheduleDomHeightSync = undefined;
    return prevOnRemoved?.apply(this, args);
  };

  node.atDeserialize();
  void fetchLoraNames()
    .then((l) => {
      state.loras = l;
      setStatus(`${l.length} LoRA(s) in Comfy`, false);
    })
    .catch((err) => {
      setStatus(`LoRA list: ${err?.message || err}`, true);
    })
    .finally(() => {
      onStackChange();
    });
}

let canvasDropInstalled = false;

/** HTML5 drop from AT sidebar onto ATLoraLoader nodes. */
export function initAtCanvasLoraDrop() {
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
  canvasEl.addEventListener("dragover", (e) => {
    if (!e.dataTransfer?.types?.includes("application/x-at-lora")) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    const c = app.canvas;
    if (!c?.convertEventToCanvasOffset || !app.graph?.getNodeOnPos) return;
    const [gx, gy] = c.convertEventToCanvasOffset(e);
    const n = app.graph.getNodeOnPos(gx, gy);
    const ok = n && (n.comfyClass === NODE_CLASS || n.type === NODE_CLASS);
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
    if (!e.dataTransfer?.types?.includes("application/x-at-lora")) return;
    e.preventDefault();
    const c = app.canvas;
    const [gx, gy] = c.convertEventToCanvasOffset(e);
    const n = app.graph.getNodeOnPos(gx, gy);
    if (!n || (n.comfyClass !== NODE_CLASS && n.type !== NODE_CLASS)) return;
    let data;
    try {
      data = JSON.parse(e.dataTransfer.getData("application/x-at-lora"));
    } catch {
      return;
    }
    window.dispatchEvent(
      new CustomEvent("at:add-to-stack", {
        detail: { targetNodeId: n.id, ...data },
      }),
    );
  });
}

export const EXT_NAME = "at_loraloader.stack_ui";

export function registerATLoraLoaderUiExtension() {
  app.registerExtension({
    name: EXT_NAME,
    async beforeRegisterNodeDef(nodeType, _nodeData, _app) {
      if (nodeType.comfyClass !== NODE_CLASS) return;
      const orig = nodeType.prototype.onConfigure;
      nodeType.prototype.onConfigure = function () {
        const ret = orig ? orig.apply(this, arguments) : undefined;
        if (this.atDeserialize) queueMicrotask(() => this.atDeserialize());
        return ret;
      };
    },
    async setup() {
      initAtCanvasLoraDrop();
    },
    async nodeCreated(node) {
      const ours = node.comfyClass === NODE_CLASS || node.type === NODE_CLASS;
      if (!ours) return;
      const defaultTitle = "AT LoraLoader";
      try {
        const graph = node.graph || app.graph;
        const nodes = graph?._nodes || [];
        const others = nodes.filter(
          (x) => x && x !== node && (x.comfyClass === NODE_CLASS || x.type === NODE_CLASS),
        );
        const idx = others.length + 1;
        if (!node.title || node.title === defaultTitle) {
          node.title = `LoraLoader #${idx}`;
        }
      } catch {
        /* ignore */
      }
      try {
        bindATLoraLoaderNode(node);
      } catch (e) {
        console.error("AT LoraLoader UI failed:", e);
      }
    },
  });
}
