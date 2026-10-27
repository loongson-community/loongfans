<template>
  <template v-for="section in documentSections" :key="section.id">
    <h2 :id="section.id">{{ $t(section.titleKey) }}</h2>
    <DownloadList
      v-for="family in section.families"
      :key="family.id"
      :keys="family.downloads"
    />
  </template>
</template>

<script setup lang="ts">
import { documentSections } from "@src/common/documents"
import DownloadList from "../downloads/DownloadList.vue"
</script>
