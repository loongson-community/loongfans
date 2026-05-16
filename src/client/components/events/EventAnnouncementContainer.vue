<template>
  <div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full flex justify-center md:flex-1">
      <EventCalendar
        :events="biweeklyEvents.events"
        :now="now"
        @event-selected="onEventSelected"
      />
    </div>
    <div v-if="thisEvent !== null" class="w-full announcement-container">
      <component :is="announcementComponent" :event="thisEvent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component, type Ref } from "vue"

import eventsICS from "@data/events/events.ics?raw"
import {
  type EventsResult,
  getBiweeklyEvents,
  type EventItem,
} from "@src/client/components/events/dataSource"
import EventAnnouncementEnBiweekly from "@src/client/components/events/EventAnnouncementEnBiweekly.vue"
import EventAnnouncementZhBiweekly from "@src/client/components/events/EventAnnouncementZhBiweekly.vue"
import EventCalendar from "@src/client/components/events/EventCalendar.vue"
import type { BiweeklyEventKind } from "@src/types/data"

const props = defineProps<{
  includeKinds?: BiweeklyEventKind | BiweeklyEventKind[]
}>()

const now = new Date()
const allBiweeklyEvents = getBiweeklyEvents(eventsICS, now)

const filterEventsByKind = (
  result: EventsResult,
  includeKinds: BiweeklyEventKind | BiweeklyEventKind[] | undefined,
): EventsResult => {
  const includedKinds = includeKinds
    ? new Set(Array.isArray(includeKinds) ? includeKinds : [includeKinds])
    : null
  const filteredEvents = includedKinds
    ? result.events.filter((event) => includedKinds.has(event.kind))
    : result.events
  const nextEventIdx = filteredEvents.findIndex((event) => event.isFuture)

  return {
    events: filteredEvents.map((event, idx) => ({
      ...event,
      isNext: idx === nextEventIdx,
    })),
    nextEventIdx: nextEventIdx === -1 ? null : nextEventIdx,
  }
}

const biweeklyEvents = filterEventsByKind(allBiweeklyEvents, props.includeKinds)

const announcementComponents: Record<BiweeklyEventKind, Component> = {
  zhBiweekly: EventAnnouncementZhBiweekly,
  enBiweekly: EventAnnouncementEnBiweekly,
}

const thisEvent: Ref<EventItem | null> = ref(null)
const announcementComponent = computed(() => {
  return thisEvent.value ? announcementComponents[thisEvent.value.kind] : null
})

const onEventSelected = (be: EventItem | null) => {
  thisEvent.value = be
}
</script>

<style scoped>
/* mimic the Tailwind "md" breakpoint */
@media (width >= 48rem) {
  .announcement-container h3 {
    margin-top: 0;
  }
}
</style>
