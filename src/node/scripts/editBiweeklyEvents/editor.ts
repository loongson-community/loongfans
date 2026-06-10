import { parseDocument, Document, Pair, Scalar, YAMLMap, YAMLSeq } from "yaml"

import type { BiweeklyEventKind, BiweeklyResourceType } from "@src/types/data"

type ResourceFields = Partial<{
  bvid: string
  id: string
  link: string
  number: string
  passcode: string
}>

type EventInfoEditRequest = {
  newBilibiliLiveLink?: string
  newWemeetLink?: string
  newWemeetNumber?: string
}

type Changes = {
  slidesID?: boolean
  bvid?: boolean
  livestreamLink?: boolean
  wemeet?: boolean
  zoom?: boolean
  zoomChat?: boolean
  googleDocs?: boolean
  youtube?: boolean
  vkVideo?: boolean
}

type ChangedCallback = (changes: Changes) => void

export class BiweeklyLinkEditor {
  debug: boolean = false
  eventKind: BiweeklyEventKind
  filePath: string
  doc: Document
  linksNode: YAMLSeq
  archivesNode: YAMLMap

  // changed status for various parts, used for generating commit messages
  issueNumber: number | null = null
  pendingChanges: Changes = {
    slidesID: false,
    bvid: false,
    livestreamLink: false,
    wemeet: false,
    zoom: false,
    zoomChat: false,
    googleDocs: false,
    youtube: false,
    vkVideo: false,
  }

  constructor(
    code: string,
    filePath: string,
    eventKind: BiweeklyEventKind = "zhBiweekly",
    debug: boolean = false,
  ) {
    this.debug = debug
    this.eventKind = eventKind
    this.filePath = filePath

    this.doc = parseDocument(code, { keepSourceTokens: true })
    const eventKindNode = ensureBiweeklyKindDataNode(this.doc, eventKind)
    this.linksNode = ensureSeqChild(eventKindNode, "links")
    this.archivesNode = ensureMapChild(eventKindNode, "archives")

    if (this.debug) {
      debugPrintResources("Current resources", this.linksNode)
      debugPrintArchives(this.archivesNode)
    }
  }

  editSlidesID(issueNumber: number, val: string) {
    console.log(
      `Setting KDocs slides ID to ${val} for ${this.eventKind} #${issueNumber}`,
    )
    this.issueNumber = issueNumber
    editArchiveResource(
      this.archivesNode,
      issueNumber,
      "kdocs",
      { id: val },
      "slidesID",
      (changes) => {
        this.pendingChanges.slidesID ||= changes.slidesID ?? false
      },
    )
  }

  editBVID(issueNumber: number, val: string) {
    console.log(`Setting BVID to ${val} for ${this.eventKind} #${issueNumber}`)
    this.issueNumber = issueNumber
    editArchiveResource(
      this.archivesNode,
      issueNumber,
      "bilibili",
      { bvid: val },
      "bvid",
      (changes) => {
        this.pendingChanges.bvid ||= changes.bvid ?? false
      },
    )
  }

  editCurrentResourceLink(type: BiweeklyResourceType, link: string) {
    console.log(`Setting ${type} current resource link to ${link}`)
    editResource(
      this.linksNode,
      type,
      { link },
      changeKeyForResource(type),
      (changes) => {
        mergeChanges(this.pendingChanges, changes)
      },
    )
  }

  editArchiveLink(
    issueNumber: number,
    type: BiweeklyResourceType,
    link: string,
  ) {
    console.log(
      `Setting ${type} archive link to ${link} for ${this.eventKind} #${issueNumber}`,
    )
    this.issueNumber = issueNumber
    editArchiveResource(
      this.archivesNode,
      issueNumber,
      type,
      { link },
      changeKeyForResource(type),
      (changes) => {
        mergeChanges(this.pendingChanges, changes)
      },
    )
  }

  editEventInfo(edits: EventInfoEditRequest) {
    if (edits.newBilibiliLiveLink) {
      console.log(
        `Setting Bilibili live room link to ${edits.newBilibiliLiveLink}`,
      )
      editResource(
        this.linksNode,
        "bilibili",
        { link: edits.newBilibiliLiveLink },
        "livestreamLink",
        (changes) => {
          this.pendingChanges.livestreamLink ||= changes.livestreamLink ?? false
        },
      )
    }

    if (edits.newWemeetLink || edits.newWemeetNumber) {
      if (edits.newWemeetLink) {
        console.log(`Setting Wemeet link to ${edits.newWemeetLink}`)
      }
      if (edits.newWemeetNumber) {
        console.log(`Setting Wemeet number to ${edits.newWemeetNumber}`)
      }
      const fields: ResourceFields = {}
      if (edits.newWemeetLink) fields.link = edits.newWemeetLink
      if (edits.newWemeetNumber) fields.number = edits.newWemeetNumber
      ensureWemeetCanBeEdited(this.linksNode, fields)
      editResource(this.linksNode, "wemeet", fields, "wemeet", (changes) => {
        this.pendingChanges.wemeet ||= changes.wemeet ?? false
      })
    }
  }

