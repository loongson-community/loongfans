---
layout: page
returnLink: /devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 XA61201_v1.0
---

:::info
龙芯 XA61201_v1.0 是由龙芯中科推出的，基于 3A6000-HV 平台设计的 DTX (203×244mm) 台式机主板。

该主板相对于 [XA61200](/devices/loongson-xa61200) 主要的差异有：

- 支持 ECC 内存
- 第三槽位的 PCIe 3.0 x8 接口改为 PCIe 3.0 x16 接口（x8 信号）

:::

<DeviceDetail>
<template #spec>

| 类别 | 规格 |
| ---- | ---- |
| 厂商 | 龙芯中科 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM)，支持 ECC† |
| 接口 (PCIe) | 2 × PCIe 3.0 x16（x8 信号）、1 × PCIe 3.0 x4（x4 信号） |
| 接口 (USB) | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储） | 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × M.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口、1 × RS-232 串口 (DB-9) |

†：目前该主板的 ECC 支持范围尚不明确，且不清楚是否支持 Registered ECC 内存，DMI 信息 亦无暴露 72 位宽内存。

</template>

<template #known-issues>

<!--@include: @parts/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa61201-v1.0.thumbnail.webp)](/images/devices/loongson-xa61201-v1.0.webp)
来源：《XA61201 主板产品使用手册 V1.0》

</template>

<template #download>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V1.0_V5.0.0344_stable202511_rel"
  :size="8388608"
  date="2025-01-07"
  sha256="4473366a2079b26302ef53112deab1e44ac5a5bb0f0090216a2da6f031680e52"
  url="https://file.loongfans.cn/xa61201-v1.0/EDK2505_XA61201-V1.0_V5.0.0344_stable202511_rel.fd"
  latest
>

本次主要基于 RefCode Stable2511 基线更新，详细更新说明按照流程需要查阅代码发布说明

<template #detail>

<!--@include: @parts/devices/changelist_V5.0.0343-stable2511.md -->

</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V1.0_V5.0.0344_stable202511_dbg"
  :size="8388608"
  date="2025-01-07"
  sha256="90170bee1e0a8d978c94dd2138f7b164c1c230228654b284a6b34ea0efd8b18f"
  url="https://file.loongfans.cn/xa61201-v1.0/EDK2505_XA61201-V1.0_V5.0.0344_stable202511_dbg.fd"
  debug
  latest
>

本次主要基于 RefCode Stable2511 基线更新，详细更新说明按照流程需要查阅代码发布说明

<template #detail>

<!--@include: @parts/devices/changelist_V5.0.0343-stable2511.md -->

</template>

</DeviceDownloadCard>

</template>

</DeviceDetail>
