<template>
  <template v-for="section in documentSections" :key="section.id">
    <h2 :id="section.id">{{ $t(section.titleKey) }}</h2>
    <div v-for="(family, i) in section.families" :key="family.id">
      <Divider v-if="i !== 0" />
      <DownloadList :keys="family.downloads" class="mt-6" />
    </div>
  </template>
</template>

<script setup lang="ts">
import Divider from "primevue/divider"
import { documentSections } from "@src/common/documents"
import DownloadList from "../downloads/DownloadList.vue"
</script>
