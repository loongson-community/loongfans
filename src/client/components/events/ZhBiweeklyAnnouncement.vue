<template>
  <div v-if="event.isFuture">
    <h3 name="biweekly-announcement">
      {{
        t("zhBiweeklyAnnouncementHeader", {
          n: event.issueNumber,
        })
      }}
    </h3>

    <p>
      {{ t("biweeklyTime") }}{{ d(event.start, "long")
      }}{{ t("zhBiweeklyExpectedDurationNotice") }}
    </p>
    <p>
      <a
        v-if="currentWemeet !== null"
        :href="currentWemeet.link"
        target="_blank"
        rel="noreferrer"
        >{{ t("zhBiweeklyWemeetLink") }}</a
      >｜<a
        v-if="slideLink !== null"
        :href="slideLink"
        target="_blank"
        rel="noreferrer"
        >{{ t("biweeklySlideLink") }}</a
      ><span v-else>{{ t("biweeklySlideLinkTBU") }}</span
      >｜<a
        v-if="currentBilibiliLive !== null && currentBilibiliLive.link"
        :href="currentBilibiliLive.link"
        target="_blank"
        rel="noreferrer"
        >{{ t("biweeklyLiveLink") }}</a
      >｜<i18n-t
        v-if="currentWemeet !== null"
        keypath="wemeetNumber"
        tag="span"
      >
        <template #number>
          <strong>{{ currentWemeet.number }}</strong>
        </template>
      </i18n-t>
    </p>
    <i18n-t keypath="zhBiweeklyNotice" tag="p">
      <template #cutoff-notice>
        <strong>{{ t("zhBiweeklyCutoffNotice") }}</strong>
      </template>
    </i18n-t>
  </div>

  <div v-else>
    <h3 name="biweekly-archive">
      {{
        t("zhBiweeklyArchiveHeader", {
          n: event.issueNumber,
        })
      }}
    </h3>

    <p>{{ t("biweeklyTime") }} {{ d(event.start, "long") }}</p>
    <p>{{ t("biweeklyArchivalNotice") }}</p>
    <EventResourceList :resources="archiveResources" :labels="archiveLabels" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import {
  getBiweeklyArchiveResources,
  getBiweeklyCurrentResource,
  getBiweeklySlideLink,
  type EventItem,
} from "@src/client/components/events/dataSource"
import EventResourceList from "@src/client/components/events/EventResourceList.vue"
import type { BiweeklyResourceType } from "@src/types/data"

const props = defineProps<{
  event: EventItem
}>()

const { d, t } = useI18n()

const currentWemeet = getBiweeklyCurrentResource("zhBiweekly", "wemeet")
const currentBilibiliLive = getBiweeklyCurrentResource("zhBiweekly", "bilibili")
const slideLink = computed(() => getBiweeklySlideLink(props.event.issueNumber))
const archiveResources = computed(() =>
  getBiweeklyArchiveResources("zhBiweekly", props.event.issueNumber),
)
const archiveLabels = computed<Partial<Record<BiweeklyResourceType, string>>>(
  () => ({
    kdocs: t("biweeklySlideLink"),
    bilibili: t("bilibiliLiveArchiveLink"),
  }),
)
</script>
