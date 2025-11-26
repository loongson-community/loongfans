import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-Hans',
      title: "龙芯爱好者社区",
      description: "龙芯爱好者社区导航站"
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: "Loongson Hobbyists' Community",
      description: "Loongson Hobbyists' Community Portal"
    }
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
  appearance: false
})