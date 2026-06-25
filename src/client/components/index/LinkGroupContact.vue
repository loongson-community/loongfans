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
  // We can configure different links to be shown for different locales.
  // For example, we can choose to show Telegram only for non-Chinese locales,
  // should that become a concern in the future.
  //
  // For now:
  //
  // - vk exclusively for ru
  // - bilibili exclusively for zh; for others it's youtube
  // - wechat & qq exclusively for zh; for others it's discord
  "": ["youtube", "discord", "matrix", "telegram"],
  ru: ["vk", "youtube", "discord", "matrix", "telegram"],
  zh: ["bilibili", "wechat", "qq", "matrix", "telegram"],
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
