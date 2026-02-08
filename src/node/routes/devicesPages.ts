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
import type { DeviceInfoItem } from "../../types/data"
import type { SupportedLanguage } from "../../types/language"

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
  private locale: string

  constructor(locale: string) {
    this.locale = locale
  }

  get contentSuffix() {
    return `content.${this.locale}.md`
  }

  localizedName(item: DeviceInfoItem): string {
    return (
      item.name[this.locale as SupportedLanguage] ?? item.name.en ?? ""
    )
  }

  async compileOneRoute(
    deviceID: string,
    item: DeviceInfoItem,
    devicesDir: string,
  ): Promise<DevicePageRouteConfig> {
    const contentPath = `${devicesDir}${deviceID}/${this.contentSuffix}`
    const content = await readFile(contentPath, "utf-8")

    return {
      params: {
        deviceID,
        title: this.localizedName(item),
        subTitle: this.localizedName(item),
      },
      content,
    }
  }

  async compileRoutes(
    devices: { [key: string]: DeviceInfoItem },
    devicesDir: string,
  ): Promise<DevicePageRouteConfig[]> {
    return await Promise.all(
      Object.entries(devices).map(([key, value]) =>
        this.compileOneRoute(key, value, devicesDir),
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

      const devicesDir = new URL("../../../data/devices/", import.meta.url)
        .pathname
      const c = new RouteCompiler(locale)
      return await c.compileRoutes(devicesDB.devices, devicesDir)
    },

    transformPageData(pageData) {
      const params = pageData.params as DevicePageRouteParams
      pageData.title = params.title
      pageData.frontmatter["pageSubTitle"] = params.subTitle
      return pageData
    },
  }
}
