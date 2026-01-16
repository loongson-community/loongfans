<template>
  <DeviceIndex :data="cpuData" show-compare-button />
  <DeviceIndex :data="chipsetData" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import DeviceIndex from "../device/Index.vue"
import chipsJson from "@data/chips.min.json"
import { LANGUAGE_PREFIXES } from "@vitepress/utils/language"

import type { SupportedLanguage } from "@vitepress/utils/language"
import type { DeviceFamily } from "@vitepress/locales/zh/devices"

const { t, locale } = useI18n()

const cpuData = [
  {
    family: t("chips.cpu.name"),
    categories: Array.from(
      new Set(Object.values(chipsJson.cpu).map((i) => i.basic.series)),
    ).map((series) => ({
      title: series,
      devices: Object.entries(chipsJson.cpu)
        .filter(([, value]) => value.basic.series === series)
        .map(([key, value]) => ({
          name: value.basic.name,
          href: `${
            LANGUAGE_PREFIXES[locale.value as SupportedLanguage]
          }/chips/cpu/${series}/${key}`.toLowerCase(),
          image: value.ext_info.pic,
          spec: `${value.cpu.arch} ${value.cpu.freq}`,
          tags: `${value.cpu.cores}C${value.cpu.threads}T`,
        })),
    })),
  },
] as DeviceFamily[]

const chipsetData = [
  {
    family: t("chips.chipset.name"),
    categories: Array.from(
      new Set(Object.values(chipsJson.chipset).map((i) => i.basic.series)),
    ).map((series) => ({
      title: series,
      devices: Object.entries(chipsJson.chipset)
        .filter(([, value]) => value.basic.series === series)
        .map(([key, value]) => ({
          name: value.basic.name,
          href: `${
            LANGUAGE_PREFIXES[locale.value as SupportedLanguage]
          }/chips/chipset/${series}/${key}`.toLowerCase(),
          image: value.ext_info.pic,
          spec: `${value.chipset.interface}`,
        })),
    })),
  },
] as DeviceFamily[]
</script>
