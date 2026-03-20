<template #introduction>

:::info
The ASUS XC-LS3A6M-A is a DTX (203×244mm) desktop motherboard based on Loongson 3A6000-HV.

This motherboard was designed and sold by ASUS and is one of the first third-party Loongson 3A6000 motherboards. The difference from the XC-LS3A6M is that the position of the M.2 Key E interface has been adjusted, the onboard USB 3.0 interface has been changed to PCIe x1, one network port has been removed, and the USB interface configuration has also been adjusted.
:::

</template>

<template #spec>

| Category | Specification |
| ---- | ---- |
| Manufacturer | ASUS |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM) |
| Interfaces (PCIe) | PCIe 3.0 x1 (x1 lanes), PCIe 3.0 x16 (x8 lanes), PCIe 3.0 x8 (x8 lanes), PCIe 3.0 x8 (x4 lanes) |
| Interfaces (USB) | USB 3.0 (2 × onboard, 3 × front panel), USB 2.0 (4 × onboard, 1 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × M.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces |

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

<!--@include: @parts/en/known-issues/usb-device-lost.md -->

### Lack of Firmware Update

According to user feedback, this motherboard sees few firmware updates and there are multiple known firmware bugs:

- Early firmware lacked the option to turn off x86 UEFI GOP emulation for GPUs, causing newer AMD graphics cards (RX 5000 and above) and Intel discrete graphics cards to be unusable.
- Some firmware versions do not output a display signal from discrete graphics cards, while the onboard HDMI output (7A2000) only displays a cursor.

</template>

<template #image>

![ASUS XC-LS3A6M-A Front](/images/devices/asus-xc-ls3a6m-a.webp)
![ASUS XC-LS3A6M-A I/O](/images/devices/asus-xc-ls3a6m-a-back.webp)
Source: Goofish

</template>
