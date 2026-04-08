<script setup lang="ts">
import { computed, ref, watch } from "vue";
import * as api from "../api";
import { useAssetsStore } from "../stores/assets";
import { storeToRefs } from "pinia";
import { copyText } from "../composables/useClipboard";
import ImageMetaLightbox from "@at-shared/ImageMetaLightbox.vue";
import type { ExampleMediaItem } from "../types";

const store = useAssetsStore();
const { detail, detailLoading } = storeToRefs(store);

const coverPoster = computed(() =>
  detail.value ? api.resolveCoverSrc(detail.value.cover_url_full || detail.value.cover_url) : null,
);

const coverPlayback = computed(() =>
  detail.value ? api.resolveCoverSrc(detail.value.cover_playback_url) : null,
);

const coverIsVideo = computed(
  () => (detail.value?.cover_media_type || "").toLowerCase() === "video" && Boolean(coverPlayback.value),
);

/** Normalized list; API/detail may omit or mistype `trigger_words`. */
const triggerList = computed(() => {
  const tw = detail.value?.trigger_words;
  if (!tw) return [];
  if (Array.isArray(tw)) {
    return tw.map((w) => String(w).trim()).filter(Boolean);
  }
  return [];
});

const triggersJoined = computed(() => triggerList.value.join(", "));

/** Directory path + Comfy checkpoint name when both exist (no duplicate suffix). */
const pathDisplay = computed(() => {
  const d = detail.value;
  if (!d) return "";
  const p = (d.path ?? "").trim();
  const f = (d.comfy_checkpoint_name ?? "").trim();
  if (!p && !f) return "";
  if (!f) return p;
  if (!p) return f;
  const sep = p.includes("\\") ? "\\" : "/";
  const norm = p.replace(/[/\\]+$/, "");
  if (norm.endsWith(f) || p.endsWith(f)) return p;
  return `${norm}${sep}${f}`;
});

const REC_LABELS: Record<string, string> = {
  recommended_sampler: "Sampler",
  recommended_scheduler: "Scheduler",
  recommended_steps: "Steps",
  recommended_cfg: "CFG",
  recommended_clip_skip: "CLIP skip",
  recommended_prompt: "Prompt",
  recommended_negative_prompt: "Negative prompt",
};

const recommendationRows = computed(() => {
  const sf = detail.value?.system_fields;
  if (!sf || typeof sf !== "object") return [] as [string, string][];
  const out: [string, string][] = [];
  for (const key of Object.keys(REC_LABELS)) {
    if (key in sf && sf[key] != null && sf[key] !== "") {
      out.push([key, REC_LABELS[key]]);
    }
  }
  return out;
});

function formatRec(v: unknown): string {
  if (v === null || v === undefined) return "—";
  return String(v);
}

async function copyField(label: string, text: string | null | undefined) {
  const t = (text ?? "").trim();
  if (!t) return;
  const ok = await copyText(t);
  store.showToast(ok ? `Copied ${label}` : "Copy failed");
}

const lightboxImageUrl = ref<string | null>(null);
const lightboxPlaybackUrl = ref<string | null>(null);
const lightboxPosterUrl = ref<string | null>(null);
const lightboxMediaType = ref<string | null>(null);
const lightboxMeta = ref<Record<string, unknown> | null>(null);

function closeImageLightbox(): void {
  lightboxImageUrl.value = null;
  lightboxPlaybackUrl.value = null;
  lightboxPosterUrl.value = null;
  lightboxMediaType.value = null;
  lightboxMeta.value = null;
}

function openExampleLightbox(ex: ExampleMediaItem): void {
  const mt = (ex.media_type || "image").toLowerCase();
  const play = ex.playback_url ? api.resolveCoverSrc(ex.playback_url) : null;
  const poster = api.resolveCoverSrc(ex.poster_url || ex.thumbnail_url);

  if (mt === "video" && play) {
    lightboxMediaType.value = "video";
    lightboxPlaybackUrl.value = play;
    lightboxPosterUrl.value = poster;
    lightboxImageUrl.value = poster || play;
  } else if (mt === "video") {
    lightboxMediaType.value = "image";
    lightboxPlaybackUrl.value = null;
    lightboxPosterUrl.value = null;
    const u = poster || api.resolveCoverSrc(ex.url || ex.thumbnail_url);
    if (!u) return;
    lightboxImageUrl.value = u;
  } else {
    lightboxPlaybackUrl.value = null;
    lightboxPosterUrl.value = null;
    const u = api.resolveCoverSrc(ex.url || ex.thumbnail_url);
    if (!u) return;
    lightboxImageUrl.value = u;
  }

  const p = ex.generation_params;
  if (p && typeof p === "object" && Object.keys(p).length) {
    lightboxMeta.value = { ...(p as Record<string, unknown>) };
  } else if ((ex.caption ?? "").trim()) {
    lightboxMeta.value = { caption: ex.caption as string };
  } else {
    lightboxMeta.value = null;
  }
}

