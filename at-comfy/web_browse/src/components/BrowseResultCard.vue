<script setup lang="ts">
import type { CivitaiBrowseItem } from "../types";
import { computed } from "vue";
import { coverMediaFromBrowseItem, creatorNameFromItem, mediaDisplayUrl } from "../utils/civitaiDisplay";

const props = defineProps<{
  item: CivitaiBrowseItem;
  batchMode: boolean;
  batchSelected: boolean;
}>();

const emit = defineEmits<{
  open: [];
  toggleBatch: [];
}>();

function statsLine(item: CivitaiBrowseItem): string {
  const s = item.stats;
  if (!s) return "";
  const parts: string[] = [];
  const dc = s.downloadCount ?? (s as { download_count?: number }).download_count;
  if (dc != null) parts.push(`${dc} dl`);
  if (s.rating != null) parts.push(`★ ${s.rating}`);
  const tu = s.thumbsUpCount ?? (s as { thumbs_up_count?: number }).thumbs_up_count;
  if (tu != null) parts.push(`${tu} 👍`);
  return parts.join(" · ");
}

function onCardClick(e: MouseEvent): void {
  if (props.batchMode) {
    e.stopPropagation();
    emit("toggleBatch");
    return;
  }
  emit("open");
}

function onCheckboxClick(e: MouseEvent): void {
  e.stopPropagation();
  emit("toggleBatch");
}

const coverMedia = computed(() => coverMediaFromBrowseItem(props.item));
const coverIsVideo = computed(() => (coverMedia.value?.type || "image").toLowerCase() === "video");
const coverUrl = computed(() =>
  coverMedia.value?.url ? mediaDisplayUrl(coverMedia.value.url, props.item.source) : "",
);

function playCoverPreview(e: MouseEvent): void {
  const el = (e.currentTarget as HTMLElement | null)?.querySelector("video");
  if (el instanceof HTMLVideoElement) void el.play().catch(() => {});
}

function stopCoverPreview(e: MouseEvent): void {
  const el = (e.currentTarget as HTMLElement | null)?.querySelector("video");
  if (el instanceof HTMLVideoElement) {
    el.pause();
    el.currentTime = 0;
  }
}
</script>

<template>
  <div
    class="result-card"
    :class="{ 'result-card--batch': batchMode, 'result-card--selected': batchSelected }"
    @mouseenter="coverIsVideo ? playCoverPreview($event) : undefined"
    @mouseleave="coverIsVideo ? stopCoverPreview($event) : undefined"
    @click="onCardClick"
  >
    <div v-if="batchMode" class="result-card__cb" @click.stop="onCheckboxClick">
      <input type="checkbox" :checked="batchSelected" tabindex="-1" readonly />
    </div>
    <div class="result-card__thumb">
      <template v-if="coverUrl">
        <video
          v-if="coverIsVideo"
          class="result-card__thumb-video"
          :src="coverUrl"
          muted
          loop
          playsinline
          preload="metadata"
        />
        <img
          v-else
          :src="coverUrl"
          :alt="item.name"
          loading="lazy"
        />
        <span v-if="coverIsVideo" class="result-card__video-badge">Video</span>
      </template>
      <div v-else class="result-card__placeholder">No preview</div>
    </div>
    <div class="result-card__meta">
      <span class="result-card__name">{{ item.name }}</span>
      <span class="result-card__type">{{ item.type }}</span>
      <span v-if="creatorNameFromItem(item)" class="result-card__creator">by {{ creatorNameFromItem(item) }}</span>
      <span v-if="statsLine(item)" class="result-card__stats">{{ statsLine(item) }}</span>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  display: flex;
  gap: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  border-radius: 6px;
  padding: 0.35rem;
  cursor: pointer;
  background: color-mix(in srgb, var(--fg-color, #888) 4%, transparent);
}
.result-card--batch.result-card--selected {
  outline: 2px solid color-mix(in srgb, #6af 50%, transparent);
}
.result-card__cb {
  display: flex;
  align-items: flex-start;
  padding-top: 0.2rem;
}
.result-card__thumb {
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: color-mix(in srgb, var(--fg-color, #888) 10%, transparent);
}
.result-card__thumb img,
.result-card__thumb-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.result-card__video-badge {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
  font-size: 0.6rem;
  line-height: 1;
  padding: 0.15rem 0.28rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  pointer-events: none;
}
.result-card__placeholder {
  font-size: 0.65rem;
  padding: 0.25rem;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
.result-card__meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  flex: 1;
}
.result-card__name {
  font-weight: 600;
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-card__type {
  font-size: 0.7rem;
  opacity: 0.8;
  align-self: flex-start;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
}
.result-card__creator,
.result-card__stats {
  font-size: 0.7rem;
  opacity: 0.75;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
