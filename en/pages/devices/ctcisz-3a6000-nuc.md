---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: CTCISZ 3A6000 NUC
---

The CTCISZ 3A6000 NUC is an Intel NUC-style mini PC powered by Loongson 3A6000-HV and comes with two HDMI outputs and two Gigabit (GbE) Ethernet ports.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | CTCISZ |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × SODIMM) |
| Interfaces (USB)  | 4 × USB 3.0, 2 × USB 2.0, 1 × USB-C |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 1 × SATA 3.0 |
| Interfaces (Network) | 2 × GbE |
| Interfaces (Video) | 2 × HDMI |
| Interfaces (Other) | 1 × M.2 Key E interface (PCIe + USB), 1 × 3.5mm headphone/microphone jack |

## Known Issues

### USB Device Loss

According to user feedback, USB keyboard and mouse may randomly fail on this motherboard after they boot an operating system. When this happens, they needed to repeatedly plug and unplug their peripherals for them to function again.

Following investigation by engineers at Loongson Technology, this is caused by [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has since been worked around in Linux kernel 6.15-rc1 or higher versions with a quirk. Commercial ABI 2.0 distributions using Linux Kernel 6.6, as well as ABI 1.0 systems using Linux Kernel 4.19 include workarounds for this issue.

## Product Images

[![](/public/images/devices/ctcisz-3a6000-nuc.thumbnail.webp)](/public/images/devices/ctcisz-3a6000-nuc.webp)
Source: CTCISZ