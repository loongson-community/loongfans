---
layout: page
returnLink: /pages/devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 AC612A0_V1.1
---


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
| 接口（其他） | 1 × BMC 模组接口†‡、1 x BMC 网络接口、1 × m.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出）接口、1 × RS-232 串口 (DB-9) |

- †：支持基于 AST2500 或龙芯 2K0500 的 BMC 模组。
- ‡：该主板亦有一款“国产化部件”版本，该版本主板无 BMC 接口。

## 已知问题

### 早期处理器步进 PCIe 速率协商问题

根据购买尝鲜的用户朋友反馈，该款 3C6000/S 主板上插入部分 AMD 显卡、RAID 控制器等时，PCIe 速率协商为了 PCIe 1.0，严重影响性能。经社区好友与龙芯中科工程师联调发现，早期 3C6000/S 步进的错误地将 PCIe 桥速率范围定义为了 2.5GT/s 而非预期的 2.5 - 16GT/s，导致部分驱动误以为平台只有 PCIe 1.0 支持。

该问题目前已有规避方案，可参考安同 OS 内核补丁 [1](https://github.com/AOSC-Tracking/linux/commit/283358e5b377517ad9f13bd1909b4b931754c196)、[2](https://github.com/AOSC-Tracking/linux/commit/874bb3b961fb6bf106b48c61a1671c196976e1f1) 与 [3](https://github.com/AOSC-Tracking/linux/commit/8d088d7587098ef48e0594bf46c603bb4d7abd52)。

## 产品图片

[![](/public/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/public/images/devices/loongson-ac612a0-v1.1.webp)
来源：《龙芯 3C6000 单路服务器主板产品规格书 V1.0》


