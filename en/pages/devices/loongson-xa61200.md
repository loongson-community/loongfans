---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Loongson XA61200
---


The Loongson XA61200 is a DTX (203×244mm) desktop motherboard by Loongson Technology, based on the 3A6000-HV platform.

This motherboard is generally considered the reference design for the 3A6000 platform, and many manufacturers have released derivative designs based on it. Released in 2023, it was the first Loongson motherboard to drop below 2000 yuan and ship in large volumes. Its competitive pricing made it popular with the community, earning the nickname "green board" and becoming the first Loongson board for many hobbyists.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM) |
| Interfaces (PCIe) | PCIe 3.0 x16 (x8 lanes), PCIe 3.0 x8 (x8 lanes), PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × M.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

## Known Issues

### 7A2000 Bridge Chip Stability Issues

The 7A2000 bridge chip provides PCIe interfaces on this motherboard, but has known (though not officially confirmed) issues that can cause driver instability, screen or application crashes, and even system freezes when using certain peripherals, especially AMD GCN 1.0 to 4.0 series graphics cards. Some distributions provide temporary patches to mitigate these issues, though some users still report problems.

If you experience similar issues, the community recommends improving the case or bridge chip cooling.

## Product Images

[![](/public/images/devices/loongson-xa61200.thumbnail.webp)](/public/images/devices/loongson-xa61200.webp)
Source: "XA61200 Motherboard Product User Manual V1.1"

