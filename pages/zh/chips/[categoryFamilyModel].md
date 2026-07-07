---
layout: page
returnLink: /chips
# these values are dynamic, so these have to be initialized by transformPageData()
# pageTitle: {{ params.title }}
# pageSubTitle: {{ params.subTitle }}
---

<script setup lang="ts">
import { useData } from "vitepress"
import { computed } from "vue"

import ChipTables from "@src/client/components/chips/ChipTables.vue"
import type { ChipFieldsDescriptor } from "@src/client/components/chips/fields"
import cpuFields from "@src/client/components/chips/fields/cpu"
import chipsetFields from "@src/client/components/chips/fields/chipset"

const { params } = useData()

let fields: ChipFieldsDescriptor
switch (params!.value!.category) {
    case "cpu":
        fields = cpuFields
        break
    case "chipset":
        fields = chipsetFields
        break
}
</script>

# {{ params!.title }}

<ChipTables :chips="params!.chipKey" :fields="fields" />

<template v-if="params!.hasNotes === 'true'">

## 注意事项

<!-- @content -->

</template>
