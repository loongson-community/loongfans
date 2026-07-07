### ABI2.0 系统搭配 LoongGPU 驱动时背光调整功能不可用

由于上游内核 API 变化、龙芯 PWM 驱动实现存在问题，以及 7A GPIO 控制器的 `gpio_base` 属性未合入上游，目前部分发行版中该款笔记本的背光控制不可用。

修复该问题，需要：

- 补充 [ACPI 板级初始化代码](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178)和 LoongGPU 驱动（[安同 OS 代码中进行了相应修改](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)）配合引用 PWM 控制器，并禁用通过 GPIO 完全关闭背光和 LCD 的功能
- 修复 PWM 控制器频率计算错误的问题，见安同 OS [内核补丁](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820)（该补丁将于 6.18 合入上游内核）
