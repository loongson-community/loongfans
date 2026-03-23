---
layout: page
returnLink: /en/devices
pageTitle: Product Database
# these values are dynamic, so these have to be initialized by transformPageData()
# pageSubTitle: {{ params.deviceName }}
---

<script setup lang="ts">
import { useData } from "vitepress"

import DeviceDetail from "@src/client/components/devices/DeviceDetail.vue"

const { params } = useData()
</script>

<DeviceDetail :device-id="params!.deviceID">

<!-- @content -->

</DeviceDetail>
