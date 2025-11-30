import { defineConfig } from "vitepress";
import Icons from "unplugin-icons/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "龙芯爱好者社区",
  description: "龙芯爱好者社区导航站",
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
    plugins: [Icons({ scale: 1 })],
  },
});
