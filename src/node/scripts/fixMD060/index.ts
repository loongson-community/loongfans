import { readFile, writeFile } from "node:fs/promises"
import { relative } from "node:path"
import { Command } from "@commander-js/extra-typings"
import { glob } from "glob"

/**
 * Normalizes Markdown tables to the MD060 "table-column-style" compact style
 * required by `.markdownlint.yaml`: every cell divider keeps exactly one space
 * on each side, e.g. `| a | b |`. Column padding (the "aligned" look) is
 * removed, while cell contents and the presence of the leading/trailing pipes
 * are preserved.
 */

// At most three leading spaces are allowed before a table row or a code fence
const rowPattern = /^ {0,3}\|/
const fencePattern = /^ {0,3}(`{3,}|~{3,})/
const delimiterCellPattern = /^:?-+:?$/
const delimiterCellPartsPattern = /^(:?)(-+)(:?)$/

const defaultPatterns = ["data/devices/**/*.md"]

interface Row {
  cells: string[]
  hasLeadingPipe: boolean
  hasTrailingPipe: boolean
}

interface FixResult {
  tableCount: number
  rowCount: number
  warnings: string[]
}

// A pipe is a cell divider unless it is escaped by an odd number of
// backslashes (e.g. `\|` in the cell text)
const isEscaped = (text: string, index: number): boolean => {
  let backslashes = 0
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i -= 1) {
    backslashes += 1
  }
  return backslashes % 2 === 1
}

const unescapedPipeIndexes = (line: string): number[] => {
  const indexes: number[] = []
  for (let i = 0; i < line.length; i += 1) {
    if (line[i] === "|" && !isEscaped(line, i)) indexes.push(i)
  }
  return indexes
}

/** Splits a table line into trimmed cells, recording which borders were used */
const splitRow = (line: string): Row => {
  const pipes = unescapedPipeIndexes(line)
  if (pipes.length === 0) {
    return { cells: [], hasLeadingPipe: false, hasTrailingPipe: false }
  }

  const firstPipe = pipes[0]!
  const lastPipe = pipes[pipes.length - 1]!
  const hasLeadingPipe = line.slice(0, firstPipe).trim() === ""
  const hasTrailingPipe = line.slice(lastPipe + 1).trim() === ""

  const segments: string[] = []
  let start = 0
  for (const pipe of pipes) {
    segments.push(line.slice(start, pipe))
    start = pipe + 1
  }
  segments.push(line.slice(start))

  if (hasLeadingPipe) segments.shift()
  if (hasTrailingPipe) segments.pop()

  return {
    cells: segments.map((segment) => segment.trim()),
    hasLeadingPipe,
    hasTrailingPipe,
  }
}

/**
 * Renders a row in the compact style: `| a | b |`, i.e. a single space on each
 * side of every divider
 */
const formatRow = (row: Row): string => {
  // An empty cell only has room for a single space: `| a | |` is compact while
  // `| a |  |` has two spaces and is rejected by MD060
  const parts = row.cells.map((cell) => (cell === "" ? " " : ` ${cell} `))
  let body = parts.join("|")
  if (!row.hasLeadingPipe) body = body.replace(/^ /, "")
  if (!row.hasTrailingPipe) body = body.replace(/ $/, "")
  const prefix = row.hasLeadingPipe ? "|" : ""
  const suffix = row.hasTrailingPipe ? "|" : ""
  return `${prefix}${body}${suffix}`
}

/** Keeps the column alignment of a delimiter cell but uses three dashes */
const formatDelimiterCell = (cell: string): string => {
  const match = delimiterCellPartsPattern.exec(cell)
  if (!match) return cell
  return `${match[1]}---${match[3]}`
}

const isDelimiterRow = (row: Row): boolean =>
  row.cells.length > 0 &&
  row.cells.every((cell) => delimiterCellPattern.test(cell))

// Delimiter-like line, used to detect tables that are intentionally skipped
const looksLikeDelimiterRow = (line: string): boolean =>
  line.includes("|") && line.includes("-") && /^ {0,3}[|:\s-]+$/.test(line)

const fixTables = (content: string): { text: string; result: FixResult } => {
  const lines = content.split("\n")
  const output: string[] = []
  const warnings: string[] = []
  let tableCount = 0
  let rowCount = 0
  let changed = false

  // Skip YAML frontmatter
  let lastFrontmatterLine = -1
  if (lines[0]?.trim() === "---") {
    for (let i = 1; i < lines.length; i += 1) {
      if (lines[i]?.trim() === "---") {
        lastFrontmatterLine = i
        break
      }
    }
  }

  // Fenced code blocks are left untouched, as their content is not Markdown
  let fence: { character: string; length: number } | null = null

  let i = 0
  while (i < lines.length) {
    const line = lines[i]!

    if (i <= lastFrontmatterLine) {
      output.push(line)
      i += 1
      continue
    }

    const fenceMatch = fencePattern.exec(line)
    if (fence) {
      output.push(line)
      if (
        fenceMatch &&
        fenceMatch[1]![0] === fence.character &&
        fenceMatch[1]!.length >= fence.length &&
        line.trim() === fenceMatch[1]
      ) {
        fence = null
      }
      i += 1
      continue
    }
    if (fenceMatch) {
      fence = {
        character: fenceMatch[1]![0]!,
        length: fenceMatch[1]!.length,
      }
      output.push(line)
      i += 1
      continue
    }

    const nextLine = lines[i + 1]
    if (
      rowPattern.test(line) &&
      nextLine !== undefined &&
      rowPattern.test(nextLine)
    ) {
      const header = splitRow(line)
      const delimiter = splitRow(nextLine)
      if (isDelimiterRow(delimiter)) {
        if (header.cells.length !== delimiter.cells.length) {
          warnings.push(
            `line ${i + 1}: kept table as-is, delimiter row has ` +
              `${delimiter.cells.length} column(s) but header row has ` +
              `${header.cells.length}`,
          )
          output.push(line)
          i += 1
          continue
        }

        const rows: Row[] = [header, delimiter]
        let j = i + 2
        while (j < lines.length) {
          const bodyLine = lines[j]!
          if (!rowPattern.test(bodyLine)) break
          const row = splitRow(bodyLine)
          // A lone pipe carries no cell: treat it as the end of the table
          if (row.cells.length === 0) break
          rows.push(row)
          j += 1
        }

        const normalized = rows.map((row, index) =>
          formatRow(
            index === 1
              ? { ...row, cells: row.cells.map(formatDelimiterCell) }
              : row,
          ),
        )
        normalized.forEach((normalizedLine, offset) => {
          if (normalizedLine !== lines[i + offset]) changed = true
        })

        output.push(...normalized)
        tableCount += 1
        rowCount += normalized.length
        i = j
        continue
      }
    }

    // Keep unsupported table layouts visible instead of silently skipping them
    if (
      nextLine !== undefined &&
      !rowPattern.test(line) &&
      unescapedPipeIndexes(line).length > 0 &&
      looksLikeDelimiterRow(nextLine)
    ) {
      warnings.push(
        `line ${i + 1}: kept table as-is, header row does not start with "|" ` +
          `(unsupported table layout)`,
      )
    }

    output.push(line)
    i += 1
  }

  return {
    text: changed ? output.join("\n") : content,
    result: { tableCount, rowCount, warnings },
  }
}

async function main() {
  const program = new Command()
    .description(
      "Normalize Markdown tables to the MD060 table-column-style compact style",
    )
    .argument("[patterns...]", "glob patterns of Markdown files to fix")
    .option(
      "--check",
      "do not write files, exit with code 1 if any table would be changed",
      false,
    )
    .option("-v, --verbose", "print per-file statistics", false)
    .parse(process.argv)

  const patterns = program.args.length > 0 ? program.args : defaultPatterns
  const options = program.opts()

  const files = await glob(patterns, {
    cwd: process.cwd(),
    absolute: true,
    ignore: ["**/node_modules/**"],
  })
  files.sort()

  if (files.length === 0) {
    console.error(`No Markdown files matched: ${patterns.join(", ")}`)
    process.exitCode = 1
    return
  }

  let filesChanged = 0
  let tableCount = 0
  let rowCount = 0

  for (const file of files) {
    const before = await readFile(file, "utf-8")
    const { text, result } = fixTables(before)
    tableCount += result.tableCount
    rowCount += result.rowCount

    const fileName = relative(process.cwd(), file)
    for (const warning of result.warnings) {
      console.warn(`${fileName}: ${warning}`)
    }

    if (text !== before) {
      filesChanged += 1
      if (options.verbose) {
        console.log(
          `${fileName}: ${result.tableCount} table(s), ` +
            `${result.rowCount} row(s) normalized`,
        )
      }
      if (!options.check) {
        await writeFile(file, text, "utf-8")
      }
    }
  }

  console.log(
    `${options.check ? "Would fix" : "Fixed"} ${filesChanged} of ` +
      `${files.length} file(s) (${tableCount} table(s), ${rowCount} row(s) scanned).`,
  )
  if (options.check && filesChanged > 0) {
    process.exitCode = 1
  }
}

await main()
