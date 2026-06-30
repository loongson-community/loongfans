<template>
  <ul>
    <li v-for="item in filteredData" :key="item.url">
      <a :href="`${item.url}`">
        {{ item.frontmatter.pageTitle }} |
        {{ item.frontmatter.pageSubTitle }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData } from "vitepress"
// @ts-expect-error 'data' export is handled by VitePress
import { data, type NewsData } from "@src/node/data-loaders/news.data"

const props = withDefaults(
  defineProps<{ category: string; limit?: number }>(),
  { limit: 10 },
)

const { localeIndex } = useData()

const filteredData = computed(() => {
  if (!props.category) return data.slice(0, props.limit)

  const map = new Map<string, NewsData>()
  for (const item of data as NewsData[]) {
    if (item.category !== props.category) continue
    if (
      item.localeIndex === localeIndex.value ||
      (item.localeIndex === "root" && !map.has(item.baseUrl))
    )
      map.set(item.baseUrl, item)
  }
  return Array.from(map.values()).slice(0, props.limit)
})
</script>
