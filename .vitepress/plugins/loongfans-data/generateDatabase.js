import fs from "node:fs/promises"

import Ajv from "ajv"
import { glob } from "glob"
import yaml from "js-yaml"
import { createGenerator } from "ts-json-schema-generator"

// Fix __filename and __dirname in ESM
import { fileURLToPath } from "url"
import { dirname, basename, extname, resolve } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Artificial JSON schemas for verification
const jsonSchemaNamespace = "https://loongfans.cn/schema.json"

const chipsSchema = {
  $ref: `${jsonSchemaNamespace}#/definitions/ChipInfoDB`,
}

const osSchema = {
  type: "array",
  items: { $ref: `${jsonSchemaNamespace}#/definitions/OSInfoItem` },
}

class DatabaseGenerator {
  constructor(projectRoot, verboseOutput = false) {
    this.projectRoot = projectRoot
    this.dataDir = this.projectRoot + "/data/"
    this.verboseOutput = verboseOutput

    // validation
    const tsJSONSchemaConfig = {
      path: resolve(this.projectRoot, "types/data.ts"),
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

    this.validatorForChips = ajv.compile(chipsSchema)
    this.validatorForOS = ajv.compile(osSchema)
  }

  validateChipsData(data) {
    if (!this.validatorForChips(data)) {
      console.error("[JsonValidator] Chips JSON Data Validation Error!!!")
      console.error(JSON.stringify(this.validatorForChips.errors, null, 2))
      throw new Error("Chips JSON data validation failed")
    }
  }

  validateOSData(data) {
    if (!this.validatorForOS(data)) {
      console.error("[JsonValidator] OS JSON Data Validation Error!!!")
      console.error(JSON.stringify(this.validatorForOS.errors, null, 2))
      throw new Error("OS JSON data validation failed")
    }
  }

  async generateAll() {
    await Promise.all([this.generateChipsDatabase(), this.generateOSDatabase()])
  }

  async globDataFiles(pattern) {
    const options = {
      ignore: ["**/template*.yml"],
    }
    return glob(this.dataDir + pattern, options)
  }

  async emitFile(baseName, data) {
    const fileName = this.verboseOutput
      ? `${baseName}.json`
      : `${baseName}.min.json`
    const payload = this.verboseOutput
      ? JSON.stringify(data, null, "\t")
      : JSON.stringify(data)
    await fs.writeFile(this.dataDir + fileName, payload)
  }

  async generateChipsDatabase() {
    const chips = {
      cpu: {},
      gpu: {},
      mcu: {},
      chipset: {},
    }

    // CPUs
    const cpuDataFiles = await this.globDataFiles("chips/cpu/**/*.yml")
    cpuDataFiles.sort((a, b) =>
      sortNames(basename(a, extname(a)), basename(b, extname(b))),
    )
    cpuDataFiles.forEach(async (files) => {
      let yamlFile = await fs.readFile(files, "utf-8")
      let jsonResult = yaml.load(yamlFile)
      chips.cpu[basename(files, extname(files))] = jsonResult
    })

    // Chipsets
    const chipsetDataFiles = await this.globDataFiles("chips/chipset/**/*.yml")
    chipsetDataFiles.sort((a, b) =>
      sortNames(basename(a, extname(a)), basename(b, extname(b))),
    )
    chipsetDataFiles.forEach(async (files) => {
      let yamlFile = await fs.readFile(files, "utf-8")
      let jsonResult = yaml.load(yamlFile)
      chips.chipset[basename(files, extname(files))] = jsonResult
    })

    // Temporarily remove the gpu and mcu to bypass verification for this section.
    const cleanedChipsData = { ...chips }
    delete cleanedChipsData.gpu
    delete cleanedChipsData.mcu

    this.validateChipsData(cleanedChipsData)
    await this.emitFile("chips", chips)
  }

  async generateOSDatabase() {
    const os = []

    const osDataFiles = await this.globDataFiles("os/**/*.yml")
    osDataFiles.sort((a, b) =>
      sortNamesNormal(basename(a, extname(a)), basename(b, extname(b))),
    )
    osDataFiles.forEach(async (files) => {
      let yamlFile = await fs.readFile(files, "utf-8")
      let jsonResult = yaml.load(yamlFile)
      os.push(jsonResult)
    })

    this.validateOSData(os)
    await this.emitFile("os", os)
  }
}

// 以文件名进行排序
function sortNames(a, b) {
  // 对第三位的数字排序（降序）
  const level_a = parseInt(a.charAt(2), 10)
  const level_b = parseInt(b.charAt(2), 10)
  if (level_a !== level_b) {
    return level_b - level_a // 降序
  }

  // 对第二位的字母排序（升序）
  const series_a = a.charAt(1)
  const series_b = b.charAt(1)
  if (series_a !== series_b) {
    return series_a.localeCompare(series_b)
  }

  // 对第四位的数字排序（降序）
  const sublevel_a = parseInt(a.charAt(3), 10)
  const sublevel_b = parseInt(b.charAt(3), 10)
  if (sublevel_a !== sublevel_b) {
    return sublevel_b - sublevel_a // 降序
  }

  return a.localeCompare(b)
}

function sortNamesNormal(a, b) {
  // 对第一位的字母排序（升序）
  const name_a = a.charAt(0)
  const name_b = b.charAt(0)
  if (name_a !== name_b) {
    return name_a.localeCompare(name_b)
  }

  return a.localeCompare(b)
}

export async function generateAll(verboseOutput = false) {
  const projectRoot = resolve(__dirname, "../../../")
  const generator = new DatabaseGenerator(projectRoot, verboseOutput)
  await generator.generateAll()
}
