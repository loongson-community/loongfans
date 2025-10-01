---
layout: page
returnLink: /pages/devices
---

<ChildHeader>
<template #pageTitle>产品规格数据库</template>
<template #pageSubTitle>华硕 XC-LS3A6M</template>
</ChildHeader>

<div class="body_content">

华硕 XC-LS3A6M 是由华硕推出的，基于 3A6000-HV 平台设计的 DTX (203×244mm) 台式机主板。

该主板由华硕设计发售，是龙芯 3A6000 首发的第三方主板之一，其特色包括超频支持、双网口和额外的 USB 3.0 板载接口。

## 主要规格

| 类别 | 规格 |
|------|------|
| 厂商 | 华硕 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM) |
| 接口 (PCIe) | PCIe 3.0 x16（x8 信号）、PCIe 3.0 x8（x8 信号）、PCIe 3.0 x4（x4 信号） |
| 接口 (USB)  | USB 3.0（3 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储）| 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 2 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × m.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口 |

## 已知问题

### 7A 桥片稳定性问题

该主板使用 7A2000 桥片提供 PCIe 接口，但由于该桥片已知（但官方未确认的）原因，在使用部分外设（尤其是 AMD GCN 1.0 - 4.0 系列显卡）时会出现驱动不稳定、画面/应用崩溃甚至死机的情况。目前部分发行版提供了临时补丁进行规避，可以在很大程度上缓解问题，但有部分用户依然反馈遇到了类似问题。

如果您遇到了类似的情况，根据社区建议，我们建议您通过增强机箱或桥片散热的方式规避该问题。

### USB 设备丢失问题

根据用户反馈，在使用该主板过程中，启动系统后发现 USB 键鼠有随机失灵的情况，需要重复插拔方能使用。

根据龙芯中科工程师的调查，这是龙芯 7A2000 桥片的[一个硬件缺陷导致的](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482)。该问题已在 Linux 内核 6.15-rc1 或更高版本被规避，使用 6.6 内核的商用 ABI 2.0 发行版及使用 4.19 内核的 ABI 1.0 系统均包含此问题的规避。

### 固件更新问题

根据用户反馈，该款主板固件更新不频繁，且存在多个已知问题：

- 前期固件缺少 GPU 的 UEFI GOP x86 模拟开关，导致较新的 AMD 显卡（RX 5000 及以上）及 Intel 独立显卡无法使用
- 部分固件版本在插入独立显卡后仍不从显卡输出信号，而板载 7A2000 HDMI 输出则只显示一个光标

更严重的是，该款主板的固件更新并没有在任何公开、固定的场合发布。

::: tip
如果您已购入此款主板并遇到了相关问题，请联系您的经销商。如果您获取到了相关固件更新，欢迎您[联系本站](https://git.whlug.cn/loongweb/loong123/issues/new)上传相关材料。
:::

## 产品图片

![](/public/images/devices/asus-xc-ls3a6m.webp)
来源：[AliExpress 网店](https://aliexpress.com/item/1005006592333955.html)

</div>

<ChildFooter />

<script setup>
import ChildHeader from '/components/ChildHeader.vue'
import ChildFooter from '/components/ChildFooter.vue'
</script>
