import { generateAll } from "./generateDatabase.js"
import process from "node:process"

export default function AutoGenerateJson() {
  let statusGenerating = false
  let watcher = null
  let debounceTimer = null

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
      statusGenerating = false
      console.log("[AutoGenerateJson] Generation complete!")
    } catch (error) {
      statusGenerating = false
      console.error("[AutoGenerateJson] Error:", error)
    }
  }

  return {
    name: "auto-generate-json",

    configureServer(server) {
      server.httpServer?.once("listening", () => {
        console.log("[AutoGenerateJson] Generating initial data...")
        runGenerateScript()
      })

      // 设置文件监听
      watcher = server.watcher

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
