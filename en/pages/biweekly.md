---
layout: page
returnLink: /en/
pageTitle: LoongArch Biweekly
pageSubTitle: Biweekly Meetings for Community Developers and Hobbyists
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
import { getBiweeklySlideLink } from "../../components/events/BiweeklyLinks"
import { getBiweeklyEvents, type BiweeklyEventItem } from '../../components/events/DataSource'
import BiweeklyCalendar from "../../components/events/BiweeklyCalendar.vue"
import eventsICS from "../../data/events.ics?raw"

const { d, locale, tm } = useI18n()
const now = new Date()
const biweeklyData = getBiweeklyEvents(eventsICS, now)

const thisEvent = ref(null)
const thisSlideLink = ref(null)

const onBiweeklySelected = (be: BiweeklyEventItem | null) => {
    if (be) {
        thisEvent.value = be
        thisSlideLink.value = getBiweeklySlideLink(be.issueNumber)
    } else {
        thisEvent.value = null
        thisSlideLink.value = null
    }
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
    <div class="w-full flex justify-center md:flex-1">
        <BiweeklyCalendar
            :data="biweeklyData"
            :now="now"
            @biweeklySelected="onBiweeklySelected"
        />
    </div>
    <div class="w-full announcement-container" v-if="thisEvent !== null">
        <div v-if="thisEvent.isFuture">

### The {{ tm("formatOrdinalNumber")(thisEvent.issueNumber) }} "LoongArch Biweekly" Meeting Announcement {#biweekly-announcement}

Meeting Time: {{ d(thisEvent.start, "long") }} (meeting expected to last an hour)

[Meeting Link][link-wemeet]｜<a :href="thisSlideLink" target="_blank" rel="noreferrer" v-if="thisSlideLink !== null">Biweekly Slides</a><span v-else>Biweekly Slides (to be uploaded)</span>｜[Livestream Link][link-live]｜Meeting ID: **728-211-994**

Biweekly slides may be edited **until the beginning of the meeting**.
Those who wish to speak or ask questions at the biweekly should finish editing
before this time (if you need editing permissions, please apply via Kingsoft Docs).

</div>

<div v-else>

### The {{ tm("formatOrdinalNumber")(thisEvent.issueNumber) }} "LoongArch Biweekly" Meeting Archives

Meeting Time: {{ d(thisEvent.start, "long") }}

The meeting has ended, but you can still view materials from the event:

<ul>
    <li v-if="thisSlideLink !== null">
        <a :href="thisSlideLink" target="_blank" rel="noreferrer">Biweekly Slides</a>
    </li>
</ul>

</div>
</div>
</div>

[link-live]: https://live.bilibili.com/1754798211
[link-wemeet]: https://meeting.tencent.com/dm/P07yMaTQxECg
