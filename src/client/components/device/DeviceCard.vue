<template>
  <a :href="href" class="card">
    <div class="image-container">
      <img :src="image" />
    </div>
    <div class="main">
      <div>
        <div class="name">{{ name }}</div>
        <div class="description">{{ spec }}</div>
      </div>
      <div v-if="tags" class="tags-container">
        <div v-for="tag in tags" :key="tag" class="tag">
          {{ tag }}
        </div>
      </div>
      <Button
        v-if="isComparisonEnabled"
        class="floating-button"
        :label="
          isComparing
            ? $t('chips.buttons.remove_compare')
            : $t('chips.buttons.add_compare')
        "
        @click.prevent.stop="
          comparisonStore.toggleComparison(props.comparisonKey!)
        "
      />
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Button } from "primevue"
import { useCPUComparisonStore } from "@src/client/stores/CPUComparisonStore"

const props = defineProps<{
  name: string
  spec: string
  href: string
  image: string
  tags: string
  comparisonKey?: string
}>()

const comparisonStore = useCPUComparisonStore()

const tags = computed(() => props.tags?.split(",").map((i) => i.trim()))

const isComparisonEnabled = computed(() => {
  return props.comparisonKey !== undefined
})

const isComparing = computed(() => {
  return isComparisonEnabled.value
    ? comparisonStore.isIncludedInComparison(props.comparisonKey!)
    : false
})
</script>

<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  color: unset;
  background-color: white;
  text-decoration: unset;
  border: 1px solid;
  border-radius: 12px;
  max-width: 520px;
  overflow: hidden;
  transition:
    color 0.3s ease,
    margin-top 0.3s ease,
    height 0.3s ease;
}

.card:hover {
  color: unset;
  border-color: #e60013;
}

.image-container {
  height: 150px;
  width: 150px;
  flex-shrink: 0;
}

.image-container img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 8px;
  min-width: 200px;
  position: relative;
}

.name {
  font-size: 1.6em;
}

.description {
  margin-top: 4px;
  font-size: 1.1em;
  color: #8d8d8d;
}

.tags-container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tag {
  padding: 4px 8px;
  border: 1px solid;
  border-color: #8d8d8d;
  border-radius: 8px;
  font-size: 0.9em;
}

.floating-button {
  opacity: 0;
  color: white;
  text-decoration: none;
  position: absolute;
  right: 0;
  bottom: 0;
  transition: opacity 0.2s ease;
}

.card:hover .floating-button {
  opacity: 1;
}

@media (hover: none) {
  .floating-button {
    display: none;
  }
}
</style>
