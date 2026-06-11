<template>
  <div class="flex flex-col md:flex-row md:gap-6">
    <div class="w-full flex justify-center md:flex-1">
      <EventCalendar
        :events="biweeklyEvents.events"
        :now="now"
        @event-selected="onEventSelected"
      />
    </div>
    <div v-if="thisEvent.length > 0" class="w-full announcement-container">
      <component
        :is="announcementComponents[event.kind]"
        v-for="event in thisEvent"
        :key="`${event.kind}-${event.issueNumber}`"
        :event="event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component, type Ref } from "vue"

import eventsICS from "@data/events/events.ics?raw"
import {
  getBiweeklyEvents,
  type EventItem,
} from "@src/client/components/events/dataSource"
import IntlBiweeklyAnnouncement from "@src/client/components/events/IntlBiweeklyAnnouncement.vue"
import ZhBiweeklyAnnouncement from "@src/client/components/events/ZhBiweeklyAnnouncement.vue"
import EventCalendar from "@src/client/components/events/EventCalendar.vue"
import type { BiweeklyEventKind } from "@src/types/data"

const now = new Date()
const biweeklyEvents = getBiweeklyEvents(eventsICS, now)

const announcementComponents: Record<BiweeklyEventKind, Component> = {
  zhBiweekly: ZhBiweeklyAnnouncement,
  intlBiweekly: IntlBiweeklyAnnouncement,
}

const thisEvent: Ref<EventItem[]> = ref([])

const onEventSelected = (items: EventItem[]) => {
  thisEvent.value = items
}
</script>

<style>
/* mimic the Tailwind "md" breakpoint */
@media (width >= 48rem) {
  .announcement-container h3 {
    margin-top: 0;
  }
}
</style>
