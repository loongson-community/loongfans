import chips from "./de/chips"
import help from "./de/help"
import os from "./de/os"

const pluralRules = new Intl.PluralRules("de", { type: "ordinal" })

export default {
  comma: ", ",
  // Index.vue
  beginnerResources: "Grundlegende Infos",
  introToLoongson: "Lernen Sie Loongson kennen",
  usageGuides: "FAQ & Anleitungen",
  devGuides: "Ressourcen für Entwickler",
  supportMaterials: "Unterstützende Materialien",
  contact: "Kontakt",
  chipsData: "Chipdatenbank",
  operatingSystems: "Betriebssysteme",
  productSpecs: "Produktdatenbank",
  compatibilityDb: "Kompatibilitätsdatenbank",
  communityResources: "Community-Resourcen",
  biweeklyMeeting: "LoongArch Biweekly Meeting",
  jobsAndBounties: "Praktika und Prämien",
  devBoardProgram: "Entwicklerprogramm",
  communityForum: "Community BBS",
  areWeLoongYet: "Are We Loong Yet?",
  loongsonOfficial: "Offizielle Webseiten",
  loongsonTech: "Loongson Home",
  loongsonEco: "LoongEco",
  loongApps: "LoongApps",

  // ChildFooter.vue
  language: "Sprache",
  siteSource: "Quellcode",
  reportIssue: "Feedback",
  aboutCommunity: "Über",
  copyright: "Copyright",
  communityName: "Loongson Hobbyists' Community",

  // ChildHeader.vue
  goBack: "Zurück",

  // CardGroup.vue (about page)
  aboutGithubName: "GitHub",
  aboutGithubDescription: "Community-Projekte & Diskussion",
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription: "Event videos & mehr auf Bilibili",
  aboutWechatName: "WeChat",
  aboutWechatDescription: "Chatte mit uns via WeChat!",
  aboutQQName: "QQ",
  aboutQQDescription: "Bleib in Kontakt via QQ!",
  aboutMatrixName: "Matrix",
  aboutMatrixDescription: "Chatte mit uns via Matrix!",
  aboutTelegramName: "Telegram",
  aboutTelegramDescription: "Chatte mit uns via Telegram!",

  // Device/Detail.vue
  deviceTabSpec: "Spezifikationen",
  deviceTabKnownIssues: "Bekannte Probleme",
  deviceTabImage: "Images",
  deviceTabDownload: "Downloads",
  deviceDownloadVersion: "Version: {version}",
  deviceDownloadChangelog: "Changelog",
  deviceDownloadDebugVersion: " (Debug)",
  deviceDownloadButton: "Download",
  downloadTypeUefiFirmware: "UEFI Firmware",
  downloadTypeDatasheet: "Datenblatt",
  downloadTypeReferenceManual: "Referenzhandbuch",
  downloadTypeUserManual: "Benutzerhandbuch",
  downloadTypeSchematicDiagram: "Schematisches Diagramm",
  downloadTypeSdk: "SDK",

  // events/EventsCalendar.vue
  today: "Heute",
  loongarchBiweekly: "LoongArch Biweekly #{number}",

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
