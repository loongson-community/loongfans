---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Loongson XA61201
---


The Loongson XA61201 is a DTX (203×244mm) desktop motherboard from Loongson Technology based on the 3A6000-HV platform.

Key differences from the [XA61200](/en/pages/devices/loongson-xa61200):

- Supports ECC memory
- The third slot is upgraded from PCIe 3.0 x8 to x16 but retaining x8 bandwidth

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | Loongson Technology |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM), supports ECC† |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16 (x8 lanes), 1 × PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB)  | USB 3.0 (2 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × M.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces, 1 × RS-232 serial port (DB-9) |

†: The extent of ECC support remains unclear, including whether Registered ECC memory is supported. DMI information does not expose 72-bit memory width.

## Known Issues

### 7A Bridge Chip Stability Issues

The 7A2000 bridge chip provides PCIe interfaces on this motherboard, but has known (though not officially confirmed) issues that can cause driver instability, screen or application crashes, and even system freezes when using certain peripherals, especially AMD GCN 1.0 to 4.0 series graphics cards. Some distributions provide temporary patches to mitigate these issues, though some users still report problems.

If you experience similar issues, the community recommends improving the case or bridge chip cooling.

## Product Images

[![](/public/images/devices/loongson-xa61201.thumbnail.webp)](/public/images/devices/loongson-xa61201.webp)
Source: "XA61201 Motherboard Product User Manual V1.0"

