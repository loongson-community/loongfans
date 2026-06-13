<template>
  <div v-if="event.isFuture">
    <h3 name="en-biweekly-announcement">
      {{
        t("intlBiweeklyAnnouncementHeader", {
          n: event.issueNumber,
        })
      }}
    </h3>

    <p>{{ t("biweeklyTime") }}</p>
    <TZAwareDateTimeList
      :time="event.start"
      :extra-notice-key-for-local-time="'intlBiweeklyExpectedDurationNotice'"
    />
    <p>{{ t("intlBiweeklyParticipationNotice") }}</p>
    <EventResourceList :resources="currentResources" :labels="currentLabels" />
  </div>

  <div v-else>
    <h3 name="en-biweekly-archive">
      {{
        t("intlBiweeklyArchiveHeader", {
          n: event.issueNumber,
        })
      }}
    </h3>

    <p>
      {{ t("biweeklyTime") }}
    </p>
    <TZAwareDateTimeList :time="event.start" />

    <p>{{ t("biweeklyArchivalNotice") }}</p>
    <EventResourceList :resources="archiveResources" :labels="archiveLabels" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import {
  getBiweeklyArchiveResources,
  getBiweeklyCurrentResources,
  type EventItem,
} from "@src/client/components/events/dataSource"
import EventResourceList from "@src/client/components/events/EventResourceList.vue"
import TZAwareDateTimeList from "@src/client/components/events/TZAwareDateTimeList.vue"
import type { BiweeklyResourceType } from "@src/types/data"

const props = defineProps<{
  event: EventItem
}>()

const { t } = useI18n()

const currentResources = getBiweeklyCurrentResources("intlBiweekly")
const archiveResources = computed(() =>
  getBiweeklyArchiveResources("intlBiweekly", props.event.issueNumber),
)

const currentLabels = computed<Partial<Record<BiweeklyResourceType, string>>>(
  () => ({
    zoom: t("zoomMeetingLink"),
    zoomChat: t("zoomChatLink"),
    googledocs: t("googleSlidesLink"),
  }),
)
const archiveLabels = computed<Partial<Record<BiweeklyResourceType, string>>>(
  () => ({
    googledocs: t("googleSlidesLink"),
    zoomChat: t("zoomChatArchiveLink"),
    bilibili: t("bilibiliLiveArchiveLink"),
    youtube: t("youtubeArchiveLink"),
    vkvideo: t("vkVideoArchiveLink"),
  }),
)
</script>
