<template>
  <template v-for="family in data" :key="family.family">
    <h2>{{ family.family }}</h2>
    <template v-for="category in family.categories" :key="category.title">
      <h3>{{ category.title }}</h3>
      <div class="card-grid">
        <DeviceCard
          v-for="device in category.devices"
          :key="device.href"
          :comparison-key="device.comparisonKey"
          :name="device.name"
          :href="device.href"
          :image="device.image"
          :spec="device.spec"
          :tags="device.tags"
        />
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { DeviceIndexData } from "@src/types/device"
import DeviceCard from "./DeviceCard.vue"

defineProps<{ data: DeviceIndexData }>()
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
