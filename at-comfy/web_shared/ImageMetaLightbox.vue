<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** Poster or full image URL. */
  imageUrl: string | null;
  /** When set with ``mediaType=video``, opens the video lightbox. */
  playbackUrl?: string | null;
  /** Optional explicit poster for ``<video>`` (e.g. frozen frame). */
  posterUrl?: string | null;
  /** ``image`` | ``video`` — when ``video``, prefer ``playbackUrl``. */
  mediaType?: string | null;
  meta?: Record<string, unknown> | null;
}>();

defineEmits<{
  close: [];
}>();

const isVideo = computed(() => (props.mediaType || "").toLowerCase() === "video" && Boolean(props.playbackUrl));

const isOpen = computed(() => Boolean(props.imageUrl || props.playbackUrl));
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="at-imlb" @click.self="$emit('close')">
      <!-- @click.self: dismiss when hitting padding / flex gaps / dead area beside narrower image or meta -->
      <div class="at-imlb__inner" @click.self="$emit('close')">
        <button type="button" class="at-imlb__x" @click="$emit('close')">×</button>
        <video
          v-if="isVideo"
          :key="playbackUrl || ''"
          class="at-imlb__video"
          :src="playbackUrl || undefined"
          :poster="posterUrl || imageUrl || undefined"
          controls
          playsinline
        />
        <img v-else-if="imageUrl" :src="imageUrl" alt="Preview" />
        <pre v-if="meta && Object.keys(meta).length" class="at-imlb__meta">{{ JSON.stringify(meta, null, 2) }}</pre>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.at-imlb {
  position: fixed;
  inset: 0;
  z-index: 200000;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}
.at-imlb__inner {
  position: relative;
  max-width: 92vw;
  max-height: 92vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.at-imlb__inner img,
.at-imlb__video {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}
.at-imlb__x {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  border: none;
  background: var(--comfy-menu-bg, #333);
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  z-index: 1;
}
.at-imlb__meta {
  font-size: 0.7rem;
  max-height: 30vh;
  overflow: auto;
  margin: 0;
  padding: 0.5rem;
  background: color-mix(in srgb, var(--fg-color, #888) 8%, transparent);
  border-radius: 4px;
}
</style>
