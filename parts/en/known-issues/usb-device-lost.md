### USB Devices Lost on Startup

Some users reported that their USB keyboards and mice may stop working after system startup, and repeated plugging in/out may be needed before they function again.

According to investigation by an engineer at Loongson Technology, this was caused by a [hardware flaw in the Loongson 7A2000 bridge chip](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). A workaround for this issue has been included since Linux 6.15-rc1, commercial distros based on the Linux 6.6 (ABI20.) or 4.19 (ABI1.0) kernels also include this workaround.
