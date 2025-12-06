### Touchpads May Not Work with ABI 2.0 Distros

Some laptops come with touchpads that are wired using an HID-over-I2C bus, which requires a GPIO pin to supply interrupts.

To resolve this issue, a patch to [add interrupt support for 7A2000 GPIO](https://git.kernel.org/torvalds/c/44fe79020b91) is required (now part of Linux 6.15 and above, most commercial distros using Linux 6.6 also includes a fix). Additionally, as the upstream kernel no longer supports the deprecated `gsi_idx_map` property, a workaround is needed - see this [kernel patch](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3) from AOSC OS.