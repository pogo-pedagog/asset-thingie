<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBrowseStore } from "../stores/browse";
import { BROWSE_BASE_MODELS, BROWSE_CONTENT_TYPES, BROWSE_PERIOD_OPTIONS, BROWSE_SORT_OPTIONS } from "../constants";
const { searchType, contentTypes, baseModels, sort, period, activeSource, civarchiveKind } =
  storeToRefs(useBrowseStore());

const expanded = ref(false);

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
        <p class="browse-filters__note">Civitai-only filters are hidden for CivArchive search.</p>
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
  </div>
</template>

<style scoped>
.browse-filters {
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 18%, transparent);
  border-radius: 6px;
  padding: 0.35rem;
  font-size: 0.8rem;
}
.browse-filters__note {
  margin: 0.35rem 0 0;
  opacity: 0.75;
  font-size: 0.75rem;
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
