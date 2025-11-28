---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: ASUS XC-LS3A6M
---

The ASUS XC-LS3A6M is a DTX (203×244mm) desktop motherboard based on Loongson 3A6000-HV.

This motherboard was designed and sold by ASUS and is one of the first third-party Loongson 3A6000 motherboards. The motherboard is known for its overclocking support, dual network ports, and additional onboard USB 3.0 ports.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | ASUS |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM) |
| Interfaces (PCIe) | PCIe 3.0 x16 (x8 lanes), PCIe 3.0 x8 (x8 lanes), PCIe 3.0 x4 (x4 lanes) |
| Interfaces (USB)  | USB 3.0 (3 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (Network) | 2 × GbE |
| Interfaces (Video) | 1 × HDMI, 1 × VGA |
| Interfaces (Other) | 1 × M.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces |

## Known Issues

### 7A Bridge Chip Instability

The 7A2000 bridge chip provides PCIe interfaces on this motherboard, but has known (though not officially confirmed) issues that can cause driver instability, screen or application crashes, and even system freezes when using certain peripherals, especially AMD GCN 1.0 to 4.0 series graphics cards. Some distributions provide temporary patches to mitigate these issues, though some users still report problems.

If you experience similar issues, the community recommends improving the case or bridge chip cooling.

### USB Device Loss

Users have reported that USB keyboards and mice randomly stop working after boot and require repeated plugging and unplugging.

Loongson Technology engineers have traced this to [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has been worked around in Linux Kernel 6.15-rc1 and later. Commercial ABI2.0 distributions using the 6.6 kernel and ABI1.0 systems using the 4.19 kernel also include this workaround.

### Lack of Firmware Update

According to user feedback, this motherboard sees few firmware updates and there are multiple known firmware bugs:

- Early firmware lacked the option to turn off x86 UEFI GOP emulation for GPUs, causing newer AMD graphics cards (RX 5000 and above) and Intel discrete graphics cards to be unusable.
- Some firmware versions do not output a display signal from discrete graphics cards, while the onboard HDMI output (7A2000) only displays a cursor.

More seriously, firmware updates for this motherboard are not released in any public, fixed venue.

::: tip
If you have purchased this motherboard and encountered firmware-related issues, please contact your distributor. Should you be able to obtain related firmware updates, we encourage that you [contact us](https://github.com/loongson-community/loongfans/issues/new) to upload firmware for others to use.
:::

## Product Images

![](/public/images/devices/asus-xc-ls3a6m.webp)
Source: [AliExpress](https://aliexpress.com/item/1005006592333955.html)