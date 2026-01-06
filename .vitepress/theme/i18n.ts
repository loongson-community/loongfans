import { createI18n, type I18nOptions } from "vue-i18n"
import en from "../locales/en"
import zh from "../locales/zh"

// https://github.com/intlify/vue-i18n/issues/717
const datetimeFormats: I18nOptions["datetimeFormats"] = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "shortOffset",
    },
  },
  zh: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "shortOffset",
    },
  },
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "zh",
  fallbackLocale: "en",
  datetimeFormats,
  messages: {
    en: en,
    zh: zh,
  },
})

export default i18n
