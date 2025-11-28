---
layout: page
returnLink: /en/
pageTitle: March Towards the New World!
pageSubTitle: Welcome to the Loongson world beyond the distant mountains of x86 and ARM
---


Loongson is a star in China's independently developed chip industry. Since its inception at the Institute of Computing Technology, Chinese Academy of Sciences in 2001, Loongson has undergone multiple iterations, gradually closing the performance gap with industry leaders. In 2021, Loongson launched the independently developed LoongArch instruction set architecture, aiming to build the third largest instruction set ecosystem after x86 and ARM. Today, Loongson has entered the open market, and various Loongson desktops, laptops, servers, and development boards are becoming easier to buy, making them a favorite among hobbyists and developers. Some have even started using Loongson as a productivity tool.

As Loongson products grow in variety and the user base expands, how can you get started, have fun, and make the most of Loongson?

## What Loongson Products Are There?

Loongson's products range from MCUs to desktops, workstations, and multi-socket servers. There are three product lines with over ten products in total.

### Product Line Overview

Loongson's current product lines are mainly divided into three:

- Loongson 3 series: Processors for desktops, workstations, and servers, Loongson's performance flagship
- Loongson 2 series: SoCs for embedded and industrial control, with some solutions for mobile devices
- Loongson 1 series: SoCs/MCUs for microcontrollers and edge embedded devices

Considering that the Loongson 3 and 2 series chips receive significantly higher attention in the hobbyist community, we will mainly discuss these two series.

### Current Products

In 2025, Loongson's current embedded and desktop chip products are as follows:

- Loongson 3C6000/S family: 16, 32, 64-core processors supporting multi-socket for workstations and servers, supporting SMT2 hyperthreading
- Loongson 3B6000 family: 8, 12, 16-core processors for high-end desktops and workstations, supporting SMT2 hyperthreading
- Loongson 3A6000: 4-core processor for desktop and mobile, supporting SMT2 hyperthreading
- Loongson 3B6000M, 2K3000: 8-core low-power processors for industrial control, embedded, desktop, and mobile devices
- Loongson 2K0300: Single-core embedded SoC for embedded devices and educational purposes

::: tip
Loongson 3B6000M is the sister model of 2K3000, with a higher clock speed than the latter (3B6000M max clock speed 2.5GHz, 2K3000 max 2.2GHz).
:::

### Product Feature Table

The following table summarizes key feature differences across current products (from highest to lowest performance):

| Processor Model | Cores | Threads | Clock Speed  | Memory Channels | PCIe Standard | PCIe Lanes |
|-----------------|-------|---------|--------------|-----------------|---------------|------------|
| 3C6000/Q        | 64    | 128     | 2.0 - 2.1GHz | 8               | 3.0/4.0†      | 64         |
| 3C6000/D        | 32    | 64      | 2.1GHz       | 8               | 3.0/4.0†      | 64         |
| 3C6000/S        | 16    | 32      | 2.2GHz       | 4               | 3.0/4.0†      | 64         |
| 3B6000          | 8-16  | 16-32   | 2.3GHz       | 2               | 3.0/4.0†      | 32         |
| 3A6000          | 4     | 8       | 2.0 - 2.5GHz | 2               | 3.0           | 32‡        |
| 3B6000M         | 8     | 8       | ~2.5GHz      | 1               | 3.0           | 8          |
| 2K3000          | 8     | 8       | ~2.2GHz      | 1               | 3.0           | 8          |
| 2K0300          | 1     | 1       | 1GHz         | 1               | None          | None       |

- †: Some models support PCIe 4.0, please refer to the board model and distributor specifications.
- ‡: PCIe is provided by the 7A2000 bridge chip.

::: info
For processor specifications, details, and parameter comparisons, please see:

- [Loong 1-2-3 Site "Loongson Chip Parameters" Database](https://loong123.cn/chips/)
- [Loongson Technology Official Website "Chip Products" Section](https://www.loongson.cn/product/channel).
:::

### Common Board Models

The following are current common board models. For board specifications, please see the [Product Specification Database](/en/pages/devices):

- Loongson 3C6000/S: AC612A0_V1.1
- Loongson 3B6000: XB612B0_V1.1
- Loongson 3A6000: XA61200, XA61201, XA612A0
- Loongson 3B6000M: CTCISZ 3B6000M mini PC
- Loongson 2K3000: OrangePi Nova, 2K3000 AI development board
- Loongson 2K0300: 2K0300 Hummingbird board, ALIENTEK 2K0300 development board, CTCISZ ForeverPi

## What Operating Systems Can Loongson Run?

Operating systems supported by Loongson include various general-purpose Linux distributions for desktops and servers (commercial and community), specialized Linux distributions (such as OpenWrt), OpenHarmony, and specialized operating systems (such as LoongWorks based on VxWorks, RTOS, etc.).

For operating systems, Linux distributions, and common software stacks currently supporting LoongArch, please see [*AREWELOONGYET?*](https://areweloongyet.com/).

## How to Buy Loongson?

Loongson boards can generally be purchased via Taobao or JD.com. Goofish also has a large number of second-hand boards and pre-built systems available for purchase, offering better value for money. If you are a student or community developer and are interested in porting, optimizing, and improving various software applications for the LoongArch platform, or need computing power support, you can also contact the [roaming Loongson project](https://github.com/loongson-community/1024) to apply for borrowing related equipment.

In addition to current products, common chip platforms based on LoongArch also include:

- Loongson 3A5000 (4 cores, 4 threads), clock speed 2.0 - 2.3GHz
- Loongson 3C6000 (16 cores, 32 threads), clock speed 2.0 - 2.2GHz

## Further Reading

Congratulations on making it this far! You should now have a solid foundation for exploring the Loongson ecosystem. Below are further reading materials from this site and third-party sources, covering topics from user guides and troubleshooting to processor specifications, ABI details, firmware internals, and the "New World vs Old World" issue you may have heard about. Community hobbyists have put together these excellent resources for your reference:

- [FAQ & Troubleshooting](/en/pages/guides)
- [Loongson Motherboard and CPU Database](/en/pages/devices)
- [*AREWELOONGYET?*: LoongArch Ecosystem Construction Information Site](https://areweloongyet.com/)
- [Loong 1-2-3: Compatibility Data Website for LoongArch](https://loong123.cn/)

Reading Materials:

- [*AREWELOONGYET?*: Reading Material "New World and Old World"](https://areweloongyet.com/docs/intro)
- [Loong 1-2-3 Site "Loongson Chip Parameters" Database](https://loong123.cn/chips/)
- [Loongson Technology Official Website "Chip Products" Section](https://www.loongson.cn/product/channel)

