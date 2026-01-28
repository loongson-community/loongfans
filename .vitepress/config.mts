import { resolve } from "path"
import UnoCSS from "unocss/vite"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vitepress"
import loongfansData from "./plugins/loongfans-data"
import dataTypeValidator from "./plugins/json-validator"

const srcDir = "pages"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: {
      label: "简体中文",
      lang: "zh",
      title: "龙芯爱好者社区",
      description: "龙芯爱好者社区导航站",
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en",
      title: "Loongson Hobbyists' Community",
      description: "Loongson Hobbyists' Community Portal",
    },
  },
  ignoreDeadLinks: true,
  srcDir,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: '首页', link: '/' }
    // ],
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  // 完全禁用主题切换
  appearance: false,
  vite: {
    plugins: [
      UnoCSS(),
      Icons({ scale: 1 }),
      loongfansData(),
      dataTypeValidator(),
    ],
    ssr: {
      noExternal: ["vue-i18n"],
    },
    resolve: {
      alias: {
        // `@` is an alias of `srcDir` in vitepress
        // e.g. when using markdown file inclusion
        "@": resolve(__dirname, `../${srcDir}`),
        "@components": resolve(__dirname, "../components"),
        "@data": resolve(__dirname, "../data"),
        "@root": resolve(__dirname, "../"),
        "@vitepress": resolve(__dirname, "./"),
      },
    },
  },
})
