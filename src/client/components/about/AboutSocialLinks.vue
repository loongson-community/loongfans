<template>
  <div class="card-group">
    <AboutSocialLink
      v-for="item in currentCardData"
      :key="item.name"
      :name="item.name"
      :description="item.description"
      :href="item.href ?? ''"
      :qr-link="item.qrLink ?? ''"
      :color="item.color"
    >
      <component :is="item.icon" />
    </AboutSocialLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import AboutSocialLink from "./AboutSocialLink.vue"
import {
  getSocialLinksForLocale,
  type SocialLinkDisplayConfig,
} from "@src/client/utils/socialLinks"

const { t, locale } = useI18n()

const displayConfig: SocialLinkDisplayConfig = {
  // We can configure different links to be shown for different locales.
  // For example, we can choose to show Telegram etc. only for non-Chinese locales,
  // should that become a concern in the future.
  // For now, we will show the same set of links for all locales.
  "": [
    "github",
    "youtube",
    "bilibili",
    "telegram",
    "matrix",
    "discord",
    "wechat",
    "qq",
    "vk",
  ],
}

const currentCardData = computed(() => {
  const links = getSocialLinksForLocale(locale.value, displayConfig)
  return links.map((link) => ({
    name: t(link.nameKey),
    description: link.descKey ? t(link.descKey) : "",
    href: link.url,
    qrLink: link.qrcodeURL,
    color: link.color,
    icon: link.icon,
  }))
})
</script>

<style scoped>
.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.card-group > * {
  width: 300px;
}
</style>
