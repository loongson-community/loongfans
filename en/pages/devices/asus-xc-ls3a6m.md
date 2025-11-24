---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: ASUS XC-LS3A6M
---


The ASUS XC-LS3A6M is a DTX (203×244mm) desktop motherboard launched by ASUS, designed based on the 3A6000-HV platform.

This motherboard was designed and sold by ASUS and is one of the first third-party motherboards for the Loongson 3A6000. Its features include overclocking support, dual network ports, and additional USB 3.0 onboard interfaces.

## Main Specifications

| Category | Specification |
|------|------|
| Manufacturer | ASUS |
| Form Factor | DTX (203×244mm) |
| Processor | 3A6000-HV @ 2.5GHz |
| Memory | DDR4 @ 3200MT/s (2 × DIMM) |
| Interface (PCIe) | PCIe 3.0 x16 (x8 lanes), PCIe 3.0 x8 (x8 lanes), PCIe 3.0 x4 (x4 lanes) |
| Interface (USB)  | USB 3.0 (3 × onboard, 2 × front panel), USB 2.0 (2 × onboard, 4 × front panel) |
| Interface (Storage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interface (Network) | 2 × GbE |
| Interface (Video) | 1 × HDMI, 1 × VGA |
| Interface (Other) | 1 × m.2 Key E interface (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 set of 3.5mm (input, output, Line-In) interfaces |

## Known Issues

### 7A Bridge Chip Stability Issues

This motherboard uses the 7A2000 bridge chip to provide PCIe interfaces, but due to known (but not officially confirmed) reasons with this bridge chip, when using certain peripherals (especially AMD GCN 1.0 - 4.0 series graphics cards), there may be driver instability, screen/application crashes, or even system freezes. Currently, some distributions provide temporary patches for workarounds, which can greatly alleviate the problem, but some users still report encountering similar issues.

If you encounter similar situations, according to community recommendations, we suggest you avoid this problem by enhancing case or bridge chip cooling.

### USB Device Loss Issue

According to user feedback, during the use of this motherboard, after starting the system, USB keyboard and mouse randomly fail, and need to be repeatedly plugged and unplugged to work.

According to investigations by Loongson Technology engineers, this is caused by [a hardware defect in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). This issue has been worked around in Linux kernel 6.15-rc1 or higher versions. Commercial ABI 2.0 distributions using the 6.6 kernel and ABI 1.0 systems using the 4.19 kernel both include workarounds for this issue.

### Firmware Update Issues

According to user feedback, this motherboard's firmware updates are infrequent, and there are multiple known issues:

- Early firmware lacked the GPU UEFI GOP x86 emulation switch, causing newer AMD graphics cards (RX 5000 and above) and Intel discrete graphics cards to be unusable
- Some firmware versions still do not output signals from the discrete graphics card after insertion, while the onboard 7A2000 HDMI output only displays a cursor

More seriously, firmware updates for this motherboard are not released in any public, fixed venue.

::: tip
If you have purchased this motherboard and encountered related issues, please contact your distributor. If you obtain related firmware updates, we welcome you to [contact this site](https://git.whlug.cn/loongweb/loong123/issues/new) to upload related materials.
:::

## Product Images

![](/public/images/devices/asus-xc-ls3a6m.webp)
Source: [AliExpress Store](https://aliexpress.com/item/1005006592333955.html)

