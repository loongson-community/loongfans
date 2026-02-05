import { resolve } from "path"
import UnoCSS from "unocss/vite"
import Icons from "unplugin-icons/vite"
import Inspect from "vite-plugin-inspect"
import { defineConfig } from "vitepress"

// resolve alias is not available for use yet
import loongfansData from "../src/node/plugins/loongfans-data"

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
  vite: {
    plugins: [Inspect(), UnoCSS(), Icons({ scale: 1 }), loongfansData()],
    ssr: {
      noExternal: ["vue-i18n"],
    },
    resolve: {
      alias: {
        // `@` is an alias of `srcDir` in vitepress
        // e.g. when using markdown file inclusion
        "@": resolve(__dirname, `../${srcDir}`),
        "@data": resolve(__dirname, "../data"),
        "@src": resolve(__dirname, "../src"),
      },
    },
  },
})
