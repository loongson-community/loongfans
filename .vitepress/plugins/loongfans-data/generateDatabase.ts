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

  async generateAll() {
    await Promise.all([this.generateChipsDatabase(), this.generateOSDatabase()])
  }

  async processFiles<T>(
    pattern: string,
    validator: InputFileValidator<T>,
    keySorter: (a: string, b: string) => number,
  ): Promise<TransformedInput<T>[]> {
    const options = {
      ignore: ["**/template*.yml"],
    }
    const files = await glob(this.dataDir + pattern, options)

    const transformed = await Promise.all(
      files.map(async (path) => {
        const input = await loadUntypedYAML(path)
        return {
          key: basename(path, extname(path)),
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
  ): Promise<T[]> {
    const transformed = await this.processFiles(pattern, validator, keySorter)
    return transformed.map(({ data }) => data)
  }

  async readAndTransformIntoMap<T>(
    pattern: string,
    validator: InputFileValidator<T>,
    keySorter: (a: string, b: string) => number,
  ): Promise<{ [key: string]: T }> {
    const transformed = await this.processFiles(pattern, validator, keySorter)
    const result: { [key: string]: T } = {}
    transformed.forEach(({ key, data }) => {
      result[key] = data
    })
    return result
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
    const [cpuData, chipsetData] = await Promise.all([
      this.readAndTransformIntoMap(
        "chips/cpu/**/*.yml",
        this.validateCPUData.bind(this),
        sortNames,
      ),
      this.readAndTransformIntoMap(
        "chips/chipset/**/*.yml",
        this.validateChipsetData.bind(this),
        sortNames,
      ),
    ])

    const chips: ChipInfoDB = {
      cpu: cpuData,
      chipset: chipsetData,
      // These are not implemented and typed yet
      // gpu: {},
      // mcu: {},
    }

    await this.emitFile("chips", this.validateChipsOutputData(chips))
  }

  async generateOSDatabase() {
    const os = await this.readAndTransformIntoArray(
      "os/**/*.yml",
      this.validateOSData.bind(this),
      sortNamesNormal,
    )

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
