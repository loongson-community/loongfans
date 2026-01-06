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
import { Calendar } from "v-calendar"
import "v-calendar/style.css"
import { type BiweeklyEventsResult } from "./DataSource"

const { locale, t } = useI18n()
const { data, now } = defineProps<{
  data: BiweeklyEventsResult
  now: Date
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
</script>
