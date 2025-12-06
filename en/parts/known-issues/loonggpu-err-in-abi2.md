### Backlight Control May Not be Available with ABI 2.0 Distros

Due to a change in upstream kernel API and problematic Loongson PWM driver implementation, as well as the lack of `gpio_base` support, laptop backlight control may not be available with some Linux distros.

To fix this issue, the following is needed:

- [Additional board-level ACPI initialization routines](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178)and corresponding changes to the LoongGPU kernel driver (as implemented by [AOSC OS](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729) are needed - correctly calling PWM controllers and the functionality to completely turn off backlight via GPIO.
- A patch to fix PWM controller frequency calculation, see [this kernel patch from AOSC OS](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) (this patch is now part of Linux 6.18).