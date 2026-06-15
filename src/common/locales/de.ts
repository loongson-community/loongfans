import chips from "./de/chips"
import help from "./de/help"
import os from "./de/os"

function formatDeOrdinal(n: number, gender?: string, gcase?: string): string {
  // German ordinals are formed by appending a period to the number (e.g. "3.")
  // gender and gcase are accepted per the locale API contract but ignored for DE
  void gender
  void gcase
  return n + "."
}

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
  biweeklyMeeting: "LoongArch Biweekly", // deliberately in English for consistent branding in non-ZH locales
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
  // Please keep the list sorted alphabetically by key for easier maintenance
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription: "Event videos & mehr auf Bilibili",
  aboutDiscordName: "Discord Server",
  aboutDiscordDescription: "Chatte über LoongArch's GGWP!",
  aboutGithubName: "GitHub",
  aboutGithubDescription: "Community-Projekte & Diskussion",
  aboutMatrixName: "Matrix",
  aboutMatrixDescription: "Komm zum Chatten!",
  aboutQQName: "QQ",
  aboutQQDescription: "Bleib in Kontakt via QQ!",
  aboutTelegramName: "Telegram",
  aboutTelegramDescription: "-.. .- -.... ....-", // "LA64" in Morse code
  aboutVKName: "VK",
  aboutVKDescription: "На связи!", // deliberately in Russian for all locales
  aboutWechatName: "WeChat",
  aboutWechatDescription: "Chatte mit uns via WeChat!",
  aboutYoutubeName: "YouTube",
  aboutYoutubeDescription:
    "Internationale Spiegelung unserer Bilibili-Inhalte?",

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
  // zhBiweekly names the Chinese session; intlBiweekly names the international session.
  zhBiweeklyEventTitle: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `LoongArch Biweekly (chinesische Sitzung) #${n}`
  },
  intlBiweeklyEventTitle: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `LoongArch Biweekly (internationale Sitzung) #${n}`
  },
  zhBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Ankündigung des ${formatDeOrdinal(n, "n", "gen")} Treffens „LoongArch Biweekly (chinesische Sitzung)“`
  },
  zhBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Archiv des ${formatDeOrdinal(n, "n", "gen")} Treffens „LoongArch Biweekly (chinesische Sitzung)“`
  },
  intlBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Ankündigung des ${formatDeOrdinal(n, "n", "gen")} Treffens „LoongArch Biweekly (internationale Sitzung)“`
  },
  intlBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `Archiv des ${formatDeOrdinal(n, "n", "gen")} Treffens „LoongArch Biweekly (internationale Sitzung)“`
  },
  biweeklyTime: "Termin: ",
  zhBiweeklyExpectedDurationNotice:
    " (das Meeting dauert voraussichtlich eine Stunde)",
  intlBiweeklyExpectedDurationNotice:
    " (das Meeting dauert voraussichtlich eine Stunde)",
  zhBiweeklyWemeetLink: "Meeting-Link",
  wemeetNumber: "Meeting-ID: {number}",
  biweeklySlideLink: "Biweekly-Folien",
  biweeklySlideLinkTBU: "Biweekly-Folien (werden noch hochgeladen)",
  biweeklyLiveLink: "Livestream-Link",
  intlBiweeklyParticipationNotice:
    "Nehmen Sie an dem Meeting teil oder folgen Sie den geteilten Materialien:",
  zhBiweeklyNotice:
    "Die Biweekly-Folien können {cutoff-notice} bearbeitet werden. Wer im Biweekly sprechen oder Fragen stellen möchte, sollte die Bearbeitung bis dahin abschließen (falls Sie Bearbeitungsrechte benötigen, beantragen Sie diese bitte über Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "bis zum Beginn des Meetings",
  biweeklyArchivalNotice:
    "Das Meeting ist beendet, aber Sie können weiterhin die Materialien der Veranstaltung ansehen:",
  bilibiliLiveArchiveLink: "Bilibili-Livestream-Aufzeichnung",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Zoom-Meeting",
  zoomChatLink: "Zoom-Chat",
  zoomChatArchiveLink: "Zoom-Chatarchiv",
  youtubeArchiveLink: "YouTube-Aufzeichnung",
  vkVideoArchiveLink: "VK-Videoaufzeichnung",
  eventResourceUnavailable: "{label} (wird noch angekündigt)",
  eventResourceWip: "{label} (in Arbeit)",

  // events/EventCalendar.vue
  today: "Heute",

  // events/TZAwareDateTimeList.vue
  yourTimezone: "Ihre Zeitzone",

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
    if (n === undefined || n === null) return ""
    return formatDeOrdinal(n)
  },

  chips,
  help,
  os,
}
