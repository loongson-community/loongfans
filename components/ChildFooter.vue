<template>
    <div class="child_footer_info">
    <div class="child_footer_link">
      <a href="https://github.com/loongson-community/loongfans" target="_blank">{{ i18n.siteSource }}</a>
      <span>|</span>
      <a href="https://github.com/loongson-community/loongfans/issues/new" target="_blank">{{ i18n.reportIssue }}</a>
      <span>|</span>
      <a :href="`${basePath}/pages/about`">{{ i18n.aboutCommunity }}</a>
    </div>

    <div class="copyright_info">
      <span>{{ i18n.copyright }} &copy; 2024-{{ copyrightYear }} {{ i18n.communityName }}</span>
      <a href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2022017735号-12</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useData } from 'vitepress';

const { lang } = useData();
const isEnglish = computed(() => lang.value === 'en');

let year = new Date().getFullYear();
const copyrightYear = ref(year);

// i18n text
const i18n = computed(() => {
  if (isEnglish.value) {
    return {
      siteSource: 'Site Source',
      reportIssue: 'Report Issue',
      aboutCommunity: "About Loongson Hobbyists' Community",
      copyright: 'Copyright',
      communityName: "Loongson Hobbyists' Community"
    };
  } else {
    return {
      siteSource: '站点源码',
      reportIssue: '报告问题',
      aboutCommunity: '关于龙芯爱好者社区',
      copyright: '版权所有',
      communityName: '龙芯爱好者社区'
    };
  }
});

// Computed base path for links
const basePath = computed(() => isEnglish.value ? '/en' : '');
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