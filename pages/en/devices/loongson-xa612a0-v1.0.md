---
layout: page
returnLink: /en/devices
pageTitle: Product Database
pageSubTitle: Loongson XA612A0_v1.0
---

:::info
The Loongson XA612A0_v1.0 is an ATX (244×305mm) desktop motherboard based on Loongson 3A6000-HV.

This motherboard is the first 3A6000 motherboard released by Loongson and is generally considered an evaluation board (EVB).
:::

<DeviceDetail>
<template #spec>

| Category | Specification |
| ---- | ---- |
| Manufacturer | Loongson Technology |
| Form Factor | ATX (244×305mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports ECC† |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16 (x8 lanes), 1 × PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB) | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

†: The state of ECC memory support of this motherboard is currently unclear. It is also not clear whether it supports Registered ECC memory. DMI information also does not declare 72-bit wide memory interface.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

If you experience similar issues, the community recommends improving the case or bridge chip cooling.

</template>

<template #image>

[![](/images/devices/loongson-xa612a0-v1.0.thumbnail.webp)](/images/devices/loongson-xa612a0-v1.0.webp)
Source: "XA612A0 主板使用手册 V1.0"

</template>

</DeviceDetail>
