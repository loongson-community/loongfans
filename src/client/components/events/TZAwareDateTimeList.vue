<template>
  <ul>
    <li v-for="row in timezoneRows" :key="row.id">
      <strong>{{ row.label }}</strong
      >: {{ row.formatted }}{{ row.extraNotice }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

export type TimeZoneSpec = {
  label?: string
  labelKey?: string
  timeZone?: string
  extraNoticeKey?: string
}

type TimeZoneRow = {
  id: number
  label: string
  formatted: string
  extraNotice: string
}

const props = defineProps<{
  time: Date
  timeZones?: TimeZoneSpec[]
  extraNoticeKeyForLocalTime?: string
}>()

const { locale, t } = useI18n()

const defaultTimeZoneSpec: TimeZoneSpec[] = [
  {
    labelKey: "systemTimezone",
    timeZone: undefined,
    extraNoticeKey: props.extraNoticeKeyForLocalTime,
  },
  { label: "UTC-7", timeZone: "Etc/GMT+7" },
  { label: "UTC-4", timeZone: "Etc/GMT+4" },
  { label: "UTC", timeZone: "Etc/UTC" },
  { label: "UTC+3", timeZone: "Etc/GMT-3" },
  { label: "UTC+8", timeZone: "Etc/GMT-8" },
]

const makeTimeFormatter = (timeZone?: string) =>
  new Intl.DateTimeFormat(locale.value, {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
    timeZone,
  })

const timezoneRows: TimeZoneRow[] = (
  props.timeZones ?? defaultTimeZoneSpec
).map((spec, idx) => {
  const label = spec.label ?? (spec.labelKey ? t(spec.labelKey) : "")
  const extraNotice = spec.extraNoticeKey ? t(spec.extraNoticeKey) : ""
  return {
    id: idx,
    label,
    extraNotice,
    formatted: makeTimeFormatter(spec.timeZone).format(props.time),
  }
})
</script>
