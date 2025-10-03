<template>
  <!-- 必须包裹容器 -->
  <div class="vp-doc">
    <div class="header_redline"></div>
    <!-- 如果是首页就不渲染子页面头部 -->
    <ChildHeader v-if="$frontmatter.layout !== 'home'" />
    <div class="body_content">
      <Content />
    </div>
    <!-- 如果是首页则底部始终置底 -->
    <ChildFooter
      :class="{'footer_always_in_bottom': $frontmatter.layout === 'home' ? true : false}"
    />
  </div>
</template>

<script setup>
import ChildHeader from "/components/ChildHeader.vue";
import ChildFooter from "/components/ChildFooter.vue";
</script>

<style type="text/css">
html,
body {
  height: 100%;
  margin: 0;
}

.body_content {
  display: block;
  clear: both;
  width: auto;
  max-width: 1200px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}

.footer_always_in_bottom {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
}

@media (max-width: 1280px) {
  .body_content {
    width: 100%;
    max-width: 100%;
    padding: 0px 30px;
  }
}
</style>
