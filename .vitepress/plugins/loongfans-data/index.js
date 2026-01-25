import { generateAll } from "./generateDatabase.js"
import process from "node:process"
import { glob } from "node:fs/promises"

export default function AutoGenerateJson() {
  let statusGenerating = false
  let watcher = null
  let debounceTimer = null
  /** @type {import("vite").ViteDevServer | null} */
  let viteServer = null

  // 运行生成脚本
  const runGenerateScript = async () => {
    if (statusGenerating) {
      console.log("[AutoGenerateJson] Script is running, exiting...")
      return
    }

    statusGenerating = true
    console.log("[AutoGenerateJson] Generating...")

    try {
      await generateAll(0) // Generate JSON without formatted files
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
    } finally {
      statusGenerating = false
    }
  }

  return {
    name: "auto-generate-json",

    /**
     * @param {import("vite").ViteDevServer} server
     */
    configureServer(server) {
      viteServer = server

      server.httpServer?.once("listening", () => {
        console.log("[AutoGenerateJson] Generating initial data...")
        runGenerateScript()
      })

      // 设置文件监听
      watcher = server.watcher
      watcher.add("./data")

      // 监听YAML文件变化
      watcher.on("change", (path) => {
        if (path.endsWith(".yml") || path.endsWith(".yaml")) {
          console.log(
            `[AutoGenerateJson] Detected changes in YAML file: ${path}`,
          )
          // 延迟500ms执行
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runGenerateScript()
          }, 500)
        }
      })

      // 监听新增YAML文件
      watcher.on("add", (path) => {
        if (path.endsWith(".yml") || path.endsWith(".yaml")) {
          console.log(`[AutoGenerateJson] Detected new YAML file: ${path}`)
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runGenerateScript()
          }, 500)
        }
      })

      // 监听删除YAML文件
      watcher.on("unlink", (path) => {
        if (path.endsWith(".yml") || path.endsWith(".yaml")) {
          console.log(`[AutoGenerateJson] Detected delete YAML file: ${path}`)
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runGenerateScript()
          }, 500)
        }
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
