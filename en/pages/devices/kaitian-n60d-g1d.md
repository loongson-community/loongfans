---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Lenovo Kaitian N60d-G1d
---


The Lenovo Kaitian N60d-G1d is a 14-inch laptop powered by Loongson 3A6000. It weighs approximately 1.5kg and features a 1920x1200 (WUXGA) display, various ports, and 3-4 hours of battery life.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | Lenovo Kaitian |
| Processor | 3A6000 @ 2.0GHz |
| Memory | DDR4 @ 3200MT/s (1 × SODIMM), no onboard memory |
| Screen | 14 inches, 2240×1400 (2.2K) or 1920x1200 (WUXGA) |
| Weight | 1.5kg |
| Interfaces (USB)  | 2 × USB 3.0, 2 × USB-C† |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4) |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI |
| Interfaces (Other) | 1 × 3.5mm headphone/microphone jack, 1 × camera |

†: One of the USB-C interfaces can be used for charging.

## Known Issues

### Touchpad Not Working on ABI2.0 Systems

The touchpad on this laptop is not currently working on ABI2.0 systems.

### Backlight Adjustment Function Not Available on ABI2.0 Systems with LoongGPU Driver

Due to upstream kernel API changes, issues with the Loongson PWM driver implementation, and the `gpio_base` property of the 7A GPIO controller not yet mainlined, backlight control is currently unavailable on this laptop with some distributions.

To fix this issue, the following is needed:

- Add [ACPI board initialization code](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178) and LoongGPU driver modifications ([as done in AOSC OS](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)) to reference the PWM controller, and disable the GPIO-based backlight and LCD power-off functionality
- Fix the PWM controller frequency calculation error, see AOSC OS [kernel patch](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) (mainlined as part of Linux Kernel 6.18)

### CPU Frequency Scaling Not Available on Some ABI2.0 Systems

New World (ABI2.0) distributions using the upstream kernel cannot enable CPU frequency scaling because the SMCv1 interface used by retail devices is not yet implemented upstream. Community developer [Ziyao](https://github.com/ziyao233) has submitted an [initial patch](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), but instability issues remain during testing.

### High System Power Consumption

This laptop uses AVS (Adaptive Voltage Scaling) rather than full DVFS (Dynamic Voltage and Frequency Scaling) for power management, and the voltage adjustment range is quite limited. As a result, reducing the frequency does not significantly lower processor power consumption, and battery life remains suboptimal.

## Product Images

[![](/public/images/devices/kaitian-n60d-g1d.thumbnail.webp)](/public/images/devices/kaitian-n60d-g1d.webp)
Source: Bai Mingcong
