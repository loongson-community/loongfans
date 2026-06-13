import chips from "./en/chips"
import help from "./en/help"
import os from "./en/os"

const pluralRules = new Intl.PluralRules("en", { type: "ordinal" })

function formatEnOrdinal(n: number): string {
  switch (pluralRules.select(n)) {
    case "one":
      return n + "st"
    case "two":
      return n + "nd"
    case "few":
      return n + "rd"
    default:
      return n + "th"
  }
}

export default {
  comma: ", ",
  // Index.vue
  beginnerResources: "Loongson 101",
  introToLoongson: "Meeting Loongson",
  usageGuides: "FAQ & Guides",
  devGuides: "Developer's Guide",
  supportMaterials: "Support Materials",
  contact: "Contact",
  chipsData: "Chips Database",
  operatingSystems: "Operating Systems",
  productSpecs: "Product Database",
  compatibilityDb: "Loong 1-2-3",
  communityResources: "Community Resources",
  biweeklyMeeting: "LoongArch Biweekly",
  jobsAndBounties: "Internships & Bounties",
  devBoardProgram: "Roaming Loongson",
  communityForum: "Community BBS",
  areWeLoongYet: "Are We Loong Yet?",
  loongsonOfficial: "Official Sites",
  loongsonTech: "Loongson Home",
  loongsonEco: "LoongEco",
  loongApps: "LoongApps",

  // ChildFooter.vue
  language: "Language",
  siteSource: "Sources",
  reportIssue: "Feedback",
  aboutCommunity: "About",
  copyright: "Copyright",
  communityName: "Loongson Hobbyists' Community",

  // ChildHeader.vue
  goBack: "Go Back",

  // CardGroup.vue (about page)
  aboutGithubName: "GitHub",
  aboutGithubDescription: "Community projects and discussions",
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription: "Follow for event videos and more",
  aboutWechatName: "WeChat",
  aboutWechatDescription: "Chat with us!",
  aboutQQName: "QQ",
  aboutQQDescription: "Keep in touch!",
  aboutMatrixName: "Matrix",
  aboutMatrixDescription: "Hang out and chat on Matrix!",
  aboutTelegramName: "Telegram",
  aboutTelegramDescription: "Telegram with us!",

  // Device/Detail.vue
  deviceTabSpec: "Specifications",
  deviceTabKnownIssues: "Known Issues",
  deviceTabImage: "Images",
  deviceTabDownload: "Downloads",
  deviceDownloadVersion: "Version: {version}",
  deviceDownloadChangelog: "Changelog",
  deviceDownloadDebugVersion: " (Debug)",
  deviceDownloadButton: "Download",
  downloadTypeUefiFirmware: "UEFI Firmware",
  downloadTypeDatasheet: "Datasheet",
  downloadTypeReferenceManual: "Reference Manual",
  downloadTypeUserManual: "User Manual",
  downloadTypeSchematicDiagram: "Schematic Diagram",
  downloadTypeSdk: "SDK",

  // events/EventAnnouncement*.vue
  // zhBiweekly names the Chinese session; intlBiweekly names the international session.
  zhBiweeklyEventTitle: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `LoongArch Biweekly (Chinese session) #${n}`
  },
  intlBiweeklyEventTitle: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `LoongArch Biweekly (Int'l session) #${n}`
  },
  zhBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `The ${formatEnOrdinal(n)} "LoongArch Biweekly (Chinese session)" Meeting Announcement`
  },
  zhBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `The ${formatEnOrdinal(n)} "LoongArch Biweekly (Chinese session)" Meeting Archives`
  },
  intlBiweeklyAnnouncementHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `The ${formatEnOrdinal(n)} "LoongArch Biweekly (International session)" Meeting Announcement`
  },
  intlBiweeklyArchiveHeader: ({
    named,
  }: {
    named: (name: string) => unknown
  }): string => {
    const n = named("n") as number
    return `The ${formatEnOrdinal(n)} "LoongArch Biweekly (International session)" Meeting Archives`
  },
  biweeklyTime: "Meeting Time: ",
  zhBiweeklyExpectedDurationNotice: " (meeting expected to last an hour)",
  intlBiweeklyExpectedDurationNotice: " (meeting expected to last an hour)",
  zhBiweeklyWemeetLink: "Meeting Link",
  wemeetNumber: "Meeting ID: {number}",
  biweeklySlideLink: "Biweekly Slides",
  biweeklySlideLinkTBU: "Biweekly Slides (to be uploaded)",
  biweeklyLiveLink: "Livestream Link",
  intlBiweeklyParticipationNotice:
    "Join the meeting or follow along with the shared materials:",
  zhBiweeklyNotice:
    "Biweekly slides may be edited {cutoff-notice}. Those who wish to speak or ask questions at the biweekly should finish editing before this time (if you need editing permissions, please apply via Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "until the beginning of the meeting",
  biweeklyArchivalNotice:
    "The meeting has ended, but you can still view materials from the event:",
  bilibiliLiveArchiveLink: "Bilibili live replay",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Zoom meeting",
  zoomChatLink: "Zoom chat",
  zoomChatArchiveLink: "Zoom chat archive",
  youtubeArchiveLink: "YouTube replay",
  vkVideoArchiveLink: "VK Video replay",
  eventResourceUnavailable: "{label} (to be announced)",
  eventResourceWip: "{label} (work in progress)",

  // events/EventCalendar.vue
  today: "Today",

  // events/TZAwareDateTimeList.vue
  systemTimezone: "System timezone",

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
    if (n === undefined || n === null) return ""
    return formatEnOrdinal(n)
  },

  chips,
  help,
  os,
}
