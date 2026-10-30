<template>
  <div v-if="items.length">
    <DownloadCard
      v-for="item in items"
      :key="item.key"
      :title="item.title"
      :kind="item.kind"
      :url="item.url"
      :latest="item.latest"
      v-bind="
        item.kind === 'website'
          ? {}
          : {
              version: item.version,
              size: item.size,
              date: item.date,
              sha256: item.sha256,
              debug: item.debug,
              preview: item.preview,
            }
      "
    >
      <!-- eslint-disable vue/no-v-html -->
      <template v-if="item.briefHtml" #default>
        <div class="vp-doc" v-html="item.briefHtml" />
      </template>
      <template v-if="item.detailHtml" #detail>
        <div class="vp-doc" v-html="item.detailHtml" />
      </template>
      <!-- eslint-enable vue/no-v-html -->
    </DownloadCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import downloadsDB from "virtual:loongfans-data/downloads"
import type { DownloadResource } from "@src/types/data"
import { DownloadType } from "@src/types/data"
import { resolveLocalizedString } from "@src/common/i18n.ts"
import DownloadCard from "./DownloadCard.vue"
import type { SupportedLanguage } from "@src/types/language.ts"

const props = defineProps<{ keys: readonly string[] }>()

const { locale, t } = useI18n()

type DownloadListItem = DownloadResource & {
  key: string
  latest: boolean
  title: string
  briefHtml?: string
  detailHtml?: string
}

const downloadTypeTitles = computed(() => ({
  [DownloadType.UEFIFirmware]: t("downloadTypeUefiFirmware"),
  [DownloadType.Datasheet]: t("downloadTypeDatasheet"),
  [DownloadType.ReferenceManual]: t("downloadTypeReferenceManual"),
  [DownloadType.UserManual]: t("downloadTypeUserManual"),
  [DownloadType.SchematicDiagram]: t("downloadTypeSchematicDiagram"),
  [DownloadType.SDK]: t("downloadTypeSdk"),
}))

const items = computed<DownloadListItem[]>(() => {
  const entries = props.keys.reduce<DownloadListItem[]>((acc, key) => {
    const item = downloadsDB[key]
    if (!item) {
      throw new Error(`Download '${key}' does not exist`)
    }
    acc.push({
      ...item,
      key,
      latest: false,
      title:
        resolveLocalizedString(item.title, locale.value as SupportedLanguage) ??
        downloadTypeTitles.value[item.type],
      briefHtml: resolveLocalizedString(
        item.briefHtml,
        locale.value as SupportedLanguage,
      ),
      detailHtml: resolveLocalizedString(
        item.detailHtml,
        locale.value as SupportedLanguage,
      ),
    })
    return acc
  }, [])

  const latestByGroup = new Map<string, number>()
  entries.forEach((item) => {
    if (item.kind === "website") return
    const groupKey = `${item.type}:${item.debug ? "debug" : "release"}`
    const time = new Date(item.date).getTime()
    const current = latestByGroup.get(groupKey)
    if (!current || time > current) {
      latestByGroup.set(groupKey, time)
    }
  })

  entries.forEach((item) => {
    if (item.kind === "website") return
    const groupKey = `${item.type}:${item.debug ? "debug" : "release"}`
    item.latest = new Date(item.date).getTime() === latestByGroup.get(groupKey)
  })

  return entries
})
</script>
