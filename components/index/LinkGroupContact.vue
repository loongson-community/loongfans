<template>
  <LinkGroup :title="$t('contact')">
    <Link
      :name="$t('aboutBilibiliName')"
      href="https://space.bilibili.com/70360929"
    >
      <IconBilibili />
    </Link>
    <Link
      :name="$t('aboutWechatName')"
      qr-link="/images/about/qr-wechat-group.png"
    >
      <IconWechat />
    </Link>
    <Link :name="$t('aboutQQName')" qr-link="/images/about/qr-qq-group.png">
      <IconQq />
    </Link>
    <Link
      :name="$t('aboutMatrixName')"
      href="https://matrix.to/#/#loongson-users:matrix.org"
    >
      <IconMatrix />
    </Link>
    <Link
      v-if="locale !== 'zh'"
      :name="$t('aboutTelegramName')"
      href="https://t.me/loongson_users"
    >
      <IconTelegram />
    </Link>
  </LinkGroup>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import IconBilibili from "~icons/simple-icons/bilibili";
import IconWechat from "~icons/simple-icons/wechat";
import IconQq from "~icons/simple-icons/qq";
import IconMatrix from "~icons/simple-icons/matrix";
import IconTelegram from "~icons/simple-icons/telegram";
import Link from "./Link.vue";
import LinkGroup from "./LinkGroup.vue";

const { locale } = useI18n();
</script>
