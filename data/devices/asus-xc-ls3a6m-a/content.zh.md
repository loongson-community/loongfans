<template #introduction>

:::info
华硕 XC-LS3A6M-A 是由华硕推出的，基于 3A6000-HV 平台设计的 DTX (203×244mm) 台式机主板。

该主板由华硕设计发售，是龙芯 3A6000 的第三方主板之一，与 XC-LS3A6M 的区别是调整了 M.2 Key E 接口的位置，并将板载的 USB 3.0 接口改为 PCIe x1，去掉了一个网口，USB 接口配置也有所调整。
:::

</template>

<template #spec>

| 类别 | 规格 |
| ---- | ---- |
| 厂商 | 华硕 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM) |
| 接口 (PCIe) | PCIe 3.0 x1（x1 信号）、PCIe 3.0 x16（x8 信号）、PCIe 3.0 x8（x8 信号）、PCIe 3.0 x8（x4 信号） |
| 接口 (USB) | USB 3.0（2 × 板载、3 × 前面板）、USB 2.0（4 × 板载、1 × 前面板） |
| 接口（存储） | 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × M.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口 |

</template>

<template #known-issues>

<!--@include: @parts/known-issues/7a-errata.md -->

<!--@include: @parts/known-issues/usb-device-lost.md -->

### 固件更新问题

根据用户反馈，该款主板固件更新不频繁，且存在多个已知问题：

- 前期固件缺少 GPU 的 UEFI GOP x86 模拟开关，导致较新的 AMD 显卡（RX 5000 及以上）及 Intel 独立显卡无法使用
- 部分固件版本在插入独立显卡后仍不从显卡输出信号，而板载 7A2000 HDMI 输出则只显示一个光标

</template>

<template #image>

![华硕 XC-LS3A6M-A 的正面](/images/devices/asus-xc-ls3a6m-a.webp)
![华硕 XC-LS3A6M-A 的接口](/images/devices/asus-xc-ls3a6m-a-back.webp)
来源：闲鱼

</template>
