import { createI18n, type I18nOptions } from "vue-i18n"

import en from "./locales/en"
import zh from "./locales/zh"

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

export const i18nForLocale = (
  locale: string,
  globalInjection: boolean = false,
) =>
  createI18n({
    legacy: false,
    globalInjection,
    locale,
    fallbackLocale: "en",
    datetimeFormats,
    messages: {
      en: en,
      zh: zh,
    },
  })

export const defaultLocale = "zh"

const i18n = i18nForLocale(defaultLocale, true)

export default i18n
