import { resolve } from "path"
import { arch } from "process"
import UnoCSS from "unocss/vite"
import Icons from "unplugin-icons/vite"
import Inspect from "vite-plugin-inspect"
import { defineConfig } from "vitepress"

// resolve alias is not available for use yet
import loongfansData from "../src/node/plugins/loongfans-data/index.ts"

const srcDir = "pages"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    zh: {
      label: "简体中文",
      lang: "zh",
      link: "/zh",
      title: "龙芯爱好者社区",
      description: "龙芯爱好者社区导航站",
    },
    de: {
      label: "Deutsch",
      lang: "de",
      link: "/de",
      title: "Loongson Hobbyists' Community",
      description: "Loongson Hobbyists' Community Portal",
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en",
      title: "Loongson Hobbyists' Community",
      description: "Loongson Hobbyists' Community Portal",
    },
    fr: {
      label: "Français",
      lang: "fr",
      link: "/fr",
      title: "Communauté des amateurs de Loongson",
      description: "Portail de la communauté des passionnés de Loongson",
    },
    ru: {
      label: "Русский",
      lang: "ru",
      link: "/ru",
      title: "Сообщество энтузиастов Loongson",
      description: "Портал cообщество энтузиастов Loongson",
    },
  },
  ignoreDeadLinks: true,
  srcDir,
  srcExclude: ["parts/**/*.md"],
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
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  vite: {
    build: {
      cssMinify: arch === "loong64" ? "esbuild" : "lightningcss",
    },
    css: {
      transformer: arch === "loong64" ? "postcss" : "lightningcss",
    },
    plugins: [Inspect(), UnoCSS(), Icons({ scale: 1 }), loongfansData()],
    ssr: {
      noExternal: ["vue-i18n"],
    },
    resolve: {
      alias: {
        // `@` is an alias of `srcDir` in vitepress
        // e.g. when using markdown file inclusion
        "@": resolve(import.meta.dirname, `../${srcDir}`),
        "@data": resolve(import.meta.dirname, "../data"),
        "@src": resolve(import.meta.dirname, "../src"),
      },
    },
  },
})
