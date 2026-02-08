import { uneval } from "devalue"
import { createPinia } from "pinia"
import Material from "@primeuix/themes/material"
import { definePreset } from "@primeuix/themes"
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"
import DialogService from "primevue/dialogservice"
import "virtual:uno.css"
import DefaultTheme from "vitepress/theme"
import type { App } from "vue"

import i18n from "@src/common/i18n"
import LoongfansLayout from "./LoongfansLayout.vue"
import "./custom.css"

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
  Layout: LoongfansLayout,
  enhanceApp({ app }: { app: App }) {
    // State management init
    const pinia = createPinia()
    app.use(pinia)
    uneval(pinia.state.value)

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
  },
}
