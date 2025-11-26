---
layout: page
returnLink: /pages/devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 XA61201
---


龙芯 XA61201 是由龙芯中科推出的，基于 3A6000-HV 平台设计的 DTX (203×244mm) 台式机主板。

该主板相对于 [XA61200](/pages/devices/loongson-xa61200) 主要的差异有：

- 支持 ECC 内存
- 第三槽位的 PCIe 3.0 x8 接口改为 PCIe 3.0 x16 接口（x8 信号）

## 主要规格

| 类别 | 规格 |
|------|------|
| 厂商 | 龙芯中科 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM)，支持 ECC† |
| 接口 (PCIe) | 2 × PCIe 3.0 x16（x8 信号）、1 × PCIe 3.0 x4（x4 信号）|
| 接口 (USB)  | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储）| 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × m.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口、1 × RS-232 串口 (DB-9) |

†：目前该主板的 ECC 支持范围尚不明确，且不清楚是否支持 Registered ECC 内存，DMI 信息 亦无暴露 72 位宽内存。

## 已知问题

<!--@include: @/parts/known-issues/7a-errata.md -->

## 产品图片

[![](/public/images/devices/loongson-xa61201.thumbnail.webp)](/public/images/devices/loongson-xa61201.webp)
来源：《XA61201 主板产品使用手册 V1.0》


