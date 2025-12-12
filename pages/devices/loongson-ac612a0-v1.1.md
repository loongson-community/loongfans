---
layout: page
returnLink: /pages/devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 AC612A0_V1.1
---

::: info
龙芯 AC612A0_V1.1 是由龙芯中科推出的，基于 3C6000/S 平台设计的 ATX (244×305mm) 台式机/服务器主板。

该主板是龙芯 3C6000/S 平台的入门级板卡，接口较为完整，并支持带外管理 (BMC) 模组，可供远程操作和管理。
:::

<Device>
<template #spec>

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
| 接口（其他） | 1 × BMC 模组接口†‡、1 x BMC 网络接口、1 × M.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出）接口、1 × RS-232 串口 (DB-9) |

- †：支持基于 AST2500 或龙芯 2K0500 的 BMC 模组。
- ‡：该主板亦有一款“国产化部件”版本，该版本主板无 BMC 接口。

</template>

<template #known-issues>

<!--@include: @/parts/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/public/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/public/images/devices/loongson-ac612a0-v1.1.webp)
来源：《龙芯 3C6000 单路服务器主板产品规格书 V1.0》

</template>

<template #download>

<DeviceDownloadCard
  title="Intel Chipset Device Software version 10.1.19627.8423 for NUC"
  version="10.1.19627.8423"
  size="4.99 MB"
  date="2024/03/01"
  sha256="20C771DF9B243AEEBDA407BE7AACAF0146A214C08CBB4078886ED52C349F8EAE"
  latest
>

Installs the Intel Chipset Device Software for NUC.

<template #detail>

It is important to install this software first after installing a Windows operating system, before installing any other device drivers.
This action ensures that Windows recognizes all chipset components. If the operating system cannot identify all of the chipset components, you may experience the following issues:

- Yellow question marks in Device Manager
- Unknown devices in Device Manager

</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="Intel Integrated Sensor Solution Firmware build 5.6.0.7683v2"
  version="5.6.0.7683v2"
  size="610.95 KB"
  date="2025/11/12"
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="Intel Gigabit Ethernet Network Connection Driver"
  version="2.1.3.15"
  size="636.2 KB"
  date="2024/04/29"
  sha256="20C771DF9B243AEEBDA407BE7AACAF0146A214C08CBB4078886ED52C349F8EAE"
>

Installs the LAN driver for NUC products with the Intel Gigabit Ethernet Network Connection.

You may be prompted to remove the existing LAN driver before installing this version. If so, uninstall the existing version, and this version will install.

</DeviceDownloadCard>

</template>
</Device>
