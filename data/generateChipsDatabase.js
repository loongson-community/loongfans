import yaml from "js-yaml"
import fs from "fs"
import { glob } from "glob"

// Fix __filename and __dirname in ESM
import { fileURLToPath } from 'url'
import { dirname, basename, extname } from 'path'
import { type } from "os"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const chips = {
    cpu: {},
    gpu: {},
    mcu: {},
    chipset: {}
}

const glob_options = {
    ignore: ['**/template*.yml']
}

const cpu = await glob(__dirname + "/chips/cpu/**/*.yml", glob_options)
cpu.forEach(files => {
    let yamlFile = fs.readFileSync(files, 'utf-8')
    let jsonResult = yaml.load(yamlFile)
    chips.cpu[basename(files, extname(files))] = jsonResult
})

const chipset = await glob(__dirname + "/chips/chipset/**/*.yml", glob_options)
chipset.forEach(files => {
    let yamlFile = fs.readFileSync(files, 'utf-8')
    let jsonResult = yaml.load(yamlFile)
    chips.chipset[basename(files, extname(files))] = jsonResult
})

fs.writeFileSync(__dirname + "/chips.json", JSON.stringify(chips, null, "\t"))
fs.writeFileSync(__dirname + "/chips.min.json", JSON.stringify(chips))