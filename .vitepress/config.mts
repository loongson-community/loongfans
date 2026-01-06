import tailwindcss from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vitepress"
import AutoGenerateJson from "./plugins/AutoGenerateJson.js"

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
      link: "/en/",
      title: "Loongson Hobbyists' Community",
      description: "Loongson Hobbyists' Community Portal",
    },
  },
  ignoreDeadLinks: true,
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
    plugins: [tailwindcss(), Icons({ scale: 1 }), AutoGenerateJson()],
    ssr: {
      noExternal: ["vue-i18n"],
    },
  },
})
