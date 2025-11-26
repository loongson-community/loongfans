### ABI 2.0 系统下触摸板无法使用

该笔记本搭载的触摸板使用 HID over I2C 总线，需要一个 GPIO 引脚提供中断信号。

Linux 内核方面，需要为 7A2000 GPIO 驱动[增加中断支持](https://git.kernel.org/torvalds/c/44fe79020b91)（已包含在 6.15 及以上版本上游 Linux 内核，大多数使用 6.6 内核的商用发行版亦有此功能支持）。同时，由于上游内核不支持已弃用的 `gsi_idx_map` 属性，需要绕过这一问题，可参考安同 OS [内核补丁](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3)。