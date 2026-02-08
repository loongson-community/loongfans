<template>
  <DeviceList :data="cpuData" />
  <DeviceList :data="chipsetData" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

import chipsDB from "virtual:loongfans-data/chips"
import { LANGUAGE_PREFIXES } from "@src/client/utils/language"
import type { DeviceListData } from "@src/types/device"
import type { SupportedLanguage } from "@src/types/language"
import DeviceList from "../devices/DeviceList.vue"

const { t, locale } = useI18n()

const cpuData = [
  {
    family: t("chips.cpu.name"),
    categories: Array.from(
      new Set(Object.values(chipsDB.cpu).map((i) => i.basic.series)),
    ).map((series) => ({
      title: series,
      devices: Object.entries(chipsDB.cpu)
        .filter(([, value]) => value.basic.series === series)
        .map(([key, value]) => ({
          comparisonKey: key,
          id: key,
          name: value.basic.name,
          href: `${
            LANGUAGE_PREFIXES[locale.value as SupportedLanguage]
          }/chips/cpu/${series}/${key}`.toLowerCase(),
          image: value.ext_info.pic,
          spec: `${value.cpu.arch} ${value.cpu.freq}`,
          tags: [`${value.cpu.cores}C${value.cpu.threads}T`],
        })),
    })),
  },
] as DeviceListData

const chipsetData = [
  {
    family: t("chips.chipset.name"),
    categories: Array.from(
      new Set(Object.values(chipsDB.chipset).map((i) => i.basic.series)),
    ).map((series) => ({
      title: series,
      devices: Object.entries(chipsDB.chipset)
        .filter(([, value]) => value.basic.series === series)
        .map(([key, value]) => ({
          id: key,
          name: value.basic.name,
          href: `${
            LANGUAGE_PREFIXES[locale.value as SupportedLanguage]
          }/chips/chipset/${series}/${key}`.toLowerCase(),
          image: value.ext_info.pic,
          spec: `${value.chipset.interface}`,
        })),
    })),
  },
] as DeviceListData
</script>
