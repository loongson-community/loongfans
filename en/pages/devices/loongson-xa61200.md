---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Database
pageSubTitle: Loongson XA61200
---

:::info
The Loongson XA61200 is a DTX (203×244mm) desktop motherboard based on Loongson 3A6000-HV.

This motherboard is generally considered the reference design for all Loongson 3A6000 motherboards. In addition to Loongson Technology, many other manufacturers have launched derivative designs based on this motherboard. The motherboard was released in 2023 and is the first Loongson motherboard to reach below the CNY 2000 price point and saw general availability from common e-commerce sites.

Due to its good cost-to-performance ratio at that time, it was well received by the user community (and affectionately named "the Green Board"). The XA61200 was the first motherboard for many Loongson beginners.
:::

<Device>
<template #spec>

| Category | Specification |
| ---- | ---- |
| Manufacturer | Loongson Technology |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM) |
| Interfaces (PCIe) | PCIe 3.0 x16 (x8 lanes), PCIe 3.0 x8 (x8 lanes), PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB) | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

</template>

<template #known-issues>

<!--@include: @/en/parts/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa61200.thumbnail.webp)](/images/devices/loongson-xa61200.webp)
Source: "XA61200 主板产品使用手册 V1.1"

</template>

<template #download>

<DeviceDownloadCard
  title="UEFI Firmware"
  version="V4.0.05756_prestable2405_0523rel"
  size="8388608"
  date="2024-05-23"
  sha256="e7fac091127d5a759d4c043472f1d6f0838acba7f6efb8da72cccaacedad7e5d"
  url="https://file.loongfans.cn/xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05756_prestable2405_0523rel.fd"
  latest
>

Introduces firmware-level driver for YT6801 NIC, support for custom fan curves, fast boot, and TPM. Fixes cache synchronization on S3 suspend, improving stability.

<template #detail>

Detailed changes for this updates are as follows (quoting [GitHub: loongson/Firmware](https://github.com/loongson/Firmware))：

1. Add YT6801UndiDxe Support.
2. Use 128bit to distinguish different ChipName.
3. UI: Add UsbXhci Controller Switch.
4. UI: Add SmartFan Config.
   REF: #98
5. Add support for a range of chip models.
6. UI: Add FastBoot option.
7. Add SuperIo Virtual Bus.
8. Optimize StatusCode.
9. Add Tpm Support.
10. Optimize 3rd OptionRom process.
11. UpdateFwDxe: Add inspection rules.
12. Optimize language selection function.
13. AcpiStrSleep: Fix cache synchronization memory.
    REF: #88
14. Information: Dynamically obtain cores from gEfiMpServiceProtocolGuid
15. Update mem code to V3.35.
16. UI: Add real-time display of temperature.
17. Information: Display SATA DVD info in UI Setup
18. Separate FV, decouple cache and mem execution, Lzma compresses the original logo data.
19. Add 4M/8M flash compatibility.
20. Add Smbios 32/64bit tables.
21. Optimize Cpu Interface and update the Ls7a2000Ppi.efi to v1.6.2.
22. Transfer frequency points to the kernel based on different chip models.
23. some bug fixs.

</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI Firmware"
  version="V4.0.05756_prestable2405_0523dbg"
  size="8388608"
  date="2024-05-23"
  sha256="0aed4e73d01f490f5808f18df0056e0f70e38bd2344c45c30bedb6ca0557c6a1"
  url="https://file.loongfans.cn/xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05756_prestable2405_0523dbg.fd"
  latest
  debug
>

Introduces firmware-level driver for YT6801 NIC, support for custom fan curves, fast boot, and TPM. Fixes cache synchronization on S3 suspend, improving stability.

<template #detail>

Detailed changes for this updates are as follows (quoting [GitHub: loongson/Firmware](https://github.com/loongson/Firmware))：

1. Add YT6801UndiDxe Support.
2. Use 128bit to distinguish different ChipName.
3. UI: Add UsbXhci Controller Switch.
4. UI: Add SmartFan Config.
   REF: #98
5. Add support for a range of chip models.
6. UI: Add FastBoot option.
7. Add SuperIo Virtual Bus.
8. Optimize StatusCode.
9. Add Tpm Support.
10. Optimize 3rd OptionRom process.
11. UpdateFwDxe: Add inspection rules.
12. Optimize language selection function.
13. AcpiStrSleep: Fix cache synchronization memory.
    REF: #88
14. Information: Dynamically obtain cores from gEfiMpServiceProtocolGuid
15. Update mem code to V3.35.
16. UI: Add real-time display of temperature.
17. Information: Display SATA DVD info in UI Setup
18. Separate FV, decouple cache and mem execution, Lzma compresses the original logo data.
19. Add 4M/8M flash compatibility.
20. Add Smbios 32/64bit tables.
21. Optimize Cpu Interface and update the Ls7a2000Ppi.efi to v1.6.2.
22. Transfer frequency points to the kernel based on different chip models.
23. some bug fixs.

</template>

</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI Firmware"
  version="V4.0.05634_prestable2402_0325rel"
  size="4194304"
  date="2024-02-29"
  sha256="0ae9de39b02052896dc5d18a4b96cc550ca8af8613c181def39de4b17ff7875d"
  url="https://file.loongfans.cn/xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2402_0325rel.fd"
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI Firmware"
  version="V4.0.05634_prestable2402_0325dbg"
  size="4194304"
  date="2024-02-29"
  sha256="50da40f1101974f81ce8d64d907efe6362e3e89183080b3c137561683530a7f2"
  url="https://file.loongfans.cn/xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2402_0325dbg.fd"
  debug
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI Firmware"
  version="V4.0.05634_prestable2311rel"
  size="4194304"
  date="2023-11-29"
  sha256="c8366b5c56675e048df9ef1e0227bf57d0e4efdcc7068798410c18a9277100c3"
  url="https://file.loongfans.cn/xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2311rel.fd"
>
</DeviceDownloadCard>

<DeviceDownloadCard
  title="UEFI Firmware"
  version="V4.0.05634_prestable2311dbg"
  size="4194304"
  date="2023-11-29"
  sha256="c8366b5c56675e048df9ef1e0227bf57d0e4efdcc7068798410c18a9277100c3"
  url="https://file.loongfans.cn/xa61200/UDK2018-3A6000-7A2000_EVB_V4.0.05634_prestable2311dbg.fd"
  debug
>
</DeviceDownloadCard>

</template>

</Device>
