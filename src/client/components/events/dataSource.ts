import IcalExpander from "ical-expander"

import biweeklyDB from "virtual:loongfans-data/biweekly"
import type {
  BiweeklyAvailableResource,
  BiweeklyEventKind,
  BiweeklyResource,
  BiweeklyResourceType,
} from "@src/types/data"

export const eventKinds = ["zhBiweekly", "enBiweekly"] as const

const l10nTitleKeys: Record<EventKind, string> = {
  zhBiweekly: "zhBiweeklyEventTitle",
  enBiweekly: "enBiweeklyEventTitle",
}

export type EventKind = BiweeklyEventKind

type ExpandedICSEvent = {
  start: Date
  title: string
}

export type EventItem = {
  kind: EventKind
  issueNumber: number
  isFuture: boolean
  isNext: boolean
  rawTitle: string
  start: Date
  titleKey: string
}

export type EventsResult = {
  events: EventItem[]
  nextEventIdx: number | null
}

type TaggedEventTitle = {
  kind: EventKind
  titleKey: string
}

function isEventKind(kind: string): kind is EventKind {
  return (eventKinds as readonly string[]).includes(kind)
}

function parseTaggedEventTitle(title: string): TaggedEventTitle | null {
  const match = /^\[([A-Za-z][A-Za-z0-9_-]*)\]/.exec(title)
  if (!match) return null

  const [, kind] = match
  if (!kind || !isEventKind(kind)) return null
  // we need to localize the title according to the kind, and drop the iCalendar
  // event title, because the title in the .ics file is just a freeform string.
  return { kind, titleKey: l10nTitleKeys[kind] }
}

export function expandEventsFromICS(
  ics: string,
  start: Date,
  end: Date,
  now: Date,
): EventItem[] {
  const expander = new IcalExpander({ ics, maxIterations: 100 })
  const allExpandedEvents = expander.between(start, end)
  const simplifiedEvents: ExpandedICSEvent[] = [
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

  const issueNumbersByKind = new Map<EventKind, number>()
  let nextEventIdx: number | null = null
  const result: EventItem[] = []

  for (const event of simplifiedEvents) {
    const taggedTitle = parseTaggedEventTitle(event.title)
    if (!taggedTitle) continue

    const issueNumber = (issueNumbersByKind.get(taggedTitle.kind) ?? 0) + 1
    issueNumbersByKind.set(taggedTitle.kind, issueNumber)

    const isFuture = event.start.getTime() > now.getTime()
    const isNext = isFuture && nextEventIdx === null
    if (isNext) {
      nextEventIdx = result.length
    }

    result.push({
      kind: taggedTitle.kind,
      issueNumber,
      isFuture,
      isNext,
      rawTitle: event.title,
      start: event.start,
      titleKey: taggedTitle.titleKey,
    })
  }

  return result
}

export function getBiweeklyEvents(ics: string, now: Date): EventsResult {
  const expansionRangeStart = new Date(2024, 11, 8) // date of first biweekly event
  const thisYear = new Date().getFullYear()
  const expansionRangeEnd = new Date(thisYear + 1, 0, 1)
  const events = expandEventsFromICS(
    ics,
    expansionRangeStart,
    expansionRangeEnd,
    now,
  )

  const nextEventIdx = events.findIndex((event) => event.isNext)

  return {
    events,
    nextEventIdx: nextEventIdx === -1 ? null : nextEventIdx,
  }
}

export function getBiweeklySlideLink(index: number): string | null {
  // www.kdocs.cn is the canonical domain for WPS Docs links
  // bare kdocs.cn links will just 302 to www.kdocs.cn so save our users a
  // round-trip
  const kdocs = getBiweeklyArchiveResource("zhBiweekly", index, "kdocs")
  return kdocs ? `https://kdocs.cn/l/${kdocs.id}` : null
}

export function getBiweeklyBilibiliLink(index: number): string | null {
  const bilibili = getBiweeklyArchiveResource("zhBiweekly", index, "bilibili")
  if (!bilibili) return null
  if (bilibili.link) return bilibili.link
  return bilibili.bvid
    ? `https://www.bilibili.com/video/${bilibili.bvid}/`
    : null
}

export function isAvailableResource(
  resource: BiweeklyResource,
): resource is BiweeklyAvailableResource {
  return !resource.status || resource.status === "available"
}

export function getBiweeklyCurrentResource<T extends BiweeklyResourceType>(
  kind: BiweeklyEventKind,
  type: T,
): Extract<BiweeklyAvailableResource, { type: T }> | null {
  return getBiweeklyResource(biweeklyDB.events[kind].links, type)
}

export function getBiweeklyArchiveResource<T extends BiweeklyResourceType>(
  kind: BiweeklyEventKind,
  index: number,
  type: T,
): Extract<BiweeklyAvailableResource, { type: T }> | null {
  const resources = biweeklyDB.events[kind].archives[index.toString(10)] ?? []
  return getBiweeklyResource(resources, type)
}

export function getBiweeklyCurrentResources(
  kind: BiweeklyEventKind,
): BiweeklyResource[] {
  return biweeklyDB.events[kind].links
}

export function getBiweeklyArchiveResources(
  kind: BiweeklyEventKind,
  index: number,
): BiweeklyResource[] {
  return biweeklyDB.events[kind].archives[index.toString(10)] ?? []
}

export function getBiweeklyResourceLink(
  resource: BiweeklyResource,
): string | null {
  if (!isAvailableResource(resource)) return null

  switch (resource.type) {
    case "wemeet":
    case "zoom":
    case "zoomChat":
      return resource.link

    case "bilibili":
      if (resource.link) return resource.link
      return resource.bvid
        ? `https://www.bilibili.com/video/${resource.bvid}/`
        : null
    case "googledocs":
      return `https://docs.google.com/${resource.kind}/d/${resource.id}/edit?usp=sharing`
    case "kdocs":
      return `https://kdocs.cn/l/${resource.id}`
    case "vkvideo":
      return `https://vkvideo.ru/video-${resource.id}`
    case "youtube":
      return `https://www.youtube.com/watch?v=${resource.id}`
  }
}

function getBiweeklyResource<T extends BiweeklyResourceType>(
  resources: BiweeklyResource[],
  type: T,
): Extract<BiweeklyAvailableResource, { type: T }> | null {
  return (
    resources.find(
      (resource): resource is Extract<BiweeklyAvailableResource, { type: T }> =>
        resource.type === type && isAvailableResource(resource),
    ) ?? null
  )
}
