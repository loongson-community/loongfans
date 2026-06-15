import chips from "./ru/chips"
import help from "./ru/help"
import os from "./ru/os"

const ruOrdinalSuffixes: Record<string, Record<string, string>> = {
  m: { nom: "-й", gen: "-го", dat: "-му", acc: "-й", ins: "-м", pre: "-м" },
  f: { nom: "-я", gen: "-й", dat: "-й", acc: "-ю", ins: "-й", pre: "-й" },
  n: { nom: "-е", gen: "-го", dat: "-му", acc: "-е", ins: "-м", pre: "-м" },
}

// Russian ordinals use a gender (m/f/n) × case (nom/gen/dat/acc/ins/pre) suffix table
function formatRuOrdinal(n: number, gender: string, gcase: string): string {
  const suffix = ruOrdinalSuffixes[gender]?.[gcase]
  if (!suffix) return n.toString()
  return n + suffix
}

export default {
  comma: ", ",
  // Index.vue
  beginnerResources: "Основная информация",
  introToLoongson: "Познакомьтесь с Loongson",
  usageGuides: "Часто задаваемые вопросы и инструкции",
  devGuides: "Руководство для разработчиков",
  supportMaterials: "Вспомогательные материалы",
  contact: "Контакты",
  chipsData: "База данных микросхем",
  operatingSystems: "Операционные системы",
  productSpecs: "База данных продуктов",
  compatibilityDb: "База данных совместимости",
  communityResources: "Ресурсы сообщества",
  biweeklyMeeting: "LoongArch Biweekly", // deliberately in English for consistent branding in non-ZH locales
  jobsAndBounties: "Стажировки и вознаграждения",
  devBoardProgram: "Программа для разработчиков",
  communityForum: "Community BBS",
  areWeLoongYet: "Are We Loong Yet?",
  loongsonOfficial: "Официальные сайты",
  loongsonTech: "Loongson Home",
  loongsonEco: "LoongEco",
  loongApps: "LoongApps",

  // ChildFooter.vue
  language: "Язык",
  siteSource: "исходный код",
  reportIssue: "Отзывы",
  aboutCommunity: "О нас",
  copyright: "Авторские права",
  communityName: "Сообщество энтузиастов Loongson",

  // ChildHeader.vue
  goBack: "Вернуться",

  // CardGroup.vue (about page)
  // Please keep the list sorted alphabetically by key for easier maintenance
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription:
    "Подписывайтесь, чтобы смотреть видео с мероприятий и многое другое",
  aboutDiscordName: "Discord-сервер",
  aboutDiscordDescription: "Обсуждайте GGWP LoongArch!",
  aboutGithubName: "GitHub",
  aboutGithubDescription: "Общественные проекты и дискуссии",
  aboutMatrixName: "Matrix",
  aboutMatrixDescription: "Приходите пообщаться!",
  aboutQQName: "QQ",
  aboutQQDescription: "Оставайтесь на связи!",
  aboutTelegramName: "Telegram",
  aboutTelegramDescription: "-.. .- -.... ....-", // "LA64" in Morse code
  aboutVKName: "VK",
  aboutVKDescription: "На связи!", // deliberately in Russian for all locales
  aboutWechatName: "WeChat",
  aboutWechatDescription: "Напишите нам!",
  aboutYoutubeName: "YouTube",
  aboutYoutubeDescription:
    "Международный ретранслятор наших видео на Bilibili?",

  // Device/Detail.vue
  deviceTabSpec: "Технические характеристики",
  deviceTabKnownIssues: "Известные проблемы",
  deviceTabImage: "Изображения",
  deviceTabDownload: "Загрузки",
  deviceDownloadVersion: "Версия: {version}",
  deviceDownloadChangelog: "Журнал изменений",
  deviceDownloadDebugVersion: " (отладочная версия)",
  deviceDownloadButton: "Скачать",
  downloadTypeUefiFirmware: "Прошивка UEFI",
  downloadTypeDatasheet: "Технические характеристики",
  downloadTypeReferenceManual: "Справочное руководство",
  downloadTypeUserManual: "Руководство пользователя",
  downloadTypeSchematicDiagram: "Схематическое изображение",
  downloadTypeSdk: "Набор средств разработки программного обеспечения (SDK)",

  // events/EventAnnouncement*.vue
  // zhBiweekly names the Chinese session; intlBiweekly names the international session.
  zhBiweeklyEventTitle: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `LoongArch Biweekly (китайская сессия) #${n}`
  },
  intlBiweeklyEventTitle: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `LoongArch Biweekly (международная сессия) #${n}`
  },
  zhBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Анонс ${formatRuOrdinal(n, "f", "gen")} встречи «LoongArch Biweekly (китайская сессия)»`
  },
  zhBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Архив ${formatRuOrdinal(n, "f", "gen")} встречи «LoongArch Biweekly (китайская сессия)»`
  },
  intlBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Анонс ${formatRuOrdinal(n, "f", "gen")} встречи «LoongArch Biweekly (международная сессия)»`
  },
  intlBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Архив ${formatRuOrdinal(n, "f", "gen")} встречи «LoongArch Biweekly (международная сессия)»`
  },
  biweeklyTime: "Время встречи: ",
  zhBiweeklyExpectedDurationNotice:
    " (встреча, как ожидается, продлится один час)",
  intlBiweeklyExpectedDurationNotice:
    " (встреча, как ожидается, продлится один час)",
  zhBiweeklyWemeetLink: "Ссылка на встречу",
  wemeetNumber: "ID встречи: {number}",
  biweeklySlideLink: "Слайды Biweekly",
  biweeklySlideLinkTBU: "Слайды Biweekly (будут загружены позже)",
  biweeklyLiveLink: "Ссылка на трансляцию",
  intlBiweeklyParticipationNotice:
    "Присоединяйтесь к встрече или следите за ней по общим материалам:",
  zhBiweeklyNotice:
    "Слайды Biweekly можно редактировать {cutoff-notice}. Тем, кто хочет выступить или задать вопросы на Biweekly, следует завершить правки до этого времени (если вам нужны права на редактирование, запросите их через Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "до начала встречи",
  biweeklyArchivalNotice:
    "Встреча завершена, но вы всё ещё можете просмотреть материалы мероприятия:",
  bilibiliLiveArchiveLink: "Запись трансляции Bilibili",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Встреча Zoom",
  zoomChatLink: "Чат Zoom",
  zoomChatArchiveLink: "Архив чата Zoom",
  youtubeArchiveLink: "Запись YouTube",
  vkVideoArchiveLink: "Запись VK Video",
  eventResourceUnavailable: "{label} (будет объявлено позже)",
  eventResourceWip: "{label} (в работе)",

  // events/EventCalendar.vue
  today: "Сегодня",

  // events/TZAwareDateTimeList.vue
  yourTimezone: "Ваша временная зона",

  // sdk/Detail.vue
  gnuInstall: "Набор инструментов GNU",
  llvmInstall: "Набор инструментов LLVM",
  rustInstall: "Rust",
  nodejsInstall: "Node.js",
  golangInstall: "Go",
  pythonInstall: "Python",
  dotnetInstall: ".NET",
  javaInstall: "Java",
  kernelInstall: "Ядро Linux",
  dockerInstall: "Docker",
  cirunnerInstall: "CI-раннеры",

  // Utilities
  ordinalNumber: ({ named }: { named: (name: string) => unknown }): string => {
    const n = named("n") as number
    if (n === undefined || n === null) return ""
    return formatRuOrdinal(n, "n", "nom")
  },
  chips,
  help,
  os,
}
