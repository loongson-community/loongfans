<template>
  <div v-if="items.length">
    <DownloadCard
      v-for="item in items"
      :key="item.key"
      :title="item.title"
      :version="item.version"
      :size="item.size"
      :date="item.date"
      :sha256="item.sha256"
      :url="item.url"
      :latest="item.latest"
      :debug="item.debug"
    >
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="item.descriptionHtml"
        class="vp-doc"
        v-html="item.descriptionHtml"
      />
      <!-- eslint-enable vue/no-v-html -->
    </DownloadCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import MarkdownIt from "markdown-it"

import downloadsDB from "virtual:loongfans-data/downloads"
import type { DownloadItem } from "@src/types/data"
import { DownloadType } from "@src/types/data"
import type { LocalizedString, SupportedLanguage } from "@src/types/language"
import DownloadCard from "./DownloadCard.vue"

const props = defineProps<{ keys: string[] }>()

const { locale, t } = useI18n()

const markdown = new MarkdownIt({ html: true, linkify: true })

type DownloadListItem = DownloadItem & {
  key: string
  latest: boolean
  title: string
  descriptionHtml?: string
}

const downloadTypeTitles = computed(() => ({
  [DownloadType.UEFIFirmware]: t("downloadTypeUefiFirmware"),
  [DownloadType.Datasheet]: t("downloadTypeDatasheet"),
  [DownloadType.ReferenceManual]: t("downloadTypeReferenceManual"),
  [DownloadType.UserManual]: t("downloadTypeUserManual"),
  [DownloadType.SchematicDiagram]: t("downloadTypeSchematicDiagram"),
  [DownloadType.SDK]: t("downloadTypeSdk"),
}))

function resolveLocalizedDescription(description?: LocalizedString) {
  if (!description) return undefined
  const language = locale.value as SupportedLanguage
  return description[language] ?? description.en ?? description.zh
}

function renderMarkdown(content?: string) {
  return content ? markdown.render(content) : undefined
}

const items = computed<DownloadListItem[]>(() => {
  const entries = props.keys.reduce<DownloadListItem[]>((acc, key) => {
    const item = downloadsDB[key]
    if (!item) return acc
    const description = resolveLocalizedDescription(item.description)
    acc.push({
      ...item,
      key,
      latest: false,
      title: downloadTypeTitles.value[item.type],
      descriptionHtml: renderMarkdown(description),
    })
    return acc
  }, [])

  const latestByGroup = new Map<string, number>()
  entries.forEach((item) => {
    const groupKey = `${item.type}:${item.debug ? "debug" : "release"}`
    const time = new Date(item.date).getTime()
    const current = latestByGroup.get(groupKey)
    if (!current || time > current) {
      latestByGroup.set(groupKey, time)
    }
  })

  entries.forEach((item) => {
    const groupKey = `${item.type}:${item.debug ? "debug" : "release"}`
    item.latest = new Date(item.date).getTime() === latestByGroup.get(groupKey)
  })

  return entries
})
</script>