function playGalleryPreview(e: MouseEvent): void {
  const el = (e.currentTarget as HTMLElement | null)?.querySelector("video");
  if (el instanceof HTMLVideoElement) void el.play().catch(() => {});
}

function stopGalleryPreview(e: MouseEvent): void {
  const el = (e.currentTarget as HTMLElement | null)?.querySelector("video");
  if (el instanceof HTMLVideoElement) {
    el.pause();
    el.currentTime = 0;
  }
}

function onCoverEnter(e: MouseEvent): void {
  const v = (e.currentTarget as HTMLElement | null)?.querySelector("video.at-detail__cover--vid");
  if (v instanceof HTMLVideoElement) void v.play().catch(() => {});
}

function onCoverLeave(e: MouseEvent): void {
  const v = (e.currentTarget as HTMLElement | null)?.querySelector("video.at-detail__cover--vid");
  if (v instanceof HTMLVideoElement) {
    v.pause();
    v.currentTime = 0;
  }
}

watch(
  () => detail.value?.asset_id,
  () => {
    closeImageLightbox();
  },
);

const reEnrichLoading = ref(false);

async function refreshFromCivitai(): Promise<void> {
  const id = detail.value?.asset_id;
  if (id == null) return;
  reEnrichLoading.value = true;
  try {
    await api.reEnrichAsset(id);
    store.showToast("Metadata refreshed");
    await store.loadDetail();
  } catch (e) {
    store.showToast(e instanceof Error ? e.message : "Refresh failed");
  } finally {
    reEnrichLoading.value = false;
  }
}
</script>

