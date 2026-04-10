<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBrowseStore } from "../stores/browse";
import BrowseResultCard from "./BrowseResultCard.vue";

const browse = useBrowseStore();
const { items, batchMode, batchIds } = storeToRefs(browse);
</script>

<template>
  <div class="result-grid">
    <BrowseResultCard
      v-for="it in items"
      :key="it.id"
      :item="it"
      :batch-mode="batchMode"
      :batch-selected="batchIds.has(String(it.id))"
      @open="browse.openModel(it.id)"
      @toggle-batch="browse.toggleBatchId(String(it.id))"
    />
  </div>
</template>

<style scoped>
.result-grid {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
</style>
