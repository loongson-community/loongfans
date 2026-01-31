import { parseDocument, Document, Scalar, YAMLMap, Pair } from "yaml"

type EditRequest = {
  newBVID?: string
  newSlidesID?: string
}

type EventInfoEditRequest = {
  newBilibiliLiveLink?: string
  newWemeetLink?: string
  newWemeetNumber?: string
}

// NOTE: The implementation is ported to edit YAML data, from a manually crafted
// Babel AST-based earlier version that worked on the previously TypeScript data
// source. It is ported by GPT-5.2-Codex, so while it works fine, beware of
// AI slop bits here and there...
//
// What I have fixed in the original AI output:
//
// - `Document` instead of `ReturnType<typeof parseDocument>`;
// - `debugPrintLinksNode` instead of `debugPrintDataNode` (`linksNode`
//   originally being `dataNode`);
// - simplified `sortEventInfoProperties` to just sort alphabetically.
export class BiweeklyLinkEditor {
  debug: boolean = false
  filePath: string
  doc: Document
  linksNode: YAMLMap
  eventInfoNode: YAMLMap

  constructor(code: string, filePath: string, debug: boolean = false) {
    this.debug = debug
    this.filePath = filePath

    this.doc = parseDocument(code, { keepSourceTokens: true })
    this.linksNode = findBiweeklyLinkDataNode(this.doc)!
    this.eventInfoNode = findBiweeklyEventInfoNode(this.doc)!
    if (!this.linksNode) {
      throw new Error(
        "Cannot find biweekly event data in the input, please refactor this script!",
      )
    }

    if (this.debug) {
      debugPrintLinksNode(this.linksNode)
    }
  }

  editSlidesID(issueNumber: number, val: string) {
    console.log(
      `Setting slides ID to ${val} for biweekly issue #${issueNumber}`,
    )
    editBiweeklyLinkData(this.linksNode, issueNumber, { newSlidesID: val })
  }

  editBVID(issueNumber: number, val: string) {
    console.log(`Setting BVID to ${val} for biweekly issue #${issueNumber}`)
    editBiweeklyLinkData(this.linksNode, issueNumber, { newBVID: val })
  }

  editEventInfo(edits: EventInfoEditRequest) {
    if (edits.newBilibiliLiveLink) {
      console.log(
        `Setting Bilibili live room link to ${edits.newBilibiliLiveLink}`,
      )
    }
    if (edits.newWemeetLink) {
      console.log(`Setting Wemeet link to ${edits.newWemeetLink}`)
    }
    if (edits.newWemeetNumber) {
      console.log(`Setting Wemeet number to ${edits.newWemeetNumber}`)
    }
    editBiweeklyEventInfo(this.eventInfoNode, edits)
  }

  async emit() {
    if (this.debug) {
      console.log("After edits:")
      debugPrintLinksNode(this.linksNode)
    }
    const output = this.doc.toString()
    if (this.debug) {
      console.log("Generated YAML:")
      console.log(output)
    }
    return output
  }
}

const findBiweeklyLinkDataNode = (doc: Document): YAMLMap => {
  const linksNode = doc.getIn(["links"])
  if (!linksNode) {
    const empty = new YAMLMap()
    doc.set("links", empty)
    return empty
  }

  if (!(linksNode instanceof YAMLMap)) {
    throw new Error("unexpected YAML structure for biweekly link data")
  }
  return linksNode
}

const findBiweeklyEventInfoNode = (doc: Document): YAMLMap => {
  const eventInfoNode = doc.getIn(["eventInfo"])
  if (!eventInfoNode) {
    const empty = new YAMLMap()
    doc.set("eventInfo", empty)
    return empty
  }
  if (!(eventInfoNode instanceof YAMLMap)) {
    throw new Error("unexpected YAML structure for biweekly event info")
  }
  return eventInfoNode
}

const debugPrintLinksNode = (linksNode: YAMLMap) => {
  for (const item of linksNode.items) {
    if (!(item instanceof Pair)) continue
    debugPrintIssueData(item)
  }
}

const debugPrintIssueData = (issuePair: Pair) => {
  const issueNumber = getNumericKey(issuePair.key)
  const issueMap = issuePair.value
  let slidesID: string | null = null
  let bvid: string | null = null

  if (issueMap instanceof YAMLMap) {
    for (const item of issueMap.items) {
      if (!(item instanceof Pair)) continue
      const key = getStringKey(item.key)
      if (key === "slides") slidesID = getScalarValue(item.value)
      if (key === "bvid") bvid = getScalarValue(item.value)
    }
  }

  console.log("Issue Number:", issueNumber)
  console.log("  Slides ID:", slidesID)
  console.log("  BVID:", bvid)
}

const editBiweeklyLinkData = (
  linksNode: YAMLMap,
  issueNumber: number,
  edits: EditRequest,
) => {
  const issueMap = ensureIssueMap(linksNode, issueNumber)

  if (edits.newSlidesID) {
    upsertIssueValue(issueMap, "slides", edits.newSlidesID)
  }
  if (edits.newBVID) {
    upsertIssueValue(issueMap, "bvid", edits.newBVID)
  }

  sortIssueProperties(issueMap)
}

