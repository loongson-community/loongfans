<template>
  <div class="card-group">
    <Card
      name="GitHub 主页"
      description="社区科技驱动的行星发电机"
      href="https://github.com/loongson-community/1024"
      color="#181717"
    >
      <IconGithub />
    </Card>
    <Card
      name="BiliBili"
      description="关注最好的龙芯爱好者社区谢谢喵"
      href="https://space.bilibili.com/70360929"
      color="#66ccff"
    >
      <IconBilibili />
    </Card>
    <Card
      name="微信群"
      description="常聊天！"
      qr-link="/images/about/qr-wechat-group.png"
      color="#07C160"
    >
      <IconWechat />
    </Card>
    <Card
      name="QQ 群"
      description="常联系！"
      qr-link="/images/about/qr-qq-group.png"
      color="#1EBAFC"
    >
      <IconQq />
    </Card>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import IconGithub from "~icons/simple-icons/github";
import IconBilibili from "~icons/simple-icons/bilibili";
import IconWechat from "~icons/simple-icons/wechat";
import IconQq from "~icons/simple-icons/qq";
</script>

<style scoped>
.card-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
  margin-block: 16px;
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
