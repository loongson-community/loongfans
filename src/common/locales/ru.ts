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
  communityName: "Сообщество энтузиястов Loongson",

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
  deviceTabImage: "Images",
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

  // events/EventsCalendar.vue
  today: "Сегодня",
  loongarchBiweekly: "Заседание #{number}",

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
    // Chinese has no special morphology for ordinal numbers
    if (n === undefined || n === null) return ""
    return n.toString()
  },
  chips,
  help,
  os,
}
