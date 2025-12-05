import DefaultTheme from 'vitepress/theme'
import PrimeVue from "primevue/config";
import Material from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";
import { createI18n } from 'vue-i18n'
import Device from "../../components/Device.vue"

import './custom.css'
import en from '../locales/en.js'
import zh from '../locales/zh.js'
import Layout from './Layout.vue'

import type { App } from "vue";

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh': zh
  }
})

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
});

export default {
  // 继承核心样式
  extends: DefaultTheme,
  // 覆盖布局但继承功能
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.use(i18n)
    app.use(PrimeVue, {
      theme: { preset: Preset, options: { darkModeSelector: false } },
    });
    app.component('Device', Device)
  },
};
