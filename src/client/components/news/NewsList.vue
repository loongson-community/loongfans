<template>
  <ul>
    <li v-for="item in newsList" :key="item.url">
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

const filteredData = computed<NewsData[]>(() => {
  if (!props.category) return data

  const getPriority = (loc: string | undefined) =>
    loc === localeIndex.value ? 3 : loc === "en" ? 2 : loc === "zh" ? 1 : 0

  const map = new Map<string, NewsData>()
  for (const item of data as NewsData[]) {
    if (item.category !== props.category) continue
    if (
      getPriority(item.localeIndex) >
      getPriority(map.get(item.baseUrl)?.localeIndex)
    )
      map.set(item.baseUrl, item)
  }
  return Array.from(map.values())
})

const newsList = filteredData.value
  .slice(0, props.limit)
  .toSorted((newsA, newsB) =>
    newsB.frontmatter.pageSubTitle.localeCompare(
      newsA.frontmatter.pageSubTitle,
    ),
  )
</script>
