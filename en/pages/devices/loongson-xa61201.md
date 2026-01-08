---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Database
pageSubTitle: Loongson XA61201
---

:::info
The Loongson XA61201 is a DTX (203×244mm) desktop motherboard based on Loongson 3A6000-HV.

Compared to the [XA61200](/en/pages/devices/loongson-xa61200), the XA61201 motherboard:

- Supports ECC memory
- Has its PCIe 3.0 x8 slot in the third slot space changed to a PCIe 3.0 x16 interface (x8 lanes)

:::

<Device>
<template #spec>

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports ECC† |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16 (x8 lanes), 1 × PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

†: The state of ECC memory support of this motherboard is currently unclear. It is also not clear whether it supports Registered ECC memory. DMI information also does not declare 72-bit wide memory interface.

</template>

<template #known-issues>

<!--@include: @/en/parts/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa61201.thumbnail.webp)](/images/devices/loongson-xa61201.webp)
Source: "XA61201 主板产品使用手册 V1.0"

</template>
</Device>
