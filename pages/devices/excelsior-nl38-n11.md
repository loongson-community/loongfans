---
layout: page
returnLink: /pages/devices
pageTitle: 产品规格数据库
pageSubTitle: 卓怡恒通 NL38-N11
---


卓怡恒通 NL38-N11 是一款基于 3A6000 处理器的 14 寸笔记本电脑，其重量约 1.4kg，搭载 2240×1400 (2.2K) 或 1920x1200 (WUXGA) 屏幕，接口较为丰富，续航约 3-4 小时。

亦有其他厂商推出了基于此款模具的派生型号。

## 主要规格

| 类别 | 规格 |
|------|------|
| 厂商 | 卓怡恒通 |
| 其他型号 | 攀升 NL38-N11 |
| 处理器 | 3A6000 @ 2.0GHz |
| 屏幕 | 14 英寸，2240×1400 (2.2K) 或 1920x1200 (WUXGA) |
| 重量 | 1.4kg |
| 内存 | DDR4 @ 3200MT/s (1 × SODIMM)，无板载内存 |
| 接口 (USB)  | 2 × USB 3.0、2 × USB-C |
| 接口（存储）| 1 × NVMe (PCIe 3.0 x4) |
| 接口（网络） | 1 × GbE |
| 接口（视频） | 1 × HDMI |
| 接口（其他） | 1 × 3.5mm 耳机耳麦口、1 × 720p 摄像头 |

†：其中一个 USB-C 接口可用于充电。

## 已知问题

### ABI 2.0 系统下触摸板无法使用

该笔记本搭载的触摸板使用 HID over I2C 总线，需要一个 GPIO 引脚提供中断信号。

Linux 内核方面，需要为 7A2000 GPIO 驱动[增加中断支持](https://git.kernel.org/torvalds/c/44fe79020b91)（已包含在 6.15 及以上版本上游 Linux 内核，大多数使用 6.6 内核的商用发行版亦有此功能支持）。同时，由于上游内核不支持已弃用的 `gsi_idx_map` 属性，需要绕过这一问题，可参考安同 OS [内核补丁](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3)。

### ABI 2.0 系统搭配 LoongGPU 驱动时背光调整功能不可用

由于上游内核 API 变化、龙芯 PWM 驱动实现存在问题，以及 7A GPIO 控制器的 `gpio_base` 属性未合入上游，目前部分发行版中该款笔记本的背光控制不可用。

修复该问题，需要：

- 补充 [ACPI 板级初始化代码](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178)和 LoongGPU 驱动（[安同 OS 代码中进行了相应修改](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729)）配合引用 PWM 控制器，并禁用通过 GPIO 完全关闭背光和 LCD 的功能
- 修复 PWM 控制器频率计算错误的问题，见安同 OS [内核补丁](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820)（该补丁将于 6.18 合入上游内核）

### 部分 ABI 2.0 系统下调频功能不可用

使用搭载上游内核的 ABI 2.0（“新世界”）Linux 发行版无法启用处理器调频功能，这是因为上游内核尚未实现市售设备使用的 SMCv1 接口功能导致的。目前社区开发者[梓瑶](https://github.com/ziyao233)已提交[初版补丁](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/)，但在测试过程中仍发现有不稳定现象。

### 整机能耗较高

该款笔记本使用 AVS（动态电压调整）而非完整的 DVFS（动态调频调压）节电模式，且电压调整范围相当有限，降频时处理器功耗未有显著降低，整体续航仍不理想。

## 产品图片

![](/public/images/devices/excelsior-nl38-n11.webp)
来源：[卓怡恒通官网](https://eaecis.com/cp_95/962.html)

