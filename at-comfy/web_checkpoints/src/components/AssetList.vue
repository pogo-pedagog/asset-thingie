<script setup lang="ts">
import { useAssetsStore } from "../stores/assets";
import { storeToRefs } from "pinia";
import AssetCard from "./AssetCard.vue";

const store = useAssetsStore();
const { items } = storeToRefs(store);
</script>

<template>
  <div class="at-list">
    <AssetCard v-for="it in items" :key="it.asset_id" :item="it" compact />
  </div>
</template>

<style scoped>
.at-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.5rem;
}
</style>
