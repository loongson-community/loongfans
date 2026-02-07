<template>
  <DeviceList :data="deviceListData" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { computed } from "vue"

import deviceDB from "virtual:loongfans-data/device"
import type { SupportedLanguage } from "@src/types/language"
import { transformDeviceDB } from "@src/client/utils/deviceTransform"
import DeviceList from "./DeviceList.vue"

const { locale } = useI18n()

const deviceListData = computed(() =>
  transformDeviceDB(deviceDB, locale.value as SupportedLanguage),
)
</script>
