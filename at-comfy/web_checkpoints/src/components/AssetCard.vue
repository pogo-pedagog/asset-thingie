<script setup lang="ts">
import { computed } from "vue";
import { resolveCoverSrc } from "../api";
import type { AssetItem } from "../types";
import { useAssetsStore } from "../stores/assets";
import { copyText } from "../composables/useClipboard";

const props = defineProps<{ item: AssetItem; compact?: boolean }>();

const store = useAssetsStore();

const coverSrc = computed(() => resolveCoverSrc(props.item.cover_url));

const coverPlaybackSrc = computed(() => resolveCoverSrc(props.item.cover_playback_url));

const coverIsVideo = computed(
  () => (props.item.cover_media_type || "").toLowerCase() === "video" && Boolean(coverPlaybackSrc.value),
);

function onMediaEnter(e: MouseEvent) {
  if (!coverIsVideo.value) return;
  const v = (e.currentTarget as HTMLElement | null)?.querySelector("video.at-card__vid");
  if (v instanceof HTMLVideoElement) void v.play().catch(() => {});
}

function onMediaLeave(e: MouseEvent) {
  if (!coverIsVideo.value) return;
  const v = (e.currentTarget as HTMLElement | null)?.querySelector("video.at-card__vid");
  if (v instanceof HTMLVideoElement) {
    v.pause();
    v.currentTime = 0;
  }
}

const triggersPreview = computed(() => {
  const tw = props.item.trigger_words || [];
  if (!tw.length) return "";
  const s = tw.slice(0, 3).join(", ");
  return tw.length > 3 ? `${s}…` : s;
});

const usageLine = computed(() => {
  const u = props.item.usage_count;
  const lu = props.item.last_used_at;
  if (!u && !lu) return "";
  const bits: string[] = [];
  if (u) bits.push(`uses: ${u}`);
  if (lu) bits.push(lu.replace("T", " ").slice(0, 16));
  return bits.join(" · ");
});

/** Compact recommended gen. params for overlay (matches checkpoint_meta / system fields). */
const recParamsStrip = computed(() => {
  const m = props.item.checkpoint_meta;
  if (!m) return { text: "", title: "" };
  const parts: string[] = [];
  const titleBits: string[] = [];
  const cfg = m.recommended_cfg;
  if (cfg != null) {
    parts.push(`CFG ${cfg}`);
    titleBits.push(`CFG ${cfg}`);
  }
  const steps = m.recommended_steps;
  if (steps != null) {
    parts.push(`${steps} steps`);
    titleBits.push(`${steps} steps`);
  }
  const sam = (m.recommended_sampler ?? "").trim();
  if (sam) {
    const short = sam.length > 22 ? `${sam.slice(0, 21)}…` : sam;
    parts.push(short);
    titleBits.push(`Sampler: ${sam}`);
  }
  const sched = (m.recommended_scheduler ?? "").trim();
  if (sched) {
    const short = sched.length > 18 ? `${sched.slice(0, 17)}…` : sched;
    parts.push(short);
    titleBits.push(`Scheduler: ${sched}`);
  }
  const clip = m.recommended_clip_skip;
  if (clip != null) {
    parts.push(`CLIP ${clip}`);
    titleBits.push(`CLIP skip: ${clip}`);
  }
  return { text: parts.join(" · "), title: titleBits.join("\n") };
});

function onDragStart(e: DragEvent) {
  const name = props.item.comfy_checkpoint_name?.trim();
  if (!name || !e.dataTransfer) return;
  const meta = props.item.checkpoint_meta;
  e.dataTransfer.setData(
    "application/x-at-checkpoint",
    JSON.stringify({
      comfy_checkpoint_name: name,
      display_name: props.item.display_name,
      base_model: props.item.base_model,
      recommended_clip_skip: meta?.recommended_clip_skip ?? null,
    }),
  );
  e.dataTransfer.effectAllowed = "copy";
}

async function onCopyName(ev: Event) {
  ev.stopPropagation();
  const t = props.item.comfy_checkpoint_name?.trim();
  if (!t) return;
  const ok = await copyText(t);
  store.showToast(ok ? "Copied" : "Copy failed");
}

function onOpenDetail(ev: Event) {
  const t = (ev.target as HTMLElement).closest(
    "button, .at-card__drag, a, .at-card__select, .at-card__select input",
  );
  if (t) return;
  if (store.selectionMode) {
    store.toggleAssetSelect(props.item.asset_id);
    return;
  }
  store.openDetail(props.item.asset_id);
}
</script>

