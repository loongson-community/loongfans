<template>
  <ul>
    <li v-for="item in items" :key="item.key">
      <a v-if="item.link" :href="item.link" target="_blank" rel="noreferrer">{{
        item.label
      }}</a>
      <span v-else>{{ item.pendingLabel }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import {
  getBiweeklyResourceLink,
  isAvailableResource,
} from "@src/client/components/events/dataSource"
import type { BiweeklyResource, BiweeklyResourceType } from "@src/types/data"

const props = defineProps<{
  resources: BiweeklyResource[]
  labels: Partial<Record<BiweeklyResourceType, string>>
}>()

const { t } = useI18n()

const defaultResourceLabel = (type: BiweeklyResourceType) => {
  switch (type) {
    case "wemeet":
      return t("zhBiweeklyWemeetLink")
    case "kdocs":
      return t("biweeklySlideLink")
    case "googledocs":
      return t("googleSlidesLink")
    case "zoom":
      return t("zoomMeetingLink")
    case "zoomChat":
      return t("zoomChatArchiveLink")
    case "bilibili":
      return t("bilibiliLiveArchiveLink")
    case "youtube":
      return t("youtubeArchiveLink")
    case "vkvideo":
      return t("vkVideoArchiveLink")
  }
}

const formatPendingLabel = (resource: BiweeklyResource, label: string) => {
  if (isAvailableResource(resource)) return label
  if (resource.status === "wip") {
    return t("eventResourceWip", { label })
  }
  return t("eventResourceUnavailable", { label })
}

const items = computed(() =>
  props.resources.map((resource, idx) => {
    const label =
      props.labels[resource.type] ?? defaultResourceLabel(resource.type)
    return {
      key: `${resource.type}-${idx}`,
      label,
      link: getBiweeklyResourceLink(resource),
      pendingLabel: formatPendingLabel(resource, label),
    }
  }),
)
</script>
