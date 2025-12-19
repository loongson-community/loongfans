---
layout: page
returnLink: /pages/devices
pageTitle: 产品规格数据库
pageSubTitle: 龙芯 XA61200
---

::: info
龙芯 XA61200 是由龙芯中科推出的，基于 3A6000-HV 平台设计的 DTX (203×244mm) 台式机主板。

该主板一般被认为是 3A6000 平台的参考设计：除龙芯外，还有许多其他厂商推出了基于该主板的派生设计。该主板于 2023 年发布，是首个下探到 2000 元价位以下并大量出货的龙芯主板，由于其当时较高的性价比受到用户社区的喜好（并给予其"绿板"的昵称），并成为许多龙芯入门玩家的第一张主板。
:::

<Device>
<template #spec>

| 类别 | 规格 |
|------|------|
| 厂商 | 龙芯中科 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | DDR4 @ 3200MT/s (2 × DIMM) |
| 接口 (PCIe) | PCIe 3.0 x16（x8 信号）、PCIe 3.0 x8（x8 信号）、PCIe 3.0 x4（x4 信号）|
| 接口 (USB)  | USB 3.0（2 × 板载、2 × 前面板）、USB 2.0（2 × 板载、4 × 前面板） |
| 接口（存储）| 1 × NVMe (PCIe 3.0 x4)、4 × SATA 3.0 |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI、1 × VGA |
| 接口（其他） | 1 × M.2 Key E 接口 (PCIe + USB)、1 × mPCIe (PCIe + USB)、1 组 3.5mm（输入、输出、Line-In）接口、1 × RS-232 串口 (DB-9) |

</template>

<template #known-issues>

<!--@include: @/parts/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/public/images/devices/loongson-xa61200.thumbnail.webp)](/public/images/devices/loongson-xa61200.webp)
来源：《XA61200 主板产品使用手册 V1.1》

</template>

<template #download>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V4.0.05756_prestable2405_0523rel"
  size="8388608"
  date="2024-05-23"
  sha256="e7fac091127d5a759d4c043472f1d6f0838acba7f6efb8da72cccaacedad7e5d"
  url="/devices/loongson-xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05756_prestable2405_0523rel.fd"
  latest
>

IDK what to write here.

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V4.0.05756_prestable2405_0523dbg"
  size="8388608"
  date="2024-05-23"
  sha256="0aed4e73d01f490f5808f18df0056e0f70e38bd2344c45c30bedb6ca0557c6a1"
  url="/devices/loongson-xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05756_prestable2405_0523dbg.fd"
  latest
  debugVersion
>

IDK what to write here.

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V4.0.05634_prestable2402_0325rel"
  size="4194304"
  date="2024-02-29"
  sha256="0ae9de39b02052896dc5d18a4b96cc550ca8af8613c181def39de4b17ff7875d"
  url="/devices/loongson-xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2402_0325rel.fd"
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V4.0.05634_prestable2402_0325dbg"
  size="4194304"
  date="2024-02-29"
  sha256="50da40f1101974f81ce8d64d907efe6362e3e89183080b3c137561683530a7f2"
  url="/devices/loongson-xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2402_0325dbg.fd"
  debugVersion
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V4.0.05634_prestable2311rel"
  size="4194304"
  date="2023-11-29"
  sha256="c8366b5c56675e048df9ef1e0227bf57d0e4efdcc7068798410c18a9277100c3"
  url="/devices/loongson-xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2311rel.fd"
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI 固件"
  version="V4.0.05634_prestable2311dbg"
  size="4194304"
  date="2023-11-29"
  sha256="c8366b5c56675e048df9ef1e0227bf57d0e4efdcc7068798410c18a9277100c3"
  url="/devices/loongson-xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2311dbg.fd"
  debugVersion
>
</DeviceDownloadCard>

</template>
</Device>
