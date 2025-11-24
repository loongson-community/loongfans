---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Lenovo Kaitian N60d-G1d
---


The Lenovo Kaitian N60d-G1d is a 14-inch laptop based on the 3A6000 processor, weighing approximately 1.5kg, equipped with a 1920x1200 (WUXGA) screen, relatively rich interfaces, and a battery life of about 3-4 hours.

## Main Specifications

| Category | Specification |
|------|------|
| Manufacturer | Lenovo Kaitian |
| Processor | 3A6000 @ 2.0GHz |
| Memory | DDR4 @ 3200MT/s (1 × SODIMM), no onboard memory |
| Screen | 14 inches, 2240×1400 (2.2K) or 1920x1200 (WUXGA) |
| Weight | 1.5kg |
| Interface (USB)  | 2 × USB 3.0, 2 × USB-C† |
| Interface (Storage) | 1 × NVMe (PCIe 3.0 x4) |
| Interface (Network) | 1 × GbE |
| Interface (Video) | 1 × HDMI |
| Interface (Other) | 1 × 3.5mm headphone/microphone jack, 1 × camera |

†: One of the USB-C interfaces can be used for charging.

## Known Issues

### Touchpad Not Working on ABI 2.0 Systems

The touchpad on this laptop is temporarily unavailable on ABI 2.0 systems.

### Backlight Adjustment Function Not Available on ABI 2.0 Systems with LoongGPU Driver

Due to upstream kernel API changes, issues with the Loongson PWM driver implementation, and the fact that the `gpio_base` property of the 7A GPIO controller has not been merged upstream, backlight control is currently unavailable for this laptop on some distributions.

To fix this issue, the following is needed:

- Supplement [ACPI board initialization code](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178) and LoongGPU driver ([corresponding modifications have been made in AOSC OS code](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)) to cooperate with the PWM controller reference, and disable the function of completely turning off the backlight and LCD through GPIO
- Fix the PWM controller frequency calculation error issue, see AOSC OS [kernel patch](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) (this patch will be merged into the upstream kernel in 6.18)

### CPU Frequency Scaling Not Available on Some ABI 2.0 Systems

Linux distributions using ABI 2.0 (new world) with upstream kernel cannot enable processor frequency scaling functionality. This is because the upstream kernel has not yet implemented the SMCv1 interface functionality used by retail devices. Currently, community developer [Ziyao](https://github.com/ziyao233) has submitted an [initial patch](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), but instability has still been found during testing.

### High System Power Consumption

This laptop uses AVS (Adaptive Voltage Scaling) rather than full DVFS (Dynamic Voltage and Frequency Scaling) power-saving mode, and the voltage adjustment range is quite limited. When the frequency is reduced, the processor power consumption does not decrease significantly, and overall battery life remains unsatisfactory.

## Product Images

[![](/public/images/devices/kaitian-n60d-g1d.thumbnail.webp)](/public/images/devices/kaitian-n60d-g1d.webp)
Source: Bai Mingcong
