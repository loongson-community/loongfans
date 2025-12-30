---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Database
pageSubTitle: Excelsior NL38-N11
---

::: info
The Excelsior NL38-N11 is a 14-inch laptop based on Loongson 3A6000. Weighing approximately 1.4kg, the NL38-N11 comes equipped with a 2240×1400 (2.2K) or 1920x1200 (WUXGA) display, a variety of ports, and a battery life of about 3-4 hours.

Other manufacturers have also launched derivative models based on this design.
:::

<Device>
<template #spec>

| Category | Specification |
|------|------|
| Manufacturer | Excelsior |
| Also Known As | Ipason NL38-N11 |
| Processor | 3A6000 @ 2.0GHz |
| Screen | 14 inches, 2240×1400 (2.2K) or 1920x1200 (WUXGA) |
| Weight | 1.4kg |
| Memory | DDR4 @ 3200MT/s (1 × SODIMM), no onboard memory |
| Interfaces (USB)  | 2 × USB 3.0, 2 × USB-C† |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4) |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI |
| Interfaces (Other) | 1 × 3.5mm headphone/microphone jack, 1 × 720p camera |

†: Only one of the two USB-C interfaces may be used for charging.

</template>

<template #known-issues>

<!--@include: @/en/parts/known-issues/touchpad-err-in-abi2.md -->

<!--@include: @/en/parts/known-issues/loonggpu-err-in-abi2.md -->

<!--@include: @/en/parts/known-issues/smcv1-issue-in-abi2.md -->

### High System Power Consumption

This laptop uses AVS (Adaptive Voltage Scaling) rather than full DVFS (Dynamic Voltage and Frequency Scaling) for powersaving (and the range for voltage adjustment is quite limited). As a result, when the frequency is reduced, the processor power consumption only drops slightly and overall battery life remains unsatisfactory.

</template>

<template #image>

![](/images/devices/excelsior-nl38-n11.webp)
Source: [Excelsior Official Website](https://eaecis.com/cp_95/962.html)

</template>
</Device>
