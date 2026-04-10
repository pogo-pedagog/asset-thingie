<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import type { CivitaiFileSummary, CivitaiImageSummary, CivitaiModelDetail, CivitaiVersionSummary } from "../types";
import { creatorNameFromItem, thumbUrl } from "../utils/civitaiDisplay";
import { filterFamilyForModelType } from "../utils/filterFamilyForModelType";
import ImageMetaLightbox from "@at-shared/ImageMetaLightbox.vue";
import * as api from "../api";
import { useBrowseStore } from "../stores/browse";

const props = defineProps<{
  model: CivitaiModelDetail;
}>();

function defaultVersionIndex(vers: CivitaiVersionSummary[], skipEa: boolean): number {
  if (!skipEa) return 0;
  const i = vers.findIndex((v) => !v.isEarlyAccess);
  return i >= 0 ? i : 0;
}

function versionOptionLabel(v: CivitaiVersionSummary): string {
  const base = v.name?.trim() || `v${v.id}`;
  return v.isEarlyAccess ? `${base} (ea.)` : base;
}

function formatFileSizeKb(kb: number | null | undefined): string {
  if (kb == null || !Number.isFinite(kb) || kb < 0) return "";
  if (kb >= 1048576) return `${(kb / 1048576).toFixed(1)} GB`;
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${Math.round(kb)} KB`;
}

/** Civitai often uses ``type: Model`` for both pruned and full; ``metadata.size`` is ``pruned`` / ``full``. */
function fileRoleLabel(f: CivitaiFileSummary): string {
  const meta = f.metadata;
  const sizeRaw = meta && typeof meta === "object" && "size" in meta ? (meta as Record<string, unknown>).size : null;
  const fpRaw = meta && typeof meta === "object" && "fp" in meta ? (meta as Record<string, unknown>).fp : null;
  const size = typeof sizeRaw === "string" ? sizeRaw.trim().toLowerCase() : "";
  const fp = typeof fpRaw === "string" ? fpRaw.trim() : "";
  const typ = f.type?.trim() || "";

  if (size === "pruned") {
    return fp ? `Pruned Model · ${fp}` : "Pruned Model";
  }
  if (size === "full") {
    return fp ? `Full Model · ${fp}` : "Full Model";
  }

  return typ || "Model";
}

/** Role from ``type`` and/or ``metadata``; ``sizeKB`` when present; trailing ``*`` = primary. */
function fileSelectLabel(f: CivitaiFileSummary): string {
  const name = f.name?.trim() || `file #${f.id}`;
  const role = fileRoleLabel(f);
  let label = `${name} (${role})`;
  const size = formatFileSizeKb(f.sizeKB);
  if (size) label = `${label} · ${size}`;
  if (f.primary) label = `${label} *`;
  return label;
}

const emit = defineEmits<{
  close: [];
  downloaded: [];
  error: [msg: string];
}>();

const { category, duplicateResolution, hideEarlyAccessFromConfig } = storeToRefs(useBrowseStore());

const versionIndex = ref(0);
const fileIndex = ref(0);
const descExpanded = ref(false);
const lightboxUrl = ref<string | null>(null);
const lightboxPlaybackUrl = ref<string | null>(null);
const lightboxPosterUrl = ref<string | null>(null);
const lightboxMediaType = ref<string | null>(null);
const lightboxMeta = ref<Record<string, unknown> | null>(null);

const versions = computed(() => props.model.modelVersions ?? []);

const downloadableVersionCount = computed(() => {
  const skipEa = hideEarlyAccessFromConfig.value;
  return versions.value.filter((v) => {
    if (skipEa && v.isEarlyAccess) return false;
    return Boolean(v.files?.length);
  }).length;
});

