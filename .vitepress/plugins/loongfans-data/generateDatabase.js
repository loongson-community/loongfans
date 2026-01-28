import yaml from "js-yaml"
import fs from "fs"
import { glob } from "glob"
import Ajv from "ajv"
import { createGenerator } from "ts-json-schema-generator"

// Fix __filename and __dirname in ESM
import { fileURLToPath } from "url"
import { dirname, basename, extname, resolve } from "path"
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = __dirname + "/../../../"
const dataDir = rootDir + "/data/"

const chips = {
  cpu: {},
  gpu: {},
  mcu: {},
  chipset: {},
}

// ts-json-schema-generator configs
const tsJsonConfig = {
  path: resolve(rootDir, "types/data.ts"),
  tsconfig: resolve(rootDir, "tsconfig.json"),
  type: "*",
  expose: "export",
  topRef: true,
  jsDoc: "extended",
  skipTypeCheck: true,
}
const schemaGenerator = createGenerator(tsJsonConfig)
const jsonFullSchema = schemaGenerator.createSchema(tsJsonConfig.type)
// ts-json-schema-generator End

// AJV configs
jsonFullSchema.$id = "https://loongfans.cn/schema.json"
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
  allowUnionTypes: true,
})
ajv.addSchema(jsonFullSchema)
// AJV configs End

const glob_options = {
  ignore: ["**/template*.yml"],
}

function validateData(name, data, schema) {
  let dataNames = name.toString() // Force conversion to String to output normal logs
  console.log("[JsonValidator] Validating data types...")
  console.log("[JsonValidator] Generating JSON Schema...")
  console.log(`[JsonValidator] Validating ${dataNames} data...`)

  const jsonSchema = schema
  const validateOS = ajv.compile(jsonSchema)

  if (!validateOS(data)) {
    console.error(`[JsonValidator] ${dataNames} JSON Data Validation Error!!!`)
    console.error(JSON.stringify(validateOS.errors, null, 2))
    throw new Error("JSON data validation failed")
  }
  console.log(`[JsonValidator] ${dataNames} Data Validation passed!`)
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

export async function generateChipsDatabase(format_switch) {
  // CPUs
  const cpu = await glob(dataDir + "chips/cpu/**/*.yml", glob_options)
  cpu.sort((a, b) =>
    sortNames(basename(a, extname(a)), basename(b, extname(b))),
  )
  cpu.forEach((files) => {
    let yamlFile = fs.readFileSync(files, "utf-8")
    let jsonResult = yaml.load(yamlFile)
    chips.cpu[basename(files, extname(files))] = jsonResult
  })

  // Chipsets
  const chipset = await glob(dataDir + "chips/chipset/**/*.yml", glob_options)
  chipset.sort((a, b) =>
    sortNames(basename(a, extname(a)), basename(b, extname(b))),
  )
  chipset.forEach((files) => {
    let yamlFile = fs.readFileSync(files, "utf-8")
    let jsonResult = yaml.load(yamlFile)
    chips.chipset[basename(files, extname(files))] = jsonResult
  })

  const chipsSchema = {
    $ref: "https://loongfans.cn/schema.json#/definitions/ChipInfoDB",
  }

  // Temporarily remove the gpu and mcu to bypass verification for this section.
  const cleanedChipsData = { ...chips }
  delete cleanedChipsData.gpu
  delete cleanedChipsData.mcu

  validateData("Chips", cleanedChipsData, chipsSchema)

  if (format_switch === 1) {
    fs.writeFileSync(dataDir + "chips.json", JSON.stringify(chips, null, "\t"))
  }
  fs.writeFileSync(dataDir + "chips.min.json", JSON.stringify(chips))
}

// Generate OS List
export async function generateOsDatabase(format_switch) {
  const os = []

  const os_list = await glob(dataDir + "os/**/*.yml", glob_options)
  os_list.sort((a, b) =>
    sortNamesNormal(basename(a, extname(a)), basename(b, extname(b))),
  )
  os_list.forEach((files) => {
    let yamlFile = fs.readFileSync(files, "utf-8")
    let jsonResult = yaml.load(yamlFile)
    os.push(jsonResult)
  })

  const osSchema = {
    type: "array",
    items: { $ref: "https://loongfans.cn/schema.json#/definitions/OSInfoItem" },
  }
  validateData("OS", os, osSchema)

  if (format_switch === 1) {
    fs.writeFileSync(dataDir + "os.json", JSON.stringify(os, null, "\t"))
  }
  fs.writeFileSync(dataDir + "os.min.json", JSON.stringify(os))
}

export async function generateAll(format_switch) {
  await generateChipsDatabase(format_switch)
  await generateOsDatabase(format_switch)
}
