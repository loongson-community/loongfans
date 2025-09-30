<template>
    <div class="child_footer_info">
    <div class="child_footer_link">
      <a href="https://github.com/loongson-community/loongfans" target="_blank">站点源码</a>
      <span>|</span>
      <a href="https://github.com/loongson-community/loongfans/issues/new" target="_blank">报告问题</a>
      <span>|</span>
      <a href="/pages/about">关于龙芯爱好者社区</a>
    </div>

    <div class="copyright_info">
      <span>版权所有 &copy; 2024-{{ copyrightYear }} 龙芯爱好者社区</span>
      <a href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2022017735号-12</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let year = new Date().getFullYear();
const copyrightYear = ref(year);
</script>

<style scoped>
.child_footer_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  clear: both;
  width: auto;
  max-width: 1200px;
  height: auto;
  line-height: 30px;
  overflow: hidden;
  margin: 0px auto;
  margin-top: 60px;
  padding-bottom: 10px;
}

.child_footer_link,
.copyright_info {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: auto;
  line-height: 30px;
  overflow: hidden;
  font-size: 16px;
  color: #000000;
}

.child_footer_info a {
  font-size: 16px;
  color: #000000;
  text-decoration: none;
}

.child_footer_info a:hover {
  color: #e60013;
}
/*响应式处理-开始*/
@media (max-width: 1200px) {
  .child_footer_info {
    width: 100%;
    max-width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }
}
@media (max-width: 750px) {
  .child_footer_info {
    flex-direction: column;
    justify-content: center;
    line-height: 30px;
    font-size: 14px;
    gap: 0;
    padding: 10px;
  }

  .child_footer_info a {
    font-size: 14px;
  }
  .copyright_info {
    flex-direction: column;
    justify-content: center;
    gap: 0;
    line-height: 30px;
    font-size: 14px;
  }
}
</style>