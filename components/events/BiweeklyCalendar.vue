<template>
  <Calendar
    :locale="locale"
    :attributes="vCalAttrs"
    :initial-page="initialPage"
    @dayclick="onDayClick"
  />
</template>

<script setup lang="ts">
import keyBy from "lodash/keyBy"
import { useI18n } from "vue-i18n"
import { Calendar } from "v-calendar"
import "v-calendar/style.css"
import type { BiweeklyEventItem, BiweeklyEventsResult } from "./DataSource"

// The CalendarDay type is not exported by v-calendar, so we redefine it here
// with only the fields we need.
interface CalendarDayForEvent {
  id: string // "YYYY-MM-DD"
}

const { locale, t } = useI18n()
const { data, now } = defineProps<{
  data: BiweeklyEventsResult
  now: Date
}>()
const emit = defineEmits<{
  biweeklySelected: [BiweeklyEventItem | null]
}>()

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

const allBiweeklyEventsForVCal = data.biweeklyEvents.map((be) => ({
  key: `biweekly-${be.issueNumber}`,
  dates: be.start,
  bar: be.isNext ? null : be.isFuture ? "theme-red" : "theme-past",
  highlight: be.isNext ? "theme-red" : null,
  popover: {
    label: t("loongarchBiweekly", { number: be.issueNumber }),
  },
}))
vCalAttrs.push(...allBiweeklyEventsForVCal)

// make the next biweekly event initially selected
emit("biweeklySelected", data.biweeklyEvents.find((be) => be.isNext) || null)

// no event key is available in v-calendar's dayclick event, so we have to
// maintain a map between date id and event data
const formatDateID = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const biweeklyIssueNumberByDateID = keyBy(data.biweeklyEvents, (be) => {
  return formatDateID(be.start)
})

// make today point to the next biweekly event if clicked
const nextEvent = data.biweeklyEvents.find((be) => be.isNext)
if (nextEvent) {
  biweeklyIssueNumberByDateID[formatDateID(now)] = nextEvent
}

const onDayClick = (d: CalendarDayForEvent) => {
  const be = biweeklyIssueNumberByDateID[d.id]
  if (be) {
    emit("biweeklySelected", be)
  }
}
</script>

<style>
.vc-theme-red {
  --vc-bar-bg: #e60013 !important;
  --vc-dot-bg: #e60013 !important;
  --vc-highlight-solid-bg: #e60013 !important;
  --vc-highlight-outline-border: #e60013 !important;
  --vc-highlight-outline-content-color: #e60013 !important;
}

.vc-theme-past {
  /* Tailwind gray-400 */
  --vc-bar-bg: oklch(70.7% 0.022 261.325) !important;
  --vc-dot-bg: oklch(70.7% 0.022 261.325) !important;
  --vc-highlight-solid-bg: oklch(70.7% 0.022 261.325) !important;
}
</style>
