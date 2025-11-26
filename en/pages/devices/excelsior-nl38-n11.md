---
layout: page
returnLink: /en/pages/devices
pageTitle: Product Specification Database
pageSubTitle: Excelsior NL38-N11
---

The Excelsior NL38-N11 is a 14-inch laptop based on Loongson 3A6000. Weighing approximately 1.4kg, the NL38-N11 comes equipped with a 2240×1400 (2.2K) or 1920x1200 (WUXGA) display, relatively rich interfaces, and a battery life of about 3-4 hours.

Other manufacturers have also launched derivative models based on this chassis.

## Key Specifications

| Category | Specification |
|------|------|
| Manufacturer | Excelsior |
| Derivative Models | Ipason NL38-N11 |
| Processor | 3A6000 @ 2.0GHz |
| Screen | 14 inches, 2240×1400 (2.2K) or 1920x1200 (WUXGA) |
| Weight | 1.4kg |
| Memory | DDR4 @ 3200MT/s (1 × SODIMM), no onboard memory |
| Interfaces (USB)  | 2 × USB 3.0, 2 × USB-C† |
| Interfaces (Storage) | 1 × NVMe (PCIe 3.0 x4) |
| Interfaces (Network) | 1 × GbE |
| Interfaces (Video) | 1 × HDMI |
| Interfaces (Other) | 1 × 3.5mm headphone/microphone jack, 1 × 720p camera |

†: One of the USB-C interfaces may be used for charging.

## Known Issues

### Touchpad Not Working on ABI2.0 Systems

The touchpad on this laptop uses is connected via an HID-over-I2C interface and requires a GPIO pin to provide interrupt signals.

On the Linux Kernel side, [interrupt support needs to be added](https://git.kernel.org/torvalds/c/44fe79020b91) to the 7A2000 GPIO driver (mainlined since Linux Kernel 6.15; most commercial distributions using the 6.6 kernel also includes this support). At the same time, since the upstream kernel does not support the deprecated `gsi_idx_map` property, an additional workaround in the form of this [kernel patch](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3) from AOSC OS is also required.

### Backlight Adjustment Not Working on ABI2.0 Systems with LoongGPU Driver

Due to a combination of upstream kernel API changes, issues with the Loongson PWM driver implementation, and the fact that the `gpio_base` property of the 7A GPIO controller has not been merged upstream, backlight control is currently unavailable for this laptop on some Linux distributions.

To fix this issue, the following is needed:

- [Supplemental board-level ACPI initialization code](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178) and LoongGPU driver modifications ([see changes in AOSC OS](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)) are needed to correctly reference the PWM controller responsible for backlight controls, as well as to disable the function to turn off LCD backlight and power through GPIO.
- Fix frequency calculation for the PWM controller, see [kernel patch](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) from AOSC OS (mainlined as part of Linux Kernel 6.18).

### CPU Frequency Scaling is Not Available on Some ABI2.0 Systems

New World (ABI2.0) Linux distributions with upstream kernel does not support processor frequency scaling, as upstream kernel has not yet implemented support for the SMCv1 interface found on retail devices. Community developer [Ziyao](https://github.com/ziyao233) has submitted a [preliminary patch](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), but it is still known to cause instability.

### High System Power Consumption

This laptop uses AVS (Adaptive Voltage Scaling) rather than full DVFS (Dynamic Voltage and Frequency Scaling) for powersaving (and the range for voltage adjustment is quite limited). When the frequency is reduced, the processor power consumption only drops slightly and overall battery life remains unsatisfactory.

## Product Images

![](/public/images/devices/excelsior-nl38-n11.webp)
Source: [Excelsior Official Website](https://eaecis.com/cp_95/962.html)
