import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, basename, extname, join } from 'path'
import { type } from "os"

// Fix __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

export default function AutoGenerateJson() {
  let statusGenerating = false
  let watcher = null
  let debounceTimer = null
  
  // 运行生成脚本
  const runGenerateScript = async () => {
    if (statusGenerating) {
      console.log('[AutoGenerateJson] Script is running, exiting...')
      return
    }
    
    statusGenerating = true
    console.log('[AutoGenerateJson] Generating...')
    
    try {
      // 将要用于生成数据的脚本
      const scriptPath = join(__dirname, '../../data/generateDatabase.js')
      
      const child = spawn('node', [scriptPath], {
        stdio: 'inherit'
      })
      
      child.on('close', (code) => {
        statusGenerating = false
        if (code === 0) {
          console.log('[AutoGenerateJson] Generation complete!')
        } else {
          console.error(`[AutoGenerateJson] Error code: ${code}`)
        }
      })
      
      child.on('error', (err) => {
        statusGenerating = false
        console.error('[AutoGenerateJson] Error:', err)
      })
      
    } catch (error) {
      statusGenerating = false
      console.error('[AutoGenerateJson] Error:', error)
    }
  }
  
  return {
    name: 'auto-generate-json',

    configureServer(server) {
      server.httpServer?.once('listening', () => {
        console.log('[AutoGenerateJson] Generating initial data...')
        runGenerateScript()
      })
      
      // 设置文件监听
      watcher = server.watcher
      
      // 监听YAML文件变化
      watcher.on('change', (path) => {
        if (path.endsWith('.yml') || path.endsWith('.yaml')) {
          console.log(`[AutoGenerateJson] Detected changes in YAML file: ${path}`)
          // 延迟500ms执行
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => { runGenerateScript() }, 500)
        }
      })
      
      // 监听新增YAML文件
      watcher.on('add', (path) => {
        if (path.endsWith('.yml') || path.endsWith('.yaml')) {
          console.log(`[AutoGenerateJson] Detected new YAML file: ${path}`)
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runGenerateScript()
          }, 500)
        }
      })
      
      // 监听删除YAML文件
      watcher.on('unlink', (path) => {
        if (path.endsWith('.yml') || path.endsWith('.yaml')) {
          console.log(`[AutoGenerateJson] Detected delete YAML file: ${path}`)
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runGenerateScript()
          }, 500)
        }
      })
    },
    
    buildStart() {
      if (process.env.NODE_ENV === 'production') {
        console.log('[AutoGenerateJson] Generating...')
        runGenerateScript()
      }
    }
  }
}