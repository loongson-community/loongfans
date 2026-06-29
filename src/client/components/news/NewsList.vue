<template>
  <ul>
    <li v-for="item in filteredData" :key="item.url">
      <a :href="`${basePath}${item.url}`">
        {{ item.frontmatter.pageTitle }} |
        {{ item.frontmatter.pageSubTitle }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData } from "vitepress"
import { getLocalePrefix } from "@src/client/utils/language"
// @ts-expect-error 'data' export is handled by VitePress
import { data } from "@src/node/data-loaders/news.data"
import type { ContentData } from "vitepress"

const props = withDefaults(
  defineProps<{ category: string; limit?: number }>(),
  { limit: 10 },
)

const { localeIndex } = useData()
const basePath = computed(() => getLocalePrefix(localeIndex.value))
const filteredData = data
  .filter(
    (item: ContentData & { localeIndex: string; category: string }) =>
      item.localeIndex == localeIndex.value && item.category == props.category,
  )
  .slice(0, props.limit)
</script>
