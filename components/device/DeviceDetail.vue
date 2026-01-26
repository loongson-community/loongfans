<template>
  <div class="tabs">
    <Tabs value="spec">
      <TabList>
        <Tab value="spec">{{ t("deviceTabSpec") }}</Tab>
        <Tab value="known-issues">{{ t("deviceTabKnownIssues") }}</Tab>
        <Tab value="image">{{ t("deviceTabImage") }}</Tab>
        <Tab v-if="$slots.download" value="download">
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
        <TabPanel v-if="$slots.download" value="download">
          <slot name="download" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from "primevue/tabs"
import TabList from "primevue/tablist"
import Tab from "primevue/tab"
import TabPanels from "primevue/tabpanels"
import TabPanel from "primevue/tabpanel"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}
</style>