<template>
  <div class="at-detail" @click.self="store.closeDetail()">
    <div class="at-detail__panel" @click.stop>
      <div class="at-detail__head">
        <h2 class="at-detail__h">Details</h2>
        <button type="button" class="at-detail__close" @click="store.closeDetail()">×</button>
      </div>
      <div v-if="detailLoading" class="at-detail__loading">Loading…</div>
      <div v-else-if="detail" class="at-detail__scroll">
        <div
          v-if="coverPoster || coverIsVideo"
          class="at-detail__cover-wrap"
          @mouseenter="(e) => coverIsVideo && onCoverEnter(e)"
          @mouseleave="(e) => coverIsVideo && onCoverLeave(e)"
        >
          <template v-if="coverIsVideo && coverPlayback">
            <video
              class="at-detail__cover at-detail__cover--vid"
              :src="coverPlayback"
              muted
              loop
              playsinline
              preload="metadata"
            />
            <img
              v-if="coverPoster"
              :src="coverPoster"
              alt=""
              class="at-detail__cover at-detail__cover--freeze"
              loading="lazy"
            />
          </template>
          <img
            v-else-if="coverPoster"
            :src="coverPoster"
            alt=""
            class="at-detail__cover"
            loading="lazy"
          />
        </div>
        <p class="at-detail__name">
          {{ detail.display_name || detail.filename }}
        </p>
        <p v-if="detail.base_model" class="at-detail__meta">Base: {{ detail.base_model }}</p>
        <p
          v-if="
            detail.default_strength != null &&
            Number(detail.default_strength) !== 1
          "
          class="at-detail__meta"
        >
          Default strength: {{ detail.default_strength }}
        </p>
        <div class="at-detail__syntax">
          <div class="at-detail__sec-head">
            <span class="at-detail__mini-label">Comfy checkpoint</span>
            <button
              v-if="detail.comfy_checkpoint_name"
              type="button"
              class="at-detail__mini"
              @click="copyField('checkpoint name', detail.comfy_checkpoint_name)"
            >
              Copy
            </button>
          </div>
          <code class="at-detail__code">{{ detail.comfy_checkpoint_name || "—" }}</code>
        </div>
        <section v-if="recommendationRows.length" class="at-detail__section">
          <div class="at-detail__sec-title">Checkpoint recommendations</div>
          <dl class="at-detail__rec-list">
            <template v-for="[key, label] in recommendationRows" :key="key">
              <dt>{{ label }}</dt>
              <dd>{{ formatRec(detail.system_fields?.[key]) }}</dd>
            </template>
          </dl>
        </section>
        <p
          v-if="detail.category || detail.subcategory"
          class="at-detail__meta"
        >
          {{ [detail.category, detail.subcategory].filter(Boolean).join(" / ") }}
        </p>
        <section v-if="detail.notes" class="at-detail__section">
          <div class="at-detail__sec-title">Notes</div>
          <p class="at-detail__notes">{{ detail.notes }}</p>
        </section>
        <section class="at-detail__section">
          <div class="at-detail__sec-head">
            <span class="at-detail__sec-title">Triggers</span>
            <button
              v-if="triggerList.length"
              type="button"
              class="at-detail__mini"
              @click="copyField('triggers', triggersJoined)"
            >
              Copy
            </button>
          </div>
          <ul v-if="triggerList.length" class="at-detail__tw-list">
            <li v-for="(w, idx) in triggerList" :key="`${idx}-${w}`" class="at-detail__tw-item">
              <code>{{ w }}</code>
            </li>
          </ul>
          <p v-else class="at-detail__tw-empty">—</p>
        </section>
        <section v-if="(detail.tags ?? []).length" class="at-detail__section">
          <div class="at-detail__sec-title">Tags</div>
          <div class="at-detail__tags">
            <span v-for="t in detail.tags" :key="t" class="at-detail__tag">{{ t }}</span>
          </div>
        </section>
        <p v-if="detail.source_creator_name" class="at-detail__meta">
          By {{ detail.source_creator_name }}
        </p>
        <a
          v-if="detail.source_url"
          :href="detail.source_url"
          target="_blank"
          rel="noopener noreferrer"
          class="at-detail__link"
          >Source</a
        >
        <div class="at-detail__row-actions">
          <button
            type="button"
            class="at-detail__mini"
            :disabled="reEnrichLoading"
            @click="refreshFromCivitai"
          >
            {{ reEnrichLoading ? "Refreshing…" : "Refresh from Civitai" }}
          </button>
        </div>
        <p v-if="detail.usage_count || detail.last_used_at" class="at-detail__meta">
          Uses: {{ detail.usage_count
          }}<template v-if="detail.last_used_at">
            · {{ detail.last_used_at.replace("T", " ").slice(0, 19) }}</template
          >
        </p>
        <section v-if="detail.description_html" class="at-detail__section">
          <div class="at-detail__sec-title">Description</div>
          <!-- Trusted: local sidecar HTML only -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="at-detail__html" v-html="detail.description_html" />
        </section>
        <section v-if="detail.example_media.length" class="at-detail__section">
          <div class="at-detail__sec-title">Examples</div>
          <div class="at-detail__gallery">
            <div
              v-for="ex in detail.example_media"
              :key="ex.media_id"
              class="at-detail__ex-wrap"
              @mouseenter="
                (ex.media_type || '').toLowerCase() === 'video' && ex.playback_url
                  ? playGalleryPreview($event)
                  : undefined
              "
              @mouseleave="
                (ex.media_type || '').toLowerCase() === 'video' && ex.playback_url
                  ? stopGalleryPreview($event)
                  : undefined
              "
            >
              <button type="button" class="at-detail__ex" @click="openExampleLightbox(ex)">
                <template v-if="(ex.media_type || '').toLowerCase() === 'video' && ex.playback_url">
                  <video
                    class="at-detail__ex-vid"
                    :src="api.resolveCoverSrc(ex.playback_url) || ''"
                    muted
                    loop
                    playsinline
                    preload="metadata"
                  />
                  <img
                    v-if="ex.thumbnail_url || ex.poster_url"
                    :src="api.resolveCoverSrc(ex.thumbnail_url || ex.poster_url || ex.url) || ''"
                    alt=""
                    class="at-detail__ex-img at-detail__ex-img--freeze"
                    loading="lazy"
                  />
                </template>
                <img
                  v-else-if="(ex.media_type || '').toLowerCase() === 'video'"
                  :src="api.resolveCoverSrc(ex.thumbnail_url || ex.poster_url || ex.url) || ''"
                  alt=""
                  class="at-detail__ex-img"
                  loading="lazy"
                />
                <img
                  v-else-if="ex.thumbnail_url || ex.url"
                  :src="api.resolveCoverSrc(ex.thumbnail_url || ex.url) || ''"
                  alt=""
                  class="at-detail__ex-img"
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        </section>
        <section v-if="pathDisplay" class="at-detail__section">
          <div class="at-detail__sec-title">Path</div>
          <p class="at-detail__path-line">{{ pathDisplay }}</p>
        </section>
      </div>
    </div>
    <ImageMetaLightbox
      :image-url="lightboxImageUrl"
      :playback-url="lightboxPlaybackUrl"
      :poster-url="lightboxPosterUrl"
      :media-type="lightboxMediaType"
      :meta="lightboxMeta"
      @close="closeImageLightbox"
    />
  </div>
