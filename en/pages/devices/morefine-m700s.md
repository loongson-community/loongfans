---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Morefine M700S mini PC
---


The Morefine M700S is an Intel NUC-style mini PC powered by Loongson 3A6000-HV and providing dual HDMI outputs.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | Morefine |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × SODIMM) |
| Interfaces (USB)  | 4 × USB 3.0, 2 × USB 2.0, 1 × USB-C |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 1 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 2 × HDMI |
| Interfaces (Other) | 1 × M.2 Key E interface (PCIe + USB), 1 × 3.5mm headphone/microphone jack |

## Known Issues

### USB Device Loss Issue

Users have reported that USB keyboards and mice may randomly stop working after boot and require re-plugging to function.

Loongson Technology engineers traced this to [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). A workaround is available in Linux Kernel 6.15-rc1 and later. Commercial ABI2.0 distributions using the 6.6 kernel and ABI1.0 systems using the 4.19 kernel also include this fix.

## Product Images

[![](/public/images/devices/morefine-m700s.thumbnail.webp)](/public/images/devices/morefine-m700s.webp)
Source: [Morefine Official Website](http://www.imorefine.com/h-pd-53.html)

