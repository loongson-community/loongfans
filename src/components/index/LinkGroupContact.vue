<template>
  <LinkGroup :title="$t('contact')">
    <HomePageLink
      :name="$t('aboutBilibiliName')"
      href="https://space.bilibili.com/70360929"
    >
      <IconBilibili />
    </HomePageLink>
    <HomePageLink
      :name="$t('aboutWechatName')"
      qr-link="/images/about/qr-wechat-group.png"
    >
      <IconWechat />
    </HomePageLink>
    <HomePageLink
      :name="$t('aboutQQName')"
      qr-link="/images/about/qr-qq-group.png"
    >
      <IconQq />
    </HomePageLink>
    <HomePageLink
      :name="$t('aboutMatrixName')"
      href="https://matrix.to/#/#loongson-users:matrix.org"
    >
      <IconMatrix />
    </HomePageLink>
    <HomePageLink
      v-if="locale !== 'zh'"
      :name="$t('aboutTelegramName')"
      href="https://t.me/loongson_users"
    >
      <IconTelegram />
    </HomePageLink>
  </LinkGroup>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import IconBilibili from "~icons/simple-icons/bilibili"
import IconWechat from "~icons/simple-icons/wechat"
import IconQq from "~icons/simple-icons/qq"
import IconMatrix from "~icons/simple-icons/matrix"
import IconTelegram from "~icons/simple-icons/telegram"
import HomePageLink from "./HomePageLink.vue"
import LinkGroup from "./LinkGroup.vue"

const { locale } = useI18n()
</script>
