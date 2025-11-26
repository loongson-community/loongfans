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
| Interfaces (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces |

## Known Issues

### 7A Bridge Chip Instability

This motherboard uses a 7A2000 bridge chip to provide PCIe interfaces, but due to known (yet not officially confirmed) reasons with this bridge chip, when using certain peripherals (especially graphics cards based on AMD GCN 1.0 - 4.0), you may experience driver crashes, graphical interface/application crashes, or even freezes. Currently, some Linux distributions include temporary patches to workaround this issue, which can greatly alleviate the problem, but distributions maintainers are still receiving reports on said issues.

If you encounter the aforementioned issue, community members recommend enhancing case or bridge chip cooling as a further remedy.

### USB Device Loss

According to user feedback, USB keyboard and mouse may randomly on this motherboard after they boot an operating system. When this happens, they needed to repeatedly plug and unplug their peripherals for them to function again.

Following investigation by engineers at Loongson Technology, this is caused by [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has since been worked around in Linux kernel 6.15-rc1 or higher versions with a quirk. Commercial ABI 2.0 distributions using Linux Kernel 6.6, as well as ABI 1.0 systems using Linux Kernel 4.19 include workarounds for this issue.

### Lack of Firmware Update

According to user feedback, this motherboard's sees few firmware updates and there are multiple known firmware bugs:

- Early firmware lacked the option to turn off x86 UEFI GOP emulation for GPUs, causing newer AMD graphics cards (RX 5000 and above) and Intel discrete graphics cards to be unusable.
- Some firmware versions do not output a display signal from discrete graphics cards, while the onboard HDMI output (7A2000) only displays a cursor.

More seriously, firmware updates for this motherboard are not released in any public, fixed venue.

::: tip
If you have purchased this motherboard and encountered firmware-related issues, please contact your distributor. Should you be able to obtain related firmware updates, we encourage that you [contact us](https://github.com/loongson-community/loongfans/issues/new) to upload firmware for others to use.
:::

## Product Images

![](/public/images/devices/asus-xc-ls3a6m.webp)
Source: [AliExpress](https://aliexpress.com/item/1005006592333955.html)