  async emit() {
    if (this.debug) {
      console.log("After edits:")
      debugPrintResources("Current resources", this.linksNode)
      debugPrintArchives(this.archivesNode)
    }
    const output = this.doc.toString()
    if (this.debug) {
      console.log("Generated YAML:")
      console.log(output)
    }
    return output
  }

  touched(): boolean {
    return Object.values(this.pendingChanges).some(Boolean)
  }

  makeGitCommitMessage(): string {
    const changedParts: string[] = []
    if (this.pendingChanges.bvid) changedParts.push("BVID")
    if (this.pendingChanges.slidesID) changedParts.push("slides ID")
    if (this.pendingChanges.livestreamLink) {
      changedParts.push("livestream link")
    }
    if (this.pendingChanges.wemeet) changedParts.push("Wemeet info")
    if (this.pendingChanges.zoom) changedParts.push("Zoom link")
    if (this.pendingChanges.zoomChat) changedParts.push("Zoom chat link")
    if (this.pendingChanges.googleDocs) changedParts.push("Google Docs link")
    if (this.pendingChanges.youtube) changedParts.push("YouTube link")
    if (this.pendingChanges.vkVideo) changedParts.push("VK Video link")

    if (this.issueNumber != null) {
      return `feat(biweekly): update ${changedParts.join(" and ")} for ${this.eventKind} ${this.issueNumber}`
    }
    return `feat(biweekly): update ${changedParts.join(" and ")} for ${this.eventKind}`
  }
}

const ensureBiweeklyKindDataNode = (
  doc: Document,
  eventKind: BiweeklyEventKind,
): YAMLMap => {
  const root = ensureRootMap(doc)
  const eventsNode = ensureMapChild(root, "events")
  return ensureMapChild(eventsNode, eventKind)
}

const ensureRootMap = (doc: Document): YAMLMap => {
  if (!doc.contents) {
    const root = new YAMLMap()
    doc.contents = root
    return root
  }
  if (!(doc.contents instanceof YAMLMap)) {
    throw new Error("unexpected YAML structure for biweekly data")
  }
  return doc.contents
}

const ensureMapChild = (map: YAMLMap, key: string): YAMLMap => {
  const existing = findPair(map, key)
  if (existing) {
    if (existing.value instanceof YAMLMap) return existing.value
    throw new Error(`unexpected YAML structure for ${key}`)
  }

  const child = new YAMLMap()
  map.items.push(new Pair(new Scalar(key), child))
  return child
}

const ensureSeqChild = (map: YAMLMap, key: string): YAMLSeq => {
  const existing = findPair(map, key)
  if (existing) {
    if (existing.value instanceof YAMLSeq) return existing.value
    throw new Error(`unexpected YAML structure for ${key}`)
  }

  const child = new YAMLSeq()
  map.items.push(new Pair(new Scalar(key), child))
  return child
}

const debugPrintArchives = (archivesNode: YAMLMap) => {
  for (const item of archivesNode.items) {
    if (!(item instanceof Pair)) continue
    const issueNumber = getNumericKey(item.key)
    if (issueNumber == null || !(item.value instanceof YAMLSeq)) continue
    debugPrintResources(`Archive #${issueNumber}`, item.value)
  }
}

const debugPrintResources = (label: string, resourcesNode: YAMLSeq) => {
  console.log(label)
  for (const item of resourcesNode.items) {
    if (!(item instanceof YAMLMap)) continue
    console.log("  Resource:", getResourceType(item) ?? "<unknown>")
  }
}

const editArchiveResource = (
  archivesNode: YAMLMap,
  issueNumber: number,
  type: BiweeklyResourceType,
  fields: ResourceFields,
  changeKey: keyof Changes,
  onChanged: ChangedCallback,
) => {
  const resourcesNode = ensureArchiveResourceSeq(archivesNode, issueNumber)
  editResource(resourcesNode, type, fields, changeKey, onChanged)
}

const editResource = (
  resourcesNode: YAMLSeq,
  type: BiweeklyResourceType,
  fields: ResourceFields,
  changeKey: keyof Changes,
  onChanged: ChangedCallback,
) => {
  const resourceMap = ensureResourceMap(resourcesNode, type)
  let changed = false

  for (const [key, value] of Object.entries(fields)) {
    changed ||= upsertMapValue(resourceMap, key, value)
  }
  changed ||= removeMapValue(resourceMap, "status")

  sortResourceProperties(resourceMap)
  sortResources(resourcesNode)

  const changes: Changes = {}
  changes[changeKey] = changed
  onChanged(changes)
}

const ensureWemeetCanBeEdited = (
  resourcesNode: YAMLSeq,
  fields: ResourceFields,
) => {
  if (fields.link) return
  const existing = getResourceMap(resourcesNode, "wemeet")
  const existingLink = existing ? getMapScalarValue(existing, "link") : null
  if (!existingLink) {
    throw new Error("Wemeet link is required when creating Wemeet info")
  }
}

const ensureArchiveResourceSeq = (
  archivesNode: YAMLMap,
  issueNumber: number,
): YAMLSeq => {
  const existing = getArchiveResourceSeq(archivesNode, issueNumber)
  if (existing) return existing

  const resourcesNode = new YAMLSeq()
  insertArchiveInOrder(archivesNode, issueNumber, resourcesNode)
  return resourcesNode
}

