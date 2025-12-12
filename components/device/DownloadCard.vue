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
    <template v-if="$slots.default">
      <Divider />
      <div class="changelog-title-bar">
        <Button
          variant="text"
          class="expand-button"
          :class="expand ? 'upside-down' : ''"
          @click="() => (expand = !expand)"
        >
          <template #icon>
            <IconExpandMore />
          </template>
        </Button>
        <div class="changelog-title-text">Changelog</div>
      </div>
      <div class="changelog">
        <div class="changelog-main">
          <slot />
        </div>
        <div class="changelog-detail" v-show="expand">
          <slot name="detail" />
        </div>
      </div>
    </template>
  </div>
  <div v-else class="mb-[24px]">
    <Panel :header="title" toggleable collapsed>
      <div class="metadata">
        <span>Version: {{ version }}</span>
        <span>{{ size }}</span>
        <span>{{ date }}</span>
        <CopyInline :text="sha256" type="SHA-256" />
      </div>
      <Button label="Download" class="download-button mt-[8px]">
        <template #icon>
          <IconDownload />
        </template>
      </Button>
      <div v-if="$slots.default" class="changelog">
        <Divider />
        <div class="changelog-title-text">Changelog</div>
        <div class="changelog-detail">
          <slot />
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button, Panel, Divider } from "primevue";
import IconDownload from "~icons/material-symbols/download";
import IconExpandMore from "~icons/material-symbols/expand-more";
import CopyInline from "./CopyInline.vue";

defineProps({
  title: String,
  version: String,
  size: String,
  date: String,
  sha256: String,
  latest: Boolean,
});

const expand = ref(false);
</script>

<style scoped>
.download-card {
  --common-gap: 24px;

  padding: var(--common-gap);
  border: 1px solid;
  border-color: black;
  border-radius: var(--p-border-radius-lg);

  margin-bottom: var(--common-gap);
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: space-between;
}

.text {
  flex-grow: 1;
}

.title {
  font-size: larger;
  font-weight: bold;
  overflow-wrap: anywhere;
}

.metadata {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1em;
  align-items: center;
  width: fit-content;
  margin-top: 0.3em;

  color: #8d8d8d;
  font-size: small;
  line-height: 1.5em;
}

.download-button {
  min-width: fit-content;
  align-self: flex-start;
}

.changelog-title-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.changelog-title-text {
  font-weight: bold;
}

.expand-button {
  height: 1.5em;
  width: 1.5em;
}

.changelog-main,
.changelog-detail {
  font-size: small;
}

.upside-down {
  transform: rotate(180deg);
}

.mt-\[8px\] {
  margin-top: 8px;
}

.mb-\[24px\] {
  margin-bottom: 24px;
}

.changelog-main > *:first-child,
:deep(.p-panel-content) > *:first-child {
  margin-top: 0;
}

.changelog-main > *:last-child,
.changelog-detail > *:last-child,
:deep(.p-panel-content) > *:last-child {
  margin-bottom: 0;
}

:deep(.p-panel-title) {
  line-height: unset;
}

@media (width >= 40rem) {
  .main-content {
    flex-wrap: nowrap;
    gap: var(--common-gap);
  }
}
</style>
