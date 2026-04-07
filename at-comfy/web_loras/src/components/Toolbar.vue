<script setup lang="ts">
import FilterPanel from "./FilterPanel.vue";
import { useAssetsStore } from "../stores/assets";

const store = useAssetsStore();
</script>

<template>
  <div class="at-toolbar">
    <div v-if="store.selectionMode" class="at-toolbar__row at-toolbar__row--select">
      <span class="at-toolbar__sel-label">{{ store.selectedCount }} selected</span>
      <button type="button" class="at-toolbar__chip" @click="store.selectAllVisibleAssets">
        All visible
      </button>
      <button type="button" class="at-toolbar__chip" @click="store.clearAssetSelection">
        Clear
      </button>
      <button
        type="button"
        class="at-toolbar__chip at-toolbar__chip--primary"
        @click="store.batchReEnrichSelected"
      >
        Re-enrich selected
      </button>
      <button type="button" class="at-toolbar__chip" @click="store.toggleSelectionMode">Done</button>
    </div>
    <div class="at-toolbar__row at-toolbar__row--search">
      <input
        v-model="store.searchQuery"
        type="search"
        class="at-toolbar__search"
        placeholder="name:, trigger:, category:, tag: or free text"
        autocomplete="off"
      />
      <button
        type="button"
        class="at-icon-btn"
        title="Grid view"
        :aria-pressed="store.viewMode === 'grid'"
        @click="store.setViewMode('grid')"
      >
        ▦
      </button>
      <button
        type="button"
        class="at-icon-btn"
        title="List view"
        :aria-pressed="store.viewMode === 'list'"
        @click="store.setViewMode('list')"
      >
        ≡
      </button>
      <button
        type="button"
        class="at-icon-btn"
        title="Select assets"
        :aria-pressed="store.selectionMode"
        @click="store.toggleSelectionMode"
      >
        ☑
      </button>
      <button
        type="button"
        class="at-icon-btn"
        title="Settings"
        @click="store.settingsOpen = true"
      >
        ⚙
      </button>
      <button type="button" class="at-reset" @click="store.resetFilters()">
        Reset
      </button>
    </div>
    <FilterPanel />
  </div>
</template>

<style scoped>
.at-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-shrink: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #ccc) 12%, transparent);
}
.at-toolbar__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.at-toolbar__row--search {
  width: 100%;
}
.at-toolbar__search {
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 0.85rem;
  padding: 0.35rem 0.45rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: var(--comfy-input-bg, var(--p-content-background, #1e1e1e));
  color: inherit;
}
.at-icon-btn {
  font: inherit;
  font-size: 0.85rem;
  line-height: 1;
  padding: 0.35rem 0.45rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-icon-btn[aria-pressed="true"] {
  border-color: var(--p-primary-color, #6366f1);
}
.at-reset {
  font: inherit;
  font-size: 0.75rem;
  padding: 0.25rem 0.45rem;
  border-radius: 4px;
  border: none;
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
  color: inherit;
  cursor: pointer;
}
.at-toolbar__row--select {
  font-size: 0.75rem;
  flex-wrap: wrap;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #ccc) 10%, transparent);
}
.at-toolbar__sel-label {
  margin-right: 0.25rem;
  opacity: 0.9;
}
.at-toolbar__chip {
  font: inherit;
  font-size: 0.72rem;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-toolbar__chip--primary {
  border-color: var(--p-primary-color, #6366f1);
  background: color-mix(in srgb, var(--p-primary-color, #6366f1) 18%, transparent);
}
</style>
