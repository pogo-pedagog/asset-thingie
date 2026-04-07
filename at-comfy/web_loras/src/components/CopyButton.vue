<script setup lang="ts">
import { copyText } from "../composables/useClipboard";

const props = defineProps<{
  label: string;
  text: string;
}>();

const emit = defineEmits<{
  copied: [];
}>();

async function onClick() {
  if (await copyText(props.text)) emit("copied");
}
</script>

<template>
  <button type="button" class="at-cbtn" @click.stop="onClick">
    {{ label }}
  </button>
</template>

<style scoped>
.at-cbtn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.35rem 0.5rem;
  margin: 0;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.at-cbtn:hover {
  background: color-mix(in srgb, var(--p-primary-color, #6366f1) 15%, transparent);
}
</style>
