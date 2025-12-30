---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Database
pageSubTitle: Loongson AC612A0_V1.1
---

::: info
The Loongson AC612A0_V1.1 is an ATX (244×305mm) desktop/server motherboard based on Loongson 3C6000/S.

This motherboard is an entry-level Loongson 3C6000/S motherboard, with a relatively comprehensive set of interfaces and support for out-of-band management (BMC) modules for remote operation and management.
:::

<Device>
<template #spec>

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | ATX (244×305mm) |
| Processor | 3C6000/S @ 2.0/2.2GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports RECC |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16, 2 × PCIe 3.0 x8 |
| Interfaces (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0, 1 × SFF-8654-4i interface |
| Interfaces (Network) | 2 × GbE |
| Interfaces (Video) | 1 × VGA |
| Interfaces (Other) | 1 × BMC module interface†‡, 1 × BMC network interface, 1 × m.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output) interfaces, 1 × RS-232 serial port (DB-9) |

- †: Supports BMC modules based on AST2500 or Loongson 2K0500.
- ‡: There is also a version of this motherboard known as "domestic[-only] (Chinese) component", which does not come with a slot for BMC modules.

</template>

<template #known-issues>

<!--@include: @/en/parts/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/images/devices/loongson-ac612a0-v1.1.webp)
Source: "龙芯 3C6000 单路服务器主板产品规格书 V1.0"

</template>
</Device>
