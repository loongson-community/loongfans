---
layout: page
returnLink: /en/
pageTitle: Product Specifications
pageSubTitle: Overview of specifications, features, and known issues
---


<script setup>
import DeviceIndex from "../../components/device/Index.vue"
</script>


Loongson has many processor and board models, but they are generally sold bundled as processor + motherboard (motherboard and CPU bundle). This page documents and presents all known Loongson motherboard and CPU bundles, as well as laptop and pre-built server system information.

:::info
For processor specifications, details, and parameter comparisons, please see:

- [Chips Database](/en/pages/chips)
- [Loongson Technology Official Website "Chip Products" Section](https://www.loongson.cn/product/channel)
:::

<DeviceIndex :data="$tm('devices')" />
