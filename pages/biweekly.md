---
layout: page
# 返回首页
returnLink: /
pageTitle: 龙架构双周会
pageSubTitle: 属于龙芯社区开发者和爱好者的线上 + 线下聚会
---

<style scoped>
/* mimic the Tailwind "md" breakpoint */
@media (width >= 48rem) {
    .announcement-container h3 {
        margin-top: 0;
    }
}
</style>

<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { getBiweeklyBilibiliLink, getBiweeklySlideLink } from "../components/events/BiweeklyLinks"
import { getBiweeklyEvents, type BiweeklyEventItem } from '../components/events/DataSource'
import BiweeklyCalendar from "../components/events/BiweeklyCalendar.vue"
import eventsICS from "../data/events.ics?raw"

const { d, locale, tm } = useI18n()
const now = new Date()
const biweeklyData = getBiweeklyEvents(eventsICS, now)

const thisEvent = ref(null)
const thisBiliLink = ref(null)
const thisSlideLink = ref(null)

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

龙架构双周会是由龙芯爱好者组织的社区会议，会议议程包括针对上游及各 Linux 发行版及其他系统项目的开发进展报告、社区事务报告，以及贡献者讨论及问答环节。

龙架构双周会一般于 UTC+8 时区的每两周周日 14:00 在腾讯会议举办，原则上避开中国大陆预期出行较多的法定假期（如春节、国庆等）与调休工作日。

会议进程于 Bilibili [@龙芯爱好者社区](https://space.bilibili.com/70360929) 账号同步直播，亦时有安排线下活动。

:::tip
龙架构双周会默认使用普通话，但我们同样欢迎其他语言使用者参会——许多与会者也会讲英语（甚至俄语等等）。如果您想用其它语言在会上做分享，请与我们联系！
:::

<div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full flex justify-center md:flex-1">
        <BiweeklyCalendar
            :data="biweeklyData"
            :now="now"
            @biweeklySelected="onBiweeklySelected"
        />
    </div>
    <div class="w-full announcement-container" v-if="thisEvent !== null">
        <div v-if="thisEvent.isFuture">

### 第 {{ tm("formatOrdinalNumber")(thisEvent.issueNumber) }} 次“龙架构双周会”会议公告 {#biweekly-announcement}

会议时间：{{ d(thisEvent.start, "long") }}（会议预计一小时内结束）

[会议链接][link-wemeet]｜<a :href="thisSlideLink" target="_blank" rel="noreferrer" v-if="thisSlideLink !== null">双周会幻灯片</a><span v-else>双周会幻灯片（暂未上传）</span>｜[直播链接][link-live]｜会议号：**728-211-994**

双周会幻灯片将在**会前停止收集**，希望在双周会发言提问的同学请在此时间前填写编辑完成（如需编辑权限请通过金山文档申请）。

</div>

<div v-else>

### 第 {{ tm("formatOrdinalNumber")(thisEvent.issueNumber) }} 次“龙架构双周会”会议回看 {#biweekly-archive}

会议时间：{{ d(thisEvent.start, "long") }}

本次会议已经结束，您仍可查看本次会议的相关资源：

<ul>
    <li v-if="thisSlideLink !== null">
        <a :href="thisSlideLink" target="_blank" rel="noreferrer">双周会幻灯片</a>
    </li>
    <li v-if="thisBiliLink !== null">
        <a :href="thisBiliLink" target="_blank" rel="noreferrer">Bilibili 直播回看</a>
    </li>
</ul>

</div>
</div>
</div>

[link-live]: https://live.bilibili.com/1754798211
[link-wemeet]: https://meeting.tencent.com/dm/P07yMaTQxECg
