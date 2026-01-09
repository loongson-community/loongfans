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
import OsCard from "./OsCard.vue"
import { useTagTranslation } from "./TagTranslation"
import type { OSInfoItem, OSTag } from "../../types/data"

import osDataJson from "../../data/os.min.json"

const { translateTag } = useTagTranslation()

const tagSet = computed(
  () => new Set((osDataJson as OSInfoItem[]).flatMap((i) => i.tags)),
)
const selectedTags = reactive<Record<string, boolean>>({})

const filteredOsList = computed(() => {
  const activeTags = Object.keys(selectedTags).filter(
    (t: string) => selectedTags[t],
  )
  if (activeTags.length === 0) return osDataJson as OSInfoItem[]
  return (osDataJson as OSInfoItem[]).filter((os) =>
    activeTags.every((t: string) => os.tags.includes(t as OSTag)),
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
