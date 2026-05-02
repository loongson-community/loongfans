---
layout: page
returnLink: /de
pageTitle: LoongArch – Alle zwei Wochen
pageSubTitle: Zweiwöchentliche Treffen für Community-Entwickler und Hobbyentwickler
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

Der „LoongArch Biweekly“ ist ein regelmäßiges Community-Treffen, das von Loongson organisiert wird
Hobbyisten. Auf der Tagesordnung stehen aktuelle Informationen zu Upstream-Projekten, Linux
Distributionen (und andere Betriebssystemprojekte) sowie Community-Angelegenheiten.
Im Anschluss an die Vorträge finden in der Regel Diskussionen unter den Referenten sowie Frage-und-Antwort-Runden statt.

Der „LoongArch Biweekly“ findet jeden zweiten Sonntag um 14:00 Uhr (UTC+8) auf Tencent statt
Termin, wobei staatliche Feiertage auf dem chinesischen Festland mit erheblichen
voraussichtliche Reisen (z. B. zum Frühlingsfest und zum Nationalfeiertag) sowie Ausgleichstage.

Die Veranstaltung wird gleichzeitig auf der Bilibili-Seite live übertragen
[@Loongson-Fan-Community](https://space.bilibili.com/70360929).
Von Zeit zu Zeit finden auch persönliche Treffen statt.

:::tip
Der „LoongArch Biweekly“ erscheint derzeit auf Hochchinesisch (Putonghua / Mandarin)
als Standardsprache, aber wir heißen auch Nutzer anderer Sprachen herzlich willkommen – viele von uns
sprechen auch Englisch (manche sogar Russisch und noch weitere Sprachen).
Wenn Sie eine Sitzung in einer anderen Sprache abhalten möchten, können Sie sich gerne bei uns melden!
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

### Die {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }} Ankündigung der „LoongArch Biweekly“-Sitzung {#biweekly-announcement}

Treffpunkt: {{ d(thisEvent.start, "long") }} (die Sitzung wird voraussichtlich eine Stunde dauern)

<a :href="ei.wemeetLink" target="_blank" rel="noreferrer">Link zur Besprechung</a>｜<a :href="thisSlideLink" target="_blank" rel="noreferrer" v-if="thisSlideLink !== null">Zweiwöchentliche Folien</a><span v-else>Zweiwöchentliche Folien (werden noch hochgeladen)</span>｜<a :href="ei.bilibiliLiveLink" target="_blank" rel="noreferrer">Link zum Livestream</a>｜Besprechungs-ID: **{{ ei.wemeetNumber }}**

Die Folien für die zweiwöchentliche Sitzung können **bis zum Beginn der Sitzung** bearbeitet werden.
Wer bei der zweiwöchentlichen Sitzung das Wort ergreifen oder Fragen stellen möchte, sollte seine Beiträge fertigstellen
vor diesem Zeitpunkt (falls Sie Bearbeitungsrechte benötigen, beantragen Sie diese bitte über Kingsoft Docs).

</div>

<div v-else>

### Die {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }} Archiv der „LoongArch Biweekly“-Treffen

Treffpunkt: {{ d(thisEvent.start, "long") }}

Die Veranstaltung ist zwar vorbei, aber Sie können sich die Unterlagen dazu weiterhin ansehen:

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