const getArchiveResourceSeq = (
  archivesNode: YAMLMap,
  issueNumber: number,
): YAMLSeq | null => {
  for (const item of archivesNode.items) {
    if (!(item instanceof Pair)) continue
    const key = getNumericKey(item.key)
    if (key === issueNumber) {
      if (item.value instanceof YAMLSeq) return item.value
      throw new Error("unexpected YAML structure for archive resources")
    }
  }
  return null
}

const insertArchiveInOrder = (
  archivesNode: YAMLMap,
  issueNumber: number,
  resourcesNode: YAMLSeq,
) => {
  const newPair = new Pair(new Scalar(issueNumber), resourcesNode)
  const insertIndex = archivesNode.items.findIndex((item) => {
    if (!(item instanceof Pair)) return false
    const key = getNumericKey(item.key)
    return key !== null && key > issueNumber
  })

  if (insertIndex === -1) {
    archivesNode.items.push(newPair)
  } else {
    archivesNode.items.splice(insertIndex, 0, newPair)
  }
}

const ensureResourceMap = (
  resourcesNode: YAMLSeq,
  type: BiweeklyResourceType,
): YAMLMap => {
  const existing = getResourceMap(resourcesNode, type)
  if (existing) return existing

  const resourceMap = new YAMLMap()
  resourceMap.items.push(new Pair(new Scalar("type"), createQuotedScalar(type)))
  resourcesNode.items.push(resourceMap)
  sortResources(resourcesNode)
  return resourceMap
}

const getResourceMap = (
  resourcesNode: YAMLSeq,
  type: BiweeklyResourceType,
): YAMLMap | null => {
  for (const item of resourcesNode.items) {
    if (!(item instanceof YAMLMap)) continue
    if (getResourceType(item) === type) return item
  }
  return null
}

const getResourceType = (resourceMap: YAMLMap): string | null => {
  return getMapScalarValue(resourceMap, "type")
}

const upsertMapValue = (map: YAMLMap, key: string, value: string) => {
  const existing = findPair(map, key)
  if (existing) {
    if (existing.value instanceof Scalar) {
      if (existing.value.value === value) return false
      existing.value.value = value
      return true
    }
    existing.value = createQuotedScalar(value)
    return true
  }
  map.items.push(new Pair(new Scalar(key), createQuotedScalar(value)))
  return true
}

const removeMapValue = (map: YAMLMap, key: string) => {
  const idx = map.items.findIndex((item) => {
    if (!(item instanceof Pair)) return false
    return getStringKey(item.key) === key
  })
  if (idx === -1) return false
  map.items.splice(idx, 1)
  return true
}

const sortResourceProperties = (resourceMap: YAMLMap) => {
  const order = new Map([
    ["type", 0],
    ["id", 1],
    ["bvid", 2],
    ["link", 3],
    ["number", 4],
    ["passcode", 5],
    ["status", 6],
    ["label", 7],
    ["note", 8],
  ])

  resourceMap.items.sort((a, b) => {
    if (!(a instanceof Pair) || !(b instanceof Pair)) return 0
    const aKey = getStringKey(a.key)
    const bKey = getStringKey(b.key)
    const aOrder = order.get(aKey ?? "") ?? 99
    const bOrder = order.get(bKey ?? "") ?? 99
    return aOrder - bOrder
  })
}

const sortResources = (resourcesNode: YAMLSeq) => {
  const order = new Map<BiweeklyResourceType, number>([
    ["wemeet", 0],
    ["kdocs", 1],
    ["googledocs", 2],
    ["zoom", 3],
    ["zoomChat", 4],
    ["bilibili", 5],
    ["youtube", 6],
    ["vkvideo", 7],
  ])

  resourcesNode.items.sort((a, b) => {
    if (!(a instanceof YAMLMap) || !(b instanceof YAMLMap)) return 0
    const aType = getResourceType(a) as BiweeklyResourceType | null
    const bType = getResourceType(b) as BiweeklyResourceType | null
    const aOrder = aType ? (order.get(aType) ?? 99) : 99
    const bOrder = bType ? (order.get(bType) ?? 99) : 99
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

const getMapScalarValue = (map: YAMLMap, key: string): string | null => {
  const pair = findPair(map, key)
  return pair ? getScalarValue(pair.value) : null
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

const changeKeyForResource = (type: BiweeklyResourceType): keyof Changes => {
  switch (type) {
    case "kdocs":
      return "slidesID"
    case "bilibili":
      return "livestreamLink"
    case "zoom":
      return "zoom"
    case "zoomChat":
      return "zoomChat"
    case "googledocs":
      return "googleDocs"
    case "youtube":
      return "youtube"
    case "vkvideo":
      return "vkVideo"
    case "wemeet":
      return "wemeet"
  }
}

const mergeChanges = (target: Changes, source: Changes) => {
  for (const [key, value] of Object.entries(source)) {
    const changeKey = key as keyof Changes
    target[changeKey] ||= value
  }
}
