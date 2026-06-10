<template>
  <div v-if="event.isFuture">
    <h3 name="en-biweekly-announcement">
      {{
        t("enBiweeklyAnnouncementHeader", {
          number: t("ordinalNumber", { n: event.issueNumber }),
        })
      }}
    </h3>

    <p>
      {{
        t("biweeklyTime", {
          time: d(event.start, "long"),
          expectedDurationNotice: t("enBiweeklyExpectedDurationNotice"),
        })
      }}
    </p>
    <ul>
      <li v-for="row in timezoneRows" :key="row.timeZone">
        <strong>{{ row.label }}</strong
        >: {{ row.time }}
      </li>
    </ul>
    <p>{{ t("enBiweeklyParticipationNotice") }}</p>
    <EventResourceList :resources="currentResources" :labels="currentLabels" />
  </div>

  <div v-else>
    <h3 name="en-biweekly-archive">
      {{
        t("enBiweeklyArchiveHeader", {
          number: t("ordinalNumber", { n: event.issueNumber }),
        })
      }}
    </h3>

    <p>
      {{
        t("biweeklyTime", {
          time: d(event.start, "long"),
          expectedDurationNotice: "",
        })
      }}
    </p>
    <p>{{ t("enBiweeklyArchivalNotice") }}</p>
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
import type { BiweeklyResourceType } from "@src/types/data"

const props = defineProps<{
  event: EventItem
}>()

const { d, locale, t } = useI18n()

const currentResources = getBiweeklyCurrentResources("enBiweekly")
const archiveResources = computed(() =>
  getBiweeklyArchiveResources("enBiweekly", props.event.issueNumber),
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

const timeZones = computed(() => [
  {
    label: t("enBiweeklyTimezoneShanghai"),
    timeZone: "Asia/Shanghai",
  },
  {
    label: t("enBiweeklyTimezoneMoscow"),
    timeZone: "Europe/Moscow",
  },
  {
    label: t("enBiweeklyTimezoneUSEastern"),
    timeZone: "America/New_York",
  },
  {
    label: t("enBiweeklyTimezoneUSPacific"),
    timeZone: "America/Los_Angeles",
  },
])

const timezoneRows = computed(() =>
  timeZones.value.map((zone) => ({
    ...zone,
    time: new Intl.DateTimeFormat(locale.value, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: zone.timeZone,
    }).format(props.event.start),
  })),
)
</script>
