<script setup lang="ts">
import { useAssetsStore } from "../stores/assets";
import { storeToRefs } from "pinia";

const store = useAssetsStore();
const { connected, total, items, loading, loadingMore, error, toast } =
  storeToRefs(store);
</script>

<template>
  <div class="at-status">
    <span
      class="at-status__dot"
      :class="connected ? 'at-status__dot--ok' : 'at-status__dot--bad'"
      :title="connected ? 'Connected' : 'Disconnected'"
    />
    <span class="at-status__text">
      <template v-if="loading && !items.length">Loading…</template>
      <template v-else-if="error">{{ error }}</template>
      <template v-else>Showing {{ items.length }} / {{ total }}</template>
      <span v-if="loadingMore" class="at-status__more"> · More…</span>
    </span>
    <button
      v-if="!connected || error"
      type="button"
      class="at-status__retry"
      @click="store.bootstrap()"
    >
      Retry
    </button>
    <span v-if="toast" class="at-status__toast">{{ toast }}</span>
  </div>
</template>

<style scoped>
.at-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.35rem 0.5rem;
  font-size: 0.8rem;
  opacity: 0.9;
  border-bottom: 1px solid color-mix(in srgb, var(--fg-color, #ccc) 12%, transparent);
}
.at-status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.at-status__dot--ok {
  background: var(--p-green-500, #22c55e);
}
.at-status__dot--bad {
  background: var(--p-red-500, #ef4444);
}
.at-status__text {
  flex: 1;
  min-width: 0;
}
.at-status__retry {
  font: inherit;
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.at-status__toast {
  color: var(--p-green-600, #16a34a);
}
</style>
