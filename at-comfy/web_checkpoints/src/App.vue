<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useAssetsStore } from "./stores/assets";
import { storeToRefs } from "pinia";
import Toolbar from "./components/Toolbar.vue";
import StatusBar from "./components/StatusBar.vue";
import AssetGrid from "./components/AssetGrid.vue";
import AssetList from "./components/AssetList.vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import DetailPanel from "./components/DetailPanel.vue";

const store = useAssetsStore();
const { connected, items, loading, loadingMore, viewMode, settingsOpen, selectedAssetId } =
  storeToRefs(store);

const scrollRoot = ref<HTMLElement | null>(null);

const NEAR_BOTTOM_PX = 160;

function isNearBottom(el: HTMLElement): boolean {
  const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
  return gap <= NEAR_BOTTOM_PX;
}

function tryLoadMore(): void {
  const root = scrollRoot.value;
  if (!root || !store.hasMore) return;
  if (store.loading || store.loadingMore) return;
  if (!isNearBottom(root)) return;
  void store.loadMore();
}

let scrollRaf = 0;
function onScrollRoot(): void {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    tryLoadMore();
  });
}

watch(
  () => scrollRoot.value,
  (root, prev) => {
    if (prev) prev.removeEventListener("scroll", onScrollRoot);
    if (!root) return;
    root.addEventListener("scroll", onScrollRoot, { passive: true });
    requestAnimationFrame(() => tryLoadMore());
  },
  { flush: "post", immediate: true },
);

watch(
  [items, loading, loadingMore, connected],
  () => {
    requestAnimationFrame(() => tryLoadMore());
  },
  { flush: "post" },
);

onMounted(() => {
  void store.bootstrap();
});

onUnmounted(() => {
  const root = scrollRoot.value;
  if (root) root.removeEventListener("scroll", onScrollRoot);
});
</script>

<template>
  <div class="at-app">
    <div v-if="!connected" class="at-main-column">
      <Toolbar />
      <StatusBar />
      <div class="at-empty at-empty--fill">
        <p>Could not connect to AssetThingie at <code>{{ store.baseUrlInput }}</code>.</p>
        <p class="at-empty__sub">Start the app or open settings to change the URL.</p>
        <button type="button" class="at-empty__btn" @click="store.settingsOpen = true">
          Settings
        </button>
        <button type="button" class="at-empty__btn" @click="store.bootstrap()">Retry</button>
      </div>
    </div>
    <div v-else class="at-main-column">
      <div class="at-chrome">
        <Toolbar />
        <StatusBar />
      </div>
      <div
        v-if="!store.loading && !items.length && !store.error"
        class="at-empty at-empty--fill"
      >
        <p>No checkpoints in the index for this filter.</p>
        <button type="button" class="at-empty__btn" @click="store.resetFilters()">
          Reset filters
        </button>
      </div>
      <div v-else ref="scrollRoot" class="at-scroll">
        <AssetGrid v-if="viewMode === 'grid'" />
        <AssetList v-else />
      </div>
    </div>
    <SettingsPanel v-if="settingsOpen" />
    <DetailPanel v-if="selectedAssetId != null" />
  </div>
</template>

<style scoped>
.at-app {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
}
.at-main-column {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
  overflow: hidden;
}
.at-chrome {
  flex-shrink: 0;
}
.at-scroll {
  flex: 1 1 0%;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
}
.at-empty {
  padding: 1rem;
  font-size: 0.85rem;
  line-height: 1.4;
}
.at-empty--fill {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
.at-empty__sub {
  opacity: 0.85;
  font-size: 0.8rem;
}
.at-empty code {
  font-size: 0.75rem;
  word-break: break-all;
}
.at-empty__btn {
  font: inherit;
  font-size: 0.8rem;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 30%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
</style>
