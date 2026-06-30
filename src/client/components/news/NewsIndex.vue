<template>
  <div class="grid grid-cols-2 gap-16">
    <div
      v-for="[category, categoryName] in Object.entries($tm('news.categories'))"
      :key="category"
    >
      <div class="flex justify-between items-baseline">
        <h2 class="shrink">{{ categoryName }}</h2>
        <a :href="`${basePath}/news/${category}`">{{ $t("news.viewMore") }}</a>
      </div>
      <NewsList :category="category" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData } from "vitepress"
import { getLocalePrefix } from "@src/client/utils/language"
import NewsList from "./NewsList.vue"

const { localeIndex } = useData()
const basePath = computed(() => getLocalePrefix(localeIndex.value))
</script>