</template>

<style scoped>
.at-detail {
  position: fixed;
  z-index: 1000;
  box-sizing: border-box;
  /* Below Comfy’s fixed top menu (see @comfyorg/design-system: --comfy-topbar-height). */
  top: var(--comfy-topbar-height, 0);
  left: 0;
  right: 0;
  bottom: 0;
  background: color-mix(in srgb, #000 45%, transparent);
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  font-size: 0.8rem;
}
.at-detail__panel {
  width: min(100%, 33rem);
  max-height: 100%;
  height: 100%;
  background: var(--comfy-input-bg, var(--p-content-background, #1e1e1e));
  color: inherit;
  box-shadow: -4px 0 12px color-mix(in srgb, #000 35%, transparent);
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}
.at-detail__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.65rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  flex-shrink: 0;
}
.at-detail__h {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}
.at-detail__close {
  font: inherit;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.1rem 0.4rem;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.85;
}
.at-detail__loading {
  padding: 1rem;
}
.at-detail__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.at-detail__cover-wrap {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  max-height: 200px;
}
.at-detail__cover {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  display: block;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
}
.at-detail__cover--vid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: contain;
  z-index: 0;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
}
.at-detail__cover--freeze {
  position: relative;
  z-index: 1;
  transition: opacity 0.15s ease;
}
.at-detail__cover-wrap:hover .at-detail__cover--freeze {
  opacity: 0;
  pointer-events: none;
}
.at-detail__name {
  margin: 0;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.3;
}
.at-detail__meta {
  margin: 0;
  font-size: 0.72rem;
  opacity: 0.85;
}
.at-detail__syntax {
  margin: 0;
}
.at-detail__mini-label {
  font-size: 0.68rem;
  font-weight: 600;
  opacity: 0.88;
}
.at-detail__rec-list {
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 38%) 1fr;
  gap: 0.25rem 0.5rem;
  font-size: 0.72rem;
  line-height: 1.35;
}
.at-detail__rec-list dt {
  margin: 0;
  font-weight: 600;
  opacity: 0.85;
}
.at-detail__rec-list dd {
  margin: 0;
  word-break: break-word;
}
.at-detail__code {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.68rem;
  word-break: break-all;
  background: color-mix(in srgb, var(--fg-color, #888) 10%, transparent);
  padding: 0.25rem;
  border-radius: 4px;
}
.at-detail__path-line {
  margin: 0;
  font-size: 0.68rem;
  word-break: break-all;
  opacity: 0.9;
  line-height: 1.35;
}
.at-detail__mini {
  font: inherit;
  font-size: 0.65rem;
  padding: 0.15rem 0.35rem;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-detail__row-actions {
  margin: 0.35rem 0 0;
}
.at-detail__section {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.65rem;
}
.at-detail__scroll > section:first-of-type {
  margin-top: 0.35rem;
}
.at-detail__sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.at-detail__sec-head .at-detail__sec-title {
  flex: 1;
  min-width: 0;
}
.at-detail__sec-title {
  font-size: 0.72rem;
  font-weight: 600;
  opacity: 0.9;
  margin: 0;
}
.at-detail__tw-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.at-detail__tw-item {
  margin-bottom: 0.2rem;
}
.at-detail__tw-empty {
  margin: 0;
  font-size: 0.72rem;
  opacity: 0.75;
}
.at-detail__tw-item code {
  font-size: 0.68rem;
  word-break: break-all;
}
.at-detail__notes {
  margin: 0;
  white-space: pre-wrap;
  font-size: 0.75rem;
  opacity: 0.9;
}
.at-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.at-detail__tag {
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
}
.at-detail__link {
  font-size: 0.75rem;
  color: var(--p-primary-color, #818cf8);
}
.at-detail__gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
}
.at-detail__ex-wrap {
  position: relative;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
}
.at-detail__ex {
  position: relative;
  padding: 0;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: block;
  background: color-mix(in srgb, var(--fg-color, #888) 10%, transparent);
}
.at-detail__ex-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.at-detail__ex-vid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.at-detail__ex-wrap:hover .at-detail__ex-img--freeze {
  opacity: 0;
  pointer-events: none;
}
.at-detail__ex-img--freeze {
  position: relative;
  z-index: 1;
  transition: opacity 0.15s ease;
}
.at-detail__html {
  font-size: 0.72rem;
  opacity: 0.95;
  line-height: 1.4;
}
.at-detail__html :deep(p) {
  margin: 0 0 0.35em 0;
}
.at-detail__html :deep(p:last-child) {
  margin-bottom: 0;
}
.at-detail__html :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>
