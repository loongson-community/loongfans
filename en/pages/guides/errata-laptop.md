---
layout: page
returnLink: /en/pages/guides
pageTitle: FAQ Collection
pageSubTitle: Known issues on various laptop platforms
---

# Touchpad Not Working on ABI 2.0 Systems

The touchpad on this laptop uses the HID over I2C bus and requires a GPIO pin to provide interrupt signals.

On the Linux kernel side, [interrupt support needs to be added](https://git.kernel.org/torvalds/c/44fe79020b91) to the 7A2000 GPIO driver (already included in upstream Linux kernel 6.15 and above; most commercial distributions using the 6.6 kernel also have this feature support). At the same time, since the upstream kernel does not support the deprecated `gsi_idx_map` property, this issue needs to be bypassed. See AOSC OS [kernel patch](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3).

::: info
This issue description does not apply to the Lenovo Kaitian N60d-G1d laptop. There is currently no solution for the touchpad failure issue on this laptop.
:::

---

# Backlight Adjustment Function Not Available on ABI 2.0 Systems with LoongGPU Driver

Due to upstream kernel API changes, issues with the Loongson PWM driver implementation, and the fact that the `gpio_base` property of the 7A GPIO controller has not been merged upstream, backlight control is currently unavailable for this laptop on some distributions.

To fix this issue, the following is needed:

- Supplement [ACPI board initialization code](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178) and LoongGPU driver ([corresponding modifications have been made in AOSC OS code](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)) to cooperate with the PWM controller reference, and disable the function of completely turning off the backlight and LCD through GPIO
- Fix the PWM controller frequency calculation error issue, see AOSC OS [kernel patch](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) (this patch will be merged into the upstream kernel in 6.18)

---

# CPU Frequency Scaling Not Available on Some ABI 2.0 Systems

Linux distributions using ABI 2.0 (new world) with upstream kernel cannot enable processor frequency scaling functionality. This is because the upstream kernel has not yet implemented the SMCv1 interface functionality used by retail devices. Currently, community developer [Ziyao](https://github.com/ziyao233) has submitted an [initial patch](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), but instability has still been found during testing.
