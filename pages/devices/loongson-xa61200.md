---
layout: page
returnLink: /devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 XA61200
---

:::info
龙芯 XA61200 是由龙芯中科推出的，基于 3A6000-HV 平台设计的 DTX (203×244mm) 台式机主板。

该主板一般被认为是 3A6000 平台的参考设计：除龙芯外，还有许多其他厂商推出了基于该主板的派生设计。该主板于 2023 年发布，是首个下探到 2000 元价位以下并大量出货的龙芯主板，由于其当时较高的性价比受到用户社区的喜好（并给予其“绿板”的昵称），并成为许多龙芯入门玩家的第一张主板。

:::

<DeviceDetail>
<template #spec>

| 类别 | 规格 |
| ---- | ---- |
| 厂商 | 龙芯中科 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM) |
| 接口 (PCIe) | PCIe 3.0 x16（x8 信号）、PCIe 3.0 x8（x8 信号）、PCIe 3.0 x4（x4 信号） |
| 接口 (USB) | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储） | 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × M.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口、1 × RS-232 串口 (DB-9) |

</template>

<template #known-issues>

<!--@include: @parts/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa61200.thumbnail.webp)](/images/devices/loongson-xa61200.webp)
来源：《XA61200 主板产品使用手册 V1.1》

</template>

</DeviceDetail>
