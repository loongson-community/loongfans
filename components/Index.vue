<template>
  <div class="home_body">
    <div class="main_logo">
      <img src="/images/logo.webp" />
    </div>

    <div class="site_nav_box">
      <div class="nav_list">
        <div class="link_group">
          <div class="link_type_title">
            <div class="title">{{ t('beginnerResources') }}</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a :href="`${basePath}/pages/intro`">
              <span class="name">{{ t('introToLoongson') }}</span>
            </a>
            <a :href="`${basePath}/pages/guides`">
              <span class="name">{{ t('usageGuides') }}</span>
            </a>
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">{{ t('supportMaterials') }}</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a :href="`${basePath}/pages/support`">
              <span class="name">{{ t('firmwareAndManuals') }}</span>
            </a>
            <a :href="`${basePath}/pages/devices`">
              <span class="name">{{ t('productSpecs') }}</span>
            </a>
            <a href="https://loong123.cn/" target="_blank">
              <span class="name">{{ t('compatibilityDb') }}</span>
              <span class="icon_link"></span>
            </a>
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">{{ t('contact') }}</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <Link
              name="GitHub 主页"
              href="https://github.com/loongson-community"
            >
              <IconGithub />
            </Link>
            <Link name="Bilibili" href="https://space.bilibili.com/70360929">
              <IconBilibili />
            </Link>
            <Link name="微信群" qr-link="/images/about/qr-wechat-group.png">
              <IconWechat />
            </Link>
            <Link name="QQ 群" qr-link="/images/about/qr-qq-group.png">
              <IconQq />
            </Link>
          </div>
        </div>
      </div>

      <div class="nav_list">
        <div class="link_group">
          <div class="link_type_title">
            <div class="title">{{ t('communityResources') }}</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a :href="`${basePath}/pages/biweekly`">
              <span class="name">{{ t('biweeklyMeeting') }}</span>
            </a>
            <a :href="`${basePath}/pages/jobs`">
              <span class="name">{{ t('jobsAndBounties') }}</span>
            </a>
            <a href="https://github.com/loongson-community/1024" target="_blank">
              <span class="name">{{ t('devBoardProgram') }}</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://www.loongbbs.cn/" target="_blank">
              <span class="name">{{ t('communityForum') }}</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://areweloongyet.com/" target="_blank">
              <span class="name">{{ t('areWeLoongYet') }}</span>
              <span class="icon_link"></span>
            </a>
          </div>
        </div>

        <div class="link_group">
          <div class="link_type_title">
            <div class="title">{{ t('loongsonOfficial') }}</div>
            <div class="red_line"></div>
          </div>
          <div class="link_type_box">
            <a href="https://www.loongson.cn/" target="_blank">
              <span class="name">{{ t('loongsonTech') }}</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://www.loongeco.cn/" target="_blank">
              <span class="name">{{ t('loongsonEco') }}</span>
              <span class="icon_link"></span>
            </a>
            <a href="https://app.loongapps.cn/" target="_blank">
              <span class="name">{{ t('loongApps') }}</span>
              <span class="icon_link"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useData } from 'vitepress';
import IconGithub from "~icons/simple-icons/github";
import IconBilibili from "~icons/simple-icons/bilibili";
import IconWechat from "~icons/simple-icons/wechat";
import IconQq from "~icons/simple-icons/qq";
import Link from "./index/Link.vue";
import { useI18n } from 'vue-i18n';
import { getLocalePrefix } from '../.vitepress/utils/language';

const { t } = useI18n();
const { localeIndex } = useData();
const basePath = computed(() => getLocalePrefix(localeIndex.value));
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
  overflow: hidden;
  font-size: 24px;
  font-weight: bold;
  color: #e60013;
  margin-bottom: 4px;
  line-height: normal;
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

.link_type_box a {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  clear: both;
  width: 100%;
  min-height: 40px;
  height: auto;
  line-height: normal;
  overflow: visible;
  font-size: 22px;
  color: #000000;
  text-decoration: none;
  padding: 5px 0;
  word-wrap: break-word;
}

.link_type_box a .name {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.link_type_box a:hover {
  font-weight: bold;
  color: #e60013;
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
