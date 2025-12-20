<template>
  <!-- 必须包裹容器 -->
  <div class="vp-doc">
    <Toast />
    <DynamicDialog />
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
import { onMounted, watch } from 'vue'
import { useData } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vitepress';
import ChildHeader from "/components/ChildHeader.vue";
import ChildFooter from "/components/ChildFooter.vue";
import { handleFirstVisitRedirect } from '../utils/language'
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';

const { lang } = useData()
const { locale } = useI18n()
const router = useRouter()

// 首次访问时自动检测并重定向
onMounted(() => {
  handleFirstVisitRedirect(router)
})

// 同步 VitePress 语言和 vue-i18n locale
watch(lang, () => locale.value = lang.value, { immediate: true })
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
  max-width: var(--content-max-width);
  height: auto;
  margin: 0 auto;
  flex: 1;
}

@media (max-width: 1280px) {
  .body_content {
    width: 100%;
    max-width: 100%;
    padding: 0px 30px;
  }
}
</style>
