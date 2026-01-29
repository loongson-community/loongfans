import { generateAll, validateData } from "./generateDatabase.js"
import process from "node:process"
import { glob } from "node:fs/promises"

export default function AutoGenerateJson() {
  let statusGenerating = false
  let watcher = null
  let debounceTimer = null
  /** @type {import("vite").ViteDevServer | null} */
  let viteServer = null

  // Run Generate Script
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

  // Run validate func
  const runValidation = () => {
    try {
      validateData()
    } catch (error) {
      console.error("[JsonValidator] Validation failed:", error)
      // Kill build process if validation failed
      if (process.env.NODE_ENV === "production") {
        throw error
      }
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

      // Monitor changes to JSON files
      const handleJsonChange = (path) => {
        if (path.endsWith(".json")) {
          console.log(`[JsonValidator] Detected changes in JSON file: ${path}`)
          // Delay 500ms for validating
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runValidation()
          }, 500)
        }
      }

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
        handleJsonChange(path)
      })

      // 监听新增YAML文件
      watcher.on("add", (path) => {
        handleYamlChange(path, "new")
        handleJsonChange(path)
      })

      // 监听删除YAML文件
      watcher.on("unlink", (path) => {
        handleYamlChange(path, "delete")
        handleJsonChange(path)
      })
    },

    buildStart() {
      if (process.env.NODE_ENV === "production") {
        console.log("[AutoGenerateJson] Generating...")
        runGenerateScript()
        runValidation()
      }
    },
  }
}
