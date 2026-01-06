---
layout: page
returnLink: /en/
pageTitle: LoongArch Biweekly
pageSubTitle: Biweekly Meetings for Community Developers and Hobbyists
---

<script setup>
import { useI18n } from "vue-i18n"
import { getBiweeklyEvents } from '../../components/events/DataSource'
import EventsCalendar from "../../components/events/EventsCalendar.vue"
import eventsICS from "../../data/events.ics?raw"

const { d, locale, tm } = useI18n()
const now = new Date()
const biweeklyData = getBiweeklyEvents(eventsICS, now)
const nextEvent = (
    biweeklyData.nextEventIdx !== null
    ? biweeklyData.biweeklyEvents[biweeklyData.nextEventIdx]
    : null
)
let issueNumberOrd = ""
if (nextEvent !== null) {
    issueNumberOrd = tm("formatOrdinalNumber")(nextEvent.issueNumber)
}
</script>

The LoongArch Biweekly is a regular community meeting organized by Loongson
hobbyists. The meeting agenda comprises updates on upstream projects, Linux
distro (and other OS projects), and community affairs.
The reports are generally followed by contributor discussions and Q&A sessions.

The LoongArch Biweekly is held every other Sunday at 2:00 PM (UTC+8) on Tencent
Meeting, generally avoiding Chinese mainland state holidays with significant
travel expected (e.g. Spring Festival and National Day) and workdays in lieu.

The meeting is simultaneously livestreamed on Bilibili page
[@龙芯爱好者社区](https://space.bilibili.com/70360929).
Offline meetings are also arranged from time to time.

:::tip
The LoongArch Biweekly currently uses Standard Chinese (Putonghua / Mandarin)
as the default language, but we welcome users of other languages - many of us
also speak English (some even speak Russian, and more).
If you'd like to hold a session in another language, please feel free to get in touch!
:::

<div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full md:flex-1">
        <EventsCalendar :data="biweeklyData" :now="now" />
    </div>
    <div class="w-full" v-if="nextEvent !== null">

### The {{ issueNumberOrd }} "LoongArch Biweekly" Meeting Announcement

Meeting Time: {{ d(nextEvent.start, "long") }} (meeting expected to last an hour)

[Meeting Link][link-wemeet]｜[Biweekly Slides][link-slides]｜[Livestream Link][link-live]｜Meeting ID: **728-211-994**

Biweekly slides may be edited **until the beginning of the meeting**.
Those who wish to speak or ask questions at the biweekly should finish editing
before this time (if you need editing permissions, please apply via Kingsoft Docs).

</div>
</div>

[link-live]: https://live.bilibili.com/1754798211
[link-slides]: https://www.kdocs.cn/l/cvOZnsjUeuxC
[link-wemeet]: https://meeting.tencent.com/dm/P07yMaTQxECg
