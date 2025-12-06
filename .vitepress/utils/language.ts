import type { Router } from "vitepress";

export enum SupportedLanguage {
  EN = 'en',
  ZH = 'zh',
}

const SUPPORTED_LANGUAGES = Object.values(SupportedLanguage);

export const LANGUAGE_DISPLAY_NAMES: Record<SupportedLanguage, string> = {
  [SupportedLanguage.EN]: 'English',
  [SupportedLanguage.ZH]: '简体中文'
}

/**
 * 语言路径前缀映射
 * 注意：root locale（中文）的前缀为空字符串
 */
export const LANGUAGE_PREFIXES: Record<SupportedLanguage, string> = {
  [SupportedLanguage.EN]: '/en',
  [SupportedLanguage.ZH]: ''
};

/**
 * VitePress localeIndex 到语言路径前缀的映射
 * localeIndex 为 'root' 表示根语言（中文），为 'en' 表示英文
 */
const LOCALE_INDEX_TO_PREFIX: Record<string, string> = {
  'root': LANGUAGE_PREFIXES[SupportedLanguage.ZH],
  'en': LANGUAGE_PREFIXES[SupportedLanguage.EN]
};

/**
 * 检测浏览器语言并返回对应的语言代码
 */
export function detectBrowserLanguage(lang: string | null): SupportedLanguage {
  if (!lang) {
    return SupportedLanguage.EN;
  }

  for (const value of SUPPORTED_LANGUAGES) {
    if (lang.startsWith(value)) {
      return value
    }
  }

  return SupportedLanguage.EN;
}

const STORAGE_KEY_LANGUAGE = 'loongfansLanguageV1';

/**
 * 获取存储的语言偏好
 */
export function getStoredLanguage(): string | null {
  return localStorage.getItem(STORAGE_KEY_LANGUAGE)
}

/**
 * 存储语言偏好
 */
export function setStoredLanguage(lang: string) {
  localStorage.setItem(STORAGE_KEY_LANGUAGE, lang)
}

/**
 * 根据 VitePress 的 localeIndex 获取语言路径前缀
 * @param localeIndex VitePress useData() 返回的 localeIndex
 * @returns 语言路径前缀，如 '/en' 或 ''
 */
export function getLocalePrefix(localeIndex: string): string {
  return LOCALE_INDEX_TO_PREFIX[localeIndex] || '';
}

/**
 * 根据语言偏好进行首次访问的重定向，只在首次访问时调用
 */
export function handleFirstVisitRedirect(router: Router) {
  let storedLang = getStoredLanguage();
  const targetLang = detectBrowserLanguage(storedLang);

  if (!storedLang) {
    const lang = navigator.language;
    const defaultLang = detectBrowserLanguage(lang);
    setStoredLanguage(defaultLang);
    storedLang = defaultLang;
  }

  router.go(getLocaleUrl(storedLang as SupportedLanguage, router.route.path));
}

/**
 * @param url URL starts with `/`
 */
export function getLocaleUrl(lang: SupportedLanguage, url: string) {
  return LANGUAGE_PREFIXES[lang] + normalizeUrl(url);
}

/**
 * @param url URL starts with `/`
 */
function normalizeUrl(url: string) {
  for (const lang of SUPPORTED_LANGUAGES) {
    const prefix = LANGUAGE_PREFIXES[lang] + "/";
    if (url.startsWith(prefix)) return "/" + url.replace(prefix, "");
    if (url === LANGUAGE_PREFIXES[lang] + ".html") return "/";
  }
}
