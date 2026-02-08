---
layout: page
returnLink: /en/devices
pageTitle: Product Database
pageSubTitle: Loongson XB612B0_V1.2
---

:::info
The Loongson XB612B0_V1.2 is an mATX (244×244mm) desktop motherboard based on Loongson 3B6000.

This motherboard may come with different 3B6000 processors, including 8/12/16 cores (16/24/32 threads) models, and supports Registered ECC memory. The motherboard also provides two m.2 NVMe (PCIe 3.0 x4) 2280 interfaces, the most amount of onboard NVMe slots amongst current Loongson-based motherboards.

Compared to the [AC612A0_V1.1](/en/devices/loongson-ac612a0-v1.1.md) based on Loongson 3C6000/S, the XB612B0_V1.2 motherboard provides two fewer memory slots and one fewer PCIe 3.0 x8 interface. However, considering its relatively smaller form factor, this motherboard still has a remarkable feature set and expandability, and offers better value for money for personal buyers.
:::

<DeviceDetail>
<template #spec>

| Category | Specification |
| ---- | ---- |
| Manufacturer | Loongson Technology |
| Form Factor | mATX (244×244mm) |
| Processor | 3B6000 @ 2.0/2.3GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports RECC |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16, 1 × PCIe 3.0 x8 |
| Interfaces (USB) | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 2 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 2 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-xb612b0-v1.2.thumbnail.webp)](/images/devices/loongson-xb612b0-v1.2.webp)
Source: Xi Ruoyao

</template>

</DeviceDetail>
