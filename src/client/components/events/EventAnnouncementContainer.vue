<template>
  <div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full flex justify-center md:flex-1">
      <EventCalendar
        :events="biweeklyEvents.biweeklyEvents"
        :now="now"
        @event-selected="onEventSelected"
      />
    </div>
    <div v-if="thisEvent !== null" class="w-full announcement-container">
      <div v-if="thisEvent.isFuture">
        <h3 name="biweekly-announcement">
          {{
            t("zhBiweeklyAnnouncementHeader", {
              number: t("ordinalNumber", { n: thisEvent.issueNumber }),
            })
          }}
        </h3>

        <p>
          {{
            t("biweeklyTime", {
              time: d(thisEvent.start, "long"),
              expectedDurationNotice: t("zhBiweeklyExpectedDurationNotice"),
            })
          }}
        </p>
        <p>
          <a :href="ei.wemeetLink" target="_blank" rel="noreferrer">{{
            t("zhBiweeklyWemeetLink")
          }}</a
          >｜<a
            v-if="thisSlideLink !== null"
            :href="thisSlideLink"
            target="_blank"
            rel="noreferrer"
            >{{ t("biweeklySlideLink") }}</a
          ><span v-else>{{ t("biweeklySlideLinkTBU") }}</span
          >｜<a :href="ei.bilibiliLiveLink" target="_blank" rel="noreferrer">{{
            t("biweeklyLiveLink")
          }}</a
          >｜<i18n-t keypath="wemeetNumber" tag="span">
            <template #number>
              <strong>{{ ei.wemeetNumber }}</strong>
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
              number: t("ordinalNumber", { n: thisEvent.issueNumber }),
            })
          }}
        </h3>

        <p>
          {{
            t("biweeklyTime", {
              time: d(thisEvent.start, "long"),
              expectedDurationNotice: "",
            })
          }}
        </p>
        <p>{{ t("biweeklyArchivalNotice") }}</p>
        <ul>
          <li v-if="thisSlideLink !== null">
            <a :href="thisSlideLink" target="_blank" rel="noreferrer">{{
              t("biweeklySlideLink")
            }}</a>
          </li>
          <li v-if="thisBiliLink !== null">
            <a :href="thisBiliLink" target="_blank" rel="noreferrer">{{
              t("bilibiliLiveArchiveLink")
            }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue"
import { useI18n } from "vue-i18n"

import biweeklyDB from "virtual:loongfans-data/biweekly"
import eventsICS from "@data/events/events.ics?raw"
import {
  getBiweeklyBilibiliLink,
  getBiweeklyEvents,
  getBiweeklySlideLink,
  type BiweeklyEventItem,
} from "@src/client/components/events/dataSource"
import EventCalendar from "@src/client/components/events/EventCalendar.vue"

const { d, t } = useI18n()
const now = new Date()
const biweeklyEvents = getBiweeklyEvents(eventsICS, now)
const ei = biweeklyDB.eventInfo

const thisEvent: Ref<BiweeklyEventItem | null> = ref(null)
const thisBiliLink: Ref<string | null> = ref(null)
const thisSlideLink: Ref<string | null> = ref(null)

const onEventSelected = (be: BiweeklyEventItem | null) => {
  if (be) {
    thisEvent.value = be
    thisBiliLink.value = getBiweeklyBilibiliLink(be.issueNumber)
    thisSlideLink.value = getBiweeklySlideLink(be.issueNumber)
  } else {
    thisEvent.value = null
    thisBiliLink.value = null
    thisSlideLink.value = null
  }
}
</script>

<style scoped>
/* mimic the Tailwind "md" breakpoint */
@media (width >= 48rem) {
  .announcement-container h3 {
    margin-top: 0;
  }
}
</style>
