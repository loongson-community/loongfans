import { readFile } from "node:fs/promises"

import concat from "lodash/concat"
import type { RouteModule } from "vitepress"
// these imports from resolve aliases do not work for some reason, maybe because
// this file is imported too early during VitePress build process
// import i18n from "@vitepress/theme/i18n"
// import chipsDB from "@data/chips.min.json"

import type { ChipsetInfoItem, CPUInfoItem } from "@src/types/data"
import { defaultLocale, i18nForLocale } from "../../.vitepress/theme/i18n"
import chipsDB from "../../data/chips.min.json"

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

  async compileOneRoute(
    category: string,
    key: string,
    value: CPUInfoItem | ChipsetInfoItem,
  ): Promise<MyUserRouteConfig> {
    const family = value.basic.series
    const categoryFamilyModel = `${category}/${family}/${key}`.toLowerCase()

    // read notes and put into contents if provided
    let content: string | undefined = undefined
    if (value.notesPath) {
      const notesURL = new URL(
        `../../parts/${this.localePart}${value.notesPath}`,
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
        subTitle:
          category === "cpu" ? this.subTitleForCPU(value as CPUInfoItem) : "",
        title: this.t("chips.pageTitle", { name: value.basic.name }),
      },
      content,
    }
  }

  async compileRoutes(
    category: string,
    data: { [key: string]: CPUInfoItem | ChipsetInfoItem },
  ): Promise<MyUserRouteConfig[]> {
    return await Promise.all(
      Object.entries(data).map(([key, value]) =>
        this.compileOneRoute(category, key, value),
      ),
    )
  }
}

export const makeRouteModule = (locale: string): RouteModule => {
  return {
    async paths() {
      const c = new RouteCompiler(locale)
      return concat(
        await c.compileRoutes("chipset", chipsDB.chipset),
        await c.compileRoutes("cpu", chipsDB.cpu),
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
