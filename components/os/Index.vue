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
      <OsCard v-for="card in filteredOsList" :key="card.name" :data="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import { useI18n } from "vue-i18n"
import ToggleButton from "primevue/togglebutton"
import OsCard from "./OsCard.vue"
import { useTagTranslation, OsData } from "./osdata_api"

import osDataJson from "../../data/os.min.json"

const { locale } = useI18n()
const { translateTag } = useTagTranslation()

// 转换JSON数据
const osDataList = computed(() => {
  const data = osDataJson as OsData[]
  const currentLocale = locale.value as "zh" | "en"
  return data.map((item) => ({
    name: item.name[currentLocale] || item.name.en,
    href: item.href,
    image: item.image,
    description: item.description[currentLocale] || item.description.en,
    tags: item.tags,
  }))
})

const tagSet = computed(
  () => new Set(osDataList.value.flatMap((i: any) => i.tags)),
)
const selectedTags = reactive<Record<string, boolean>>({})

const filteredOsList = computed(() => {
  const activeTags = Object.keys(selectedTags).filter(
    (t: string) => selectedTags[t],
  )
  if (activeTags.length === 0) return osDataList.value
  return osDataList.value.filter((os: any) =>
    activeTags.every((t: string) => os.tags.includes(t)),
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
