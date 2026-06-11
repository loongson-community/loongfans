import chips from "./ru/chips"
import help from "./ru/help"
import os from "./ru/os"

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
  biweeklyMeeting: "Заседание, проводимое раз в две недели",
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
  aboutGithubName: "GitHub",
  aboutGithubDescription: "Общественные проекты и дискуссии",
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription:
    "Подписывайтесь, чтобы смотреть видео с мероприятий и многое другое",
  aboutWechatName: "WeChat",
  aboutWechatDescription: "Напишите нам!",
  aboutQQName: "QQ",
  aboutQQDescription: "Оставайтесь на связи!",
  aboutMatrixName: "Matrix",
  aboutMatrixDescription: "Напишите нам!",
  aboutTelegramName: "Telegram",
  aboutTelegramDescription: "Напишите нам!",

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
  // zhBiweekly names the Chinese session; enBiweekly names the international session.
  zhBiweeklyAnnouncementHeader:
    "Анонс {number}-й встречи «LoongArch Biweekly (китайская сессия)»",
  zhBiweeklyArchiveHeader:
    "Архив {number}-й встречи «LoongArch Biweekly (китайская сессия)»",
  enBiweeklyAnnouncementHeader:
    "Анонс {number}-й сессии «LoongArch Biweekly (международная сессия)»",
  enBiweeklyArchiveHeader:
    "Архив {number}-й сессии «LoongArch Biweekly (международная сессия)»",
  biweeklyTime: "Время встречи: {time}{expectedDurationNotice}",
  zhBiweeklyExpectedDurationNotice:
    " (встреча, как ожидается, продлится один час)",
  enBiweeklyExpectedDurationNotice:
    " (сессия, как ожидается, продлится один час)",
  zhBiweeklyWemeetLink: "Ссылка на встречу",
  wemeetNumber: "ID встречи: {number}",
  biweeklySlideLink: "Слайды Biweekly",
  biweeklySlideLinkTBU: "Слайды Biweekly (будут загружены позже)",
  biweeklyLiveLink: "Ссылка на трансляцию",
  enBiweeklyParticipationNotice:
    "Присоединяйтесь к сессии или следите за ней по общим материалам:",
  zhBiweeklyNotice:
    "Слайды Biweekly можно редактировать {cutoff-notice}. Тем, кто хочет выступить или задать вопросы на Biweekly, следует завершить правки до этого времени (если вам нужны права на редактирование, запросите их через Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "до начала встречи",
  biweeklyArchivalNotice:
    "Встреча завершена, но вы всё ещё можете просмотреть материалы мероприятия:",
  enBiweeklyArchivalNotice: "Сессия завершена. Материалы этой сессии:",
  bilibiliLiveArchiveLink: "Запись трансляции Bilibili",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Встреча Zoom",
  zoomChatLink: "Чат Zoom",
  zoomChatArchiveLink: "Архив чата Zoom",
  youtubeArchiveLink: "Запись YouTube",
  vkVideoArchiveLink: "Запись VK Video",
  eventResourceUnavailable: "{label} (будет объявлено позже)",
  eventResourceWip: "{label} (в работе)",
  enBiweeklyTimezoneShanghai: "Китай",
  enBiweeklyTimezoneMoscow: "Москва",
  enBiweeklyTimezoneUSEastern: "Восточное время США",
  enBiweeklyTimezoneUSPacific: "Тихоокеанское время США",

  // events/EventCalendar.vue
  today: "Сегодня",
  eventCalendarEvent: "{title} № {number}",

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
    // similar to Chinese the Russian language does not require a special morphology for ordinal numbers
    if (n === undefined || n === null) return ""
    return n.toString()
  },
  chips,
  help,
  os,
}
