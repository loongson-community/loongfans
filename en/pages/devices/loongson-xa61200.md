---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Loongson XA61200
---


The Loongson XA61200 is a DTX (203×244mm) desktop motherboard launched by Loongson Technology, designed based on the 3A6000-HV platform.

This motherboard is generally considered the reference design for the 3A6000 platform: in addition to Loongson, many other manufacturers have launched derivative designs based on this motherboard. The motherboard was released in 2023 and is the first Loongson motherboard to reach below the 2000 yuan price point and ship in large quantities. Due to its relatively high cost-effectiveness at the time, it was well received by the user community (and given the nickname "green board"), and became the first motherboard for many Loongson beginners.

## Main Specifications

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM) |
| Interface (PCIe) | PCIe 3.0 x16 (x8 lanes), PCIe 3.0 x8 (x8 lanes), PCIe 3.0 x4 (x4 lanes) |
| Interface (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interface (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interface (Network) | 1 × GbE |
| Interface (Video) | 1 × HDMI, 1 × VGA |
| Interface (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

## Known Issues

### 7A Bridge Chip Stability Issues

This motherboard uses the 7A2000 bridge chip to provide PCIe interfaces, but due to known (but not officially confirmed) reasons with this bridge chip, when using certain peripherals (especially AMD GCN 1.0 - 4.0 series graphics cards), there may be driver instability, screen/application crashes, or even system freezes. Currently, some distributions provide temporary patches for workarounds, which can greatly alleviate the problem, but some users still report encountering similar issues.

If you encounter similar situations, according to community recommendations, we suggest you avoid this problem by enhancing case or bridge chip cooling.

## Product Images

[![](/public/images/devices/loongson-xa61200.thumbnail.webp)](/public/images/devices/loongson-xa61200.webp)
Source: "XA61200 Motherboard Product User Manual V1.1"

