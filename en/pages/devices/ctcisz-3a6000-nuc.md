---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: CTCISZ 3A6000 mini PC
---


The CTCISZ 3A6000 mini PC is a mini PC similar to Intel NUC specifications, equipped with a 3A6000-HV processor and providing dual HDMI outputs and dual gigabit (GbE) Ethernet ports.

## Main Specifications

| Category | Specification |
|------|------|
| Manufacturer | CTCISZ |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × SODIMM) |
| Interface (USB)  | 4 × USB 3.0, 2 × USB 2.0, 1 × USB-C |
| Interface (Storage) | 1 × NVMe (PCIe 3.0 x4), 1 × SATA 3.0 |
| Interface (Network) | 2 × GbE |
| Interface (Video) | 2 × HDMI |
| Interface (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 × 3.5mm headphone/microphone jack |

## Known Issues

### USB Device Loss Issue

According to user feedback, during the use of this motherboard, after starting the system, USB keyboard and mouse randomly fail, and need to be repeatedly plugged and unplugged to work.

According to investigations by Loongson Technology engineers, this is caused by [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has been worked around in Linux kernel 6.15-rc1 or higher versions. Commercial ABI 2.0 distributions using the 6.6 kernel and ABI 1.0 systems using the 4.19 kernel both include workarounds for this issue.

## Product Images

[![](/public/images/devices/ctcisz-3a6000-nuc.thumbnail.webp)](/public/images/devices/ctcisz-3a6000-nuc.webp)
Source: CTCISZ


