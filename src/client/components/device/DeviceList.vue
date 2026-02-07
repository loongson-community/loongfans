<template>
  <template v-for="family in data" :key="family.family">
    <h2>{{ family.family }}</h2>
    <template v-for="category in family.categories" :key="category.title">
      <h3>{{ category.title }}</h3>
      <div class="card-grid">
        <DeviceCard
          v-for="device in category.devices"
          :key="device.id"
          :comparison-key="device.comparisonKey"
          :name="device.name"
          :href="devicePageLink(device)"
          :image="imageLink(device)"
          :spec="device.spec"
          :tags="device.tags"
        />
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useData } from "vitepress"
import { computed } from "vue"

import { getLocalePrefix } from "@src/client/utils/language"
import type { DeviceListItem, DeviceListData } from "@src/types/device"
import DeviceCard from "./DeviceCard.vue"

defineProps<{ data: DeviceListData }>()

const { localeIndex } = useData()
const basePath = computed(() => getLocalePrefix(localeIndex.value))
const devicePageLink = (device: DeviceListItem) => {
  if (device.href) {
    return device.href
  }
  return `${basePath.value}/devices/${device.id}`
}

const imageLink = (device: DeviceListItem) => {
  if (device.image) {
    return device.image
  }
  return `/images/devices/${device.id}.thumbnail.webp`
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-block: 16px;
}

@media (width >= 64rem) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
