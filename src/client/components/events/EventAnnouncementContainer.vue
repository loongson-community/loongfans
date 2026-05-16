<template>
  <div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full flex justify-center md:flex-1">
      <BiweeklyCalendar
        :data="biweeklyEvents"
        :now="now"
        @biweekly-selected="onBiweeklySelected"
      />
    </div>
    <div v-if="thisEvent !== null" class="w-full announcement-container">
      <div v-if="thisEvent.isFuture">
        <h3 name="biweekly-announcement">
          第
          {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }}
          次“龙架构双周会”会议公告
        </h3>

        <p>
          会议时间：{{ d(thisEvent.start, "long") }}（会议预计一小时内结束）
        </p>
        <p>
          <a :href="ei.wemeetLink" target="_blank" rel="noreferrer">会议链接</a
          >｜<a
            v-if="thisSlideLink !== null"
            :href="thisSlideLink"
            target="_blank"
            rel="noreferrer"
            >双周会幻灯片</a
          ><span v-else>双周会幻灯片（暂未上传）</span>｜<a
            :href="ei.bilibiliLiveLink"
            target="_blank"
            rel="noreferrer"
            >直播链接</a
          >｜会议号：<strong>{{ ei.wemeetNumber }}</strong>
        </p>
        <p>
          双周会幻灯片将在<strong>会前停止收集</strong>，希望在双周会发言提问的同学请在此时间前填写编辑完成（如需编辑权限请通过金山文档申请）。
        </p>
      </div>

      <div v-else>
        <h3 name="biweekly-archive">
          第
          {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }}
          次“龙架构双周会”会议回看
        </h3>

        <p>会议时间：{{ d(thisEvent.start, "long") }}</p>
        <p>本次会议已经结束，您仍可查看本次会议的相关资源：</p>
        <ul>
          <li v-if="thisSlideLink !== null">
            <a :href="thisSlideLink" target="_blank" rel="noreferrer"
              >双周会幻灯片</a
            >
          </li>
          <li v-if="thisBiliLink !== null">
            <a :href="thisBiliLink" target="_blank" rel="noreferrer"
              >Bilibili 直播回看</a
            >
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
import BiweeklyCalendar from "@src/client/components/events/BiweeklyCalendar.vue"

const { d, t } = useI18n()
const now = new Date()
const biweeklyEvents = getBiweeklyEvents(eventsICS, now)
const ei = biweeklyDB.eventInfo

const thisEvent: Ref<BiweeklyEventItem | null> = ref(null)
const thisBiliLink: Ref<string | null> = ref(null)
const thisSlideLink: Ref<string | null> = ref(null)

const onBiweeklySelected = (be: BiweeklyEventItem | null) => {
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
