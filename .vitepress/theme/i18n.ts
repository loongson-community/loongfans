import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh': zh
  }
})

export default i18n