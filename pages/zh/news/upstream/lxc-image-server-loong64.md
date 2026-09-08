---
layout: page
pageTitle: 龙架构上游动向
pageSubTitle: Linux 软件容器 (LXC) 模板源正式支持龙架构
---

![Linux 软件容器 (LXC)龙架构容器模板源上线](/zh/images/news/upstream/lxc-loong64.png)

本周，Linux 软件容器（Linux Containers，简称 LXC）正式在其容器模板服务器上线了龙架构容器模板，成为继 x86-64、AArch64、AArch32 (ARMv7)、RISC-V 后第五个受官方支持的架构。

LXC 是业界广泛使用的 Linux 容器解决方案之一，与 Docker并列，其系统级容器环境使得跨设备开发及部署变得更加简单。该技术亦被应用在 Proxmox VE 中用以提供容器支持，可供 2K3000/3B6000M 等无虚拟化支持的平台部署和管理应用容器。

目前 LXC 容器模板服务器已提供如下发行版的龙架构容器模板：

- Alpine Linux
- ALT Linux
- Arch Linux（基于 [Arch Linux for Loong64](https://loongarchlinux.lcpu.dev/) 项目）
- Debian（其中 Debian 13 版本基于 [Loong13](https://loong13.debian.net/) 项目）
- Gentoo Linux
- openEuler

在 LXC 命令行工具中可使用如下命令选用并下载来自 LXC 容器模板服务器的模板创建新容器：

```bash
lxc-create -n <容器名> -t download
```

在 Incus 容器及虚拟机管理器中可使用如下命令列出可用的 LXC 容器模板：

```bash
incus image list images:
```

使用如下命令创建对应模板的容器（以 Debian 14 为例）：

```bash
incus launch images:debian/forky/loong64 <容器名>
```

### 社区开发板漂流计划

为降低社区开发者入门门槛并方便其评估龙架构软件生态和硬件性能现状，龙芯爱好者社区运营[“开发板漂流计划”](https://github.com/loongson-community/1024)，为有需要的开发者、学生等提供免费硬件借用和捐赠，设备涵盖 2K0300/2K1000LA/2K3000 等嵌入式开发板、3A5000/3A6000 NUC 小主机，以及 3A6000、3B6000 及 3B6000M 等台式机主板。对于有远程访问需求的开发者，我们还提供基于 3C6000 的虚拟机。

漂流计划的硬件不仅来自社区自筹，还有来自社区好友的捐赠。LXC 建设龙架构模板源就是在社区好友捐赠的龙芯 3B6000 主板 (XB612B0_V1.2) 支持下实现的：社区工作人员在整备主板后，附赠了内存和硬盘，方便 LXC 维护人员直接部署使用。
