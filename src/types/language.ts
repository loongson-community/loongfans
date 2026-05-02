export enum SupportedLanguage {
  DE = "de",
  EN = "en",
  FR = "fr",
  RU = "ru",
  ZH = "zh",
}

export type LocalizedString = { [lang in SupportedLanguage]?: string }
