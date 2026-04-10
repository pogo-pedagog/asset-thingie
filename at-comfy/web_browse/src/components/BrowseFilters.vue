<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import * as api from "../api";
import { useBrowseStore } from "../stores/browse";
import {
  BROWSE_BASE_MODELS,
  BROWSE_CIVARCHIVE_DEFAULT_BASE_MODELS,
  BROWSE_CONTENT_TYPES,
  BROWSE_CIVARCHIVE_SORT_OPTIONS,
  BROWSE_PERIOD_OPTIONS,
  BROWSE_SORT_OPTIONS,
} from "../constants";
const browse = useBrowseStore();
const {
  searchType,
  contentTypes,
  baseModels,
  sort,
  period,
  activeSource,
  hideNsfwFromConfig,
  civarchiveKind,
  civarchiveSort,
  civarchiveType,
  civarchiveBaseModels,
  civarchiveTags,
  civarchiveDeletedOnly,
  civarchiveNsfw,
} = storeToRefs(browse);

const expanded = ref(false);
const civarchiveBaseModelOptions = ref<string[]>([...BROWSE_CIVARCHIVE_DEFAULT_BASE_MODELS]);
const civarchiveBaseDropdownOpen = ref(false);
const civarchiveBaseFilter = ref("");
const civarchiveBaseTriggerRef = ref<HTMLElement | null>(null);
const civarchiveBasePortalRef = ref<HTMLElement | null>(null);
const civarchiveDdPortalStyle = ref<Record<string, string>>({});

const civarchiveBaseSummary = computed(() => {
  const m = civarchiveBaseModels.value;
  if (!m.length) return "Any";
  if (m.length === 1) return m[0]!;
  return `${m.length} selected`;
});

/** Chevron for multiselect trigger (avoid mojibake in template literals). */
const CIVARCHIVE_DD_OPEN = "\u25B2";
const CIVARCHIVE_DD_SHUT = "\u25BC";

const filteredCivarchiveBaseOptions = computed(() => {
  const q = civarchiveBaseFilter.value.trim().toLowerCase();
  const opts = civarchiveBaseModelOptions.value;
  if (!q) return opts;
  return opts.filter((b) => b.toLowerCase().includes(q));
});

function syncCivarchiveDdPosition(): void {
  const btn = civarchiveBaseTriggerRef.value;
  if (!btn) return;
  const r = btn.getBoundingClientRect();
  civarchiveDdPortalStyle.value = {
    position: "fixed",
    top: `${Math.round(r.bottom + 4)}px`,
    left: `${Math.round(r.left)}px`,
    width: `${Math.round(r.width)}px`,
    "max-width": "calc(100vw - 16px)",
    "z-index": "10000",
  };
}

function onCivarchiveBaseDocPointerDown(ev: PointerEvent): void {
  if (!civarchiveBaseDropdownOpen.value) return;
  const t = ev.target;
  if (!(t instanceof Node)) return;
  const trig = civarchiveBaseTriggerRef.value;
  const port = civarchiveBasePortalRef.value;
  if (trig?.contains(t) || port?.contains(t)) return;
  civarchiveBaseDropdownOpen.value = false;
}

function onWinScrollOrResize(): void {
  if (civarchiveBaseDropdownOpen.value) syncCivarchiveDdPosition();
}

onMounted(() => {
  document.addEventListener("pointerdown", onCivarchiveBaseDocPointerDown, true);
  window.addEventListener("resize", onWinScrollOrResize);
  window.addEventListener("scroll", onWinScrollOrResize, true);
});
onUnmounted(() => {
  document.removeEventListener("pointerdown", onCivarchiveBaseDocPointerDown, true);
  window.removeEventListener("resize", onWinScrollOrResize);
  window.removeEventListener("scroll", onWinScrollOrResize, true);
});

async function ensureCivarchiveBaseModels(): Promise<void> {
  if (activeSource.value !== "civarchive") return;
  try {
    const r = await api.fetchCivarchiveBaseModels();
    if (Array.isArray(r.base_models) && r.base_models.length) civarchiveBaseModelOptions.value = r.base_models;
  } catch {
    /* keep curated list */
  }
}

