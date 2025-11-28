<template>
  <div class="card-group">
    <Card
      :name="t('aboutGithubName')"
      :description="t('aboutGithubDescription')"
      href="https://github.com/loongson-community/1024"
      icon="simple-icons:github"
      color="#181717"
    />
    <Card
      :name="t('aboutBilibiliName')"
      :description="t('aboutBilibiliDescription')"
      href="https://space.bilibili.com/70360929"
      icon="simple-icons:bilibili"
      color="#66ccff"
    />
    <Card
      :name="t('aboutWechatName')"
      :description="t('aboutWechatDescription')"
      href="https://u.wechat.com/gPYFQQIJPEUImshdRvw1Prs?s=2"
      icon="simple-icons:wechat"
      color="#07C160"
    />
    <Card
      :name="t('aboutQQName')"
      :description="t('aboutQQDescription')"
      href="https://qm.qq.com/q/3oZByh8aOA"
      icon="simple-icons:qq"
      color="#1EBAFC"
    />
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.card-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.card-group > * {
  width: 100%;
  margin-inline: auto;
}

@media (min-width: 40rem) {
  .card-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .card-group {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 80rem) {
  .card-group {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
