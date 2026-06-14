import type { Component } from "vue"

import IconBilibili from "~icons/simple-icons/bilibili"
import IconDiscord from "~icons/simple-icons/discord"
import IconGithub from "~icons/simple-icons/github"
import IconMatrix from "~icons/simple-icons/matrix"
import IconQq from "~icons/simple-icons/qq"
import IconTelegram from "~icons/simple-icons/telegram"
import IconVK from "~icons/simple-icons/vk"
import IconWechat from "~icons/simple-icons/wechat"
import IconYoutube from "~icons/simple-icons/youtube"

export interface SocialLink {
  // The key of the platform's name in the locale file
  nameKey: string
  // The key of the platform's description in the locale file, optional
  descKey?: string
  // The URL of the platform
  url: string
  // The URL of the platform's QR code, optional
  qrcodeURL?: string
  // The color for the platform's icon
  color: string
  // The icon component for the platform
  icon: Component
}

// Please keep the list sorted alphabetically by key for easier maintenance
const allSocialLinks: Record<string, SocialLink> = {
  bilibili: {
    nameKey: "aboutBilibiliName",
    descKey: "aboutBilibiliDescription",
    url: "https://space.bilibili.com/70360929",
    color: "#66ccff",
    icon: IconBilibili,
  },
  discord: {
    nameKey: "aboutDiscordName",
    descKey: "aboutDiscordDescription",
    url: "https://discord.gg/aSmKKutF7h",
    color: "#5865F2",
    icon: IconDiscord,
  },
  github: {
    nameKey: "aboutGithubName",
    descKey: "aboutGithubDescription",
    url: "https://github.com/loongson-community",
    color: "#181717",
    icon: IconGithub,
  },
  matrix: {
    nameKey: "aboutMatrixName",
    descKey: "aboutMatrixDescription",
    url: "https://matrix.to/#/#loongson-users:matrix.org",
    color: "#000000",
    icon: IconMatrix,
  },
  qq: {
    nameKey: "aboutQQName",
    descKey: "aboutQQDescription",
    url: "https://qm.qq.com/q/3oZByh8aOA", // scanned from the QR code
    qrcodeURL: "/images/about/qr-qq-group.png",
    color: "#1EBAFC",
    icon: IconQq,
  },
  telegram: {
    nameKey: "aboutTelegramName",
    descKey: "aboutTelegramDescription",
    url: "https://t.me/loongson_users",
    color: "#26A5E4",
    icon: IconTelegram,
  },
  vk: {
    nameKey: "aboutVKName",
    descKey: "aboutVKDescription",
    url: "https://vk.com/loongsonunofficial",
    color: "#0077FF",
    icon: IconVK,
  },
  wechat: {
    nameKey: "aboutWechatName",
    descKey: "aboutWechatDescription",
    url: "https://u.wechat.com/gPYFQQIJPEUImshdRvw1Prs?s=2", // scanned from the QR code
    qrcodeURL: "/images/about/qr-wechat-group.png",
    color: "#07C160",
    icon: IconWechat,
  },
  youtube: {
    nameKey: "aboutYoutubeName",
    descKey: "aboutYoutubeDescription",
    url: "https://www.youtube.com/@loongfans",
    color: "#FF0000",
    icon: IconYoutube,
  },
}

export type SocialLinkKey = keyof typeof allSocialLinks

export type SocialLinkDisplayOrder = SocialLinkKey[]

export type SocialLinkDisplayConfig = Record<string, SocialLinkDisplayOrder>

export function getSocialLinksForLocale(
  locale: string,
  config: SocialLinkDisplayConfig,
): SocialLink[] {
  const order = config[locale] || config[""]
  return order ? order.map((key) => allSocialLinks[key]!) : []
}
