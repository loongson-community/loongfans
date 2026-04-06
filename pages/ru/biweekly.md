---
layout: page
returnLink: /ru
pageTitle: LoongArch: двухнедельный бюллетень
pageSubTitle: Встречи раз в две недели для разработчиков сообщества и энтузиастов
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

const { d, locale, t } = useI18n()
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

«LoongArch Biweekly» — это регулярные встречи сообщества, организуемые компанией Loongson
любители. Повестка дня встречи включает в себя обновления по проектам в сфере разработки, Linux
дистрибутив (и другие проекты по разработке ОС), а также вопросы взаимодействия с сообществом.
За докладами обычно следуют дискуссии с участием докладчиков и сессии вопросов и ответов.

Выпуск «LoongArch Biweekly» выходит каждое второе воскресенье в 14:00 (UTC+8) на платформе Tencent
Встреча, как правило, проводится в дни, когда не совпадают с государственными праздниками материкового Китая, имеющими важное значение
ожидаемые поездки (например, на Праздник Весны и Национальный день) и компенсационные рабочие дни.

Встреча транслируется в прямом эфире на странице Bilibili
[@Сообщество поклонников Loongson](https://space.bilibili.com/70360929).
Время от времени также организуются очные встречи.

:::tip
В настоящее время в журнале «LoongArch Biweekly» используется стандартный китайский язык (путунхуа / мандаринский)
в качестве языка по умолчанию, но мы рады приветствовать пользователей, говорящих на других языках — многие из нас
также говорят по-английски (некоторые даже по-русски и на других языках).
Если вы хотите провести сессию на другом языке, пожалуйста, свяжитесь с нами!
:::

<div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full flex justify-center md:flex-1">
        <BiweeklyCalendar
            :data="biweeklyEvents"
            :now="now"
            @biweeklySelected="onBiweeklySelected"
        />
    </div>
    <div class="w-full announcement-container" v-if="thisEvent !== null">
        <div v-if="thisEvent.isFuture">

### {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }} Объявление о встрече «LoongArch Biweekly» {#biweekly-announcement}

Время встречи: {{ d(thisEvent.start, "long") }} (встреча, как ожидается, продлится около часа)

<a :href="ei.wemeetLink" target="_blank" rel="noreferrer">Ссылка на встречу</a>｜<a :href="thisSlideLink" target="_blank" rel="noreferrer" v-if="thisSlideLink !== null">Презентации, выходящие раз в две недели</a><span v-else>Презентации, выходящие раз в две недели (будут загружены)</span>｜<a :href="ei.bilibiliLiveLink" target="_blank" rel="noreferrer">Ссылка на прямую трансляцию</a>｜Идентификатор встречи: **{{ ei.wemeetNumber }}**

Слайды для заседаний, проводимых раз в две недели, можно редактировать **до начала заседания**.
Те, кто хочет выступить или задать вопросы на заседании, которое проходит раз в две недели, должны завершить редактирование
до этого момента (если вам нужны права на редактирование, подайте заявку через Kingsoft Docs).

</div>

<div v-else>

### {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }} Архив заседаний «LoongArch Biweekly»

Время встречи: {{ d(thisEvent.start, "long") }}

Встреча завершилась, но вы по-прежнему можете ознакомиться с материалами мероприятия:

<ul>
    <li v-if="thisSlideLink !== null">
        <a :href="thisSlideLink" target="_blank" rel="noreferrer">Biweekly Slides</a>
    </li>
    <li v-if="thisBiliLink !== null">
        <a :href="thisBiliLink" target="_blank" rel="noreferrer">Bilibili live replay</a>
    </li>
</ul>

</div>
</div>
</div>
