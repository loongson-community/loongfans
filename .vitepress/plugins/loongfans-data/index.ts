import process from "node:process"
import { glob } from "node:fs/promises"

import type { FSWatcher, Plugin, ViteDevServer } from "vite"
import { generateAll } from "./generateDatabase.js"

const autoGenerateJson = (): Plugin => {
  let statusGenerating = false
  let watcher: FSWatcher | null = null
  let debounceTimer: NodeJS.Timeout | null = null
  let viteServer: ViteDevServer | null = null

  // Run Generate Script
  const runGenerateScript = async () => {
    if (statusGenerating) {
      console.log("[AutoGenerateJson] Script is running, exiting...")
      return
    }

    statusGenerating = true
    console.log("[AutoGenerateJson] Generating...")

    try {
      await generateAll() // Generate JSON without formatted files
      console.log("[AutoGenerateJson] Generation complete!")

      if (viteServer) {
        const root = process.cwd()
        for await (const file of glob("data/*.json", { cwd: root })) {
          const module = viteServer.moduleGraph.getModuleById(`${root}/${file}`)
          if (module) viteServer.reloadModule(module)
        }
      }
    } catch (error) {
      console.error("[AutoGenerateJson] Error:", error)
      // Kill build process if validation failed
      if (process.env.NODE_ENV === "production") {
        throw error
      }
    } finally {
      statusGenerating = false
    }
  }

  return {
    name: "auto-generate-json",

    configureServer(server: ViteDevServer) {
      viteServer = server

      server.httpServer?.once("listening", () => {
        console.log("[AutoGenerateJson] Generating initial data...")
        runGenerateScript()
      })

      // 设置文件监听
      watcher = server.watcher
      watcher.add("./data")

      const handleYamlChange = (path, status) => {
        if (path.endsWith(".yml") || path.endsWith(".yaml")) {
          console.log(
            `[AutoGenerateJson] Detected ${status} in YAML file: ${path}`,
          )
          // 延迟500ms执行
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runGenerateScript()
          }, 500)
        }
      }

      // 监听YAML文件变化
      watcher.on("change", (path) => {
        handleYamlChange(path, "change")
      })

      // 监听新增YAML文件
      watcher.on("add", (path) => {
        handleYamlChange(path, "new")
      })

      // 监听删除YAML文件
      watcher.on("unlink", (path) => {
        handleYamlChange(path, "delete")
      })
    },

    buildStart() {
      if (process.env.NODE_ENV === "production") {
        console.log("[AutoGenerateJson] Generating...")
        runGenerateScript()
      }
    },
  }
}

export default autoGenerateJson
