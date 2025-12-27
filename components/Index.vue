<template>
  <div class="home_body">
    <div class="main_logo">
      <img :src="`${basePath}/images/logo.webp`" />
    </div>

    <div class="site_nav_box">
      <div class="nav_list">
        <LinkGroup :title="$t('beginnerResources')">
          <Link
            :href="`${basePath}/pages/intro`"
            :name="t('introToLoongson')"
          />
          <Link :href="`${basePath}/pages/guides`" :name="t('usageGuides')" />
          <Link :href="`${basePath}/pages/os`" :name="t('operatingSystems')" />
          <Link :href="`${basePath}/pages/sdk`" :name="t('devGuides')" />
        </LinkGroup>

        <LinkGroup :title="$t('supportMaterials')">
          <Link :href="`${basePath}/pages/chips`" :name="t('chipsData')" />
          <Link :href="`${basePath}/pages/devices`" :name="t('productSpecs')" />
          <Link href="https://loong123.cn/" :name="t('compatibilityDb')" />
        </LinkGroup>

        <LinkGroupContact class="link-group-1" />
      </div>

      <div class="nav_list">
        <LinkGroup :title="$t('communityResources')">
          <Link
            :href="`${basePath}/pages/biweekly`"
            :name="t('biweeklyMeeting')"
          />
          <Link :href="`${basePath}/pages/jobs`" :name="t('jobsAndBounties')" />
          <Link
            :name="t('aboutGithubName')"
            href="https://github.com/loongson-community"
          />
          <Link
            href="https://github.com/loongson-community/1024"
            :name="t('devBoardProgram')"
          />
          <Link href="https://www.loongbbs.cn/" :name="t('communityForum')" />
          <Link href="https://areweloongyet.com/" :name="t('areWeLoongYet')" />
        </LinkGroup>

        <LinkGroup :title="$t('communityResources')">
          <Link href="https://www.loongson.cn/" :name="t('loongsonTech')" />
          <Link href="https://www.loongeco.cn/" :name="t('loongsonEco')" />
          <Link href="https://app.loongapps.cn/" :name="t('loongApps')" />
        </LinkGroup>

        <LinkGroupContact class="link-group-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
import Link from "./index/Link.vue";
import LinkGroup from "./index/LinkGroup.vue";
import LinkGroupContact from "./index/LinkGroupContact.vue";
import { useI18n } from "vue-i18n";
import { getLocalePrefix } from "../.vitepress/utils/language";

const { t, locale } = useI18n();
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
  max-width: var(--content-max-width);
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

.link-group-1 {
  display: block;
}

.link-group-2 {
  display: none;
}
/*站点导航清单-结束*/

/*响应式处理-开始*/
@media (max-width: var(--content-max-width)) {
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

@media (max-width: 450px) {
  .site_nav_box {
    flex-wrap: wrap;
    gap: 0;
  }

  .link-group-1 {
    display: none;
  }

  .link-group-2 {
    display: block;
  }
}
/*响应式处理-结束*/
</style>
