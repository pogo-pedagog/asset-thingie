<script setup lang="ts">
import type { CivitaiModelDetail } from "../types";
import BrowseModelDetail from "./BrowseModelDetail.vue";

const props = defineProps<{
  model: CivitaiModelDetail;
}>();

const emit = defineEmits<{
  close: [];
  downloaded: [payload: { count: number }];
  error: [msg: string];
}>();
</script>

<template>
  <div class="browse-detail-host">
    <BrowseModelDetail
      :model="props.model"
      @close="emit('close')"
      @downloaded="emit('downloaded', $event)"
      @error="emit('error', $event)"
    />
    <section
      v-if="props.model.source === 'civarchive' && props.model.sourceSections?.sha256"
      class="browse-detail-host__extra"
    >
      <p class="browse-detail-host__sha">
        <span class="browse-detail-host__sha-label">SHA256 (primary file)</span>
        <code>{{ props.model.sourceSections.sha256 }}</code>
      </p>
      <p class="browse-detail-host__hint">Pick a mirror in the detail form above; the worker still tries fallbacks if the preferred URL fails.</p>
    </section>
  </div>
</template>

<style scoped>
.browse-detail-host__extra {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid color-mix(in srgb, var(--fg-color, #888) 15%, transparent);
  font-size: 0.85rem;
}
.browse-detail-host__sha {
  margin: 0.25rem 0;
  word-break: break-all;
}
.browse-detail-host__sha-label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 0.15rem;
}
.browse-detail-host__hint {
  margin: 0.5rem 0 0;
  font-size: 0.72rem;
  opacity: 0.8;
}
</style>
