---
layout: page
returnLink: /pages/devices
---

<ChildHeader>
<template #pageTitle>产品规格数据库</template>
<template #pageSubTitle>中科云 2K0300 久久派</template>
</ChildHeader>

<div class="body_content">

中科云 2K0300 久久派是由中科云推出的，基于 2K0300 平台设计的开发板。

## 主要规格

::: info
久久派有两个型号：TF 卡版及 Wi-Fi 版，由于 Wi-Fi 模块使用 SDIO 总线，microSD (TF) 卡槽和 Wi-FI 模块只能二选一。此外，Wi-Fi 版还额外搭载 4GB eMMC 及 LCD 接口，且板载 NOR Flash 容量更大（Wi-Fi 版为 8Mbit，TF 卡版为 256Mbit）。
:::

### Wi-Fi 版

| 类别 | 规格 |
|------|------|
| 厂商 | 中科云 |
| 板型 | 88×56mm |
| 处理器 | 2K0300 @ 1.0GHz |
| 内存 | 512MiB DDR4 @ 2666MT/s（板载） |
| 接口 (USB)  | 2 × USB 2.0 |
| 接口（存储）| 4GB eMMC（板载）、8Mbit NOR Flash |
| 接口（网络） | 1 × GbE、板载 Wi-Fi + 蓝牙模块（单天线） |
| 接口（视频） | 1 × LCD 输出 |
| 接口（其他） | 8 路 12-bit ADC、1 × JTAG、40-pin GPIO |

### TF 卡版

| 类别 | 规格 |
|------|------|
| 厂商 | 中科云 |
| 板型 | 88×56mm |
| 处理器 | 2K0300 @ 1.0GHz |
| 内存 | 512MiB DDR4 @ 2666MT/s（板载） |
| 接口 (USB)  | 2 × USB 2.0 |
| 接口（存储）| 256Mbit NOR Flash |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 无 |
| 接口（其他） | 8 路 12-bit ADC、1 × JTAG、40-pin GPIO |

## 已知问题

暂无记录。

## 产品图片

![](/public/images/devices/ctcisz-foreverpi.webp)
来源：中科云

</div>

<ChildFooter />

<script setup>
import ChildHeader from '/components/ChildHeader.vue'
import ChildFooter from '/components/ChildFooter.vue'
</script>