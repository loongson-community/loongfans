---
layout: page
returnLink: /en/pages/guides
pageTitle: Before Powering On
pageSubTitle: From Purchase to Getting Started, How to Get a Good Experience?
---

# Unboxing and Getting Started: What Else Do You Need to Buy?

Loongson devices are generally sold as "motherboard and CPU bundles" (i.e., motherboard and processor sold together). Besides purchasing a pre-built system, you will need to buy some accessories based on the board specifications and your own needs.

:::info
For specifications and known issues of various boards and pre-built systems, please see the [Hardware Specification Database](/en/pages/devices).
:::

Taking desktop motherboards as an example, here are some tips and precautions for purchasing and assembling a Loongson computer:

- Loongson motherboards are generally sold with CPU and cooler together, so you generally don't need to purchase a cooler separately
- Desktop-class Loongson processors generally consume less than 150W, so when choosing a power supply, the main consideration is the needs of peripherals such as graphics cards
- Loongson motherboards based on LoongArch all provide NVMe interfaces. It is recommended to use NVMe hard drives to ensure a good user experience
- Loongson processors, especially high-end models such as 3C6000/S, have high demands on memory performance. It is recommended to purchase a corresponding number of RAM modules with appropriate specifications based on the number of motherboard slots
- Since the Loongson onboard/bridge chip graphics (such as LoongGPU LG110 integrated on the 7A2000 bridge chip) are still relatively weak, we recommend purchasing a discrete graphics card to ensure a good desktop experience
    - Currently, AMD graphics cards have the best support, and you may also consider purchasing Intel discrete graphics cards. NVIDIA graphics cards are not supported
    - Graphics cards from indigenous manufacturers such as Fenghua, Jingjiawei, and Moore Threads generally do not release continuously maintained ABI 2.0 system drivers and are not recommended for community users

## How to Choose RAM?

Memory compatibility has always been a challenge on the Loongson platform. If you use incompatible or unverified RAM modules, it may cause system instability.

::: info
- For a list of RAM modules compatible with the Loongson platform, please see [Loong 1-2-3's Memory Compatibility List](https://loong123.cn/list-hardwares.html)
- Generally speaking, RAM modules with Hynix chips have decent compatibility
- If supported by the platform, we recommend purchasing RAM modules with Registered ECC functionality
:::

## How to Choose a Graphics Card?

As mentioned above, Loongson generally pairs best with AMD graphics cards. Considering that current Loongson products can already handle desktop multimedia and productivity performance needs, we recommend purchasing graphics cards with more complete performance and multimedia encoding/decoding functions to fully utilize the platform's capabilities. The following are graphics cards we recommend purchasing that meet the above standards:

- High-end: AMD Radeon RX 7600 or higher models
- Mid-range: AMD Radeon RX 550, Radeon Pro WX 3100 or higher models

If your budget is currently limited, consider the following "basic graphics cards", but please note that these graphics cards may not be able to output 4K @ 60Hz video signals, nor accelerate decoding of video files with newer encoding formats such as H.265 and AV1:

- Low-end: AMD Radeon R7 240 and other entry-level graphics cards (not recommended)

## Operating System Support

Thanks to the efforts of many developers and communities that pay attention to and support LoongArch, current Loongson platforms are supported by many Linux distributions. The following are our categorized recommendations for community distributions:

- Beginner: AOSC OS, deepin 23
- Advanced: Arch Linux for Loong64, Debian, Gentoo, NixOS, Slackwareloong
- Specialized: Alpine, OpenWrt, Proxmox VE
- Featured: Linux from Scratch, Yongbao

In addition, there are commercial systems such as UOS, KylinOS, NFSCNS, openEuler, and OpenHarmony available for selection.
