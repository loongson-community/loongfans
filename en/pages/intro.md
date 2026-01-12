---
layout: page
returnLink: /en/
pageTitle: Towards the New World!
pageSubTitle: Welcome to Loongson's World Beyond x86 and ARM
---

Loongson is a rising star in China's domestic chip industry.

Since its birth at Institute of Computing Technology, Chinese Academy of Sciences in 2001, Loongson has undergone numerous iterations and has evolved to be competitive with international players.

In 2021, Loongson launched the independently developed LoongArch instruction set architecture, aiming to build a "third software and hardware ecosystem" after x86 and ARM. Today, Loongson has entered the open market and various Loongson desktops, laptops, servers, and development boards are becoming readily available and have since become prized possessions of community hobbyists and developers alike. Some of our friends at the community have even started using Loongson as their main workhorses.

So, what Loongson products are out there and how do we get to purchase and enjoy them?

## Meeting the Loongson Family

Loongson's processor product line comprises MCUs, embedded SoCs, as well as desktop, workstation, and server-class processors - they are found in a wide range of hardware products. The current product line consist of three families of processors, comprising over ten products.

### Product Familiess

Loongson's processors are divided into three families:

- Loongson 3: Processors for desktops, workstations, and servers, Loongson's performance flagship.
- Loongson 2: SoCs for embedded and industrial computers/controllers, as well as solutions for mobile devices.
- Loongson 1: SoCs/MCUs for edge devices and smaller embedded devices.

Considering that the Loongson 3 and 2 families of chips receive significantly more attention amongst the hobbyists, we will focus on these two families here.

### Current Products

In 2025, Loongson's current embedded and desktop chip products includes follows:

- Loongson 3C6000 family: 16, 32, 64-core processors with mult-socket support, targeting workstations and servers, all models support SMT2 "hyperthreading".
- Loongson 3B6000 family: 8, 12, 16-core processors for high-end desktops and workstations, all models support SMT2 "hyperthreading".
- Loongson 3A6000: 4-core processor for desktop and mobile devices, with SMT2 "hyperthreading".
- Loongson 3B6000M, 2K3000: 8-core low-power processors for industrial computers, embedded devices, desktops, and mobile devices.
- Loongson 2K0300: Single-core embedded SoC for embedded devices and for educational purposes.

:::tip
Loongson 3B6000M is the sister model of 2K3000, clocked slightly higher than the latter (3B6000M is clocked at 2.5GHz, 2K3000 at 2.2GHz).
:::

### Feature Overview

The following table summarizes key feature differences across current products (from highest to lowest performance):

| Model | Core Count | Thread Count | Clock Speed | Memory Channels | PCIe Speeds | PCIe Lanes |
| ----- | ---------- | ------------ | ----------- | --------------- | ----------- | ---------- |
| 3C6000/Q | 64 | 128 | 2.0 - 2.1GHz | 8 | 3.0/4.0† | 64 |
| 3C6000/D | 32 | 64 | 2.1GHz | 8 | 3.0/4.0† | 64 |
| 3C6000/S | 16 | 32 | 2.2GHz | 4 | 3.0/4.0† | 64 |
| 3B6000 | 8-16 | 16-32 | 2.3GHz | 2 | 3.0/4.0† | 32 |
| 3A6000 | 4 | 8 | 2.0 - 2.5GHz | 2 | 3.0 | 32‡ |
| 3B6000M | 8 | 8 | ~2.5GHz | 1 | 3.0 | 8 |
| 2K3000 | 8 | 8 | ~2.2GHz | 1 | 3.0 | 8 |
| 2K0300 | 1 | 1 | 1GHz | 1 | None | None |

- †: Only some models support PCIe 4.0, please refer to the board models and suppliers' specifications.
- ‡: PCIe is provided by the 7A2000 bridge chip.

In addition to current products, the following commonly found chips are also based on LoongArch:

- Loongson 3A5000 (4 cores, 4 threads), 2.0 - 2.5GHz

:::info
For processor specifications, details, and comparisons, please see:

- [Chip Specification Database](/en/pages/chips)
- [Loongson Technology Official Website "Chip Products" Section](https://www.loongson.cn/product/channel).

:::

### Common Board Models

The following are some of the common board models currently available. For board specifications, please see the [Product Database](/en/pages/devices):

- Loongson 3C6000/S: AC612A0_V1.1
- Loongson 3B6000: XB612B0_V1.1
- Loongson 3A6000: XA61200, XA61201, XA612A0
- Loongson 3B6000M: CTCISZ 3B6000M NUC
- Loongson 2K3000: OrangePi Nova, 2K3000 AI Evaluation Board
- Loongson 2K0300: 2K0300 "Hummingbird", ALIENTEK 2K0300 Development Board, CTCISZ ForeverPi

## What Operating Systems Can They Run?

Numerous general-purpose Linux distributions for desktops and servers (commercial and community), specialized Linux distributions (such as OpenWrt), OpenHarmony, and specialized operating systems (such as LoongWorks based on VxWorks, RTOS, etc.) supports LoongArch hardware.

For operating systems, Linux distributions, and common software that supports LoongArch, please see [*AREWELOONGYET?*](https://areweloongyet.com/en/).

## I'm Sold, Where Can I Buy One?

In China Loongson boards can generally be purchased via Taobao or JD.com. Goofish also has a large number of second-hand motherboards and pre-built systems available for purchase, offering better value for money.

Outside of China, though, things get a bit more complex. Outside of using a shopping agent or forwarding service, Mingcong Bai, a staff at our community can help you obtain Loongson hardware:

- Telegram: @JeffBai
- WeChat: mingcongbai
- E-Mail: jeffbai@aosc.io

If you are a student or community developer and are interested in porting, optimizing, and improving various software or applications to or for LoongArch, or need more computational power for your current project, you can also contact the [Roaming Loongson Project](https://github.com/loongson-community/1024) to borrow Loongson hardware (or have us donate it for your project).

## References

At this point, you already have some basic understandings on Loongson. The following is a series of reading materials from our friends in the community, offering reference materials from user guides to troubleshooting guides, as well as processor specifications, ABI specifications, firmware implementation details, and the "new and old world problem" that you may have heard of:

- [FAQ & Troubleshooting](/en/pages/guides)
- [Loongson Motherboard and CPU Database](/en/pages/devices)
- [*AREWELOONGYET?*: LoongArch Ecosystem Construction Information Site](https://areweloongyet.com/)
- [Loong 1-2-3: Compatibility Database for LoongArch](https://loong123.cn/)

Collected reading materials:

- [Chip Specification Database](/en/pages/chips)
- [*AREWELOONGYET?*: Reading Material "New World and Old World"](https://areweloongyet.com/docs/intro)
- [Loongson Technology Official Website "Chip Products" Section](https://www.loongson.cn/product/channel)
