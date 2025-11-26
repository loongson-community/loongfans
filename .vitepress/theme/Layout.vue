<template>
  <!-- 必须包裹容器 -->
  <div class="vp-doc">
    <div class="main">
      <div class="header_redline"></div>
      <!-- 如果是首页就不渲染子页面头部 -->
      <ChildHeader v-if="$frontmatter.layout !== 'home'" />
      <Content class="body_content" />
    </div>
    <ChildFooter class="footer" />
  </div>
</template>

<script setup>
import ChildHeader from "/components/ChildHeader.vue";
import ChildFooter from "/components/ChildFooter.vue";
</script>

<style type="text/css">
/* #region sticky footer */
html,
body,
#app,
.vp-doc {
  height: 100%;
  margin: 0;
}

.vp-doc {
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}
/* #endregion */

.body_content {
  display: block;
  clear: both;
  width: auto;
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
}

@media (max-width: 1280px) {
  .body_content {
    width: 100%;
    max-width: 100%;
    padding: 0px 30px;
  }
}
</style>
