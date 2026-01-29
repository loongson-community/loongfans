<template>
  <div class="header_box">
    <div class="page_body">
      <div class="main_title">
        <h1>{{ frontmatter.pageTitle }}</h1>
        <h4>{{ frontmatter.pageSubTitle }}</h4>
      </div>
      <div class="brand_mark">
        <img src="/images/brand_mark.webp" />
      </div>
    </div>
  </div>

  <div class="back_row">
    <ChildHeaderButton
      :href="frontmatter.returnLink"
      :text="t('goBack')"
      class="btn_back"
    >
      <IconArrowCircleLeftOutline />
    </ChildHeaderButton>
    <ChildHeaderButton
      v-if="page.filePath.includes('chips')"
      :href="getLocaleUrl(locale, '/chips/cpu/compare')"
      :text="compareButtonText"
      class="btn_back"
    >
    </ChildHeaderButton>
  </div>
  <BackToTop />
</template>

<script setup lang="ts">
import { useData } from "vitepress"
import { useI18n } from "vue-i18n"
import { computed } from "vue"
import IconArrowCircleLeftOutline from "~icons/material-symbols/arrow-circle-left-outline"

import { useCPUComparisonStore } from "@src/stores/CPUComparisonStore"
import { getLocaleUrl } from "@vitepress/utils/language"
import BackToTop from "./BackToTop.vue"
import ChildHeaderButton from "./ChildHeaderButton.vue"

const { frontmatter, page } = useData()
const { locale, t } = useI18n()
const comparisonStore = useCPUComparisonStore()

const compareButtonText = computed(() => {
  return t("chips.buttons.title") + " (" + comparisonStore.listLength + ")"
})
</script>

<style>
/* 引入基础样式 */
@import "vitepress/dist/client/theme-default/styles/base.css";
@import "vitepress/dist/client/theme-default/styles/vars.css";

body {
  background: none;
}

.header_box {
  display: block;
  clear: both;
  width: 100%;
  min-width: var(--content-max-width);
  height: auto;
  overflow: hidden;
  background: url("/images/bg_body.webp") no-repeat top center;
  background-size: cover;
  background-color: #fff;
  border-bottom: 5px solid red;
  box-sizing: border-box;
}

.page_body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  max-width: var(--content-max-width);
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 50px;
  box-sizing: border-box;
}

.main_title {
  flex: 1;
  display: block;
  float: left;
  width: auto;
  height: auto;
  overflow: hidden;
  text-wrap: balance;
}

.main_title h1 {
  display: block;
  clear: both;
  width: 100%;
  clear: both;
  overflow: hidden;
  border-left: 15px solid red;
  padding-left: 10px;
  font-size: 60px;
  font-weight: bolder;
  line-height: normal;
}

.main_title h4 {
  display: block;
  clear: both;
  width: 100%;
  clear: both;
  overflow: hidden;
  padding-left: 25px;
  font-size: 32px;
  font-weight: bold;
  line-height: normal;
}

.brand_mark {
  flex-shrink: 0;
  display: block;
  float: right;
  width: 450px;
  height: auto;
  overflow: hidden;
}

.brand_mark img {
  display: block;
  clear: both;
  width: 100%;
  height: auto;
}

.back_row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  gap: 10px;
  clear: both;
  width: auto;
  max-width: var(--content-max-width);
  height: auto;
  overflow: hidden;
  padding: 20px 0px;
  margin: 0px auto;
}

.btn_back {
  font-size: 20px;
  font-weight: bold !important;
}

/*响应式处理-开始*/
@media (max-width: 1280px) {
  .header_box {
    min-width: 100%;
  }

  .page_body {
    width: 100%;
    max-width: 100%;
    padding: 0px 20px;
    padding-top: 40px;
  }

  .main_title h1 {
    font-size: 60px;
  }

  .main_title h4 {
    font-size: 20px;
  }

  .back_row {
    padding: 20px 30px;
    max-width: unset;
  }
}

@media (max-width: 1000px) {
  .main_title h1 {
    font-size: 40px;
  }

  .main_title h4 {
    font-size: 18px;
    border-left-width: 10px;
  }

  .back_row {
    padding: 20px 30px;
  }
}

@media (max-width: 750px) {
  .header_box {
    height: auto;
  }

  .page_body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 30px;
  }

  .main_title h1 {
    font-size: 36px;
    border-left-width: 10px;
  }

  .main_title h4 {
    font-size: 16px;
  }
}

/*响应式处理-结束*/
</style>
