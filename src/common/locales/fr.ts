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
  deviceDownloadDebugVersion: " (débogage)",
  deviceDownloadButton: "Télécharger",
  downloadTypeUefiFirmware: "Micrologiciel UEFI",
  downloadTypeDatasheet: "Fiche technique",
  downloadTypeReferenceManual: "Manuel de référence",
  downloadTypeUserManual: "Manuel d'utilisation",
  downloadTypeSchematicDiagram: "Schéma",
  downloadTypeSdk: "Kit de développement logiciel (SDK)",

  // events/EventAnnouncement*.vue
  // zhBiweekly names the Chinese session; enBiweekly names the international session.
  zhBiweeklyAnnouncementHeader:
    "Annonce de la {number}e réunion « LoongArch Biweekly (session chinoise) »",
  zhBiweeklyArchiveHeader:
    "Archives de la {number}e réunion « LoongArch Biweekly (session chinoise) »",
  enBiweeklyAnnouncementHeader:
    "Annonce de la {number}e réunion « LoongArch Biweekly (session internationale) »",
  enBiweeklyArchiveHeader:
    "Archives de la {number}e réunion « LoongArch Biweekly (session internationale) »",
  biweeklyTime: "Horaire : {time}{expectedDurationNotice}",
  zhBiweeklyExpectedDurationNotice: " (la réunion devrait durer une heure)",
  enBiweeklyExpectedDurationNotice: " (la session devrait durer une heure)",
  zhBiweeklyWemeetLink: "Lien de la réunion",
  wemeetNumber: "ID de réunion : {number}",
  biweeklySlideLink: "Diapositives du Biweekly",
  biweeklySlideLinkTBU: "Diapositives du Biweekly (à téléverser)",
  biweeklyLiveLink: "Lien du direct",
  enBiweeklyParticipationNotice:
    "Participez à la session ou suivez-la avec les documents partagés :",
  zhBiweeklyNotice:
    "Les diapositives du Biweekly peuvent être modifiées {cutoff-notice}. Les personnes qui souhaitent intervenir ou poser des questions pendant le Biweekly doivent terminer leurs modifications avant cette échéance (si vous avez besoin de droits de modification, veuillez les demander via Kingsoft Docs).",
  zhBiweeklyCutoffNotice: "jusqu'au début de la réunion",
  biweeklyArchivalNotice:
    "La réunion est terminée, mais vous pouvez toujours consulter les ressources de l'événement :",
  enBiweeklyArchivalNotice:
    "La session est terminée. Ressources de cette session :",
  bilibiliLiveArchiveLink: "Rediffusion Bilibili",
  googleSlidesLink: "Google Slides",
  zoomMeetingLink: "Réunion Zoom",
  zoomChatLink: "Discussion Zoom",
  zoomChatArchiveLink: "Archive de la discussion Zoom",
  youtubeArchiveLink: "Rediffusion YouTube",
  vkVideoArchiveLink: "Rediffusion VK Video",
  eventResourceUnavailable: "{label} (à annoncer)",
  eventResourceWip: "{label} (en cours)",
  enBiweeklyTimezoneShanghai: "Chine",
  enBiweeklyTimezoneMoscow: "Moscou",
  enBiweeklyTimezoneUSEastern: "Est des États-Unis",
  enBiweeklyTimezoneUSPacific: "Pacifique des États-Unis",

  // events/EventCalendar.vue
  today: "Aujourd'hui",
  eventCalendarEvent: "{title} no {number}",

  // sdk/Detail.vue
  gnuInstall: "Chaîne d'outils GNU",
  llvmInstall: "Chaîne d'outils LLVM",
  rustInstall: "Rust",
  nodejsInstall: "Node.js",
  golangInstall: "Go",
  pythonInstall: "Python",
  dotnetInstall: ".NET",
  javaInstall: "Java",
  kernelInstall: "Noyau Linux",
  dockerInstall: "Docker",
  cirunnerInstall: "Exécuteurs CI",

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
