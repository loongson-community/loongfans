<template>
  <Calendar
    :locale="locale"
    :attributes="vCalAttrs"
    :initial-page="initialPage"
    @dayclick="onDayClick"
  />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { Calendar } from "v-calendar"
import "v-calendar/style.css"
import type { BiweeklyEventKind } from "@src/types/data"
import type { EventItem } from "./dataSource"

// The CalendarDay type is not exported by v-calendar, so we redefine it here
// with only the fields we need.
interface CalendarDayForEvent {
  id: string // "YYYY-MM-DD"
}

const { locale, t } = useI18n()
const { events, now } = defineProps<{
  events: EventItem[]
  now: Date
}>()
const emit = defineEmits<{
  eventSelected: [EventItem[]]
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

const kindColors: Record<BiweeklyEventKind, string> = {
  zhBiweekly: "theme-red",
  enBiweekly: "theme-blue",
}

const allEventsForVCal = events.map((be) => {
  const color = kindColors[be.kind]
  return {
    key: `event-${be.kind}-${be.issueNumber}`,
    dates: be.start,
    bar: be.isNext ? null : be.isFuture ? color : "theme-past",
    highlight: be.isNext ? color : null,
    popover: {
      label: t("eventCalendarEvent", {
        number: t("ordinalNumber", { n: be.issueNumber }),
        title: be.title,
      }),
    },
  }
})
vCalAttrs.push(...allEventsForVCal)

// make the next event initially selected
const nextEvent = events.find((be) => be.isNext)
if (nextEvent) {
  emit("eventSelected", [nextEvent])
}

// no event key is available in v-calendar's dayclick event, so we have to
// maintain a map between date id and event data
const formatDateID = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const eventByDateID: Record<string, EventItem[]> = {}
for (const event of events) {
  const id = formatDateID(event.start)
  if (!eventByDateID[id]) eventByDateID[id] = []
  eventByDateID[id].push(event)
}

// make today point to the next event if clicked
if (nextEvent) {
  eventByDateID[formatDateID(now)] = [nextEvent]
}

const onDayClick = (d: CalendarDayForEvent) => {
  const list = eventByDateID[d.id]
  if (list && list.length > 0) {
    emit("eventSelected", list)
    return
  }
  // find nearest future event after the clicked date
  const clicked = d.id
  const nearest = events.find((be) => formatDateID(be.start) > clicked)
  if (nearest) {
    emit("eventSelected", [nearest])
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

.vc-theme-blue {
  --vc-bar-bg: #1d4ed8 !important;
  --vc-dot-bg: #1d4ed8 !important;
  --vc-highlight-solid-bg: #1d4ed8 !important;
  --vc-highlight-outline-border: #1d4ed8 !important;
  --vc-highlight-outline-content-color: #1d4ed8 !important;
}

.vc-theme-past {
  /* Tailwind gray-400 */
  --vc-bar-bg: oklch(70.7% 0.022 261.325) !important;
  --vc-dot-bg: oklch(70.7% 0.022 261.325) !important;
  --vc-highlight-solid-bg: oklch(70.7% 0.022 261.325) !important;
}
</style>