watch(expanded, (v) => {
  if (v) void ensureCivarchiveBaseModels();
  else civarchiveBaseDropdownOpen.value = false;
});
watch(activeSource, () => {
  civarchiveBaseDropdownOpen.value = false;
  if (expanded.value) void ensureCivarchiveBaseModels();
});

watch(civarchiveBaseDropdownOpen, (open) => {
  if (!open) {
    civarchiveBaseFilter.value = "";
    return;
  }
  void nextTick(() => {
    syncCivarchiveDdPosition();
  });
});

function toggleContentType(t: string): void {
  const arr = contentTypes.value.slice();
  const i = arr.indexOf(t);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(t);
         contentTypes.value = arr;
}

function hasContentType(t: string): boolean {
  return contentTypes.value.includes(t);
}

function toggleBaseModel(bm: string): void {
  const arr = baseModels.value.slice();
  const i = arr.indexOf(bm);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(bm);
         baseModels.value = arr;
}

function hasBaseModel(bm: string): boolean {
  return baseModels.value.includes(bm);
}

function toggleCivarchiveBaseModel(bm: string): void {
  const arr = civarchiveBaseModels.value.slice();
  const i = arr.indexOf(bm);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(bm);
  civarchiveBaseModels.value = arr;
}

function hasCivarchiveBaseModel(bm: string): boolean {
  return civarchiveBaseModels.value.includes(bm);
}
</script>

