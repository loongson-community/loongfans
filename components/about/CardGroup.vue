<template>
  <div class="card-group">
    <Card
      :name="t('aboutGithubName')"
      :description="t('aboutGithubDescription')"
      href="https://github.com/loongson-community/1024"
      color="#181717"
    >
      <IconGithub />
    </Card>
    <Card
      :name="t('aboutBilibiliName')"
      :description="t('aboutBilibiliDescription')"
      href="https://space.bilibili.com/70360929"
      color="#66ccff"
    >
      <IconBilibili />
    </Card>
    <Card
      :name="t('aboutWechatName')"
      :description="t('aboutWechatDescription')"
      qr-link="/images/about/qr-wechat-group.png"
      color="#07C160"
    >
      <IconWechat />
    </Card>
    <Card
      :name="t('aboutQQName')"
      :description="t('aboutQQDescription')"
      qr-link="/images/about/qr-qq-group.png"
      color="#1EBAFC"
    >
      <IconQq />
    </Card>
    <Card
      :name="t('aboutMatrixName')"
      :description="t('aboutMatrixDescription')"
      href="https://matrix.to/#/#loongson-users:matrix.org"
      color="#000000"
    >
      <IconMatrix />
    </Card>
    <Card
      v-if="locale !== 'zh'"
      :name="t('aboutTelegramName')"
      :description="t('aboutTelegramDescription')"
      href="https://t.me/loongson_users"
      color="#26A5E4"
    >
      <IconTelegram />
    </Card>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Card from "./Card.vue";
import IconGithub from "~icons/simple-icons/github";
import IconBilibili from "~icons/simple-icons/bilibili";
import IconWechat from "~icons/simple-icons/wechat";
import IconQq from "~icons/simple-icons/qq";
import IconMatrix from "~icons/simple-icons/matrix";
import IconTelegram from "~icons/simple-icons/telegram"

const { t, locale } = useI18n();
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
