---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Loongson AC612A0_V1.1
---


The Loongson AC612A0_V1.1 is an ATX (244×305mm) desktop/server motherboard from Loongson Technology based on the 3C6000/S platform.

This motherboard is an entry-level option for the Loongson 3C6000/S platform, featuring a comprehensive set of interfaces and support for out-of-band management (BMC) modules.

## Key Specifications

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
| Interfaces (Other) | 1 × BMC module interface†‡, 1 × BMC network interface, 1 × M.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output) interfaces, 1 × RS-232 serial port (DB-9) |

- †: Supports BMC modules based on AST2500 or Loongson 2K0500.
- ‡: There is also an "indigenous components" version of this motherboard without the BMC interface.

## Known Issues

### Early Processor Stepping PCIe Speed Negotiation Issue

Early adopters reported that PCIe speed negotiation falls back to PCIe 1.0 when certain AMD graphics cards, RAID controllers, and similar devices are installed, severely degrading performance. After joint debugging by community members and Loongson Technology engineers, the root cause was identified: early 3C6000/S steppings incorrectly define the PCIe bridge speed range as 2.5GT/s instead of the expected 2.5–16GT/s, causing some drivers to assume the platform only supports PCIe 1.0.

A workaround is available via AOSC OS kernel patches: [1](https://github.com/AOSC-Tracking/linux/commit/283358e5b377517ad9f13bd1909b4b931754c196), [2](https://github.com/AOSC-Tracking/linux/commit/874bb3b961fb6bf106b48c61a1671c196976e1f1), and [3](https://github.com/AOSC-Tracking/linux/commit/8d088d7587098ef48e0594bf46c603bb4d7abd52).

## Product Images

[![](/public/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/public/images/devices/loongson-ac612a0-v1.1.webp)
Source: "Loongson 3C6000 Single-Socket Server Motherboard Product Specification V1.0"

