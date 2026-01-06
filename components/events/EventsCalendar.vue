<template>
  <Calendar
    :locale="locale"
    :attributes="vCalAttrs"
    :initial-page="initialPage"
  />
</template>

<style>
@import "tailwindcss";

.vc-theme-red {
  --vc-bar-bg: #e60013 !important;
  --vc-dot-bg: #e60013 !important;
  --vc-highlight-solid-bg: #e60013 !important;
  --vc-highlight-outline-border: #e60013 !important;
  --vc-highlight-outline-content-color: #e60013 !important;
}

.vc-theme-past {
  --vc-bar-bg: var(--color-gray-400) !important;
  --vc-dot-bg: var(--color-gray-400) !important;
  --vc-highlight-solid-bg: var(--color-gray-400) !important;
}
</style>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import IcalExpander from "ical-expander"
import { Calendar } from "v-calendar"
import "v-calendar/style.css"

type EventItem = {
  start: Date
  title: string
}

const { locale, t } = useI18n()
const { data } = defineProps<{ data: string }>()
const expander = new IcalExpander({ ics: data, maxIterations: 100 })

const expansionRangeStart = new Date(2024, 11, 8) // date of first biweekly event
const thisYear = new Date().getFullYear()
const expansionRangeEnd = new Date(thisYear + 1, 0, 1)
const allExpandedEvents = expander.between(
  expansionRangeStart,
  expansionRangeEnd,
)
const simplifiedEvents: EventItem[] = [
  ...allExpandedEvents.events.map((e) => ({
    start: e.startDate.toJSDate(),
    title: e.summary,
  })),
  ...allExpandedEvents.occurrences.map((o) => ({
    start: o.startDate.toJSDate(),
    title: o.item.summary,
  })),
]
simplifiedEvents.sort((a, b) => a.start.getTime() - b.start.getTime())
const allBiweeklyEvents = simplifiedEvents.filter((e) =>
  /龙架构双周会/i.test(e.title),
)

const now = new Date()
const initialPage = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
}
const vCalAttrs: (typeof Calendar)["attributes"] = [
  {
    key: "today",
    dates: now,
    highlight: {
      color: "theme-red",
      fillMode: "outline",
    },
    popover: {
      label: t("today"),
    },
  },
]
let nextEventSeen = false
for (
  let issueNumber = 1;
  issueNumber <= allBiweeklyEvents.length;
  issueNumber++
) {
  const event = allBiweeklyEvents[issueNumber - 1]
  const isFutureEvent = event.start.getTime() > now.getTime()
  const isNextEvent = isFutureEvent && !nextEventSeen
  if (isNextEvent) {
    nextEventSeen = true
  }

  vCalAttrs.push({
    key: `biweekly-${issueNumber}`,
    dates: event.start,
    bar: isNextEvent ? null : isFutureEvent ? "theme-red" : "theme-past",
    highlight: isNextEvent ? "theme-red" : null,
    popover: {
      label: t("loongarchBiweekly", { number: issueNumber }),
    },
  })
}
</script>
