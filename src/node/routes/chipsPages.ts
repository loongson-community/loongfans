import { readFile } from "node:fs/promises"

import concat from "lodash/concat"
import type { RouteModule } from "vitepress"
// VitePress resolves dynamic routes *so* early (`resolvePages()` is called
// just after this config module is loaded in `resolveConfig()`!), and that
// means we get imported right after the `config.mts` is loaded and essentially
// before anything Vite, and neither ready-made data modules nor resolve
// aliases are available for us.
//
// See also https://github.com/vuejs/vitepress/issues/2826 for a similar use
// case.
import type { ChipsetInfoItem, CPUInfoItem } from "../../types/data"
import { defaultLocale, i18nForLocale } from "../../common/i18n"

// Because a data import is impossible for clean builds for reasons explained
// above, we have to duplicate work by generating data directly in the module.
import { DatabaseGenerator } from "../plugins/loongfans-data/generateDatabase"

// for some reason this is not exported from vitepress
// fortunately it is trivial enough to replicate here
interface MyUserRouteConfig {
  params: ChipPageRouteParams // more specific than Record<string, string>
  content?: string
}

type ChipPageRouteParams = {
  category: string
  categoryFamilyModel: string
  chipName: string
  chipKey: string
  hasNotes: string // "true" | "false"
  subTitle: string
  title: string
}

class RouteCompiler {
  private i18n
  private locale: string

  constructor(locale: string) {
    this.locale = locale
    this.i18n = i18nForLocale(locale)
  }

  get localePart() {
    return this.locale === defaultLocale ? "" : `${this.locale}/`
  }

  get t() {
    return this.i18n.global.t
  }

  subTitleForCPU(info: CPUInfoItem): string {
    const cores = this.t(
      "chips.cpuPageSubTitle.cores",
      { cores: info.cpu.cores },
      info.cpu.cores,
    )
    const threads = this.t(
      "chips.cpuPageSubTitle.threads",
      { threads: info.cpu.threads },
      info.cpu.threads,
    )
    return this.t("chips.cpuPageSubTitle.format", {
      cores,
      threads,
      freq: info.cpu.freq,
    })
  }

  async compileOneRoute({
    category,
    key,
    value,
  }:
    | {
        category: "cpu"
        key: string
        value: CPUInfoItem
      }
    | {
        category: "chipset"
        key: string
        value: ChipsetInfoItem
      }): Promise<MyUserRouteConfig> {
    const family = value.basic.series
    const categoryFamilyModel = `${category}/${family}/${key}`.toLowerCase()

    // read notes and put into contents if provided
    let content: string | undefined = undefined
    if (value.notesPath) {
      const notesURL = new URL(
        `../../../parts/${this.localePart}${value.notesPath}`,
        import.meta.url,
      )
      content = await readFile(notesURL, "utf-8")
    }

    return {
      params: {
        category,
        categoryFamilyModel,
        chipName: value.basic.name,
        chipKey: key,
        hasNotes: Boolean(value.notesPath).toString(),
        subTitle: category === "cpu" ? this.subTitleForCPU(value) : "",
        title: this.t("chips.pageTitle", { name: value.basic.name }),
      },
      content,
    }
  }

  async compileRoutes({
    category,
    data,
  }:
    | {
        category: "cpu"
        data: { [key: string]: CPUInfoItem }
      }
    | {
        category: "chipset"
        data: { [key: string]: ChipsetInfoItem }
      }): Promise<MyUserRouteConfig[]> {
    return await Promise.all(
      Object.entries(data).map(([key, value]) =>
        this.compileOneRoute({ category, key, value }),
      ),
    )
  }
}

export const makeRouteModule = (locale: string): RouteModule => {
  return {
    async paths() {
      // generate the data on the fly to avoid depending on data that haven't
      // been created yet during clean builds
      const generator = new DatabaseGenerator()
      const chipsDB = await generator.generateChipsDatabase()

      const c = new RouteCompiler(locale)
      return concat(
        await c.compileRoutes({ category: "chipset", data: chipsDB.chipset }),
        await c.compileRoutes({ category: "cpu", data: chipsDB.cpu }),
      )
    },

    transformPageData(pageData) {
      const params = pageData.params as ChipPageRouteParams
      pageData.title = params.title
      pageData.frontmatter["pageTitle"] = params.title
      pageData.frontmatter["pageSubTitle"] = params.subTitle
      return pageData
    },
  }
}
