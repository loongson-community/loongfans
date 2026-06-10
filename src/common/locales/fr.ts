import chips from "./fr/chips"
import help from "./fr/help"
import os from "./fr/os"

export default {
  comma: ", ",
  // Index.vue
  beginnerResources: "Ressources pour débutants",
  introToLoongson: "Découvrez Loongson",
  usageGuides: "Foire aux questions et guides",
  devGuides: "Guide du développeur",
  supportMaterials: "Documents d'accompagnement",
  contact: "Contact",
  chipsData: "Base de données des puces",
  operatingSystems: "Systèmes d'exploitation",
  productSpecs: "Base de données des produits",
  compatibilityDb: "Base de données de compatibilité",
  communityResources: "Ressources communautaires",
  biweeklyMeeting: "Réunion bimensuelle",
  jobsAndBounties: "Stages et bourses",
  devBoardProgram: "Programme pour développeurs",
  communityForum: "Community BBS",
  areWeLoongYet: "Are We Loong Yet?",
  loongsonOfficial: "Sites officiels",
  loongsonTech: "Loongson Home",
  loongsonEco: "LoongEco",
  loongApps: "LoongApps",

  // ChildFooter.vue
  language: "Langue",
  siteSource: "Code source",
  reportIssue: "Commentaires",
  aboutCommunity: "À propos",
  copyright: "Droits d'auteur",
  communityName: "Communauté des amateurs de Loongson",

  // ChildHeader.vue
  goBack: "Retour",

  // CardGroup.vue (about page)
  aboutGithubName: "GitHub",
  aboutGithubDescription: "Projets communautaires et discussions",
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription:
    "Abonnez-vous pour découvrir les vidéos des événements et bien plus encore",
  aboutWechatName: "WeChat",
  aboutWechatDescription: "Discutez avec nous !",
  aboutQQName: "QQ",
  aboutQQDescription: "Discutez avec nous !",
  aboutMatrixName: "Matrix",
  aboutMatrixDescription: "Discutez avec nous !",
  aboutTelegramName: "Telegram",
  aboutTelegramDescription: "Discutez avec nous !",

  // Device/Detail.vue
  deviceTabSpec: "Caractéristiques techniques",
  deviceTabKnownIssues: "Problèmes connus",
  deviceTabImage: "Images",
  deviceTabDownload: "Téléchargements",
  deviceDownloadVersion: "Version: {version}",
  deviceDownloadChangelog: "Journal des modifications",
  deviceDownloadDebugVersion: " (Debug)",
  deviceDownloadButton: "Télécharger",
  downloadTypeUefiFirmware: "UEFI Firmware",
  downloadTypeDatasheet: "Fiche technique",
  downloadTypeReferenceManual: "Manuel de référence",
  downloadTypeUserManual: "Manuel d'utilisation",
  downloadTypeSchematicDiagram: "Schéma",
  downloadTypeSdk: "Kit de développement logiciel (SDK)",

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
  vkVideoArchiveLink: "VK Video replay",
  eventResourceUnavailable: "{label} (to be announced)",
  eventResourceWip: "{label} (work in progress)",
  enBiweeklyTimezoneShanghai: "China",
  enBiweeklyTimezoneMoscow: "Moscow",
  enBiweeklyTimezoneUSEastern: "US Eastern",
  enBiweeklyTimezoneUSPacific: "US Pacific",

  // events/EventCalendar.vue
  today: "Aujourd'hui",
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
    // similar to Chinese the French language does not require a special morphology for ordinal numbers
    if (n === undefined || n === null) return ""
    return n.toString()
  },

  chips,
  help,
  os,
}
