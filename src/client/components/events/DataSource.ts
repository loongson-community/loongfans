import IcalExpander from "ical-expander"

import biweeklyDB from "@data/biweekly.min.json"

type EventItem = {
  start: Date
  title: string
}

export type BiweeklyEventItem = {
  issueNumber: number
  isFuture: boolean
  isNext: boolean
  start: Date
}

function expandEventsFromICS(ics: string, start: Date, end: Date): EventItem[] {
  const expander = new IcalExpander({ ics, maxIterations: 100 })
  const allExpandedEvents = expander.between(start, end)
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
  return simplifiedEvents
}

export type BiweeklyEventsResult = {
  biweeklyEvents: BiweeklyEventItem[]
  nextEventIdx: number | null
}

export function getBiweeklyEvents(
  ics: string,
  now: Date,
): BiweeklyEventsResult {
  const expansionRangeStart = new Date(2024, 11, 8) // date of first biweekly event
  const thisYear = new Date().getFullYear()
  const expansionRangeEnd = new Date(thisYear + 1, 0, 1)
  const events = expandEventsFromICS(
    ics,
    expansionRangeStart,
    expansionRangeEnd,
  )

  const allBiweeklyEvents = events.filter((e) => /龙架构双周会/i.test(e.title))
  const result: BiweeklyEventItem[] = []
  let nextEventIdx: number | null = null
  for (const [idx, event] of allBiweeklyEvents.entries()) {
    const issueNumber = idx + 1
    const isFuture = event.start.getTime() > now.getTime()
    const isNext = isFuture && nextEventIdx === null
    if (isNext) {
      nextEventIdx = idx
    }

    result.push({
      issueNumber,
      isFuture,
      isNext,
      start: event.start,
    })
  }

  return {
    biweeklyEvents: result,
    nextEventIdx,
  }
}

export function getBiweeklySlideLink(index: number): string | null {
  // www.kdocs.cn is the canonical domain for WPS Docs links
  // bare kdocs.cn links will just 302 to www.kdocs.cn so save our users a
  // round-trip
  const kdocsID = biweeklyDB.links[index.toString(10)]?.slides
  return kdocsID ? `https://kdocs.cn/l/${kdocsID}` : null
}

export function getBiweeklyBilibiliLink(index: number): string | null {
  const bvid = biweeklyDB.links[index.toString(10)]?.bvid
  return bvid ? `https://www.bilibili.com/video/${bvid}/` : null
}
