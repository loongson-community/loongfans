<template>
  <DeviceIndex :data="chipsData" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import DeviceIndex from "../device/Index.vue";
import type { DeviceFamily } from "../../.vitepress/locales/zh/devices";
import chipsJson from "../../data/chips.min.json";

const { t } = useI18n();

const chipsData = [
  {
    family: t("chips.cpu.name"),
    categories: Array.from(
      new Set(Object.values(chipsJson.cpu).map((i) => i.basic.series))
    ).map((series) => ({
      title: series,
      devices: Object.entries(chipsJson.cpu)
        .filter(([, value]) => value.basic.series === series)
        .map(([key, value]) => ({
          name: value.basic.name,
          href: `/pages/chips/cpu/${series}/${key}`,
          image: value.ext_info.pic,
          spec: `${value.cpu.arch} ${value.cpu.freq}`,
          tags: `${value.cpu.cores}C${value.cpu.threads}T`
        })),
    })),
  },
  {
    family: t("chips.chipset.name"),
    categories: Array.from(
      new Set(Object.values(chipsJson.chipset).map((i) => i.basic.series))
    ).map((series) => ({
      title: series,
      devices: Object.entries(chipsJson.chipset)
        .filter(([, value]) => value.basic.series === series)
        .map(([key, value]) => ({
          name: value.basic.name,
          href: `/pages/chips/chipset/${series}/${key}`,
          image: value.ext_info.pic,
          spec: `${value.chipset.interface}`,
        })),
    })),
  },
] as DeviceFamily[];
</script>
