---
layout: page
returnLink: /devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 XB612B0_V1.2
---

:::info
龙芯 XB612B0_V1.2 是由龙芯中科推出的，基于 3B6000 平台设计的 mATX (244×244mm) 台式机主板。

该主板可支持多个规格的 3B6000 处理器，支持包括 8/12/16 核心，16/24/32 线程的型号，并支持 Registered ECC 内存。该主板还提供 2 个 M.2 NVMe (PCIe 3.0 x4) 2280 接口，是基于龙芯的主板中 NVMe 接口最多的型号。与基于 3C6000/S 的 [AC612A0_V1.1](/devices/loongson-ac612a0-v1.1.md) 相比，XB612B0_V1.1 主板虽然少提供 2 个内存插槽和 1 个 PCIe 3.0 x8 接口，但考虑到它板型相对较小，该款主板依然有着可圈可点的特性集和扩展性，对个人用户来说亦有着更好的性价比。
:::

<DeviceDetail>
<template #spec>

| 类别 | 规格 |
| ---- | ---- |
| 厂商 | 龙芯中科 |
| 板型 | mATX (244×244mm) |
| 处理器 | 3B6000 @ 2.0/2.3GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM)，支持 RECC |
| 接口 (PCIe) | 2 × PCIe 3.0 x16、1 × PCIe 3.0 x8 |
| 接口 (USB) | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储） | 2 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 2 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × M.2 Key E 接口 (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口、1 × RS-232 串口 (DB-9) |

</template>

<template #known-issues>

<!--@include: @/parts/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-xb612b0-v1.2.thumbnail.webp)](/images/devices/loongson-xb612b0-v1.2.webp)
来源：Xi Ruoyao

</template>

<template #download>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V1.2_V5.0.0345_stable202511_rel"
  size="6291456"
  date="2025-01-07"
  sha256="38ede1c5710c072d642853d26e30bb2a281c1f36fa588a017780324f71fe6a79"
  url="https://file.loongfans.cn/xb612b0-v1.2/EDK2025_XB612B0-V1.2_V5.0.0345_stable202511_rel.fd"
  latest
>

本次主要基于 RefCode Stable2511 基线更新，详细更新说明按照流程需要查阅代码发布说明

<template #detail>

<!--@include: @/parts/devices/changelist_V5.0.0343-stable2511.md -->

</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V1.2_V5.0.0345_stable202511_dbg"
  size="6291456"
  date="2025-01-07"
  sha256="c17a7848cd002564cda47eb4a0ded99605301c31e9f828895b0a27542940a0f0"
  url="https://file.loongfans.cn/xb612b0-v1.2/EDK2025_XB612B0-V1.2_V5.0.0345_stable202511_dbg.fd"
  debug
  latest
>

本次主要基于 RefCode Stable2511 基线更新，详细更新说明按照流程需要查阅代码发布说明

<template #detail>

<!--@include: @/parts/devices/changelist_V5.0.0343-stable2511.md -->

</template>

</DeviceDownloadCard>

</template>

</DeviceDetail>
