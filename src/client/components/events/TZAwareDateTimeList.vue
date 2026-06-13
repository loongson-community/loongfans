<template>
  <ul>
    <li v-for="row in rows" :key="row.id">
      <strong>{{ row.label }}</strong
      >:
      <span :class="{ 'different-day': row.differentDay }">{{
        row.formatted
      }}</span
      >{{ row.extraNotice }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

export type TimeZoneSpec = {
  label?: string
  labelKey?: string
  timeZone: string
  extraNoticeKey?: string
}

type TimeZoneRow = {
  id: number
  label: string
  formatted: string
  extraNotice: string
  differentDay: boolean
}

const props = defineProps<{
  time: Date | Temporal.Instant
  timeZones?: TimeZoneSpec[]
  extraNoticeKeyForLocalTime?: string
}>()

const { locale, t } = useI18n()

const timeInstant =
  props.time instanceof Date
    ? Temporal.Instant.fromEpochMilliseconds(props.time.getTime())
    : props.time

const localTZ = Temporal.Now.timeZoneId()

const defaultTimeZoneSpec: TimeZoneSpec[] = [
  {
    labelKey: "yourTimezone",
    timeZone: localTZ,
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

const dateInLocalTime = timeInstant.toZonedDateTimeISO(localTZ)
const sameDayAsLocalTime = (tz: string) => {
  const dateInOtherTZ = timeInstant.toZonedDateTimeISO(tz)
  return (
    dateInOtherTZ.year === dateInLocalTime.year &&
    dateInOtherTZ.month === dateInLocalTime.month &&
    dateInOtherTZ.day === dateInLocalTime.day
  )
}

const rows: TimeZoneRow[] = (props.timeZones ?? defaultTimeZoneSpec).map(
  (spec, idx) => {
    const label =
      spec.label ?? (spec.labelKey ? t(spec.labelKey) : spec.timeZone)
    const extraNotice = spec.extraNoticeKey ? t(spec.extraNoticeKey) : ""
    return {
      id: idx,
      label,
      extraNotice,
      formatted: makeTimeFormatter(spec.timeZone).format(timeInstant),
      differentDay: !sameDayAsLocalTime(spec.timeZone),
    }
  },
)
</script>

<style scoped>
.different-day {
  color: #e60013;
}
</style>
