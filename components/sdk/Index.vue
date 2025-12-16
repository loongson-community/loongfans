<template>
  <div class="tabs">
    <Tabs value="gnu">
      <TabList>
        <Tab value="gnu">{{ t('gnuInstall') }}</Tab>
        <Tab value="llvm">{{ t('llvmInstall') }}</Tab>
        <Tab value="rust">{{ t('rustInstall') }}</Tab>
        <Tab value="nodejs">{{ t('nodejsInstall') }}</Tab>
        <Tab value="golang">{{ t('golangInstall') }}</Tab>
        <Tab value="python">{{ t('pythonInstall') }}</Tab>
        <Tab value="dotnet">{{ t('dotnetInstall') }}</Tab>
        <Tab value="java">{{ t('javaInstall') }}</Tab>
        <Tab value="kernel">{{ t('kernelInstall') }}</Tab>
        <Tab value="docker">{{ t('dockerInstall') }}</Tab>
        <Tab value="cirunner">{{ t('cirunnerInstall') }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="gnu">
          <slot name="gnu"/>
        </TabPanel>
        <TabPanel value="llvm">
          <slot name="llvm"/>
        </TabPanel>
        <TabPanel value="rust">
          <slot name="rust" />
        </TabPanel>
        <TabPanel value="nodejs">
          <slot name="nodejs" />
        </TabPanel>
        <TabPanel value="golang">
          <slot name="golang"/>
        </TabPanel>
        <TabPanel value="python">
          <slot name="python"/>
        </TabPanel>
        <TabPanel value="dotnet">
          <slot name="dotnet"/>
        </TabPanel>
        <TabPanel value="java">
          <slot name="java"/>
        </TabPanel>
        <TabPanel value="kernel">
          <slot name="kernel"/>
        </TabPanel>
        <TabPanel value="docker">
          <slot name="docker"/>
        </TabPanel>
        <TabPanel value="cirunner">
          <slot name="cirunner"/>
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}
</style>