watch(
  () => [props.model.id, hideEarlyAccessFromConfig.value] as const,
  () => {
    versionIndex.value = defaultVersionIndex(
      props.model.modelVersions ?? [],
      hideEarlyAccessFromConfig.value,
    );
    fileIndex.value = 0;
    descExpanded.value = false;
    lightboxUrl.value = null;
    lightboxPlaybackUrl.value = null;
    lightboxPosterUrl.value = null;
    lightboxMediaType.value = null;
    lightboxMeta.value = null;
  },
);

const currentVersion = computed((): CivitaiVersionSummary | null => {
  const v = versions.value[versionIndex.value];
  return v ?? null;
});

const currentVersionIsEarlyAccess = computed(
  () =>
    hideEarlyAccessFromConfig.value && Boolean(currentVersion.value?.isEarlyAccess),
);

const currentFiles = computed((): CivitaiFileSummary[] => currentVersion.value?.files ?? []);

watch(currentVersion, (v) => {
  fileIndex.value = 0;
  if (v?.files?.length) {
    const prim = v.files.findIndex((f) => f.primary);
    if (prim >= 0) fileIndex.value = prim;
  }
});

const currentImages = computed((): CivitaiImageSummary[] => currentVersion.value?.images ?? []);

const categoryOptions = ref<string[]>([]);
const categoryLoading = ref(false);
const catsListId = computed(() => `at-browse-cats-${props.model.id}`);

watch(
  () => [props.model.id, props.model.type] as const,
  async ([, typ]) => {
    categoryLoading.value = true;
    try {
      const fam = filterFamilyForModelType(typ);
      const f = await api.fetchFilters(fam ? { family: fam } : {});
      categoryOptions.value = f.categories ?? [];
    } catch {
      categoryOptions.value = [];
    } finally {
      categoryLoading.value = false;
    }
  },
  { immediate: true },
);

const trainedWords = computed((): string[] => {
  const w = currentVersion.value?.trainedWords;
  return Array.isArray(w) ? w : [];
});

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    emit("error", "Copy failed");
  }
}

function pickFileForDownload(): { versionId: number; fileId: number } | null {
  const v = currentVersion.value;
  const files = currentFiles.value;
  if (!v || !files.length) return null;
  const f = files[fileIndex.value] ?? files[0];
  if (!f?.id) return null;
  return { versionId: v.id, fileId: f.id };
}

async function downloadCurrent(): Promise<void> {
  if (currentVersionIsEarlyAccess.value) return;
  const spec = pickFileForDownload();
  if (!spec) {
    emit("error", "No file on this version");
    return;
  }
  try {
    await api.postDownload({
      civitai_model_id: props.model.id,
      version_id: spec.versionId,
      file_id: spec.fileId,
      category: category.value.trim() || "General",
      duplicate_resolution: duplicateResolution.value,
    });
    emit("downloaded");
  } catch (e) {
    emit("error", e instanceof Error ? e.message : "Download failed");
  }
}

async function downloadAllVersions(): Promise<void> {
  const items: Record<string, unknown>[] = [];
  const skipEa = hideEarlyAccessFromConfig.value;
  for (const v of versions.value) {
    if (skipEa && v.isEarlyAccess) continue;
    const files = v.files ?? [];
    if (!files.length) continue;
    const primaryI = files.findIndex((f) => f.primary);
    const f = files[primaryI >= 0 ? primaryI : 0];
    if (!f?.id) continue;
    items.push({
      civitai_model_id: props.model.id,
      version_id: v.id,
      file_id: f.id,
      category: category.value.trim() || "General",
    });
  }
  if (!items.length) {
    emit("error", "No downloadable files");
    return;
  }
  try {
    await api.postDownloadBatch(items, duplicateResolution.value);
    emit("downloaded");
  } catch (e) {
    emit("error", e instanceof Error ? e.message : "Batch download failed");
  }
}

function openLightbox(im: CivitaiImageSummary): void {
  const t = (im.type || "image").toLowerCase();
  lightboxMediaType.value = t;
  if (t === "video") {
    lightboxPlaybackUrl.value = im.url;
    lightboxPosterUrl.value = null;
    lightboxUrl.value = null;
  } else {
    lightboxPlaybackUrl.value = null;
    lightboxPosterUrl.value = null;
    lightboxUrl.value = thumbUrl(im.url);
  }
  const m = im.meta;
  lightboxMeta.value =
    m && typeof m === "object" && Object.keys(m as object).length
      ? (m as Record<string, unknown>)
      : null;
}

