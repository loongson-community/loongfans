<template>
  <div class="header_box">
    <div class="page_body">
      <div class="main_title">
        <!-- <h1><slot name="pageTitle"></slot></h1>
        <h4><slot name="pageSubTitle"></slot></h4> -->
        <h1>{{ $frontmatter.pageTitle }}</h1>
        <h4>{{ $frontmatter.pageSubTitle }}</h4>
      </div>
      <div class="brand_mark">
        <img src="/images/brand_mark.webp" />
      </div>
    </div>
  </div>

  <div class="back_row">
    <a :href="frontmatter.returnLink" class="btn_back">
      <div class="icon_back"></div>
      <span class="name">返回上级</span>
    </a>
  </div>
  <BackToTop />
</template>

<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
  import BackToTop from './BackToTop.vue';
</script>

<style>
/* 引入基础样式 */
@import 'vitepress/dist/client/theme-default/styles/base.css';
@import 'vitepress/dist/client/theme-default/styles/vars.css';

body {
  background: none;
}
.header_box {
  display: block;
  clear: both;
  width: 100%;
  min-width: 1200px;
  height: auto;
  overflow: hidden;
  background: url("/images/bg_body.webp") no-repeat top center;
  background-size: cover;
  background-color: #FFF;
  border-bottom: 5px solid red;
  box-sizing: border-box;
}

.page_body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  max-width: 1200px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 50px;
  box-sizing: border-box;
}

.main_title {
  flex-shrink: 0;
  display: block;
  float: left;
  width: auto;
  height: auto;
  overflow: hidden;
}

.main_title h1 {
  display: block;
  clear: both;
  width: 100%;
  clear: both;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  border-left: 15px solid red;
  padding-left: 10px;
  font-size: 60px;
  font-weight: bolder;
}

.main_title h4 {
  display: block;
  clear: both;
  width: 100%;
  clear: both;
  line-height: 40px;
  overflow: hidden;
  padding-left: 25px;
  font-size: 32px;
  font-weight: bold;
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
  display: block;
  clear: both;
  width: auto;
  max-width: 1200px;
  height: auto;
  overflow: hidden;
  padding: 20px 0px;
  margin: 0px auto;
}

a.btn_back {
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: auto;
  height: 35px;
  line-height: 35px;
  overflow: hidden;
  background-color: #eee;
  padding: 0px 10px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #e60013;
  text-decoration: none;
}
a.btn_back .icon_back {
  flex-shrink: 0;
  display: block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background: url('/icons/icon_back_red.webp') no-repeat center center;
  background-size: cover;
}


a.btn_back:hover {
  background-color: #e60013;
  color: #ffffff;
}
a.btn_back:hover .icon_back {
  background-image: url('/icons/icon_back_white.webp');
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
    height: 60px;
    line-height: 60px;
    font-size: 60px;
  }

  .main_title h4 {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
  .back_row {
    padding: 20px 30px;
  }
}

@media (max-width: 1000px) {
  .main_title h1 {
    height: 40px;
    line-height: 40px;
    font-size: 40px;
  }

  .main_title h4 {
    height: 30px;
    line-height: 30px;
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
    height: 36px;
    line-height: 36px;
    font-size: 36px;
    border-left-width: 10px;
  }

  .main_title h4 {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
}

/*响应式处理-结束*/
</style>