const editBiweeklyEventInfo = (
  eventInfoNode: YAMLMap,
  edits: EventInfoEditRequest,
) => {
  if (edits.newBilibiliLiveLink) {
    upsertMapValue(eventInfoNode, "bilibiliLiveLink", edits.newBilibiliLiveLink)
  }
  if (edits.newWemeetLink) {
    upsertMapValue(eventInfoNode, "wemeetLink", edits.newWemeetLink)
  }
  if (edits.newWemeetNumber) {
    upsertMapValue(eventInfoNode, "wemeetNumber", edits.newWemeetNumber)
  }
  sortEventInfoProperties(eventInfoNode)
}

const ensureIssueMap = (linksNode: YAMLMap, issueNumber: number): YAMLMap => {
  const existing = getIssueMap(linksNode, issueNumber)
  if (existing) return existing

  const issueMap = new YAMLMap()
  insertIssueInOrder(linksNode, issueNumber, issueMap)
  return issueMap
}

const getIssueMap = (
  linksNode: YAMLMap,
  issueNumber: number,
): YAMLMap | null => {
  for (const item of linksNode.items) {
    if (!(item instanceof Pair)) continue
    const key = getNumericKey(item.key)
    if (key === issueNumber) {
      if (item.value instanceof YAMLMap) {
        return item.value
      }
      throw new Error("unexpected YAML structure for issue data")
    }
  }
  return null
}

const insertIssueInOrder = (
  linksNode: YAMLMap,
  issueNumber: number,
  issueMap: YAMLMap,
) => {
  const newPair = new Pair(new Scalar(issueNumber), issueMap)
  const insertIndex = linksNode.items.findIndex((item) => {
    if (!(item instanceof Pair)) return false
    const key = getNumericKey(item.key)
    return key !== null && key > issueNumber
  })

  if (insertIndex === -1) {
    linksNode.items.push(newPair)
  } else {
    linksNode.items.splice(insertIndex, 0, newPair)
  }
}

const upsertIssueValue = (issueMap: YAMLMap, key: string, value: string) => {
  const existing = findPair(issueMap, key)
  if (existing) {
    if (existing.value instanceof Scalar) {
      existing.value.value = value
      return
    }
    existing.value = createQuotedScalar(value)
    return
  }

  issueMap.items.push(new Pair(new Scalar(key), createQuotedScalar(value)))
}

const sortIssueProperties = (issueMap: YAMLMap) => {
  const order = new Map([
    ["slides", 0],
    ["bvid", 1],
  ])

  issueMap.items.sort((a, b) => {
    if (!(a instanceof Pair) || !(b instanceof Pair)) return 0
    const aKey = getStringKey(a.key)
    const bKey = getStringKey(b.key)
    const aOrder = order.get(aKey ?? "") ?? 99
    const bOrder = order.get(bKey ?? "") ?? 99
    return aOrder - bOrder
  })
}

const findPair = (map: YAMLMap, key: string): Pair | null => {
  for (const item of map.items) {
    if (!(item instanceof Pair)) continue
    if (getStringKey(item.key) === key) return item
  }
  return null
}

const upsertMapValue = (map: YAMLMap, key: string, value: string) => {
  const existing = findPair(map, key)
  if (existing) {
    if (existing.value instanceof Scalar) {
      existing.value.value = value
      return
    }
    existing.value = createQuotedScalar(value)
    return
  }
  map.items.push(new Pair(new Scalar(key), createQuotedScalar(value)))
}

const sortEventInfoProperties = (eventInfoNode: YAMLMap) => {
  // just alphabetical order is fine
  eventInfoNode.items.sort((a, b) => {
    if (!(a instanceof Pair) || !(b instanceof Pair)) return 0
    const aKey = getStringKey(a.key) ?? ""
    const bKey = getStringKey(b.key) ?? ""
    // there is no locale-agnostic codepoint-based comparison in JS yet, so we
    // can only use localeCompare
    // hope https://github.com/tc39/proposal-compare-strings-by-codepoint gets
    // accepted someday...
    return aKey.localeCompare(bKey)
  })
}

const getNumericKey = (key: unknown): number | null => {
  if (key instanceof Scalar) {
    if (typeof key.value === "number") return key.value
    if (typeof key.value === "string") {
      const parsed = Number(key.value)
      return Number.isNaN(parsed) ? null : parsed
    }
    return null
  }
  if (typeof key === "number") return key
  if (typeof key === "string") {
    const parsed = Number(key)
    return Number.isNaN(parsed) ? null : parsed
  }
  return null
}

const getStringKey = (key: unknown): string | null => {
  if (key instanceof Scalar) {
    return key.value == null ? null : String(key.value)
  }
  if (typeof key === "string") return key
  return null
}

const getScalarValue = (value: unknown): string | null => {
  if (value instanceof Scalar) {
    return value.value == null ? null : String(value.value)
  }
  return null
}

const createQuotedScalar = (value: string): Scalar => {
  const scalar = new Scalar(value)
  scalar.type = Scalar.QUOTE_DOUBLE
  return scalar
}
