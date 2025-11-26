<template>
  <div class="home_body">
    <div class="main_logo">
      <img src="/images/logo.webp" />
    </div>

    <div class="site_nav_box">
      <div class="nav_list">
        <div class="link_group">
          <div class="link_type_title">
            <div class="title">新手资源</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <Link name="初识龙芯" href="/pages/intro" />
            <Link name="玩机及踩坑指南" href="/pages/guides" />
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">支持材料</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <Link name="主板固件及说明书" href="/pages/support" />
            <Link name="产品规格数据库" href="/pages/devices" />
            <Link name="软硬件兼容性数据库" href="https://loong123.cn/" />
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">联系我们</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <Link
              name="GitHub 主页"
              href="https://github.com/loongson-community"
              icon="simple-icons:github"
            />
            <Link
              name="Bilibili"
              href="https://space.bilibili.com/70360929"
              icon="simple-icons:bilibili"
            />
            <Link
              name="微信群"
              icon="simple-icons:wechat"
              qr-link="/images/about/qr-wechat-group.png"
            />
            <Link
              name="QQ 群"
              icon="simple-icons:qq"
              qr-link="/images/about/qr-qq-group.png"
            />
          </div>
        </div>
      </div>

      <div class="nav_list">
        <div class="link_group">
          <div class="link_type_title">
            <div class="title">社区资源</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <Link name="龙架构双周会" href="/pages/biweekly" />
            <Link name="悬赏与实习机会" href="/pages/jobs" />
            <Link
              name="开发板漂流计划"
              href="https://github.com/loongson-community/1024"
            />
            <Link name="爱好者社区论坛" href="https://www.loongbbs.cn/" />
            <Link name="咱龙了吗？" href="https://areweloongyet.com/" />
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">龙芯官方</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <Link name="龙芯中科官网" href="https://www.loongson.cn/" />
            <Link name="龙芯生态平台" href="https://www.loongeco.cn/" />
            <Link name="龙芯应用合作社" href="https://app.loongapps.cn/" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Link from "./index/Link.vue";

let year = new Date().getFullYear();
const copyrightYear = ref(year);
//链接跳转时强制刷新页面
const forceRefresh = (url) => {
  window.location.assign(url);
};
</script>

<style>
body {
  /* background: url("/images/bg_body.webp") no-repeat top center; */
  background-size: cover;
}
</style>

<style scoped>
.home_body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;
  width: auto;
  max-width: 1200px;
  height: 100%;
  padding-top: 50px;
  margin: 0 auto;
}

.main_logo {
  flex-shrink: 0;
  display: block;
  width: 400px;
  height: auto;
  overflow: hidden;
}

.main_logo img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

/*站点导航清单-开始*/
.site_nav_box {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  height: auto;
}

.nav_list {
  display: block;
  width: 100%;
  height: auto;
}

.link_type_title {
  display: block;
  clear: both;
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
  cursor: default;
}

.link_type_title .title {
  display: block;
  clear: both;
  width: 100%;
  height: 30px;
  overflow: hidden;
  font-size: 24px;
  font-weight: bold;
  color: #e60013;
}

.link_type_title .red_line {
  display: block;
  clear: both;
  width: 100%;
  height: 5px;
  overflow: hidden;
  background-color: #e60013;
}

.link_group {
  padding: 0;
}

/* .link_group:hover .title {
  font-size: 26px;
  transition: font-size 0.5s ease 0s;
}

.link_group:hover .red_line {
  height: 0;
  transition: height 0.5s ease 0s;
} */

.link_type_box {
  display: block;
  clear: both;
  width: 100%;
  height: auto;
  overflow: visible;
  padding: 20px 0px;
}
/*站点导航清单-结束*/

/*响应式处理-开始*/
@media (max-width: 1200px) {
  .home_body {
    padding: 0px 20px;
    padding-top: 50px;
  }

  .footer_info {
    width: 100%;
    max-width: 100%;
    padding: 0px 10px;
  }
}
@media (max-width: 1000px) {
  .home_body {
    padding: 0px 20px;
    padding-top: 40px;
  }
  .main_logo {
    width: 300px;
  }
}

@media (max-width: 750px) {
  .home_body {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    padding-top: 30px;
  }

  .main_logo {
    width: 100%;
  }

  .main_logo img {
    width: auto;
    max-height: 100px;
  }

  .site_nav_box {
    width: 100%;
    gap: 20px;
  }

  .link_type_title .red_line {
    height: 10px;
  }

  .link_type_box {
    padding: 10px 0px;
  }

  .footer_info {
    flex-direction: column;
    justify-content: center;
    height: auto;
    position: static;
    padding-top: 50px;
    font-size: 14px;
    gap: 0;
  }

  .footer_info a {
    font-size: 14px;
  }

  .footer_link,
  .copyright_info {
    width: 100%;
    height: auto;
    line-height: 30px;
    justify-content: center;
    font-size: 14px;
  }

  .copyright_info {
    flex-direction: column;
    gap: 0;
  }

  .copyright_info a {
    display: block;
    clear: both;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
  }
}

/*响应式处理-结束*/
</style>
