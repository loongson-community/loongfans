import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'
import { createI18n } from 'vue-i18n'
import en from '../locales/en.js'
import zh from '../locales/zh.js'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-Hans',
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh-Hans': zh
  }
})

export default {
  // 继承核心样式
  extends: DefaultTheme,
  // 覆盖布局但继承功能
  Layout: Layout,
  enhanceApp({ app }) {
    app.use(i18n)
  }
}
