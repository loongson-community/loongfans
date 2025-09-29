---
layout: page
returnLink: /pages/devices
---

<ChildHeader>
<template #pageTitle>产品规格数据库</template>
<template #pageSubTitle>龙芯 AC612A0_V1.1</template>
</ChildHeader>

<div class="body_content">

龙芯 AC612A0_V1.1 是由龙芯中科推出的，基于 3C6000/S 平台设计的 ATX (244×305mm) 台式机/服务器主板。

该主板是龙芯 3C6000/S 平台的入门级板卡，接口较为完整，并支持带外管理 (BMC) 模组，可供远程操作和管理。

## 主要规格

| 类别 | 规格 |
|------|------|
| 厂商 | 龙芯中科 |
| 板型 | ATX (244×305mm) |
| 处理器 | 3C6000/S @ 2.0/2.2GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM)，支持 RECC |
| 接口 (PCIe) | 2 × PCIe 3.0 x16、2 × PCIe 3.0 x8 |
| 接口 (USB)  | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储）| 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0、1 × SFF-8654-4i 接口 |
| 接口（网络） | 2 × GbE |
| 接口（视频） | 1 × VGA |
| 接口（其他） | 1 × BMC 模组接口†‡、1 × m.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出）接口、1 × RS-232 串口 (DB-9) |

- †：支持基于 AST2500 或龙芯 2K0500 的 BMC 模组。
- ‡：该主板亦有一款“国产化部件”版本，该版本主板无 BMC 接口。

## 已知问题

### 早期处理器步进 PCIe 速率协商问题

根据购买尝鲜的用户朋友反馈，该款 3C6000/S 主板上插入部分 AMD 显卡、RAID 控制器等时，PCIe 速率协商为了 PCIe 1.0，严重影响性能。经过社区好友于龙芯中科工程师联调，早期 3C6000/S 步进的错误地将 PCIe 桥速率范围定义为了 2.5GT/s 而非预期的 2.5 - 16GT/s，导致部分驱动误以为平台只有 PCIe 1.0 支持。

该问题目前已有规避方案，可参考该[邮件列表补丁](https://lore.kernel.org/all/20250822-loongson-pci1-v1-1-39aabbd11fbd@uniontech.com/)。

## 产品图片

[![](/public/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/public/images/devices/loongson-ac612a0-v1.1.webp)
来源：《XA61201 主板产品使用手册 V1.0》

</div>

<ChildFooter />

<script setup>
import ChildHeader from '/components/ChildHeader.vue'
import ChildFooter from '/components/ChildFooter.vue'
</script>