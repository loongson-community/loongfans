import { basename, extname, relative } from "node:path"

import type { FSWatcher, Logger, Plugin, ViteDevServer } from "vite"
import { DatabaseGenerator } from "./generateDatabase"

enum DataKind {
  Biweekly = "biweekly",
  Chips = "chips",
  Device = "device",
  OS = "os",
}

class Debouncer {
  private timer: NodeJS.Timeout | null = null
  private delay: number

  constructor(delay: number) {
    this.delay = delay
  }

  trigger(fn: () => void) {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(fn, this.delay)
  }
}

const debounceTimeMS = 500

const loongfansData = (): Plugin => {
  const gen = new DatabaseGenerator("")
  let logger: Logger
  let watcher: FSWatcher | null = null
  let viteServer: ViteDevServer | null = null

  const debouncerForDataKinds: { [key in DataKind]: Debouncer } = {
    [DataKind.Biweekly]: new Debouncer(debounceTimeMS),
    [DataKind.Chips]: new Debouncer(debounceTimeMS),
    [DataKind.Device]: new Debouncer(debounceTimeMS),
    [DataKind.OS]: new Debouncer(debounceTimeMS),
  }

  const virtualModuleIDPrefix = "virtual:loongfans-data/"
  const resolvedVirtualModuleIDPrefix = "\0" + virtualModuleIDPrefix
  const supportedDataKinds: string[] = Object.values(DataKind)

  const logInfo = (message: string) => {
    if (logger) logger.info(`[loongfans-data] ${message}`, { timestamp: true })
  }

  const emitDataModule = (data: object) => {
    // Note: this is ES, not TS, because it's going to be directly consumed by
    // the bundler without going through the TS compiler.
    return `export default ${JSON.stringify(data)}\n`
  }

  const invalidateDataModule = (dataKind: DataKind) => {
    if (!viteServer) return

    const virtualModuleId = resolvedVirtualModuleIDPrefix + dataKind
    const mod = viteServer.moduleGraph.getModuleById(virtualModuleId)
    if (mod) {
      viteServer.moduleGraph.invalidateModule(mod)
      viteServer.ws.send({
        type: "full-reload",
        path: "*",
      })
    }
  }

  const handleDataFileChange = (path: string, status: string) => {
    if (!(path.endsWith(".yml") || path.endsWith(".yaml"))) return
    const baseName = basename(path, extname(path))
    if (baseName.startsWith("template")) return

    logInfo(`Detected ${status} data file: ${path}`)

    // name of the topmost directory relative to gen.dataDir
    const dataSubdir = relative(gen.dataDir, path).split("/")[0]
    switch (dataSubdir) {
      case "events":
        debouncerForDataKinds[DataKind.Biweekly].trigger(async () => {
          logInfo(
            `Regenerating biweekly database due to ${status} file: ${path}`,
          )
          invalidateDataModule(DataKind.Biweekly)
        })
        break
      case "chips":
        debouncerForDataKinds[DataKind.Chips].trigger(async () => {
          logInfo(`Regenerating chips database due to ${status} file: ${path}`)
          invalidateDataModule(DataKind.Chips)
        })
        break
      case "devices":
        debouncerForDataKinds[DataKind.Device].trigger(async () => {
          logInfo(`Regenerating device database due to ${status} file: ${path}`)
          invalidateDataModule(DataKind.Device)
        })
        break
      case "os":
        debouncerForDataKinds[DataKind.OS].trigger(async () => {
          logInfo(`Regenerating OS database due to ${status} file: ${path}`)
          invalidateDataModule(DataKind.OS)
        })
        break
      default:
        // not a data directory we care about
        logInfo(
          `Ignoring file in unrecognized data subdirectory '${dataSubdir}'`,
        )
        break
    }
  }

  return {
    name: "loongfans:data",
    // data must be ready before vitepress:dynamic-routes, which is also an
    // `enforce: pre` plugin
    enforce: "pre",

    configResolved(config) {
      logger = config.logger
    },

    resolveId(id) {
      if (!id.startsWith(virtualModuleIDPrefix)) return null

      const dataKind = id.slice(virtualModuleIDPrefix.length)
      if (!supportedDataKinds.includes(dataKind)) return null

      // https://vite.dev/guide/api-plugin#virtual-modules-convention
      return "\0" + id
    },

    async load(id) {
      if (!id.startsWith(resolvedVirtualModuleIDPrefix)) return null
      const dataKind = id.slice(resolvedVirtualModuleIDPrefix.length)
      logInfo(`Emitting module for ${dataKind} data`)
      switch (dataKind) {
        case "biweekly":
          return emitDataModule(await gen.generateBiweeklyDatabase())
        case "chips":
          return emitDataModule(await gen.generateChipsDatabase())
        case "device":
          return emitDataModule(await gen.generateDeviceDatabase())
        case "os":
          return emitDataModule(await gen.generateOSDatabase())
        default:
          return null
      }
    },

    configureServer(server: ViteDevServer) {
      viteServer = server
      watcher = server.watcher

      // configure HMR
      watcher.add(gen.dataDir)

      watcher.on("change", (path) => {
        handleDataFileChange(path, "changed")
      })

      watcher.on("add", (path) => {
        handleDataFileChange(path, "added")
      })

      watcher.on("unlink", (path) => {
        handleDataFileChange(path, "deleted")
      })
    },
  }
}

export default loongfansData