<template>
  <div class="browse-filters">
    <button type="button" class="browse-filters__toggle" @click="expanded = !expanded">
      {{ expanded ? "▼" : "▶" }} Filters
    </button>
    <div v-show="expanded" class="browse-filters__body">
      <template v-if="activeSource === 'civarchive'">
        <label class="browse-filters__row">
          <span>Result kind</span>
          <select v-model="civarchiveKind" class="at-input at-input--sm">
            <option value="version">Version</option>
            <option value="file">File</option>
            <option value="user">User</option>
          </select>
        </label>
        <label class="browse-filters__row">
          <span>Sort</span>
          <select v-model="civarchiveSort" class="at-input at-input--sm">
            <option v-for="o in BROWSE_CIVARCHIVE_SORT_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </label>
        <label class="browse-filters__row">
          <span>Type</span>
          <select v-model="civarchiveType" class="at-input at-input--sm">
            <option value="">Any</option>
            <option v-for="t in BROWSE_CONTENT_TYPES" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>
        <div class="browse-filters__row browse-filters__multiselect">
          <span class="browse-filters__label">Base models</span>
          <button
            ref="civarchiveBaseTriggerRef"
            type="button"
            class="at-input at-input--sm browse-filters__dd-trigger"
            :aria-expanded="civarchiveBaseDropdownOpen"
            aria-haspopup="listbox"
            @click="civarchiveBaseDropdownOpen = !civarchiveBaseDropdownOpen"
          >
            <span class="browse-filters__dd-trigger-text">{{ civarchiveBaseSummary }}</span>
            <span class="browse-filters__dd-chevron" aria-hidden="true">{{
              civarchiveBaseDropdownOpen ? CIVARCHIVE_DD_OPEN : CIVARCHIVE_DD_SHUT
            }}</span>
          </button>
        </div>
        <label v-if="!hideNsfwFromConfig" class="browse-filters__row">
          <span>NSFW (CivArchive)</span>
          <select v-model="civarchiveNsfw" class="at-input at-input--sm">
            <option value="all">All</option>
            <option value="sfw">SFW only</option>
            <option value="nsfw">NSFW only</option>
          </select>
        </label>
        <label class="browse-filters__row browse-filters__row--row">
          <span class="browse-filters__label-inline">Deleted only</span>
          <input v-model="civarchiveDeletedOnly" type="checkbox" />
        </label>
        <label class="browse-filters__row">
          <span>Tags</span>
          <input v-model="civarchiveTags" type="text" class="at-input at-input--sm" placeholder="Optional (API tags=)" />
        </label>
      </template>
      <template v-else>
        <label class="browse-filters__row">
          <span>Search type</span>
          <select v-model="searchType" class="at-input at-input--sm">
            <option value="model_name">Model name</option>
            <option value="username">Username</option>
            <option value="tag">Tag</option>
          </select>
        </label>

        <div class="browse-filters__section">
          <span class="browse-filters__label">Content types</span>
          <div class="browse-filters__chips">
            <label v-for="t in BROWSE_CONTENT_TYPES" :key="t" class="browse-filters__chk">
              <input type="checkbox" :checked="hasContentType(t)" @change="toggleContentType(t)" />
              {{ t }}
            </label>
          </div>
        </div>

        <div class="browse-filters__section">
          <span class="browse-filters__label">Base models</span>
          <div class="browse-filters__chips">
            <label v-for="bm in BROWSE_BASE_MODELS" :key="bm" class="browse-filters__chk">
              <input type="checkbox" :checked="hasBaseModel(bm)" @change="toggleBaseModel(bm)" />
              {{ bm }}
            </label>
          </div>
        </div>

        <label class="browse-filters__row">
          <span>Sort</span>
          <select v-model="sort" class="at-input at-input--sm">
            <option v-for="o in BROWSE_SORT_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </label>

        <label class="browse-filters__row">
          <span>Period</span>
          <select v-model="period" class="at-input at-input--sm">
            <option v-for="o in BROWSE_PERIOD_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </label>
      </template>
    </div>
    <Teleport to="body">
      <div
        v-show="activeSource === 'civarchive' && expanded && civarchiveBaseDropdownOpen"
        ref="civarchiveBasePortalRef"
        class="browse-filters__dd-panel browse-filters__dd-panel--portal"
        :style="civarchiveDdPortalStyle"
        role="listbox"
        @click.stop
      >
        <input
          v-model="civarchiveBaseFilter"
          type="search"
          class="at-input at-input--sm browse-filters__dd-filter"
          placeholder="Filter list…"
          autocomplete="off"
          @keydown.escape.stop="civarchiveBaseDropdownOpen = false"
        />
        <div class="browse-filters__dd-scroll">
          <label v-for="bm in filteredCivarchiveBaseOptions" :key="bm" class="browse-filters__dd-item">
            <input type="checkbox" :checked="hasCivarchiveBaseModel(bm)" @change="toggleCivarchiveBaseModel(bm)" />
            <span>{{ bm }}</span>
          </label>
          <p v-if="!filteredCivarchiveBaseOptions.length" class="browse-filters__dd-empty">No matches</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.browse-filters {
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 18%, transparent);
  border-radius: 6px;
  padding: 0.35rem;
  font-size: 0.8rem;
}
.browse-filters__toggle {
  width: 100%;
  text-align: left;
  font: inherit;
  padding: 0.25rem 0.35rem;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.browse-filters__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.35rem 0 0;
  max-height: 40vh;
  overflow: auto;
}
.browse-filters__row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.browse-filters__row--row {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
.browse-filters__label-inline {
  flex: 1;
}
.browse-filters__section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.browse-filters__label {
  font-weight: 600;
  opacity: 0.85;
}
.browse-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
}
.browse-filters__multiselect {
  position: relative;
}
.browse-filters__dd-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font: inherit;
}
.browse-filters__dd-trigger-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.browse-filters__dd-chevron {
  flex-shrink: 0;
  opacity: 0.7;
  font-size: 0.65rem;
}
.browse-filters__dd-panel--portal {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.35rem;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 28%, transparent);
  background: var(--comfy-input-bg, #1a1a1a);
  box-shadow: 0 4px 14px color-mix(in srgb, #000 35%, transparent);
  max-height: min(16rem, 55vh);
}
.browse-filters__dd-filter {
  width: 100%;
}
.browse-filters__dd-scroll {
  overflow-y: auto;
  max-height: 11rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.browse-filters__dd-item {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  cursor: pointer;
  padding: 0.12rem 0.1rem;
  border-radius: 4px;
  font-size: 0.78rem;
  line-height: 1.25;
}
.browse-filters__dd-item:hover {
  background: color-mix(in srgb, var(--fg-color, #888) 10%, transparent);
}
.browse-filters__dd-empty {
  margin: 0.25rem 0;
  opacity: 0.65;
  font-size: 0.75rem;
}
.browse-filters__chk {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}
.at-input--sm {
  font-size: 0.8rem;
}
</style>
