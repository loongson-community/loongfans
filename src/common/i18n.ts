import { createI18n, type DefineDateTimeFormat } from "vue-i18n"

import type { SupportedLanguage } from "@src/types/language"

import de from "./locales/de"
import en from "./locales/en"
import fr from "./locales/fr"
import ru from "./locales/ru"
import zh from "./locales/zh"

export type MessageSchema = typeof zh

// https://github.com/intlify/vue-i18n/issues/717
const datetimeFormats: {
  [key in SupportedLanguage]: DefineDateTimeFormat
} = {
  de: {
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
      hour12: false,
      timeZoneName: "shortOffset",
    },
  },
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
  fr: {
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
      hour12: false,
      timeZoneName: "shortOffset",
    },
  },
  ru: {
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
      hour12: false,
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
  createI18n<[MessageSchema], SupportedLanguage>({
    legacy: false,
    globalInjection,
    locale,
    fallbackLocale: "en",
    datetimeFormats,
    pluralRules: {
      ru: function (choice, choicesLength) {
        if (choice === 0) {
          return 0
        }
        const teen = choice % 100 > 10 && choice % 100 < 20
        const endsWithOne = choice % 10 === 1
        if (choicesLength < 4) {
          return !teen && endsWithOne ? 1 : 2
        }
        if (!teen && endsWithOne) {
          return 1
        }
        if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
          return 2
        }
        return choicesLength < 4 ? 2 : 3
      },
    },
    messages: {
      de: de,
      en: en,
      fr: fr,
      ru: ru,
      zh: zh,
    },
  })

export const defaultLocale = "zh"

const i18n = i18nForLocale(defaultLocale, true)

export default i18n
