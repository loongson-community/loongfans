import { dirname, basename, extname, resolve } from "node:path"
import fs from "node:fs/promises"
import { fileURLToPath } from "node:url"

import { Ajv, type ValidateFunction } from "ajv"
import { glob } from "glob"
import { parse as yamlParse } from "yaml"
import { createGenerator, type Config } from "ts-json-schema-generator"

import type {
  BiweeklyDB,
  ChipInfoDB,
  ChipsetInfoItem,
  CPUInfoItem,
  DownloadItem,
  DownloadsDB,
  DeviceFamiliesConfig,
  DeviceInfoDB,
  DeviceInfoItem,
  OSInfoItem,
} from "@src/types/data"

// Artificial JSON schemas for verification
const jsonSchemaNamespace = "https://loongfans.cn/schema.json"

const biweeklyDBSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/BiweeklyDB`,
}

const cpuInfoInputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/CPUInfoItem`,
}

const chipsetInfoInputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/ChipsetInfoItem`,
}

const chipsOutputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/ChipInfoDB`,
}

const osInfoInputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/OSInfoItem`,
}

const downloadItemInputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/DownloadItem`,
}

const osOutputSchema = {
  type: "array",
  items: { $ref: `${jsonSchemaNamespace}#/definitions/OSInfoItem` },
}

const deviceInfoInputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/DeviceInfoItem`,
}

const deviceFamiliesConfigSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/DeviceFamiliesConfig`,
}

const deviceOutputSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/DeviceInfoDB`,
}

type InputFileValidator<T> = (data: object, fileName: string) => T
type TransformedInput<T> = {
  key: string
  data: T
}

function validate<T>(
  data: object,
  validator: ValidateFunction,
  kind: string,
  fileName: string | null = null,
) {
  if (!validator(data)) {
    console.error(`[JsonValidator] Type validation failed for ${kind}!`)
    if (fileName) {
      console.error(`  In file: ${fileName}`)
    }
    console.error(JSON.stringify(validator.errors, null, 2))
    throw new Error(`${kind} type validation failed`)
  }
  return data as T
}

export class DatabaseGenerator {
  projectRoot: string
  dataDir: string
  validatorForBiweeklyDB: ValidateFunction
  validatorForCPUInfoInput: ValidateFunction
  validatorForChipsetInfoInput: ValidateFunction
  validatorForOSInfoInput: ValidateFunction
  validatorForChipsOutput: ValidateFunction
  validatorForOSOutput: ValidateFunction
  validatorForDeviceInfoInput: ValidateFunction
  validatorForDeviceFamiliesConfig: ValidateFunction
  validatorForDeviceOutput: ValidateFunction
  validatorForDownloadItemInput: ValidateFunction

  constructor(projectRoot: string = "") {
    if (!projectRoot) {
      const moduleDir = dirname(fileURLToPath(import.meta.url))
      projectRoot = resolve(moduleDir, "../../../../")
    }
    this.projectRoot = projectRoot
    this.dataDir = this.projectRoot + "/data/"

    // validation
    const tsJSONSchemaConfig: Config = {
      path: resolve(this.projectRoot, "src/types/data.ts"),
      tsconfig: resolve(this.projectRoot, "tsconfig.json"),
      type: "*",
      expose: "export",
      topRef: true,
      jsDoc: "extended",
      skipTypeCheck: true,
    }
    const schemaGenerator = createGenerator(tsJSONSchemaConfig)
    const jsonFullSchema = schemaGenerator.createSchema(tsJSONSchemaConfig.type)
    jsonFullSchema.$id = jsonSchemaNamespace

    const ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false,
      allowUnionTypes: true,
    })
    ajv.addSchema(jsonFullSchema)

    this.validatorForBiweeklyDB = ajv.compile(biweeklyDBSchema)
    this.validatorForCPUInfoInput = ajv.compile(cpuInfoInputSchema)
    this.validatorForChipsetInfoInput = ajv.compile(chipsetInfoInputSchema)
    this.validatorForOSInfoInput = ajv.compile(osInfoInputSchema)
    this.validatorForDownloadItemInput = ajv.compile(downloadItemInputSchema)
    this.validatorForChipsOutput = ajv.compile(chipsOutputSchema)
    this.validatorForOSOutput = ajv.compile(osOutputSchema)
    this.validatorForDeviceInfoInput = ajv.compile(deviceInfoInputSchema)
    this.validatorForDeviceFamiliesConfig = ajv.compile(
      deviceFamiliesConfigSchema,
    )
    this.validatorForDeviceOutput = ajv.compile(deviceOutputSchema)
  }

  validateBiweeklyDBData(data: object, fileName: string) {
    return validate<BiweeklyDB>(
      data,
      this.validatorForBiweeklyDB,
      "LoongArch Biweekly data",
      fileName,
    )
  }

  validateCPUData(data: object, fileName: string) {
    return validate<CPUInfoItem>(
      data,
      this.validatorForCPUInfoInput,
      "CPU",
      fileName,
    )
  }

  validateChipsetData(data: object, fileName: string) {
    return validate<ChipsetInfoItem>(
      data,
      this.validatorForChipsetInfoInput,
      "Chipset",
      fileName,
    )
  }

  validateOSData(data: object, fileName: string) {
    return validate<OSInfoItem>(
      data,
      this.validatorForOSInfoInput,
      "OS",
      fileName,
    )
  }

  validateChipsOutputData(data: object) {
    return validate<ChipInfoDB>(
      data,
      this.validatorForChipsOutput,
      "Chips database output",
    )
  }

  validateOSOutputData(data: object) {
    return validate<OSInfoItem[]>(
      data,
      this.validatorForOSOutput,
      "OS database output",
    )
  }

  validateDeviceData(data: object, fileName: string) {
    return validate<DeviceInfoItem>(
      data,
      this.validatorForDeviceInfoInput,
      "Device",
      fileName,
    )
  }

  validateDeviceFamiliesConfigData(data: object, fileName: string) {
    return validate<DeviceFamiliesConfig>(
      data,
      this.validatorForDeviceFamiliesConfig,
      "Device families config",
      fileName,
    )
  }

  validateDeviceOutputData(data: object) {
    return validate<DeviceInfoDB>(
      data,
      this.validatorForDeviceOutput,
      "Device database output",
    )
  }

  validateDownloadItemData(data: object, fileName: string) {
    return validate<DownloadItem>(
      data,
      this.validatorForDownloadItemInput,
      "Download item",
      fileName,
    )
  }

  async processFiles<T>(
    pattern: string,
    validator: InputFileValidator<T>,
    keySorter: (a: string, b: string) => number,
    extension?: string,
  ): Promise<TransformedInput<T>[]> {
    const options = {
      ignore: ["**/template*.yml"],
    }
    const files = await glob(this.dataDir + pattern, options)

    const transformed = await Promise.all(
      files.map(async (path) => {
        const input = await loadUntypedYAML(path)
        return {
          key: basename(path, extension ?? extname(path)),
          data: validator(input, path),
        }
      }),
    )
    transformed.sort((a, b) => keySorter(a.key, b.key))
    return transformed
  }

  async readAndTransformIntoArray<T>(
    pattern: string,
    validator: InputFileValidator<T>,
    keySorter: (a: string, b: string) => number,
    extension?: string,
  ): Promise<T[]> {
    const transformed = await this.processFiles(
      pattern,
      validator,
      keySorter,
      extension,
    )
    return transformed.map(({ data }) => data)
  }

  async readAndTransformIntoMap<T>(
    pattern: string,
    validator: InputFileValidator<T>,
    keySorter: (a: string, b: string) => number,
    extension?: string,
  ): Promise<{ [key: string]: T }> {
    const transformed = await this.processFiles(
      pattern,
      validator,
      keySorter,
      extension,
    )
    const result: { [key: string]: T } = {}
    transformed.forEach(({ key, data }) => {
      result[key] = data
    })
    return result
  }

  async generateBiweeklyDatabase() {
    const path = this.dataDir + "events/biweekly.yml"
    const obj = await loadUntypedYAML(path)
    return this.validateBiweeklyDBData(obj, path)
  }

  async generateChipsDatabase() {
    const [cpuData, chipsetData] = await Promise.all([
      this.readAndTransformIntoMap(
        "chips/cpu/**/*.yml",
        this.validateCPUData.bind(this),
        compareLoongsonChipModelsNewestFirst,
      ),
      this.readAndTransformIntoMap(
        "chips/chipset/**/*.yml",
        this.validateChipsetData.bind(this),
        compareLoongsonChipModelsNewestFirst,
      ),
    ])

    return {
      cpu: cpuData,
      chipset: chipsetData,
      // These are not implemented and typed yet
      // gpu: {},
      // mcu: {},
    }
  }

  async generateOSDatabase() {
    return await this.readAndTransformIntoArray(
      "os/**/*.yml",
      this.validateOSData.bind(this),
      compareNamesAlphabetically,
    )
  }

  async generateDownloadsDatabase(): Promise<DownloadsDB> {
    const downloadsDir = this.dataDir + "downloads/"
    const files = await glob(downloadsDir + "*.yml", {
      ignore: ["**/template*.yml"],
    })

    const entries = await Promise.all(
      files.map(async (path) => {
        const obj = await loadUntypedYAML(path)
        const data = this.validateDownloadItemData(obj, path)
        const expanded = await this.expandDownloadDescription(data, downloadsDir)
        return {
          key: basename(path, extname(path)),
          data: expanded,
        }
      }),
    )

    entries.sort((a, b) => compareNamesAlphabetically(a.key, b.key))

    const downloads: DownloadsDB = {}
    for (const { key, data } of entries) {
      downloads[key] = data
    }
    return downloads
  }

  async generateDeviceDatabase(): Promise<DeviceInfoDB> {
    const devicesDir = this.dataDir + "devices/"
    const familiesPath = devicesDir + "families.yml"
    const familiesObj = await loadUntypedYAML(familiesPath)
    const families = this.validateDeviceFamiliesConfigData(
      familiesObj,
      familiesPath,
    )

    // List all immediate child directories under devices/
    const entries = await fs.readdir(devicesDir, { withFileTypes: true })
    const deviceDirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort(compareNamesAlphabetically)

    // Load index.yml from each device directory
    const deviceEntries = await Promise.all(
      deviceDirs.map(async (deviceId) => {
        const indexPath = devicesDir + deviceId + "/index.yml"
        const obj = await loadUntypedYAML(indexPath)
        return {
          id: deviceId,
          data: this.validateDeviceData(obj, indexPath),
        }
      }),
    )

    const devices: { [key: string]: DeviceInfoItem } = {}
    for (const { id, data } of deviceEntries) {
      devices[id] = data
    }

    const downloadsDB = await this.generateDownloadsDatabase()
    const downloadKeys = new Set(Object.keys(downloadsDB))
    for (const [deviceId, deviceData] of Object.entries(devices)) {
      if (!deviceData.downloads?.length) continue
      const missing = deviceData.downloads.filter((key) => !downloadKeys.has(key))
      if (missing.length) {
        throw new Error(
          `Device '${deviceId}' references missing downloads: ${missing.join(
            ", ",
          )}`,
        )
      }
    }

    return {
      families,
      devices,
    }
  }

  async expandDownloadDescription(
    data: DownloadItem,
    baseDir: string,
  ): Promise<DownloadItem> {
    if (!data.description) return data

    const expanded: typeof data.description = {}
    for (const [lang, content] of Object.entries(data.description)) {
      if (typeof content !== "string") continue
      expanded[lang] = await expandIncludes(content, baseDir)
    }

    return {
      ...data,
      description: expanded,
    }
  }
}

async function loadUntypedYAML(fileName: string) {
  return yamlParse(await fs.readFile(fileName, "utf-8")) as object
}

async function expandIncludes(content: string, baseDir: string) {
  const pattern = /<!--\s*@include:\s*(.+?)\s*-->/g
  let result = ""
  let lastIndex = 0

  for (const match of content.matchAll(pattern)) {
    const matchIndex = match.index ?? 0
    result += content.slice(lastIndex, matchIndex)
    const includePath = match[1].trim()
    const includeFullPath = resolve(baseDir, includePath)
    const includeContent = await fs.readFile(includeFullPath, "utf-8")
    result += includeContent
    lastIndex = matchIndex + match[0].length
  }

  result += content.slice(lastIndex)
  return result
}

// 按照龙芯芯片型号的命名规则，大体按照芯片型号所隐含的发布时间从新到旧排序
// e.g. 3A6600 < 3B6600 < 3C5000 < 3C5000L < 3C3000 < 2K3000
// NOTE: 不幸的是，存在个别难以处理的例外情况，如 3C3000 实际新于 3C6000，但目前会被排到后面
function compareLoongsonChipModelsNewestFirst(a: string, b: string) {
  // 对第三位的数字排序（降序）
  // e.g. 3A6000 < 2K3000 < 3C3000
  const generationA = parseInt(a.charAt(2), 10)
  const generationB = parseInt(b.charAt(2), 10)
  if (generationA !== generationB) {
    return generationB - generationA // 降序
  }

  // 对第二位的字母排序（升序）
  // e.g. 3A6000 < 3C3000
  const seriesA = a.charAt(1)
  const seriesB = b.charAt(1)
  if (seriesA !== seriesB) {
    return seriesA.localeCompare(seriesB)
  }

  // 对第四位的数字排序（降序）
  // e.g. 3B6600 < 3B6000
  const subGenerationA = parseInt(a.charAt(3), 10)
  const subGenerationB = parseInt(b.charAt(3), 10)
  if (subGenerationA !== subGenerationB) {
    return subGenerationB - subGenerationA // 降序
  }

  return a.localeCompare(b)
}

function compareNamesAlphabetically(a: string, b: string) {
  return a.localeCompare(b)
}
