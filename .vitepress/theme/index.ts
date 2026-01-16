import DefaultTheme from "vitepress/theme"

// PrimeVue init
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"
import DialogService from "primevue/dialogservice"

import Material from "@primeuix/themes/material"
import { definePreset } from "@primeuix/themes"

// Make vue-i18n configs to a file
import i18n from "./i18n"

import "virtual:uno.css"
import "./custom.css"
import Layout from "./Layout.vue"
import DeviceDetail from "@components/device/Detail.vue"
import ChipTables from "@components/chips/ChipTables.vue"
import CpuCompare from "@components/chips/compare/CpuCompare.vue"
import DeviceDownloadCard from "@components/device/DownloadCard.vue"

import type { App } from "vue"

const Preset = definePreset(Material, {
  semantic: {
    primary: {
      50: "{red.50}",
      100: "{red.100}",
      200: "{red.200}",
      300: "{red.300}",
      400: "{red.400}",
      500: "#e60013",
      600: "{red.600}",
      700: "{red.700}",
      800: "{red.800}",
      900: "{red.900}",
    },
  },
})

export default {
  // 继承核心样式
  extends: DefaultTheme,
  // 覆盖布局但继承功能
  Layout,
  enhanceApp({ app }: { app: App }) {
    // vue-i18n init
    app.use(i18n)

    // PrimeVue init
    app.use(PrimeVue, {
      theme: {
        preset: Preset,
        options: {
          // CSS Layers cannot be used right now, otherwise PrimeVue Tab style
          // will be lost (<button> style being reset in VitePress's base.css)
          //
          // https://github.com/vuejs/vitepress/issues/4425
          /*
          cssLayer: {
            name: "primevue",
            order: "theme, base, primevue",
          },
          */
          darkModeSelector: false,
        },
      },
    })
    app.use(ToastService)
    app.use(DialogService)

    // Components
    app.component("DeviceDetail", DeviceDetail)
    app.component("ChipTables", ChipTables)
    app.component("CpuCompare", CpuCompare)
    app.component("DeviceDownloadCard", DeviceDownloadCard)
  },
}
