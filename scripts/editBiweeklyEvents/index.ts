import { readFile, writeFile } from "node:fs/promises"
import { spawn } from "node:child_process"
import { Command } from "@commander-js/extra-typings"
import { BiweeklyLinkEditor } from "./editor"

// relative to project root
const biweeklyLinkDataPath = "./components/events/BiweeklyLinks.ts"

const makeGitCommitMessage = (
  issueNumber: number,
  bvidChanged: boolean,
  slidesIDChanged: boolean,
) => {
  const changedParts = []
  if (bvidChanged) {
    changedParts.push("BVID")
  }
  if (slidesIDChanged) {
    changedParts.push("slides ID")
  }

  return `feat(biweekly): update ${changedParts.join(" and ")} for biweekly ${issueNumber}`
}

const asyncCallGit = (args: string[]) => {
  return new Promise<void>((resolve, reject) => {
    const gitProcess = spawn("git", args, { stdio: "inherit" })

    gitProcess.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Git process exited with code ${code}`))
      }
    })
  })
}

async function main() {
  const program = new Command()
    .description("Edit biweekly link data")
    .requiredOption(
      "-i, --issue <number>",
      "issue number of biweekly event to edit",
      parseInt,
    )
    .option("--debug", "print debug information", false)
    .option(
      "--set-bvid <bvid>",
      "record this BVID as the Bilibili video archive",
    )
    .option(
      "--set-slides <kdocs-id>",
      "record this ID as the key to the slides on KDocs",
    )
    .option("--commit", "also commit the changes to Git", false)
    .parse(process.argv)
  const opts = program.opts()

  const issueNumber = opts.issue
  const bvidToSet: string | undefined = opts.setBvid
  const slidesIDtoSet: string | undefined = opts.setSlides

  if (!bvidToSet && !slidesIDtoSet) {
    console.error("No changes specified, check --help for usage.")
    process.exit(1)
  }

  const code = await readFile(biweeklyLinkDataPath, "utf-8")
  const editor = new BiweeklyLinkEditor(code, biweeklyLinkDataPath, opts.debug)

  if (bvidToSet) {
    editor.editBVID(issueNumber, bvidToSet)
  }
  if (slidesIDtoSet) {
    editor.editSlidesID(issueNumber, slidesIDtoSet)
  }

  const newCode = await editor.emit()
  await writeFile(biweeklyLinkDataPath, newCode, "utf-8")

  if (opts.commit) {
    const commitMessage = makeGitCommitMessage(
      issueNumber,
      !!bvidToSet,
      !!slidesIDtoSet,
    )

    console.log("Staging changes for Git...")
    await asyncCallGit(["add", biweeklyLinkDataPath])

    console.log("Committing changes to Git...")
    await asyncCallGit(["commit", "-m", commitMessage])
  }
}

await main()
