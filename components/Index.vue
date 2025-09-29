<template>
  <div class="header_redline"></div>
  <div class="home_body">
    <div class="main_logo">
      <img src="/images/logo.webp" />
    </div>

    <div class="site_nav_box">
      <div class="nav_list">
        <div class="link_group">
          <div class="link_type_title">
            <div class="title">初来乍到</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a href="/pages/intro">
              <span class="name">初识龙芯</span>
            </a>
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">支持材料</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a href="/pages/guides">
              <span class="name">玩机及踩坑指南</span>
            </a>
            <a href="/pages/support">
              <span class="name">主板固件及说明书</span>
            </a>
            <a href="/pages/devices">
              <span class="name">产品规格数据库</span>
            </a>
            <a href="https://loong123.cn/" target="_blank">
              <span class="name">软硬件兼容性数据库</span>
              <span class="icon_link"></span>
            </a>
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
            <a href="/pages/biweekly">
              <span class="name">龙架构双周会</span>
            </a>
            <a href="/pages/jobs" target="_blank">
              <span class="name">悬赏与实习机会</span>
            </a>
            <a href="https://github.com/loongson-community/1024" target="_blank">
              <span class="name">开发板漂流计划</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://github.com/loongson-community" target="_blank">
              <span class="name">GitHub 主页</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://www.loongbbs.cn/" target="_blank">
              <span class="name">爱好者社区论坛</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://areweloongyet.com/" target="_blank">
              <span class="name">咱龙了吗？</span>
              <span class="icon_link"></span>
            </a>
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">龙芯官方</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a href="https://www.loongeco.cn/" target="_blank">
              <span class="name">龙芯生态平台</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://app.loongapps.cn/" target="_blank">
              <span class="name">龙芯应用合作社</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://www.loongson.cn/" target="_blank">
              <span class="name">龙芯中科官网</span>
              <span class="icon_link"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer_info">
    <div class="footer_link">
      <a href="#" target="_blank">站点源码</a>
      <span>|</span>
      <a href="#" target="_blank">报告问题</a>
      <span>|</span>
      <a href="#" target="_blank">关于龙芯爱好者社区</a>
    </div>

    <div class="copyright_info">
      <span>版权所有 &copy; 2023-{{ copyrightYear }} 龙芯爱好者社区</span>
      <a href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2022017735号-10</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
let year = new Date().getFullYear();
const copyrightYear = ref(year);
//链接跳转时强制刷新页面
const forceRefresh = (url) => {
  window.location.assign(url);
};
</script>

<style>
body {
  background: url("/images/bg_body.webp") no-repeat top center;
  background-size: cover;
}
</style>

<style scoped>
.header_redline {
  display: block;
  clear: both;
  width: 100%;
  height: 25px;
  overflow: hidden;
  background-color: red;
}

.home_body {
  display: block;
  width: auto;
  max-width: 1200px;
  height: 100%;
  overflow: hidden;
  padding-top: 50px;
  margin: 0 auto;
}

.main_logo {
  display: block;
  float: left;
  width: 40%;
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
  gap: 50px;
  float: right;
  width: 50%;
  height: auto;
  overflow: hidden;
}

.nav_list {
  display: block;
  width: 100%;
  height: auto;
  overflow: hidden;
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
  height: 35px;
  overflow: hidden;
  font-size: 24px;
  font-weight: bold;
  color: red;
}

.link_type_title .red_line {
  display: block;
  clear: both;
  width: 100%;
  height: 10px;
  overflow: hidden;
  background-color: red;
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
  overflow: hidden;
  padding: 20px 0px;
}

.link_type_box a {
  display: flex;
  align-items: center;
  clear: both;
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  font-size: 22px;
  color: #000000;
  text-decoration: none;
}
.link_type_box a .icon_link {
  flex-shrink: 0;
  display: block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  background: url("/icons/icon_link_black.webp") no-repeat center center;
  background-size: 100%;
  margin-left: 5px;
}

.link_type_box a:hover {
  font-weight: bold;
  color: red;
}
.link_type_box a:hover .icon_link {
  background-image: url("/icons/icon_link_red.webp");
}

/*站点导航清单-结束*/

.footer_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  clear: both;
  width: auto;
  max-width: 1200px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  margin: 0px auto;
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
}

.footer_link,
.copyright_info {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: auto;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  font-size: 16px;
  color: #000000;
}

.footer_info a {
  font-size: 16px;
  color: #000000;
  text-decoration: none;
}

.footer_info a:hover {
  color: red;
}

/*响应式处理-开始*/
@media (max-width: 1200px) {
  .page_body {
    padding: 0px 10px;
    padding-top: 50px;
  }

  .footer_info {
    width: 100%;
    max-width: 100%;
    padding: 0px 10px;
  }
}

@media (max-width: 750px) {
  .page_body {
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
  }

  .main_logo {
    width: 100%;
    padding: 20px;
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

  .link_type_box a {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
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
