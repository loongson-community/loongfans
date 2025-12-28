---
layout: page
returnLink: /en/pages/guides
pageTitle: Getting Started
pageSubTitle: Your Guide from Unboxing to a Happy User
---

# Before Powering On: What Else Do I Need to Buy?

Loongson devices are typically sold as "motherboard and CPU bundles" (i.e., motherboard and processor sold together). Besides purchasing a pre-built system, you will need to buy some accessories based on the board specifications and your own needs.

:::info
For specifications and known issues of various boards and pre-built systems, please refer to the [Hardware Specification Database](/en/pages/devices).
:::

For instance, to build a Loongson desktop computer, there are some common tips to follow:

- Loongson motherboards are generally sold with CPU and cooler aseemblies in the same package, so you won't have to purchase a cooler separately.
- Desktop-class Loongson processors generally consume less than 150 watts, when choosing a power supply, your main point of concern would be the power requirement of peripherals such as graphics cards.
- All LoongArch-based motherboards all come with NVMe interfaces, using NVMe drives should provide good day-to-day experience.
- Loongson processors, especially high-end models such as 3C6000/S, depends on high performance RAM modules and sufficient channels to perform at their fullest potential. It it generally recommended to purchase the appropriate amount of RAM at appropriate specifications.
- Since the Loongson onboard/bridge chip graphics (such as LoongGPU LG110 integrated on the 7A2000 bridge chip) are known to be slow, we recommend purchasing a discrete graphics card to ensure a good desktop experience.
    - AMD graphics cards are generally well supported (Intel cards may also be good options). NVIDIA graphics cards are not supported.

## The RAM Question

Memory compatibility has always been a challenge on Loongson platforms. If you use incompatible or unverified RAM modules, operating systems and applications may not run reliably.

:::info
- For a list of RAM modules known to be compatible on Loongson platforms, please see [Loong 1-2-3's Memory Compatibility List](https://loong123.cn/list-hardwares.html).
- Generally speaking, RAM modules with Hynix chips are well supported.
- If supported by the particular chip and motherboard, we recommend purchasing Registered ECC RAM modules.
:::

## The GPU Question

As mentioned above, Loongson generally pairs best with AMD graphics cards. Considering that current Loongson products can already handle desktop multimedia and productivity performance needs, we recommend purchasing graphics cards with decent performance and multimedia encoding/decoding functionalities to fully utilize your device's capabilities.

The following are graphics cards we recommend purchasing that meet the suggestions above:

- High-end: AMD Radeon RX 7600 or higher models
- Mid-range: AMD Radeon RX 550, Radeon Pro WX 3100 or higher models

If your budget is limited, you may consider the following models. However, please note that these graphics cards may not be able to output 4K video signals at 60Hz refresh rate, H.265 and AV1 encoding or decoding may also not be available:

- Low-end: AMD Radeon R7 240 and other entry-level graphics cards (not recommended)

## The OS Question

Thanks to the efforts of many communities and developers, many Linux distros support current Loongson (LoongArch) platforms. We recommend the following distros for use with Loongson computers:

- Beginner: AOSC OS, deepin 23
- Intermediate and Advanced: Arch Linux for Loong64, Debian, Gentoo, NixOS, Slackwareloong
- Specialized: Alpine, OpenWrt, Proxmox VE
- Featured: Linux from Scratch, Yongbao

There are also commercial systems from China and Russia, such as UOS, KylinOS, NFSCNS, openEuler, ALT Linux, and OpenHarmony available.
