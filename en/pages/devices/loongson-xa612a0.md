---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Loongson XA612A0
---


The Loongson XA612A0 is an ATX (244×305mm) desktop motherboard launched by Loongson Technology, designed based on the 3A6000-HV platform.

This motherboard is the first 3A6000 motherboard released by Loongson and is generally considered an evaluation board (Evaluation Board).

## Main Specifications

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | ATX (244×305mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports ECC† |
| Interface (PCIe) | 2 × PCIe 3.0 x16 (x8 lanes), 1 × PCIe 3.0 x4 (x4 lanes) |
| Interface (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interface (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interface (Network) | 1 × GbE |
| Interface (Video) | 1 × HDMI, 1 × VGA |
| Interface (Other) | 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

†: The ECC support range of this motherboard is currently unclear, and it is not clear whether it supports Registered ECC memory. DMI information also does not expose 72-bit wide memory.

## Known Issues

### 7A Bridge Chip Stability Issues

This motherboard uses the 7A2000 bridge chip to provide PCIe interfaces, but due to known (but not officially confirmed) reasons with this bridge chip, when using certain peripherals (especially AMD GCN 1.0 - 4.0 series graphics cards), there may be driver instability, screen/application crashes, or even system freezes. Currently, some distributions provide temporary patches for workarounds, which can greatly alleviate the problem, but some users still report encountering similar issues.

If you encounter similar situations, according to community recommendations, we suggest you avoid this problem by enhancing case or bridge chip cooling.

## Product Images

[![](/public/images/devices/loongson-xa612a0.thumbnail.webp)](/public/images/devices/loongson-xa612a0.webp)
Source: "XA612A0 Motherboard User Manual V1.0"
