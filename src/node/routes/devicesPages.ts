import { readFile } from "node:fs/promises"

import type { RouteModule } from "vitepress"
// VitePress resolves dynamic routes *so* early (`resolvePages()` is called
// just after this config module is loaded in `resolveConfig()`!), and that
// means we get imported right after the `config.mts` is loaded and essentially
// before anything Vite, and neither ready-made data modules nor resolve
// aliases are available for us.
//
// See also https://github.com/vuejs/vitepress/issues/2826 for a similar use
// case.
import type { DeviceInfoDB, DeviceInfoItem } from "../../types/data"
import { defaultLocale, i18nForLocale } from "../../common/i18n"

// Because a data import is impossible for clean builds for reasons explained
// above, we have to duplicate work by generating data directly in the module.
import { DatabaseGenerator } from "../plugins/loongfans-data/generateDatabase"

// for some reason this is not exported from vitepress
// fortunately it is trivial enough to replicate here
interface DevicePageRouteConfig {
  params: DevicePageRouteParams // more specific than Record<string, string>
  content?: string
}

type DevicePageRouteParams = {
  deviceID: string
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

  async compileOneRoute(deviceID: string, item: DeviceInfoItem): Promise<DevicePageRouteConfig> {
    // TODO: content
    return {
      params: {
        deviceID,
        title: "", // TODO
        subTitle: this.t(
          `deviceCategory.${item.category}`,
        ),
      },
    }
  }

  async compileRoutes(data: DeviceInfoDB): Promise<DevicePageRouteConfig[]> {
    return await Promise.all(
      Object.entries(data).map(([key, value]) =>
        this.compileOneRoute(key, value),
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
      const devicesDB = await generator.generateDeviceDatabase()

      const c = new RouteCompiler(locale)
    },

    transformPageData(pageData) {
      const params = pageData.params as DevicePageRouteParams
      pageData.title = params.title
      pageData.frontmatter["pageTitle"] = params.title
      pageData.frontmatter["pageSubTitle"] = params.subTitle
      return pageData
    },
  }
}
