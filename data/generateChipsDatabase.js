import yaml from "js-yaml"
import fs from "fs"
import { glob } from "glob"

// Fix __filename and __dirname in ESM
import { fileURLToPath } from "url"
import { dirname, basename, extname } from "path"
import { type } from "os"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const chips = {
  cpu: {},
  gpu: {},
  mcu: {},
  chipset: {},
}

const glob_options = {
  ignore: ["**/template*.yml"],
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

const cpu = await glob(__dirname + "/chips/cpu/**/*.yml", glob_options)
cpu.sort((a, b) => sortNames(basename(a, extname(a)), basename(b, extname(b))))
cpu.forEach((files) => {
  let yamlFile = fs.readFileSync(files, "utf-8")
  let jsonResult = yaml.load(yamlFile)
  chips.cpu[basename(files, extname(files))] = jsonResult
})

const chipset = await glob(__dirname + "/chips/chipset/**/*.yml", glob_options)
chipset.sort((a, b) =>
  sortNames(basename(a, extname(a)), basename(b, extname(b))),
)
chipset.forEach((files) => {
  let yamlFile = fs.readFileSync(files, "utf-8")
  let jsonResult = yaml.load(yamlFile)
  chips.chipset[basename(files, extname(files))] = jsonResult
})

fs.writeFileSync(__dirname + "/chips.json", JSON.stringify(chips, null, "\t"))
fs.writeFileSync(__dirname + "/chips.min.json", JSON.stringify(chips))

// #region FIXME: to be refactored
const nameKeyMap = {}
Object.keys(chips).forEach((category) => {
  const categoryEntries = chips[category]
  if (!categoryEntries || typeof categoryEntries !== "object") return
  Object.entries(categoryEntries).forEach(([key, value]) => {
    const name = value?.basic?.name
    if (typeof name === "string" && name.length) {
      nameKeyMap[name] = key
    }
  })
})
fs.writeFileSync(
  __dirname + "/chips_name_map.min.json",
  JSON.stringify(nameKeyMap),
)
// #endregion
