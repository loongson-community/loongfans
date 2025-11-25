<template>
  <div class="card-group">
    <Card
      name="GitHub 主页"
      description="社区科技驱动的行星发电机"
      href="https://github.com/loongson-community/1024"
      icon="simple-icons:github"
      color="#181717"
    />
    <Card
      name="BiliBili"
      description="关注最好的龙芯爱好者社区谢谢喵"
      href="https://space.bilibili.com/70360929"
      icon="simple-icons:bilibili"
      color="#66ccff"
    />
    <Card
      name="微信群"
      description="常聊天！"
      icon="simple-icons:wechat"
      qr-link="/images/about/qr-wechat-group.png"
      color="#07C160"
    />
    <Card
      name="QQ 群"
      description="常联系！"
      icon="simple-icons:qq"
      qr-link="/images/about/qr-qq-group.png"
      color="#1EBAFC"
    />
  </div>
</template>

<script setup>
import Card from "./Card.vue";
</script>

<style scoped>
.card-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
  
  /* 临时加点空隙给卡片显示二维码，否则 hover 完要手动滚动一下 */
  margin-block: 32px;
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
