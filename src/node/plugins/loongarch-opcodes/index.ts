import fs from "node:fs/promises"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import type { Logger, Plugin } from "vite"

/** Directory name of the `loongarch-opcodes` submodule, at the repo root. */
const sourceDirName = "loongarch-opcodes"

/** Subdirectory of `publicDir` the files are published under. */
const publicSubdirName = "assets/loongarch-opcodes"

/**
 * Top-level files of the submodule that get published verbatim, so that
 * client-side JS can read them as-is: the instruction listings (`*.txt`) and
 * their accompanying documentation / license texts.
 */
const publishedFilePatterns = [
  /\.txt$/i,
  /^readme(\.[^/]+)?$/i,
  /^license(\.[^/]+)?$/i,
]

const isPublishedFile = (fileName: string) =>
  publishedFilePatterns.some((pattern) => pattern.test(fileName))

const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../",
)

const sourceDir = join(projectRoot, sourceDirName)

/**
 * Copies the publishable top-level files of the submodule into `publicDir`, so
 * they are served as-is by the dev server and copied into the build output.
 *
 * The target directory is regenerated from scratch so that files removed or
 * renamed upstream do not linger. A missing submodule checkout is not fatal:
 * it only warns, keeping builds working without the submodule.
 */
const copyOpcodes = async (logger: Logger | null, publicDir: string) => {
  if (!publicDir) {
    logger?.warn(
      "[loongarch-opcodes] No publicDir configured; skipping copy.",
      { timestamp: true },
    )
    return
  }

  let entries
  try {
    entries = await fs.readdir(sourceDir, { withFileTypes: true })
  } catch {
    logger?.warn(
      `[loongarch-opcodes] Source directory not found: ${sourceDir}. ` +
        "Run 'git submodule update --init' to fetch it; skipping copy.",
      { timestamp: true },
    )
    return
  }

  const files = entries
    .filter((entry) => entry.isFile() && isPublishedFile(entry.name))
    .map((entry) => entry.name)
    .sort()

  const targetDir = join(publicDir, publicSubdirName)
  await fs.rm(targetDir, { recursive: true, force: true })
  await fs.mkdir(targetDir, { recursive: true })
  await Promise.all(
    files.map((fileName) =>
      fs.copyFile(join(sourceDir, fileName), join(targetDir, fileName)),
    ),
  )

  logger?.info(
    `[loongarch-opcodes] Copied ${files.length} files to ` +
      `${relative(projectRoot, targetDir)}`,
    { timestamp: true },
  )
}

const loongarchOpcodes = (): Plugin => {
  let logger: Logger | null = null
  let publicDir = ""

  return {
    name: "loongfans:loongarch-opcodes",
    // Must run before `vite:prepare-out-dir`, which copies `publicDir` into the
    // output directory in its `renderStart` hook during a build.
    enforce: "pre",

    configResolved(config) {
      logger = config.logger
      publicDir = config.publicDir
    },

    async buildStart() {
      await copyOpcodes(logger, publicDir)
    },

    async configureServer() {
      await copyOpcodes(logger, publicDir)
    },
  }
}

export default loongarchOpcodes
