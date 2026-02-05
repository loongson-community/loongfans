---
layout: page
returnLink: /devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 XA612A0_v1.0
---

:::info
龙芯 XA612A0_v1.0 是由龙芯中科推出的，基于 3A6000-HV 平台设计的 ATX (244×305mm) 台式机主板。

该主板是龙芯发售的第一款 3A6000 主板，一般认为属于评估开发板 (Evaluation Board)。
:::

<DeviceDetail>
<template #spec>

| 类别 | 规格 |
| ---- | ---- |
| 厂商 | 龙芯中科 |
| 板型 | ATX (244×305mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM)，支持 ECC† |
| 接口 (PCIe) | 2 × PCIe 3.0 x16（x8 信号）、1 × PCIe 3.0 x4（x4 信号） |
| 接口 (USB) | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储） | 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 组 3.5mm（输入、输出、Line-In）接口、1 × RS-232 串口 (DB-9) |

†：目前该主板的 ECC 支持范围尚不明确，且不清楚是否支持 Registered ECC 内存，DMI 信息 亦无暴露 72 位宽内存。

</template>

<template #known-issues>

<!--@include: @parts/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa612a0-v1.0.thumbnail.webp)](/images/devices/loongson-xa612a0-v1.0.webp)
来源：《XA612A0 主板使用手册 V1.0》

</template>

<template #download>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V1.0_V5.0.0344_stable202511_rel"
  :size="8388608"
  date="2025-01-07"
  sha256="5bebaec30b8933f9a0c65b38ac16a08b2ba206f4d2cfd80f6bb0846a00655665"
  url="https://file.loongfans.cn/xa612a0-v1.0/EDK2505_XA612A0-V1.0_V5.0.0344_stable202511_rel.fd"
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
  sha256="8f75aca6bcbac86bd9f678fb4b7de276d7e8808973f6da66d70b74e0e80b5c95"
  url="https://file.loongfans.cn/xa612a0-v1.0/EDK2505_XA612A0-V1.0_V5.0.0344_stable202511_dbg.fd"
  debug
  latest
>

本次主要基于 RefCode Stable2511 基线更新，详细更新说明按照流程需要查阅代码发布说明

<template #detail>

<!--@include: @parts/devices/changelist_V5.0.0343-stable2511.md -->

</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="stable2311pllrel"
  :size="4194304"
  date="2024-01-02"
  sha256="6862745ef05a7a7f284064d258a36fa9c6bf885eccdebe4a7dba05803c7dd7bc"
  url="https://file.loongfans.cn/xa612a0-v1.0/UDK2018-3A6000-7A2000_XA612A0_stable2311pllrel.fd"
>

新增 GPU 仿真开关

<template #detail>
若使用 AMD RDNA 系列显卡，请关闭此选项，使得 BIOS 仅提供 7A 显示控制器，绕过仿真流程。
</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="stable2311plldbg"
  :size="4194304"
  date="2024-01-02"
  sha256="c570d7fb4d405d6e4930e84831ef82538cdc3e2c4c016a2976902660d49e63eb"
  url="https://file.loongfans.cn/xa612a0-v1.0/UDK2018-3A6000-7A2000_XA612A0_stable2311plldbg.fd"
  debug
>

新增 GPU 仿真开关

<template #detail>
若使用 AMD RDNA 系列显卡，请关闭此选项，使得 BIOS 仅提供 7A 显示控制器，绕过仿真流程。
</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="prestable2405rel"
  :size="8388608"
  date="2024-05-25"
  sha256="6862745ef05a7a7f284064d258a36fa9c6bf885eccdebe4a7dba05803c7dd7bc"
  url="https://file.loongfans.cn/xa612a0-v1.0/UDK2018-3A6000-7A2000_XA612A0_prestable2405rel.fd"
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="stable2311plldbg"
  :size="8388608"
  date="2024-05-25"
  sha256="242f3b2b04de64a863e3bdc429339ca8736eb9437ced166abf3839b72982c233"
  url="https://file.loongfans.cn/xa61200-v1.0/UDK2018-3A6000-7A2000_XA612A0_stable2311plldbg.fd"
  debug
>
</DeviceDownloadCard>

</template>
</DeviceDetail>
