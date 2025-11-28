---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Loongson XA612A0
---


The Loongson XA612A0 is an ATX (244×305mm) desktop motherboard from Loongson Technology, based on the 3A6000-HV platform.

This motherboard is Loongson's first 3A6000 motherboard and is generally considered an evaluation board.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | ATX (244×305mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports ECC† |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16 (x8 lanes), 1 × PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

†: The ECC support range of this motherboard is currently unclear, and it is not clear whether it supports Registered ECC memory. DMI information also does not expose 72-bit wide memory.

## Known Issues

### 7A Bridge Chip Stability Issues

The 7A2000 bridge chip provides PCIe interfaces on this motherboard, but has known (though not officially confirmed) issues that can cause driver instability, screen or application crashes, and even system freezes when using certain peripherals, especially AMD GCN 1.0 to 4.0 series graphics cards. Some distributions provide temporary patches to mitigate these issues, though some users still report problems.

If you experience similar issues, the community recommends improving the case or bridge chip cooling.
## Product Images

[![](/public/images/devices/loongson-xa612a0.thumbnail.webp)](/public/images/devices/loongson-xa612a0.webp)
Source: "XA612A0 Motherboard User Manual V1.0"
