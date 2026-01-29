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

const osOutputSchema = {
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

    this.validatorForCPUInfoInput = ajv.compile(cpuInfoInputSchema)
    this.validatorForChipsetInfoInput = ajv.compile(chipsetInfoInputSchema)
    this.validatorForOSInfoInput = ajv.compile(osInfoInputSchema)
    this.validatorForChipsOutput = ajv.compile(chipsOutputSchema)
    this.validatorForOSOutput = ajv.compile(osOutputSchema)
  }

  validateData(data, kind, fileName = null) {
    let validator = null
    switch (kind) {
      case "cpu":
        validator = this.validatorForCPUInfoInput
        break
      case "chipset":
        validator = this.validatorForChipsetInfoInput
        break
      case "os":
        validator = this.validatorForOSInfoInput
        break
      case "chipsOutput":
        validator = this.validatorForChipsOutput
        break
      case "osOutput":
        validator = this.validatorForOSOutput
        break
      default:
        throw new Error(`Unknown kind for validation: ${kind}`)
    }

    if (!validator(data)) {
      console.error(`[JsonValidator] ${kind} JSON Data Validation Error!!!`)
      if (fileName) {
        console.error(`  In file: ${fileName}`)
      }
      console.error(JSON.stringify(validator.errors, null, 2))
      throw new Error(`${kind} JSON data validation failed`)
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
    cpuDataFiles.forEach(async (fileName) => {
      const yamlFile = await fs.readFile(fileName, "utf-8")
      const jsonResult = yaml.load(yamlFile)
      this.validateData(jsonResult, "cpu", fileName)
      chips.cpu[basename(fileName, extname(fileName))] = jsonResult
    })

    // Chipsets
    const chipsetDataFiles = await this.globDataFiles("chips/chipset/**/*.yml")
    chipsetDataFiles.sort((a, b) =>
      sortNames(basename(a, extname(a)), basename(b, extname(b))),
    )
    chipsetDataFiles.forEach(async (fileName) => {
      let yamlFile = await fs.readFile(fileName, "utf-8")
      let jsonResult = yaml.load(yamlFile)
      this.validateData(jsonResult, "chipset", fileName)
      chips.chipset[basename(fileName, extname(fileName))] = jsonResult
    })

    // Temporarily remove the gpu and mcu to bypass verification for this section.
    const cleanedChipsData = { ...chips }
    delete cleanedChipsData.gpu
    delete cleanedChipsData.mcu

    this.validateData(cleanedChipsData, "chipsOutput")
    await this.emitFile("chips", chips)
  }

  async generateOSDatabase() {
    const os = []

    const osDataFiles = await this.globDataFiles("os/**/*.yml")
    osDataFiles.sort((a, b) =>
      sortNamesNormal(basename(a, extname(a)), basename(b, extname(b))),
    )
    osDataFiles.forEach(async (fileName) => {
      let yamlFile = await fs.readFile(fileName, "utf-8")
      let jsonResult = yaml.load(yamlFile)
      this.validateData(jsonResult, "os", fileName)
      os.push(jsonResult)
    })

    this.validateData(os, "osOutput")
    await this.emitFile("os", os)
  }
}

// 以文件名进行排序
function sortNames(a, b) {
  // 对第三位的数字排序（降序）
  const levelA = parseInt(a.charAt(2), 10)
  const levelB = parseInt(b.charAt(2), 10)
  if (levelA !== levelB) {
    return levelB - levelA // 降序
  }

  // 对第二位的字母排序（升序）
  const seriesA = a.charAt(1)
  const seriesB = b.charAt(1)
  if (seriesA !== seriesB) {
    return seriesA.localeCompare(seriesB)
  }

  // 对第四位的数字排序（降序）
  const sublevelA = parseInt(a.charAt(3), 10)
  const sublevelB = parseInt(b.charAt(3), 10)
  if (sublevelA !== sublevelB) {
    return sublevelB - sublevelA // 降序
  }

  return a.localeCompare(b)
}

function sortNamesNormal(a, b) {
  // 对第一位的字母排序（升序）
  const nameA = a.charAt(0)
  const nameB = b.charAt(0)
  if (nameA !== nameB) {
    return nameA.localeCompare(nameB)
  }

  return a.localeCompare(b)
}

export async function generateAll(verboseOutput = false) {
  const projectRoot = resolve(__dirname, "../../../")
  const generator = new DatabaseGenerator(projectRoot, verboseOutput)
  await generator.generateAll()
}