function playThumbPreview(e: MouseEvent): void {
  const el = (e.currentTarget as HTMLElement | null)?.querySelector("video");
  if (el instanceof HTMLVideoElement) void el.play().catch(() => {});
}

function stopThumbPreview(e: MouseEvent): void {
  const el = (e.currentTarget as HTMLElement | null)?.querySelector("video");
  if (el instanceof HTMLVideoElement) {
    el.pause();
    el.currentTime = 0;
  }
}

function closeLightbox(): void {
  lightboxUrl.value = null;
  lightboxPlaybackUrl.value = null;
  lightboxPosterUrl.value = null;
  lightboxMediaType.value = null;
  lightboxMeta.value = null;
}

const description = computed(() => props.model.description?.trim() || "");
</script>

<template>
  <div class="model-detail">
    <div class="model-detail__hdr">
      <h3>{{ model.name }}</h3>
      <button type="button" class="at-btn" @click="emit('close')">Close</button>
    </div>

    <p class="model-detail__sub">
      <span class="pill">{{ model.type }}</span>
      <span v-if="creatorNameFromItem(model)"> · {{ creatorNameFromItem(model) }}</span>
      <span v-if="currentVersion?.baseModel"> · {{ currentVersion.baseModel }}</span>
    </p>

    <div v-if="versions.length" class="model-detail__controls">
      <label class="at-label">
        Version
        <select v-model.number="versionIndex" class="at-input">
          <option v-for="(v, i) in versions" :key="v.id" :value="i">
            {{ versionOptionLabel(v) }}
          </option>
        </select>
      </label>
      <label v-if="currentFiles.length > 1" class="at-label">
        File
        <select v-model.number="fileIndex" class="at-input">
          <option v-for="(f, i) in currentFiles" :key="f.id" :value="i">
            {{ fileSelectLabel(f) }}
          </option>
        </select>
      </label>
    </div>

    <div v-if="description" class="model-detail__desc">
      <div
        class="model-detail__desc-inner"
        :class="{ 'model-detail__desc-inner--collapsed': !descExpanded && description.length > 400 }"
        v-html="description"
      />
      <button v-if="description.length > 400" type="button" class="at-btn at-btn--link" @click="descExpanded = !descExpanded">
        {{ descExpanded ? "Show less" : "Show more" }}
      </button>
    </div>

    <div v-if="trainedWords.length" class="model-detail__tw">
      <span class="model-detail__tw-label">Trigger words</span>
      <div class="model-detail__tw-row">
        <code class="model-detail__tw-text">{{ trainedWords.join(", ") }}</code>
        <button type="button" class="at-btn at-btn--sm" @click="copyText(trainedWords.join(', '))">Copy</button>
      </div>
    </div>

    <div v-if="currentImages.length" class="model-detail__gallery">
      <span class="model-detail__tw-label">Gallery</span>
      <div class="model-detail__thumbs">
        <button
          v-for="(im, idx) in currentImages"
          :key="idx"
          type="button"
          class="model-detail__thumb"
          @mouseenter="(im.type || 'image').toLowerCase() === 'video' ? playThumbPreview($event) : undefined"
          @mouseleave="(im.type || 'image').toLowerCase() === 'video' ? stopThumbPreview($event) : undefined"
          @click="openLightbox(im)"
        >
          <template v-if="(im.type || 'image').toLowerCase() === 'video'">
            <video
              class="model-detail__thumb-vid"
              :src="im.url"
              muted
              loop
              playsinline
              preload="metadata"
            />
            <span class="model-detail__vid">Video</span>
          </template>
          <img v-else :src="thumbUrl(im.url)" :alt="`Image ${idx}`" loading="lazy" />
        </button>
      </div>
    </div>

    <div class="model-detail__dl">
      <label class="at-label">
        Category folder
        <span v-if="categoryLoading" class="model-detail__cats-hint">Loading folders…</span>
        <input
          v-model="category"
          class="at-input model-detail__category-combo"
          :list="catsListId"
          placeholder="Pick from list or type a folder name (e.g. General)"
          autocomplete="off"
          aria-autocomplete="list"
        />
        <datalist :id="catsListId">
          <option v-for="c in categoryOptions" :key="'dl-' + c" :value="c" />
        </datalist>
      </label>
      <fieldset class="model-detail__dup">
        <legend>Duplicate file</legend>
        <label><input v-model="duplicateResolution" type="radio" value="skip" /> Skip if exists</label>
        <label><input v-model="duplicateResolution" type="radio" value="replace" /> Replace</label>
      </fieldset>
      <p v-if="currentVersionIsEarlyAccess" class="model-detail__ea-dl-msg" role="status">
        Early-access version — not downloadable here.
      </p>
      <div class="model-detail__dl-btns">
        <button v-if="!currentVersionIsEarlyAccess" type="button" class="at-btn" @click="downloadCurrent">
          Download
        </button>
        <button
          v-if="downloadableVersionCount > 1"
          type="button"
          class="at-btn"
          @click="downloadAllVersions"
        >
          Download all versions
        </button>
      </div>
    </div>

    <ImageMetaLightbox
      :image-url="lightboxUrl"
      :playback-url="lightboxPlaybackUrl"
      :poster-url="lightboxPosterUrl"
      :media-type="lightboxMediaType"
      :meta="lightboxMeta"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.model-detail {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 18%, transparent);
  border-radius: 8px;
  padding: 0.65rem;
  max-height: min(85vh, 720px);
  overflow: auto;
}
.model-detail__hdr {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.model-detail__hdr h3 {
  margin: 0;
  font-size: 1rem;
}
.model-detail__sub {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.85;
}
.pill {
  display: inline-block;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
  font-size: 0.75rem;
}
.model-detail__ea-dl-msg {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.9;
}
.model-detail__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.at-label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.75rem;
  flex: 1;
  min-width: 140px;
}
.at-input {
  font: inherit;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: var(--comfy-input-bg, #1a1a1a);
  color: inherit;
}
.at-btn {
  font: inherit;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-btn--sm {
  font-size: 0.75rem;
  padding: 0.2rem 0.45rem;
}
.at-btn--link {
  border: none;
  background: none;
  color: #6af;
  padding: 0.15rem 0;
  align-self: flex-start;
}
.model-detail__desc-inner {
  font-size: 0.8rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.model-detail__desc-inner--collapsed {
  max-height: 6rem;
  overflow: hidden;
  mask-image: linear-gradient(black 60%, transparent);
}
.model-detail__tw-label {
  font-size: 0.75rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}
.model-detail__tw-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.model-detail__tw-text {
  font-size: 0.75rem;
  padding: 0.25rem 0.4rem;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
  border-radius: 4px;
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
.model-detail__thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.model-detail__thumb {
  position: relative;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 20%, transparent);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  width: 64px;
  height: 64px;
}
.model-detail__thumb img,
.model-detail__thumb-vid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.model-detail__vid {
  position: absolute;
  right: 0.25rem;
  bottom: 0.25rem;
  font-size: 0.65rem;
  line-height: 1;
  padding: 0.15rem 0.3rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  pointer-events: none;
}
.model-detail__dup {
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.model-detail__dup legend {
  padding: 0 0.25rem;
  font-size: 0.7rem;
}
.model-detail__dl > .at-label {
  flex: none;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}
.model-detail__cats-hint {
  font-size: 0.65rem;
  opacity: 0.75;
  font-weight: normal;
}
.model-detail__category-combo {
  width: 100%;
  min-width: 0;
}
.model-detail__dl-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
</style>
