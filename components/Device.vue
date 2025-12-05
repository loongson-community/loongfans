<template>
  <div class="tabs">
    <Tabs value="spec">
      <TabList>
        <Tab value="spec">主要规格</Tab>
        <Tab value="known-issues">已知问题</Tab>
        <Tab value="image">产品图片</Tab>
        <Tab value="download" v-if="$slots.download">文件下载</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="spec">
          <slot name="spec"/>
        </TabPanel>
        <TabPanel value="known-issues">
          <slot name="known-issues" />
        </TabPanel>
        <TabPanel value="image">
          <slot name="image" />
        </TabPanel>
        <TabPanel value="download" v-if="$slots.download">
          <slot name="download"/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}
</style>