<template>
  <article
    class="at-card"
    :class="{
      'at-card--compact': compact,
      'at-card--selected': store.selectionMode && store.isAssetSelected(item.asset_id),
    }"
    @click="onOpenDetail"
  >
    <label
      v-if="store.selectionMode"
      class="at-card__select"
      @click.stop
    >
      <input
        type="checkbox"
        :checked="store.isAssetSelected(item.asset_id)"
        @change.stop="store.toggleAssetSelect(item.asset_id)"
      />
    </label>
    <div class="at-card__media" @mouseenter="onMediaEnter" @mouseleave="onMediaLeave">
      <template v-if="coverIsVideo && coverPlaybackSrc">
        <video
          class="at-card__img at-card__vid"
          :src="coverPlaybackSrc"
          muted
          loop
          playsinline
          preload="metadata"
        />
        <img
          v-if="coverSrc"
          :src="coverSrc"
          loading="lazy"
          alt=""
          class="at-card__img at-card__img--freeze"
        />
      </template>
      <img
        v-else-if="coverSrc"
        :src="coverSrc"
        loading="lazy"
        alt=""
        class="at-card__img"
      />
      <div v-else class="at-card__placeholder">No image</div>
      <span v-if="item.category" class="at-card__cat">{{ item.category }}</span>
      <span
        v-if="item.is_favorite"
        class="at-card__fav"
        title="Favorite"
        aria-hidden="true"
        >★</span
      >
      <div
        v-if="recParamsStrip.text && !compact"
        class="at-card__rec-strip"
        :title="recParamsStrip.title || 'Recommended parameters'"
      >
        {{ recParamsStrip.text }}
      </div>
    </div>
    <div class="at-card__body">
      <div class="at-card__title-row">
        <span class="at-card__title" :title="item.display_name || item.filename">{{
          item.display_name || item.filename
        }}</span>
      </div>
      <div v-if="item.base_model && !compact" class="at-card__bm">{{ item.base_model }}</div>
      <div v-if="triggersPreview" class="at-card__tw">{{ triggersPreview }}</div>
      <div v-if="compact && usageLine" class="at-card__usage">{{ usageLine }}</div>
      <div
        class="at-card__actions-row"
        :class="{ 'at-card__actions-row--compact': compact }"
      >
        <div class="at-card__actions">
          <button
            type="button"
            class="at-card__btn at-card__btn--primary"
            :disabled="!item.comfy_checkpoint_name"
            @click.stop="onCopyName"
          >
            Copy name
          </button>
        </div>
        <span
          v-if="item.base_model && compact"
          class="at-card__bm-compact"
          :title="item.base_model"
          >{{ item.base_model }}</span
        >
      </div>
    </div>
    <button
      type="button"
      class="at-card__drag"
      title="Drag to LM Checkpoint Loader"
      draggable="true"
      @dragstart="onDragStart"
      @click.stop
    >
      ⠿
    </button>
  </article>
</template>

<style scoped>
.at-card {
  position: relative;
  isolation: isolate;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  background: color-mix(in srgb, var(--fg-color, #fff) 4%, transparent);
  cursor: pointer;
}
.at-card--selected {
  border-color: var(--p-primary-color, #6366f1);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--p-primary-color, #6366f1) 55%, transparent);
}
.at-card__select {
  position: absolute;
  top: 0.35rem;
  left: 0.35rem;
  z-index: 3;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.at-card__select input {
  width: 1rem;
  height: 1rem;
  margin: 0;
  cursor: pointer;
}
.at-card--compact {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 0.35rem;
  align-items: start;
}
.at-card__media {
  position: relative;
  z-index: 0;
  aspect-ratio: 1;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
}
.at-card--compact .at-card__media {
  aspect-ratio: 1;
  width: 40px;
  height: 40px;
}
.at-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.at-card__vid {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.at-card__img--freeze {
  position: relative;
  z-index: 1;
  transition: opacity 0.15s ease;
}
.at-card__media:hover .at-card__img--freeze {
  opacity: 0;
}
.at-card__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 0.65rem;
  opacity: 0.6;
  padding: 0.25rem;
  text-align: center;
}
.at-card__cat {
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
  font-size: 0.55rem;
  padding: 0.1rem 0.25rem;
  border-radius: 3px;
  background: color-mix(in srgb, #000 65%, transparent);
  color: #fff;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
}
.at-card__fav {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  font-size: 0.75rem;
  color: #fbbf24;
  text-shadow: 0 0 2px #000;
  pointer-events: none;
}
.at-card__rec-strip {
  position: absolute;
  bottom: 1.45rem;
  left: 0.2rem;
  right: 1.55rem;
  font-size: 0.5rem;
  line-height: 1.25;
  padding: 0.12rem 0.28rem;
  border-radius: 3px;
  background: color-mix(in srgb, #000 72%, transparent);
  color: #fff;
  pointer-events: none;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}
.at-card__drag {
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  z-index: 2;
  width: 1.35rem;
  height: 1.35rem;
  padding: 0;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  line-height: 1;
  cursor: grab;
  background: color-mix(in srgb, #000 55%, transparent);
  color: #fff;
}
.at-card__drag:active {
  cursor: grabbing;
}
.at-card__body {
  padding: 0.35rem 0.45rem 0.5rem;
  position: relative;
  z-index: 0;
}
.at-card__title-row {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  justify-content: space-between;
}
.at-card__title {
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.at-card__bm {
  font-size: 0.65rem;
  opacity: 0.75;
  margin-top: 0.15rem;
}
.at-card__tw {
  font-size: 0.65rem;
  opacity: 0.8;
  margin-top: 0.2rem;
  line-height: 1.2;
}
.at-card__usage {
  font-size: 0.6rem;
  opacity: 0.7;
  margin-top: 0.15rem;
}
.at-card__actions-row {
  margin-top: 0.35rem;
}
.at-card__actions-row--compact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  min-width: 0;
}
.at-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.at-card__bm-compact {
  font-size: 0.65rem;
  opacity: 0.75;
  line-height: 1.2;
  text-align: right;
  flex-shrink: 1;
  min-width: 0;
  max-width: 48%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.at-card__btn {
  font: inherit;
  font-size: 0.65rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-card__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.at-card__btn--primary {
  border-color: var(--p-primary-color, #6366f1);
  background: color-mix(in srgb, var(--p-primary-color, #6366f1) 18%, transparent);
}
</style>
