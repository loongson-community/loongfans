<template>
  <LinkGroup :title="$t('contact')">
    <HomePageLink
      v-for="link in linksData"
      :key="link.name"
      :name="link.name"
      :href="link.url"
      :qr-link="link.qrcodeURL"
    >
      <component :is="link.icon" />
    </HomePageLink>
  </LinkGroup>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import {
  getSocialLinksForLocale,
  type SocialLinkDisplayConfig,
} from "@src/client/utils/socialLinks"
import HomePageLink from "./HomePageLink.vue"
import LinkGroup from "./LinkGroup.vue"

const { locale, t } = useI18n()

const displayConfig: SocialLinkDisplayConfig = {
  zh: ["bilibili", "wechat", "qq", "matrix"],
  "": ["bilibili", "wechat", "qq", "matrix", "telegram"],
}

const linksData = computed(() => {
  const links = getSocialLinksForLocale(locale.value, displayConfig)
  return links.map((link) => ({
    name: t(link.nameKey),
    url: link.url,
    qrcodeURL: link.qrcodeURL,
    icon: link.icon,
  }))
})
</script>
