<script setup lang="ts">
import { useAssetsStore } from "../stores/assets";
import { storeToRefs } from "pinia";
import AssetCard from "./AssetCard.vue";

const store = useAssetsStore();
const { items } = storeToRefs(store);
</script>

<template>
  <div class="at-grid">
    <AssetCard v-for="it in items" :key="it.asset_id" :item="it" />
  </div>
</template>

<style scoped>
.at-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  align-content: start;
}
@media (max-width: 280px) {
  .at-grid {
    grid-template-columns: 1fr;
  }
}
</style>
