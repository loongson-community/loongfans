---
layout: page
returnLink: /fr
pageTitle: LoongArch – Bimensuel
pageSubTitle: Réunions bimensuelles pour les développeurs communautaires et les amateurs
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

Le LoongArch Biweekly est une réunion communautaire régulière organisée par Loongson
amateurs. L'ordre du jour de la réunion comprend des mises à jour sur les projets en amont, Linux
distribution (et autres projets liés aux systèmes d'exploitation), ainsi que les relations avec la communauté.
Ces exposés sont généralement suivis de discussions entre les intervenants et de séances de questions-réponses.

Le LoongArch Biweekly a lieu un dimanche sur deux à 14 h (UTC+8) sur Tencent
Réunion, en évitant généralement les jours fériés officiels de la Chine continentale qui ont une importance particulière
déplacements prévus (par exemple, pour la Fête du Printemps et la Fête nationale) et jours de travail compensatoires.

La réunion est diffusée en direct sur la page Bilibili
[@Communauté des passionnés de Loongson](https://space.bilibili.com/70360929).
Des réunions en présentiel sont également organisées de temps à autre.

:::tip
Le LoongArch Biweekly est actuellement rédigé en chinois standard (putonghua / mandarin)
comme langue par défaut, mais nous accueillons volontiers les utilisateurs d'autres langues – nous sommes nombreux
parlent également anglais (certains parlent même russe, et d'autres langues encore).
Si vous souhaitez organiser une session dans une autre langue, n'hésitez pas à nous contacter !
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

### Le {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }} Annonce de la réunion « LoongArch Biweekly » {#biweekly-announcement}

Heure de la réunion : {{ d(thisEvent.start, "long") }} (réunion qui devrait durer une heure)

<a :href="ei.wemeetLink" target="_blank" rel="noreferrer">Lien vers la réunion</a>｜<a :href="thisSlideLink" target="_blank" rel="noreferrer" v-if="thisSlideLink !== null">Présentations bimensuelles</a><span v-else>Diapositives bimensuelles (à mettre en ligne)</span>｜<a :href="ei.bilibiliLiveLink" target="_blank" rel="noreferrer">Lien vers le livestream</a>｜Identifiant de la réunion : **{{ ei.wemeetNumber }}**

Les diapositives bimensuelles peuvent être modifiées **jusqu'au début de la réunion**.
Les personnes qui souhaitent prendre la parole ou poser des questions lors de la réunion bimensuelle doivent avoir terminé leurs modifications
avant cette date (si vous avez besoin de droits de modification, veuillez en faire la demande via Kingsoft Docs).

</div>

<div v-else>

### Le {{ t("ordinalNumber", { n: thisEvent.issueNumber }) }} Archives des réunions « LoongArch Biweekly »

Heure de la réunion : {{ d(thisEvent.start, "long") }}

La réunion est terminée, mais vous pouvez toujours consulter les documents relatifs à cet événement :

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
