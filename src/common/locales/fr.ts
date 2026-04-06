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

  // events/EventsCalendar.vue
  today: "Aujourd'hui",
  loongarchBiweekly: "Réunion bimensuelle #{number}",

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
