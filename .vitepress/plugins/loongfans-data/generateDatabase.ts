import fs from "node:fs/promises"

import { Ajv, type ValidateFunction } from "ajv"
import { glob } from "glob"
import { load as yamlLoad } from "js-yaml"
import { createGenerator, type Config } from "ts-json-schema-generator"

// Fix __filename and __dirname in ESM
import { fileURLToPath } from "node:url"
import { dirname, basename, extname, resolve } from "node:path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import type {
  ChipInfoDB,
  OSInfoItem,
  ChipsetInfoItem,
  CPUInfoItem,
} from "@root/types/data"

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
  projectRoot: string
  dataDir: string
  verboseOutput: boolean
  validatorForCPUInfoInput: ValidateFunction
  validatorForChipsetInfoInput: ValidateFunction
  validatorForOSInfoInput: ValidateFunction
  validatorForChipsOutput: ValidateFunction
  validatorForOSOutput: ValidateFunction

  constructor(projectRoot: string, verboseOutput: boolean = false) {
    this.projectRoot = projectRoot
    this.dataDir = this.projectRoot + "/data/"
    this.verboseOutput = verboseOutput

    // validation
    const tsJSONSchemaConfig: Config = {
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

  validateCPUData(data: object, fileName: string | null = null) {
    return this.validate<CPUInfoItem>(
      data,
      this.validatorForCPUInfoInput,
      "CPU",
      fileName,
    )
  }

  validateChipsetData(data: object, fileName: string | null = null) {
    return this.validate<ChipsetInfoItem>(
      data,
      this.validatorForChipsetInfoInput,
      "Chipset",
      fileName,
    )
  }

  validateOSData(data: object, fileName: string | null = null) {
    return this.validate<OSInfoItem>(
      data,
      this.validatorForOSInfoInput,
      "OS",
      fileName,
    )
  }

  validateChipsOutputData(data: object) {
    return this.validate<ChipInfoDB>(
      data,
      this.validatorForChipsOutput,
      "Chips database output",
    )
  }

  validateOSOutputData(data: object) {
    return this.validate<OSInfoItem[]>(
      data,
      this.validatorForOSOutput,
      "OS database output",
    )
  }

  validate<T>(
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

  async generateAll() {
    await Promise.all([this.generateChipsDatabase(), this.generateOSDatabase()])
  }

  async globDataFiles(pattern: string) {
    const options = {
      ignore: ["**/template*.yml"],
    }
    return glob(this.dataDir + pattern, options)
  }

  async emitFile(baseName: string, data: object) {
    const fileName = this.verboseOutput
      ? `${baseName}.json`
      : `${baseName}.min.json`
    const payload = this.verboseOutput
      ? JSON.stringify(data, null, "\t")
      : JSON.stringify(data)
    await fs.writeFile(this.dataDir + fileName, payload)
  }

  async generateChipsDatabase() {
    const chips: ChipInfoDB = {
      cpu: {},
      chipset: {},
      // These are not implemented and typed yet
      // gpu: {},
      // mcu: {},
    }

    // CPUs
    const cpuDataFiles = await this.globDataFiles("chips/cpu/**/*.yml")
    cpuDataFiles.sort((a, b) =>
      sortNames(basename(a, extname(a)), basename(b, extname(b))),
    )
    cpuDataFiles.forEach(async (fileName) => {
      const input = await loadUntypedYAML(fileName)
      chips.cpu[basename(fileName, extname(fileName))] = this.validateCPUData(
        input,
        fileName,
      )
    })

    // Chipsets
    const chipsetDataFiles = await this.globDataFiles("chips/chipset/**/*.yml")
    chipsetDataFiles.sort((a, b) =>
      sortNames(basename(a, extname(a)), basename(b, extname(b))),
    )
    chipsetDataFiles.forEach(async (fileName) => {
      const input = await loadUntypedYAML(fileName)
      chips.chipset[basename(fileName, extname(fileName))] =
        this.validateChipsetData(input, fileName)
    })

    await this.emitFile("chips", this.validateChipsOutputData(chips))
  }

  async generateOSDatabase() {
    const os: OSInfoItem[] = []

    const osDataFiles = await this.globDataFiles("os/**/*.yml")
    osDataFiles.sort((a, b) =>
      sortNamesNormal(basename(a, extname(a)), basename(b, extname(b))),
    )
    osDataFiles.forEach(async (fileName) => {
      const input = await loadUntypedYAML(fileName)
      os.push(this.validateOSData(input, fileName))
    })

    await this.emitFile("os", this.validateOSOutputData(os))
  }
}

async function loadUntypedYAML(fileName: string) {
  return yamlLoad(await fs.readFile(fileName, "utf-8"), {
    filename: fileName,
  }) as object
}

// 以文件名进行排序
function sortNames(a: string, b: string) {
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

function sortNamesNormal(a: string, b: string) {
  // 对第一位的字母排序（升序）
  const nameA = a.charAt(0)
  const nameB = b.charAt(0)
  if (nameA !== nameB) {
    return nameA.localeCompare(nameB)
  }

  return a.localeCompare(b)
}

export async function generateAll(verboseOutput: boolean = false) {
  const projectRoot = resolve(__dirname, "../../../")
  const generator = new DatabaseGenerator(projectRoot, verboseOutput)
  await generator.generateAll()
}
