export enum SupportedLanguage {
  EN = "en",
  ZH = "zh",
}

export type LocalizedString = { [lang in SupportedLanguage]?: string }
