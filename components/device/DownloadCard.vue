<template>
  <div v-if="latest" class="download-card">
    <div class="main-content">
      <div class="text">
        <div class="title">
          {{ title }}
        </div>
        <div class="metadata">
          <span>Version: {{ version }}</span>
          <span>{{ size }}</span>
          <span>{{ date }}</span>
          <CopyInline :text="sha256" type="SHA-256" />
        </div>
      </div>
      <Button label="Download" class="download-button">
        <template #icon>
          <IconDownload />
        </template>
      </Button>
    </div>
    <Panel
      v-if="$slots.default"
      header="Changelog"
      toggleable
      collapsed
      class="description"
    >
      <slot />
    </Panel>
  </div>
  <div v-else style="margin-bottom: 24px">
    <Panel :header="title" toggleable collapsed>
      <div class="metadata">
        <span>Version: {{ version }}</span>
        <span>{{ size }}</span>
        <span>{{ date }}</span>
        <CopyInline :text="sha256" type="SHA-256" />
      </div>
      <Button label="Download" class="download-button" style="margin-top: 8px">
        <template #icon>
          <IconDownload />
        </template>
      </Button>
      <slot />
    </Panel>
  </div>
</template>

<script setup>
import { Button, Panel } from "primevue";
import IconDownload from "~icons/material-symbols/download";
import CopyInline from "./CopyInline.vue";

defineProps({
  title: String,
  version: String,
  size: String,
  date: String,
  sha256: String,
  latest: Boolean,
});
</script>

<style scoped>
.download-card {
  --common-gap: 24px;

  padding: var(--common-gap);
  border: 1px solid;
  border-color: black;
  border-radius: var(--p-border-radius-lg);

  display: flex;
  flex-direction: column;
  gap: calc(var(--common-gap) / 2) 0;

  margin-bottom: var(--common-gap);
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: calc(var(--common-gap) / 4);
}

.text {
  flex-grow: 1;
}

.title {
  font-size: larger;
  font-weight: bold;
}

.metadata {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1em;
  width: fit-content;
}

.metadata > * {
  color: #8d8d8d;
  font-size: small;
}

:deep(p),
:deep(li) {
  font-size: small;
}

:deep(.p-panel-content) > *:first-child {
  margin-top: 0;
}

:deep(.p-panel-content) > *:last-child {
  margin-bottom: 0;
}

.download-button {
  min-width: fit-content;
  align-self: flex-start;
}

@media (width >= 40rem) {
  .main-content {
    flex-wrap: nowrap;
    gap: var(--common-gap);
  }
}
</style>
