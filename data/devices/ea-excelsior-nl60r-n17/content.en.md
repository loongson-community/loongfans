<template #introduction>

:::info
The EA EXCELSIOR NL60R-N17 is a 14-inch laptop based on Loongson 3B6000M. Weighing approximately 1.35kg, the NL60R-N17 comes equipped with a 2880×1800 (2.8K) or 1920x1200 (WUXGA) display, a variety of ports, and a battery life of about 2-4 hours.

:::

</template>

<template #spec>

| Category | Specification |
| ---- | ---- |
| Manufacturer | EA EXCELSIOR |
| Processor | 3B6000M @ 2.4GHz |
| Screen | 14 inches, 2880×1800 (2.8K) or 1920x1200 (WUXGA) |
| Weight | 1.35kg |
| Memory | DDR4 @ 3200MT/s (1 × SODIMM), no onboard memory, 64 GB maximum |
| Interfaces (USB) | 2 × USB 3.0, 3 × USB-C† |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4), 1 × NVMe (PCIe 3.0 x1) |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI |
| Interfaces (Other) | 1 × 3.5mm headphone/microphone jack, 1 × 1080p camera |

†: Only one of the two USB-C interfaces may be used for charging.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/touchpad-err-in-abi2.md -->

<!--@include: @parts/en/known-issues/loonggpu-err-in-abi2.md -->

<!--@include: @parts/en/known-issues/smcv1-issue-in-abi2.md -->

### High System Power Consumption

This laptop uses AVS (Adaptive Voltage Scaling) rather than full DVFS (Dynamic Voltage and Frequency Scaling) for powersaving (and the range for voltage adjustment is quite limited). As a result, when the frequency is reduced, the processor power consumption only drops slightly and overall battery life remains unsatisfactory.

</template>

<template #image>

![](/images/devices/ea-excelsior-nl60r-n17.webp)

</template>
