import { parse, type ParseResult } from "@babel/parser"
import { generate } from "@babel/generator"
import {
  identifier,
  numericLiteral,
  objectExpression,
  objectProperty,
  stringLiteral,
  type File,
  type ObjectExpression,
  type ObjectProperty,
} from "@babel/types"
import { format, resolveConfig } from "prettier"

type EditRequest = {
  newBVID?: string
  newSlidesID?: string
}

export class BiweeklyLinkEditor {
  debug: boolean = false
  filePath: string
  ast: ParseResult<File>
  dataNode: ObjectExpression

  constructor(code: string, filePath: string, debug: boolean = false) {
    this.debug = debug
    this.filePath = filePath

    this.ast = parse(code, {
      sourceType: "module",
      plugins: ["typescript"],
    })
    this.dataNode = findBiweeklyLinkDataNode(this.ast)!
    if (!this.dataNode) {
      throw new Error(
        "Cannot find biweekly event data in the input, please refactor this script!",
      )
    }

    if (this.debug) {
      debugPrintDataNode(this.dataNode)
    }
  }

  editSlidesID(issueNumber: number, val: string) {
    console.log(
      `Setting slides ID to ${val} for biweekly issue #${issueNumber}`,
    )
    editBiweeklyLinkData(this.dataNode, issueNumber, { newSlidesID: val })
  }

  editBVID(issueNumber: number, val: string) {
    console.log(`Setting BVID to ${val} for biweekly issue #${issueNumber}`)
    editBiweeklyLinkData(this.dataNode, issueNumber, { newBVID: val })
  }

  async emit() {
    if (this.debug) {
      console.log("After edits:")
      debugPrintDataNode(this.dataNode)
    }
    // regenerate code
    const output = generate(this.ast, { retainLines: true })

    // format with Prettier
    const config = await resolveConfig(this.filePath)
    const formatted = await format(output.code, {
      ...config,
      filepath: this.filePath,
    })
    if (this.debug) {
      console.log("Generated code:")
      console.log(formatted)
    }
    return formatted
  }
}

const findBiweeklyLinkDataNode = (ast: ParseResult<File>) => {
  for (const node of ast.program.body) {
    if (node.type !== "VariableDeclaration") continue

    for (const decl of node.declarations) {
      if (decl.id.type !== "Identifier") continue
      if (decl.id.name !== "biweeklyLinkInfo") continue
      if (decl.init?.type !== "ObjectExpression")
        throw new Error("unexpected AST structure for biweekly link data")

      return decl.init
    }
  }
  return null
}

enum PropKind {
  Slides,
  BVID,
}

const identifyPropKind = (
  op: ObjectProperty,
): { kind: PropKind; value: string } | null => {
  if (!(op.key.type === "Identifier" && op.value.type === "StringLiteral")) {
    return null
  }
  switch (op.key.name) {
    case "slides":
      return { kind: PropKind.Slides, value: op.value.value }
    case "bvid":
      return { kind: PropKind.BVID, value: op.value.value }
    default:
      return null
  }
}

const debugPrintDataNode = (dataNode: ObjectExpression) => {
  for (const prop of dataNode.properties) {
    if (prop.type !== "ObjectProperty") continue
    debugPrintIssueData(prop)
  }
}

const debugPrintIssueData = (issueNode: ObjectProperty) => {
  const issueNumber =
    issueNode.key.type === "NumericLiteral" ? issueNode.key.value : null
  let slidesID: string | null = null
  let bvid: string | null = null
  for (const valueProp of (issueNode.value as ObjectExpression).properties) {
    const identified = identifyPropKind(valueProp as ObjectProperty)
    if (!identified) continue

    switch (identified.kind) {
      case PropKind.Slides:
        slidesID = identified.value
        break
      case PropKind.BVID:
        bvid = identified.value
        break
    }
  }

  console.log("Issue Number:", issueNumber)
  console.log("  Slides ID:", slidesID)
  console.log("  BVID:", bvid)
}

const editBiweeklyLinkData = (
  dataNode: ObjectExpression,
  issueNumber: number,
  edits: EditRequest,
) => {
  let issueNode: ObjectProperty | null = null
  for (const prop of dataNode.properties) {
    if (prop.type !== "ObjectProperty") continue
    const key = prop.key
    if (key.type === "NumericLiteral" && key.value === issueNumber) {
      issueNode = prop
      break
    }
  }

  const newIssueNode = editIssueData(issueNode, issueNumber, edits)
  if (!issueNode) {
    dataNode.properties.push(newIssueNode)
  }
}

const editIssueData = (
  issueNode: ObjectProperty | null,
  issueNumber: number,
  edits: EditRequest,
) => {
  // make a new AST node for the issue if not existing already
  if (!issueNode)
    issueNode = objectProperty(
      numericLiteral(issueNumber),
      objectExpression([]),
      /*computed=*/ true,
    )

  if (issueNode.value.type !== "ObjectExpression")
    throw new Error("unexpected AST structure for issue data")

  let bvidMutated = false
  let slidesMutated = false
  for (const valueProp of issueNode.value.properties) {
    if (valueProp.type !== "ObjectProperty") continue
    const identified = identifyPropKind(valueProp)
    if (!identified) continue

    if (identified.kind === PropKind.Slides && edits.newSlidesID) {
      valueProp.value = stringLiteral(edits.newSlidesID)
      slidesMutated = true
    }
    if (identified.kind === PropKind.BVID && edits.newBVID) {
      valueProp.value = stringLiteral(edits.newBVID)
      bvidMutated = true
    }
  }

  if (edits.newBVID && !bvidMutated) {
    issueNode.value.properties.push(
      objectProperty(identifier("bvid"), stringLiteral(edits.newBVID)),
    )
  }
  if (edits.newSlidesID && !slidesMutated) {
    issueNode.value.properties.push(
      objectProperty(identifier("slides"), stringLiteral(edits.newSlidesID)),
    )
  }

  // sort the properties to keep consistent order
  // slides first, then bvid: video always comes after slides in time order
  issueNode.value.properties.sort((a, b) => {
    if (a.type !== "ObjectProperty" || b.type !== "ObjectProperty") return 0
    const aIdentified = identifyPropKind(a)
    const bIdentified = identifyPropKind(b)
    if (!aIdentified || !bIdentified) return 0
    return aIdentified.kind - bIdentified.kind
  })

  return issueNode
}
