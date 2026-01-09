<template>
  <div class="card-group">
    <Card
      v-for="item in cardDataMap[locale]"
      :key="item.name"
      :name="item.name"
      :description="item.description"
      :href="item.href"
      :qr-link="item.qrLink"
      :color="item.color"
    >
      <component :is="item.icon" />
    </Card>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import Card from "./Card.vue"
import IconGithub from "~icons/simple-icons/github"
import IconBilibili from "~icons/simple-icons/bilibili"
import IconWechat from "~icons/simple-icons/wechat"
import IconQq from "~icons/simple-icons/qq"
import IconMatrix from "~icons/simple-icons/matrix"
import IconTelegram from "~icons/simple-icons/telegram"

const { t, locale } = useI18n()

const cardData = {
  github: {
    name: t("aboutGithubName"),
    description: t("aboutGithubDescription"),
    href: "https://github.com/loongson-community/1024",
    color: "#181717",
    icon: IconGithub,
  },
  bilibili: {
    name: t("aboutBilibiliName"),
    description: t("aboutBilibiliDescription"),
    href: "https://space.bilibili.com/70360929",
    color: "#66ccff",
    icon: IconBilibili,
  },
  wechat: {
    name: t("aboutWechatName"),
    description: t("aboutWechatDescription"),
    qrLink: "/images/about/qr-wechat-group.png",
    color: "#07C160",
    icon: IconWechat,
  },
  qq: {
    name: t("aboutQQName"),
    description: t("aboutQQDescription"),
    qrLink: "/images/about/qr-qq-group.png",
    color: "#1EBAFC",
    icon: IconQq,
  },
  matrix: {
    name: t("aboutMatrixName"),
    description: t("aboutMatrixDescription"),
    href: "https://matrix.to/#/#loongson-users:matrix.org",
    color: "#000000",
    icon: IconMatrix,
  },
  telegram: {
    name: t("aboutTelegramName"),
    description: t("aboutTelegramDescription"),
    href: "https://t.me/loongson_users",
    color: "#26A5E4",
    icon: IconTelegram,
  },
}

const cardDataMap = {
  zh: ["github", "bilibili", "wechat", "qq", "matrix"].map((i) => cardData[i]),
  en: ["github", "bilibili", "telegram", "matrix", "wechat", "qq"].map(
    (i) => cardData[i],
  ),
}
</script>

<style scoped>
.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.card-group > * {
  width: 300px;
}
</style>
