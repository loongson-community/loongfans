<template>
  <a :href="data.href" class="distro-card" target="_blank" rel="noopener">
    <div class="icon-container">
      <img :src="data.image" :alt="localizedName" />
    </div>
    <div class="content">
      <div class="header">
        <span class="name">{{ localizedName }}</span>
        <div class="tags">
          <span v-for="tag in data.tags" :key="tag" class="tag">{{
            translateTag(tag)
          }}</span>
        </div>
      </div>
      <p class="description">{{ localizedDescription }}</p>
    </div>
    <div class="link-icon">
      <IconOpenInNew />
    </div>
  </a>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

import IconOpenInNew from "~icons/material-symbols/open-in-new"
import { useTagTranslation } from "./TagTranslation"
import type { LocalizedString, OSInfoItem } from "types/data"

const { data } = defineProps<{ data: OSInfoItem }>()
const { locale } = useI18n()
const { translateTag } = useTagTranslation()

const localizeMsgWithFallback = (msg: LocalizedString) => {
  return msg[locale.value as "zh" | "en"] || msg.en
}

const localizedName = localizeMsgWithFallback(data.name)
const localizedDescription = localizeMsgWithFallback(data.description)
</script>

<style scoped>
.distro-card {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.distro-card:hover {
  border-color: #e60013;
}

.icon-container {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  align-self: center;
}

.icon-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 4px;
}

.name {
  font-size: 1.1em;
  font-weight: bold;
  color: black;
}

.tags {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}

.tag {
  padding-inline: 0.4em;
  font-size: smaller;
  line-height: 1.3em;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  white-space: nowrap;
  color: black;
}

.description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  overflow: hidden;
}

.link-icon {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

@media (width >= 48rem) {
  .distro-card {
    flex-wrap: nowrap;
  }

  .icon-container {
    width: 64px;
    height: 64px;
  }

  .content {
    gap: 4px;
  }

  .header {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
}
</style>
