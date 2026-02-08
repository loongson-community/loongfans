import chips from "./zh/chips"
import help from "./zh/help"
import os from "./zh/os"

export default {
  comma: "、",
  // Index.vue
  beginnerResources: "新手资源",
  introToLoongson: "初识龙芯",
  usageGuides: "玩机及踩坑指南",
  devGuides: "开发者指南",
  supportMaterials: "支持材料",
  contact: "联系我们",
  chipsData: "芯片规格数据库",
  productSpecs: "产品规格数据库",
  operatingSystems: "操作系统",
  compatibilityDb: "软硬件兼容性数据库",
  communityResources: "社区资源",
  biweeklyMeeting: "龙架构双周会",
  jobsAndBounties: "悬赏与实习机会",
  devBoardProgram: "开发板漂流计划",
  communityForum: "爱好者社区论坛",
  areWeLoongYet: "咱龙了吗？",
  loongsonOfficial: "龙芯官方",
  loongsonTech: "龙芯中科官网",
  loongsonEco: "龙芯生态平台",
  loongApps: "龙芯应用合作社",

  // ChildFooter.vue
  language: "语言",
  siteSource: "站点源码",
  reportIssue: "报告问题",
  aboutCommunity: "关于社区",
  copyright: "版权所有",
  communityName: "龙芯爱好者社区",

  // ChildHeader.vue
  goBack: "返回上级",

  // CardGroup.vue (about page)
  aboutGithubName: "GitHub 主页",
  aboutGithubDescription: "社区科技驱动的行星发电机",
  aboutBilibiliName: "Bilibili",
  aboutBilibiliDescription: "关注最好的龙芯爱好者社区谢谢喵",
  aboutWechatName: "微信群",
  aboutWechatDescription: "常聊天！",
  aboutQQName: "QQ 群",
  aboutQQDescription: "常联系！",
  aboutMatrixName: "Matrix 群",
  aboutMatrixDescription: "常闲聊！",
  aboutTelegramName: "Telegram 群",
  aboutTelegramDescription: "常发电报！",

  // Device/Detail.vue
  deviceTabSpec: "主要规格",
  deviceTabKnownIssues: "已知问题",
  deviceTabImage: "产品图片",
  deviceTabDownload: "文件下载",
  deviceDownloadVersion: "版本号：{version}",
  deviceDownloadChangelog: "更改日志",
  deviceDownloadDebugVersion: "（调试版）",
  deviceDownloadButton: "下载",
  downloadTypeUefiFirmware: "UEFI 固件",
  downloadTypeDatasheet: "数据手册",
  downloadTypeReferenceManual: "参考手册",
  downloadTypeUserManual: "用户手册",
  downloadTypeSchematicDiagram: "原理图",
  downloadTypeSdk: "SDK",

  // events/EventsCalendar.vue
  today: "今天",
  loongarchBiweekly: "龙架构双周会（第 {number} 次）",

  // sdk/Detail.vue
  gnuInstall: "GNU 工具链",
  llvmInstall: "LLVM 工具链",
  rustInstall: "Rust",
  nodejsInstall: "Node.js",
  golangInstall: "Go",
  pythonInstall: "Python",
  dotnetInstall: ".NET",
  javaInstall: "Java",
  kernelInstall: "Linux 内核",
  dockerInstall: "Docker",
  cirunnerInstall: "CI 代理 (Runner)",

  // Utilities
  ordinalNumber: ({ n }: { n: number }): string => {
    // Chinese has no special morphology for ordinal numbers
    if (n === undefined || n === null) return ""
    return n.toString()
  },

  chips,
  help,
  os,
}
