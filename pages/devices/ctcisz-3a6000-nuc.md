---
layout: page
returnLink: /pages/devices
pageTitle: 产品规格数据库
pageSubTitle: 中科云 3A6000 小主机
---


中科云 3A6000 小主机是一款类似 Intel NUC 规格的小型台式机，搭载 3A6000-HV 处理器，并提供双 HDMI 输出及双千兆 (GbE) 以太网口。

## 主要规格

| 类别 | 规格 |
|------|------|
| 厂商 | 中科云 |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × SODIMM) |
| 接口 (USB)  | 4 × USB 3.0、2 × USB 2.0、1 × USB-C |
| 接口（存储）| 1 × NVMe (PCIe 3.0 x4)、1 × SATA 3.0 |
| 接口（网络） | 2 × GbE |
| 接口（视频） | 2 × HDMI |
| 接口（其他） | 1 × m.2 Key E 接口 (PCIe + USB)、1 × 3.5mm 耳机耳麦口 |

## 已知问题

### USB 设备丢失问题

根据用户反馈，在使用该主板过程中，启动系统后发现 USB 键鼠有随机失灵的情况，需要重复插拔方能使用。

根据龙芯中科工程师的调查，这是龙芯 7A2000 桥片的[一个硬件缺陷导致的](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482)。该问题已在 Linux 内核 6.15-rc1 或更高版本被规避，使用 6.6 内核的商用 ABI 2.0 发行版及使用 4.19 内核的 ABI 1.0 系统均包含此问题的规避。

## 产品图片

[![](/public/images/devices/ctcisz-3a6000-nuc.thumbnail.webp)](/public/images/devices/ctcisz-3a6000-nuc.webp)
来源：中科云



