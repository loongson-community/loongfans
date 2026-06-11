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
  deviceDownloadChangelog: "Änderungsprotokoll",
  deviceDownloadDebugVersion: " (Debug-Version)",
  deviceDownloadButton: "Download",
  downloadTypeUefiFirmware: "UEFI-Firmware",
  downloadTypeDatasheet: "Datenblatt",
  downloadTypeReferenceManual: "Referenzhandbuch",
  downloadTypeUserManual: "Benutzerhandbuch",
  downloadTypeSchematicDiagram: "Schematisches Diagramm",
  downloadTypeSdk: "SDK",

  // events/EventAnnouncement*.vue
  // zhBiweekly names the Chinese session; enBiweekly names the international session.
  zhBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Ankündigung des ${n}. Treffens „LoongArch Biweekly (chinesische Sitzung)“`
  },
  zhBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Archiv des ${n}. Treffens „LoongArch Biweekly (chinesische Sitzung)“`
  },
  enBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Ankündigung des ${n}. Treffens „LoongArch Biweekly (internationale Sitzung)“`
  },
  enBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Archiv des ${n}. Treffens „LoongArch Biweekly (internationale Sitzung)“`
  },
  biweeklyTime: "Termin: {time}{expectedDurationNotice}",
  zhBiweeklyExpectedDurationNotice:
    " (das Meeting dauert voraussichtlich eine Stunde)",
  enBiweeklyExpectedDurationNotice:
    " (die Sitzung dauert voraussichtlich eine Stunde)",
  zhBiweeklyWemeetLink: "Meeting-Link",
  wemeetNumber: "Meeting-ID: {number}",
  biweeklySlideLink: "Biweekly-Folien",
  biweeklySlideLinkTBU: "Biweekly-Folien (werden noch hochgeladen)",
  biweeklyLiveLink: "Livestream-Link",
  enBiweeklyParticipationNotice:
    "Nehmen Sie an der Sitzung teil oder folgen Sie den geteilten Materialien:",
  zhBiweeklyNotice:
    "Die Biweekly-Folien können {cutoff-notice} bearbeitet werden. Wer im Biweekly sprechen oder Fragen stellen möchte, sollte die Bearbeitung bis dahin abschließen (falls Sie Bearbeitungsrechte benötigen, beantragen Sie diese bitte über Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "bis zum Beginn des Meetings",
  biweeklyArchivalNotice:
    "Das Meeting ist beendet, aber Sie können weiterhin die Materialien der Veranstaltung ansehen:",
  enBiweeklyArchivalNotice:
    "Die Sitzung ist beendet. Ressourcen zu dieser Sitzung:",
  bilibiliLiveArchiveLink: "Bilibili-Livestream-Aufzeichnung",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Zoom-Meeting",
  zoomChatLink: "Zoom-Chat",
  zoomChatArchiveLink: "Zoom-Chatarchiv",
  youtubeArchiveLink: "YouTube-Aufzeichnung",
  vkVideoArchiveLink: "VK-Videoaufzeichnung",
  eventResourceUnavailable: "{label} (wird noch angekündigt)",
  eventResourceWip: "{label} (in Arbeit)",
  enBiweeklyTimezoneShanghai: "China",
  enBiweeklyTimezoneMoscow: "Moskau",
  enBiweeklyTimezoneUSEastern: "US-Ostküste",
  enBiweeklyTimezoneUSPacific: "US-Westküste",

  // events/EventCalendar.vue
  today: "Heute",
  eventCalendarEvent: "{title} Nr. {number}",

  // sdk/Detail.vue
  gnuInstall: "GNU-Werkzeugkette",
  llvmInstall: "LLVM-Werkzeugkette",
  rustInstall: "Rust",
  nodejsInstall: "Node.js",
  golangInstall: "Go",
  pythonInstall: "Python",
  dotnetInstall: ".NET",
  javaInstall: "Java",
  kernelInstall: "Linux-Kernel",
  dockerInstall: "Docker",
  cirunnerInstall: "CI-Runner",

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
