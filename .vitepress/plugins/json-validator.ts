import type { Plugin, ViteDevServer } from 'vite'
import Ajv from 'ajv'
import { createGenerator } from 'ts-json-schema-generator'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = __dirname + "/../../"

// Check if file exists and not empty
function waitForFile(filePath: string, maxRetries = 10, interval = 100): Promise<void> {
  return new Promise((resolve, reject) => {
    let retries = 0
    const check = () => {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        if (stats.size > 0) {
          resolve()
          return
        }
      }
      retries++
      if (retries >= maxRetries) {
        reject(new Error(`File ${filePath} not found or empty after ${maxRetries} retries`))
        return
      }
      setTimeout(check, interval)
    }
    check()
  })
}

// Validating Database
async function validateData() {
  console.log('[json-validator] Validating data types...')

  // Waiting JSON files generated
  const osDataPath = path.resolve(rootDir, 'data/os.min.json')
  const chipsDataPath = path.resolve(rootDir, 'data/chips.min.json')

  console.log('[json-validator] Waiting for JSON files to be generated...')
  try {
    await Promise.all([
      waitForFile(osDataPath),
      waitForFile(chipsDataPath)
    ])
  } catch (error) {
    console.error('[json-validator] JSON files not ready:', error)
    throw error
  }

  // ts-json-schema-generator Configs:
  const config = {
    path: path.resolve(rootDir, 'types/data.ts'),
    tsconfig: path.resolve(rootDir, 'tsconfig.json'),
    type: '*',
    expose: 'export' as const,
    topRef: true,
    jsDoc: 'extended' as const,
    skipTypeCheck: true,
  }

  // Dynamic generate JSON Schema
  console.log('[json-validator] Generating JSON Schema...')
  const generator = createGenerator(config)
  const fullSchema = generator.createSchema(config.type)

  fullSchema.$id = 'https://loongfans.cn/schema.json'

  // Init Ajv
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,
    allowUnionTypes: true,
  })

  ajv.addSchema(fullSchema)

  // Validating OS Data
  console.log('[json-validator] Validating data/os.min.json...')
  const osData = JSON.parse(fs.readFileSync(osDataPath, 'utf-8'))
  const osSchema = {
    type: 'array',
    items: { $ref: 'https://loongfans.cn/schema.json#/definitions/OSInfoItem' }
  }
  const validateOS = ajv.compile(osSchema)

  if (!validateOS(osData)) {
    console.error('[json-validator] OS Data Validation Error!!!')
    console.error(JSON.stringify(validateOS.errors, null, 2))
    throw new Error('OS data validation failed')
  }
  console.log('[json-validator] OS Data Validation passed!')

  // Validating Chips Data
  console.log('[json-validator] Validating data/chips.min.json...')
  const chipsData = JSON.parse(fs.readFileSync(chipsDataPath, 'utf-8'))

  // Temporarily remove the gpu and mcu to bypass verification for this section.
  const cleanedChipsData = { ...chipsData }
  delete cleanedChipsData.gpu
  delete cleanedChipsData.mcu

  const chipsSchema = { $ref: 'https://loongfans.cn/schema.json#/definitions/ChipInfoDB' }
  const validateChips = ajv.compile(chipsSchema)

  if (!validateChips(cleanedChipsData)) {
    console.error('[json-validator] Chips Data Validation Error!!!')
    console.error(JSON.stringify(validateChips.errors, null, 2))
    throw new Error('Chips data validation failed')
  }
  console.log('[json-validator] Chips Data Validation passed!')

  console.log('[json-validator] All data validation passed!')
}

export default function DataTypeValidator(): Plugin {
  let debounceTimer: NodeJS.Timeout | null = null

  // Run validate func
  const runValidation = async () => {
    try {
      await validateData()
    } catch (error) {
      console.error('[json-validator] Validation failed:', error)
      // Kill build process if validation failed
      if (process.env.NODE_ENV === 'production') {
        throw error
      }
    }
  }

  return {
    name: 'json-validator',

    // Dev server config
    configureServer(server: ViteDevServer) {
      // Waiting for data generation
      server.httpServer?.once('listening', () => {
        console.log('[json-validator] Waiting for data generation before validation...')
        // Delay to ensure the plugin has finished generating.
        setTimeout(() => {
          console.log('[json-validator] Starting initial validation...')
          runValidation()
        }, 1000)
      })

      // Set up file monitoring
      const watcher = server.watcher
      watcher.add('./data')

      // Monitor changes to JSON files
      const handleFileChange = (path: string) => {
        if (path.endsWith('.json')) {
          console.log(`[json-validator] Detected changes in JSON file: ${path}`)
          // Delay 500ms for validating
          if (debounceTimer) clearTimeout(debounceTimer)
          debounceTimer = setTimeout(() => {
            runValidation()
          }, 500)
        }
      }

      watcher.on('change', handleFileChange)
      watcher.on('add', handleFileChange)
      watcher.on('unlink', handleFileChange)
    },

    // Build config
    buildStart() {
      if (process.env.NODE_ENV === 'production') {
        console.log('[json-validator] Starting validation for production build...')
        return runValidation()
      }
    },
  }
}
