---
layout: page
returnLink: /pages/guides
pageTitle: 常见问题集
pageSubTitle: 各类笔记本平台已知问题
---

# ABI 2.0 系统下触摸板无法使用

该笔记本搭载的触摸板使用 HID over I2C 总线，需要一个 GPIO 引脚提供中断信号。

Linux 内核方面，需要为 7A2000 GPIO 驱动[增加中断支持](https://git.kernel.org/torvalds/c/44fe79020b91)（已包含在 6.15 及以上版本上游 Linux 内核，大多数使用 6.6 内核的商用发行版亦有此功能支持）。同时，由于上游内核不支持已弃用的 `gsi_idx_map` 属性，需要绕过这一问题，可参考安同 OS [内核补丁](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3)。

::: info
该问题描述对联想开天 N60d-G1d 笔记本不适用，目前暂无针对该笔记本触摸板失灵问题的解决方案。
:::

---

# ABI 2.0 系统搭配 LoongGPU 驱动时背光调整功能不可用

由于上游内核 API 变化、龙芯 PWM 驱动实现存在问题，以及 7A GPIO 控制器的 `gpio_base` 属性未合入上游，目前部分发行版中该款笔记本的背光控制不可用。

修复该问题，需要：

- 补充 [ACPI 板级初始化代码](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178)和 LoongGPU 驱动（[安同 OS 代码中进行了相应修改](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)）配合引用 PWM 控制器，并禁用通过 GPIO 完全关闭背光和 LCD 的功能
- 修复 PWM 控制器频率计算错误的问题，见安同 OS [内核补丁](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820)（该补丁将于 6.18 合入上游内核）

---

# 部分 ABI 2.0 系统下调频功能不可用

使用搭载上游内核的 ABI 2.0（“新世界”）Linux 发行版无法启用处理器调频功能，这是因为上游内核尚未实现市售设备使用的 SMCv1 接口功能导致的。目前社区开发者[梓瑶](https://github.com/ziyao233)已提交[初版补丁](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/)，但在测试过程中仍发现有不稳定现象。

