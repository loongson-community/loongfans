<template>
  <div>
    <div class="tags-filter">
      <ToggleButton
        v-for="tag in tagSet"
        :key="tag"
        v-model="selectedTags[tag]"
        :on-label="translateTag(tag)"
        :off-label="translateTag(tag)"
        size="small"
      />
    </div>
    <div class="os-list">
      <OsCard v-for="os in filteredOsList" :key="os.name.en" :data="os" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import ToggleButton from "primevue/togglebutton"
import { useI18n } from "vue-i18n"

import type { OSTag } from "@src/types/data"
import OsCard from "./OsCard.vue"
import { useTagTranslation } from "./tagTranslation"

import osData from "virtual:loongfans-data/os"
import type { SupportedLanguage } from "@src/types/language"

const { locale } = useI18n()
const { translateTag } = useTagTranslation()

const tagSet = computed(() => new Set(osData.flatMap((i) => i.tags)))
const selectedTags = reactive<Record<string, boolean>>({})

const filteredOsList = computed(() => {
  const activeTags = Object.keys(selectedTags).filter(
    (t: string) => selectedTags[t],
  )
  const filteredList =
    activeTags.length === 0
      ? osData
      : osData.filter((os) =>
          activeTags.every((t: string) => os.tags.includes(t as OSTag)),
        )

  const collator = new Intl.Collator(locale.value)

  return filteredList.sort((a, b) =>
    collator.compare(
      a.name[locale.value as SupportedLanguage] ?? a.name.en ?? "",
      b.name[locale.value as SupportedLanguage] ?? b.name.en ?? "",
    ),
  )
})
</script>

<style scoped>
.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags-filter > * {
  height: 2em;
}

.os-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-block: 16px;
}

@media (width >= 48rem) {
  .os-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
