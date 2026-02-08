<template>
  <slot name="introduction" />
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
import Tab from "primevue/tab"
import TabList from "primevue/tablist"
import TabPanel from "primevue/tabpanel"
import TabPanels from "primevue/tabpanels"
import Tabs from "primevue/tabs"
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import deviceDB from "virtual:loongfans-data/device"
import DownloadList from "@src/client/components/downloads/DownloadList.vue"

const { deviceId } = defineProps<{
  deviceId: string
}>()

const { t } = useI18n()

const downloadKeys = computed(() => {
  if (!deviceId) return []
  return deviceDB.devices[deviceId]?.downloads ?? []
})

const hasDownloads = computed(() => downloadKeys.value.length > 0)
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}
</style>
