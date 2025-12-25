<template>
  <div>
    <div class="tags-filter">
      <ToggleButton
        v-for="tag in tagSet"
        :key="tag"
        v-model="selectedTags[tag]"
        :on-label="tag"
        :off-label="tag"
        size="small"
      />
    </div>
    <div class="os-list">
      <OsCard v-for="card in filteredOsList" :key="card.name" :data="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import ToggleButton from "primevue/togglebutton";
import OsCard from "./OsCard.vue";
import type { OsData } from "../../.vitepress/locales/zh/os";

const { tm } = useI18n();

const osDataList = computed(() => tm("osDataList") as OsData[]);
const tagSet = computed(() => new Set(osDataList.value.flatMap((i) => i.tags)));
const selectedTags = reactive<Record<string, boolean>>({});

const filteredOsList = computed(() => {
  const activeTags = new Set(
    Object.keys(selectedTags).filter((t) => selectedTags[t])
  );
  return activeTags.size
    ? osDataList.value.filter((os) => os.tags.some((t) => activeTags.has(t)))
    : osDataList.value;
});
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
