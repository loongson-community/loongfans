---
layout: page
returnLink: /devices
pageTitle: 产品规格数据库
# these values are dynamic, so these have to be initialized by transformPageData()
# pageSubTitle: {{ params.deviceName }}
---

<script setup lang="ts">
import { useData } from "vitepress"

import DeviceDetail from "@src/client/components/device/DeviceDetail.vue"

const { params } = useData()
</script>

<DeviceDetail :device-id="params!.deviceID">

<!-- @content -->

</DeviceDetail>
