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
  deviceDownloadDebugVersion: " (Debug)",
  deviceDownloadButton: "Скачать",
  downloadTypeUefiFirmware: "UEFI Firmware",
  downloadTypeDatasheet: "Технические характеристики",
  downloadTypeReferenceManual: "Справочное руководство",
  downloadTypeUserManual: "Руководство пользователя",
  downloadTypeSchematicDiagram: "Схематическое изображение",
  downloadTypeSdk: "Набор средств разработки программного обеспечения (SDK)",

  // events/EventAnnouncement*.vue
  // zhBiweekly names the Chinese rendition; enBiweekly names the English/Russian rendition.
  zhBiweeklyAnnouncementHeader:
    'The {number} "LoongArch Biweekly" Meeting Announcement',
  zhBiweeklyArchiveHeader: 'The {number} "LoongArch Biweekly" Meeting Archives',
  enBiweeklyAnnouncementHeader:
    'The {number} "LoongArch Biweekly (EN/RU)" Session Announcement',
  enBiweeklyArchiveHeader:
    'The {number} "LoongArch Biweekly (EN/RU)" Session Archives',
  biweeklyTime: "Meeting Time: {time}{expectedDurationNotice}",
  zhBiweeklyExpectedDurationNotice: " (meeting expected to last an hour)",
  enBiweeklyExpectedDurationNotice: " (session expected to last an hour)",
  zhBiweeklyWemeetLink: "Meeting Link",
  wemeetNumber: "Meeting ID: {number}",
  biweeklySlideLink: "Biweekly Slides",
  biweeklySlideLinkTBU: "Biweekly Slides (to be uploaded)",
  biweeklyLiveLink: "Livestream Link",
  enBiweeklyParticipationNotice:
    "Join the session or follow along with the shared materials:",
  zhBiweeklyNotice:
    "Biweekly slides may be edited {cutoff-notice}. Those who wish to speak or ask questions at the biweekly should finish editing before this time (if you need editing permissions, please apply via Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "until the beginning of the meeting",
  biweeklyArchivalNotice:
    "The meeting has ended, but you can still view materials from the event:",
  enBiweeklyArchivalNotice:
    "The session has ended. Resources from this session:",
  bilibiliLiveArchiveLink: "Bilibili live replay",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Zoom meeting",
  zoomChatLink: "Zoom chat",
  zoomChatArchiveLink: "Zoom chat archive",
  youtubeArchiveLink: "YouTube replay",
  vkArchiveLink: "VK replay",
  eventResourceUnavailable: "{label} (to be announced)",
  eventResourceWip: "{label} (work in progress)",
  enBiweeklyTimezoneShanghai: "China",
  enBiweeklyTimezoneMoscow: "Moscow",
  enBiweeklyTimezoneUSEastern: "US Eastern",
  enBiweeklyTimezoneUSPacific: "US Pacific",

  // events/EventCalendar.vue
  today: "Сегодня",
  eventCalendarEvent: "{title} #{number}",

  // sdk/Detail.vue
  gnuInstall: "GNU Toolchain",
  llvmInstall: "LLVM Toolchain",
  rustInstall: "Rust",
  nodejsInstall: "Node.js",
  golangInstall: "Go",
  pythonInstall: "Python",
  dotnetInstall: ".NET",
  javaInstall: "Java",
  kernelInstall: "Linux Kernel",
  dockerInstall: "Docker",
  cirunnerInstall: "CI Runners",

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
