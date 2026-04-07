<script setup lang="ts">
import { computed } from "vue";
import { useAssetsStore } from "../stores/assets";
import { storeToRefs } from "pinia";

const store = useAssetsStore();
const {
  baseModel,
  filterOptions,
  folderPath,
  libraryRootPath,
  subfolders,
  selectedTags,
  selectedCategory,
  openFilterSection,
  tagFilterText,
} = storeToRefs(store);

function onFilterChange() {
  void store.loadAssets(true);
}

const folderFilterActive = computed(() => Boolean(folderPath.value));
const tagFilterActive = computed(() => selectedTags.value.length > 0);
const categoryFilterActive = computed(() => Boolean(selectedCategory.value));

const breadcrumbItems = computed(() => {
  const root = libraryRootPath.value;
  const cur = folderPath.value;
  const items: { label: string; path: string }[] = [{ label: "Library", path: "" }];
  if (!cur || !root || !cur.startsWith(root)) return items;
  const rest = cur.slice(root.length).replace(/^\//, "");
  if (!rest) return items;
  const parts = rest.split("/").filter(Boolean);
  let acc = root.replace(/\/$/, "");
  for (const p of parts) {
    acc = `${acc}/${p}`;
    items.push({ label: p, path: acc });
  }
  return items;
});

const filteredTagRows = computed(() => {
  const tags = filterOptions.value?.tags ?? [];
  const q = tagFilterText.value.trim().toLowerCase();
  if (!q) return tags;
  return tags.filter((t) => t.name.toLowerCase().includes(q));
});

function isTagSelected(name: string): boolean {
  return selectedTags.value.includes(name);
}
</script>

<template>
  <div class="at-filters">
    <div class="at-filters__row">
      <label class="at-filters__field">
        <span>Base model</span>
        <select v-model="baseModel" class="at-select" @change="onFilterChange">
          <option value="">Any</option>
          <option
            v-for="bm in filterOptions?.base_models ?? []"
            :key="bm"
            :value="bm"
          >
            {{ bm }}
          </option>
        </select>
      </label>
    </div>

    <div class="at-filter-modes" role="tablist" aria-label="Filter by folder, tag, or category">
      <button
        type="button"
        class="at-mode-btn"
        :class="{ 'at-mode-btn--on': openFilterSection === 'folder' }"
        title="Browse folders"
        :aria-pressed="openFilterSection === 'folder'"
        @click="store.toggleFilterSection('folder')"
      >
        <span class="at-mode-btn__icon" aria-hidden="true">&#128193;</span>
        <span v-if="folderFilterActive" class="at-mode-btn__dot" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="at-mode-btn"
        :class="{ 'at-mode-btn--on': openFilterSection === 'tag' }"
        title="Filter by tags"
        :aria-pressed="openFilterSection === 'tag'"
        @click="store.toggleFilterSection('tag')"
      >
        <span class="at-mode-btn__icon" aria-hidden="true">&#127991;</span>
        <span v-if="tagFilterActive" class="at-mode-btn__dot" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="at-mode-btn"
        :class="{ 'at-mode-btn--on': openFilterSection === 'category' }"
        title="Filter by category"
        :aria-pressed="openFilterSection === 'category'"
        @click="store.toggleFilterSection('category')"
      >
        <span class="at-mode-btn__icon" aria-hidden="true">&#128194;</span>
        <span v-if="categoryFilterActive" class="at-mode-btn__dot" aria-hidden="true" />
      </button>
    </div>

    <div v-if="openFilterSection === 'folder'" class="at-filter-section">
      <div class="at-folder-nav">
        <div class="at-breadcrumb">
          <template v-for="(bc, idx) in breadcrumbItems" :key="bc.path + idx">
            <span v-if="idx > 0" class="at-breadcrumb__sep">›</span>
            <button type="button" class="at-breadcrumb__seg" @click="store.navigateFolderToAbsolute(bc.path)">
              {{ bc.label }}
            </button>
          </template>
        </div>
        <div v-if="subfolders.length" class="at-folder-chips">
          <button
            v-for="s in subfolders"
            :key="s"
            type="button"
            class="at-folder-chip"
            @click="store.drillFolder(s)"
          >
            {{ s }}
          </button>
        </div>
        <p v-else class="at-folder-empty">No subfolders here</p>
      </div>
    </div>

    <div v-else-if="openFilterSection === 'tag'" class="at-filter-section">
      <div class="at-tag-panel">
        <div class="at-tag-panel__top">
          <input
            v-model="tagFilterText"
            type="search"
            class="at-tag-search"
            placeholder="Filter tag list…"
            autocomplete="off"
          />
          <button type="button" class="at-folder-reset" @click="store.resetSelectedTags()">Reset</button>
        </div>
        <p class="at-tag-hint">All selected tags must match (AND).</p>
        <div class="at-tag-chips">
          <button
            v-for="t in filteredTagRows"
            :key="t.tag_id"
            type="button"
            class="at-tag-chip"
            :class="{ 'at-tag-chip--selected': isTagSelected(t.name) }"
            @click="store.toggleTag(t.name)"
          >
            {{ t.name }}
            <span class="at-tag-chip__count">{{ t.count }}</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="openFilterSection === 'category'" class="at-filter-section">
      <div class="at-category-panel">
        <button type="button" class="at-folder-reset" @click="store.resetCategory()">Reset</button>
        <div v-if="(filterOptions?.categories ?? []).length" class="at-category-chips">
          <button
            v-for="c in filterOptions?.categories ?? []"
            :key="c"
            type="button"
            class="at-category-chip"
            :class="{ 'at-category-chip--selected': selectedCategory === c }"
            @click="store.setCategory(c)"
          >
            {{ c }}
          </button>
        </div>
        <p v-else class="at-folder-empty">No categories in index</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.at-filters {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.at-filters__row {
  display: flex;
  flex-direction: row;
  gap: 0.35rem;
}
.at-filters__field {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.75rem;
  flex: 1 1 0;
  min-width: 0;
}
.at-filters__field span {
  opacity: 0.85;
}
.at-select {
  width: 100%;
  font: inherit;
  font-size: 0.8rem;
  padding: 0.25rem 0.35rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: var(--comfy-input-bg, var(--p-content-background, #1e1e1e));
  color: inherit;
}
.at-filter-modes {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  margin-top: 0.15rem;
}
.at-mode-btn {
  position: relative;
  flex: 1;
  font: inherit;
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
  line-height: 1;
}
.at-mode-btn--on {
  border-color: var(--p-primary-color, #6366f1);
}
.at-mode-btn__icon {
  font-size: 1rem;
  opacity: 0.95;
}
.at-mode-btn__dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--p-primary-color, #6366f1);
  box-shadow: 0 0 0 1px var(--comfy-input-bg, #1e1e1e);
}
.at-filter-section {
  margin-top: 0.25rem;
  padding: 0.35rem 0;
  border-top: 1px solid color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
  max-height: 11rem;
  overflow: auto;
  overscroll-behavior: contain;
}
.at-folder-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
}
.at-folder-reset {
  font: inherit;
  font-size: 0.7rem;
  align-self: flex-start;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem;
  line-height: 1.3;
}
.at-breadcrumb__sep {
  opacity: 0.55;
  font-size: 0.65rem;
}
.at-breadcrumb__seg {
  font: inherit;
  font-size: 0.72rem;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.9;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.at-folder-chips,
.at-tag-chips,
.at-category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.at-folder-chip,
.at-tag-chip,
.at-category-chip {
  font: inherit;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 28%, transparent);
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
  color: inherit;
  cursor: pointer;
}
.at-folder-empty {
  margin: 0;
  opacity: 0.75;
  font-size: 0.72rem;
}
.at-tag-panel__top {
  display: flex;
  flex-direction: row;
  gap: 0.35rem;
  align-items: center;
  margin-bottom: 0.25rem;
}
.at-tag-search {
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 0.75rem;
  padding: 0.25rem 0.35rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: var(--comfy-input-bg, var(--p-content-background, #1e1e1e));
  color: inherit;
}
.at-tag-hint {
  margin: 0 0 0.35rem;
  font-size: 0.65rem;
  opacity: 0.8;
}
.at-tag-chip--selected,
.at-category-chip--selected {
  border-color: var(--p-primary-color, #6366f1);
  background: color-mix(in srgb, var(--p-primary-color, #6366f1) 22%, transparent);
}
.at-tag-chip__count {
  margin-left: 0.25rem;
  opacity: 0.75;
  font-size: 0.65rem;
}
.at-category-panel {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
}
</style>
