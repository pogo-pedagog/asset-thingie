<script setup lang="ts">
import type { CivitaiModelDetail } from "../types";
import BrowseModelDetail from "./BrowseModelDetail.vue";

const props = defineProps<{
  model: CivitaiModelDetail;
}>();

const emit = defineEmits<{
  close: [];
  downloaded: [];
  error: [msg: string];
}>();

function mirrorRows(m: CivitaiModelDetail): NonNullable<NonNullable<CivitaiModelDetail["sourceSections"]>["mirrors"]> {
  const rows = m.sourceSections?.mirrors;
  return Array.isArray(rows) ? rows : [];
}

function expandMirrorUrl(url: string | undefined): string {
  const u = (url ?? "").trim();
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("//")) return `https:${u}`;
  if (u.startsWith("/")) return `https://civarchive.com${u}`;
  return u;
}
</script>

<template>
  <div class="browse-detail-host">
    <BrowseModelDetail
      :model="props.model"
      @close="emit('close')"
      @downloaded="emit('downloaded')"
      @error="emit('error', $event)"
    />
    <section
      v-if="
        props.model.source === 'civarchive' && (mirrorRows(props.model).length || props.model.sourceSections?.sha256)
      "
      class="browse-detail-host__extra"
    >
      <p v-if="props.model.sourceSections?.sha256" class="browse-detail-host__sha">
        <span class="browse-detail-host__sha-label">SHA256</span>
        <code>{{ props.model.sourceSections.sha256 }}</code>
      </p>
      <template v-if="mirrorRows(props.model).length">
        <h4 class="browse-detail-host__h">Mirrors</h4>
        <table class="browse-detail-host__tbl">
          <thead>
            <tr>
              <th>Source</th>
              <th>URL</th>
              <th>Flags</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in mirrorRows(props.model)" :key="i">
              <td>{{ row.source ?? "—" }}</td>
              <td class="browse-detail-host__url">
                <a v-if="expandMirrorUrl(row.url)" :href="expandMirrorUrl(row.url)" target="_blank" rel="noreferrer">{{
                  expandMirrorUrl(row.url)
                }}</a>
                <span v-else>—</span>
              </td>
              <td>
                <span v-if="row.is_gated" class="browse-detail-host__pill">gated</span>
                <span v-if="row.is_paid" class="browse-detail-host__pill">paid</span>
                <span v-if="row.deletedAt != null" class="browse-detail-host__pill">deleted</span>
                <span v-if="!row.is_gated && !row.is_paid && row.deletedAt == null">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
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
.browse-detail-host__h {
  margin: 0.5rem 0 0.35rem;
  font-size: 0.95rem;
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
.browse-detail-host__tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.browse-detail-host__tbl th,
.browse-detail-host__tbl td {
  border: 1px solid color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
  padding: 0.25rem 0.35rem;
  vertical-align: top;
}
.browse-detail-host__url {
  word-break: break-all;
  max-width: 28rem;
}
.browse-detail-host__pill {
  display: inline-block;
  margin-right: 0.25rem;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  background: color-mix(in srgb, var(--fg-color, #888) 12%, transparent);
  font-size: 0.72rem;
}
</style>
