---
layout: page
returnLink: /en/pages/guides
pageTitle: Before Powering On
pageSubTitle: From purchase to getting started, how to get a good experience?
---

# Unboxing and Getting Started: What Else Do You Need to Buy?

Loongson devices are typically sold as "motherboard and CPU bundles" (i.e., motherboard and processor sold together). Besides purchasing a pre-built system, you will need to buy some accessories based on the board specifications and your own needs.

:::info
For specifications and known issues of various boards and pre-built systems, please see the [Hardware Specification Database](/en/pages/devices).
:::

Taking desktop motherboards as an example, here are some tips and precautions for purchasing and assembling a Loongson computer:

- Loongson motherboards typically come with a CPU and cooler, so you usually don't need to purchase a cooler separately
- Desktop-class Loongson processors generally consume less than 150W, so when choosing a power supply, the main consideration is the power requirements of peripherals such as graphics cards
- All LoongArch-based Loongson motherboards provide NVMe interfaces; using NVMe drives is recommended for the best experience
- Loongson processors, especially high-end models such as 3C6000/S, have high memory performance requirements. We recommend purchasing an appropriate number of RAM modules with matching specifications based on the number of motherboard slots
- Since Loongson onboard/bridge chip graphics (such as LoongGPU LG110 integrated on the 7A2000 bridge chip) are still relatively weak, we recommend purchasing a discrete graphics card for a good desktop experience
    - Currently, AMD graphics cards have the best support; Intel discrete graphics cards are also an option. NVIDIA graphics cards are not supported
    - Graphics cards from Chinese GPU vendors such as Fenghua, Jingjiawei, and Moore Threads generally do not provide continuously maintained ABI2.0 system drivers and are not recommended for community users

## How to Choose RAM?

Memory compatibility has always been a challenge on the Loongson platform. If you use incompatible or unverified RAM modules, it may cause system instability.

::: info
- For a list of RAM modules compatible with the Loongson platform, please see [Loong 1-2-3's Memory Compatibility List](https://loong123.cn/list-hardwares.html)
- Generally speaking, RAM modules with Hynix chips have decent compatibility
- If supported by the platform, we recommend purchasing RAM modules with Registered ECC functionality
:::

## How to Choose a Graphics Card?

As mentioned above, AMD graphics cards work best with Loongson. Since current Loongson products can handle desktop multimedia and productivity workloads, we recommend choosing graphics cards with good performance and hardware video encoding/decoding to fully utilize the platform's capabilities. Below are our recommendations:

- High-end: AMD Radeon RX 7600 or higher models
- Mid-range: AMD Radeon RX 550, Radeon Pro WX 3100 or higher models

If your budget is limited, consider the following basic graphics cards. Note that these may not output 4K @ 60Hz video signals or hardware-accelerate newer codecs such as H.265 and AV1:

- Low-end: AMD Radeon R7 240 and other entry-level graphics cards (not recommended)

## Operating System Support

Thanks to the efforts of many developers and communities working on LoongArch, current Loongson platforms are supported by many Linux distributions. Below are our categorized recommendations for community distributions:

- Beginner: AOSC OS, deepin 23
- Advanced: Arch Linux for Loong64, Debian, Gentoo, NixOS, Slackwareloong
- Specialized: Alpine, OpenWrt, Proxmox VE
- Featured: Linux from Scratch, Yongbao

Commercial systems such as UOS, KylinOS, NFSCNS, openEuler, and OpenHarmony are also available.
