<template>
  <div class="tabs">
    <Tabs value="spec">
      <TabList>
        <Tab value="spec">{{ t("deviceTabSpec") }}</Tab>
        <Tab value="known-issues">{{ t("deviceTabKnownIssues") }}</Tab>
        <Tab value="image">{{ t("deviceTabImage") }}</Tab>
        <Tab v-if="hasDownloads" value="download">
          {{ t("deviceTabDownload") }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="spec">
          <slot name="spec" />
        </TabPanel>
        <TabPanel value="known-issues">
          <slot name="known-issues" />
        </TabPanel>
        <TabPanel value="image">
          <slot name="image" />
        </TabPanel>
        <TabPanel v-if="hasDownloads" value="download">
          <DownloadList :keys="downloadKeys" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Tabs from "primevue/tabs"
import TabList from "primevue/tablist"
import Tab from "primevue/tab"
import TabPanels from "primevue/tabpanels"
import TabPanel from "primevue/tabpanel"
import { useI18n } from "vue-i18n"
import { useData } from "vitepress"

import deviceDB from "virtual:loongfans-data/device"
import DownloadList from "./DownloadList.vue"

const { t } = useI18n()
const { page } = useData()

const deviceId = computed(() => {
  const match = page.value.filePath.match(/devices\/([^/]+)\.md$/)
  return match?.[1] ?? null
})

const downloadKeys = computed(() => {
  if (!deviceId.value) return []
  return deviceDB.devices[deviceId.value]?.downloads ?? []
})

const hasDownloads = computed(() => downloadKeys.value.length > 0)
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}
</style>
