import IcalExpander from "ical-expander"

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
  const result = []
  let nextEventIdx = null
  for (
    let issueNumber = 1;
    issueNumber <= allBiweeklyEvents.length;
    issueNumber++
  ) {
    const event = allBiweeklyEvents[issueNumber - 1]
    const isFuture = event.start.getTime() > now.getTime()
    const isNext = isFuture && nextEventIdx === null
    if (isNext) {
      nextEventIdx = issueNumber - 1
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
