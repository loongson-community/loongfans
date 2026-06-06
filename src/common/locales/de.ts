import chips from "./de/chips"
import help from "./de/help"
import os from "./de/os"

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
  deviceTabImage: "Bilder",
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
  today: "Heute",
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
    // similar to Chinese the German language does not require a special morphology for ordinal numbers
    if (n === undefined || n === null) return ""
    return n.toString()
  },

  chips,
  help,
  os,
}
