<template>
  <div class="flex justify-center my-16 gap-16 flex-wrap sm:flex-nowrap">
    <div class="w-[400px]">
      <img src="/en/images/logo.webp" />
    </div>
    <LinkGroup title="Select Language">
      <HomePageLink
        v-for="language in SupportedLanguage"
        :key="language"
        :href="getLocaleUrl(language, router.route.path)"
        :name="LANGUAGE_DISPLAY_NAMES[language]"
      />
    </LinkGroup>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vitepress"
import {
  getLocaleUrl,
  LANGUAGE_DISPLAY_NAMES,
} from "@src/client/utils/language"
import { SupportedLanguage } from "@src/types/language"
import LinkGroup from "./index/LinkGroup.vue"
import HomePageLink from "./index/HomePageLink.vue"

const router = useRouter()
</script>
