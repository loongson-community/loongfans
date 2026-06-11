<template>
  <ul>
    <li v-for="news in data" :key="news.url">
      <a :href="`${basePath}${news.url}`">
        {{ news.frontmatter.pageTitle }} | {{ news.frontmatter.pageSubTitle }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData } from "vitepress"
// @ts-expect-error 'data' export is handled by VitePress
import { data } from "@src/node/data-loaders/news.data"
import { getLocalePrefix } from "@src/client/utils/language"
const { localeIndex } = useData()
const basePath = computed(() => getLocalePrefix(localeIndex.value))
</script>
