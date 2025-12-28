---
layout: page
# 返回首页
returnLink: /
pageTitle: 开发者指南
pageSubTitle: 龙架构开发入门及注意事项
---

<script setup>
import SdkIndex from "../components/sdk/Index.vue"
</script>

在非 x86 场景下，许多开发者朋友们可能会问：

> 这个设备的 SDK 在哪里？

经过自 2021 年以来社区贡献者和龙芯中科工程师的共同努力，大多数主流工具链也已有上游支持。

> 这意味着什么？

这意味着，获取各类编程工具链的方式已经和 x86 平台上别无二致，不论是通过发行版还是各类编程语言、工具链的官网直接复制一键安装命令，越来越多的编程工具和环境都可以非常简便地安装了！

::: tip
考虑到 ABI 2.0（“新世界”）是龙架构社区用户和开发者使用的现行标准，本指南仅面向 ABI 2.0 系统介绍工具链的安装配置方法，而不再介绍 ABI 1.0（“旧世界”）系统相关信息。如果您有面向 ABI 1.0 的开发需求，我们建议您与相关项目方沟通并再次确认需求，并在确认有明确必要时，参考来自[龙芯开源社区 (loongnix.cn)](https://www.loongnix.cn/) 的相关资料。
:::

---

<SdkIndex>
<template #gnu>

GCC 及 Binutils 已正式支持龙架构，您可以通过发行版仓库直接安装、下载二进制或交叉编译等方式安装该工具链。

::: tip
请注意：GCC 和 Binutils 后续版本引入了对龙架构平台的支持增强，尤其是 GCC 14 引入了龙架构向量指令集支持、Binutils 2.41 引入了链接器松弛 (Relaxation) 支持，而后 GCC 16 引入了 medium 代码模型支持，对大规模软件项目的支持更佳，均属于关键功能更新。如有可能，请更新到至少如上版本。

如果您希望为软件项目发布通用二进制或正在维护 Linux 发行版，请注意阅读[《龙架构软件开发与构建约定》](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc)中的相关规范约束。
:::

如下是在几个常见 Linux 发行版和操作系统下安装 GNU 工具链的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install binutils gcc` |
| Arch Linux | `sudo pacman -S binutils gcc` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install build-essential` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install binutils gcc` |

如果您没有龙架构设备或希望交叉编译：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install gcc+cross-loongarch64` |
| Debian 13 及以上、Ubuntu 24.04 及以上，以及各衍生版 | `sudo apt install gcc-loongarch64-linux-gnu` |
| Windows 及其他 Linux 发行版 | 请从 GitHub 仓库 [loongson/build-tools](https://github.com/loongson/build-tools) 安装 |

</template>

<template #llvm>

LLVM 已正式支持龙架构，您可以通过发行版仓库直接安装、下载二进制或交叉编译等方式安装该工具链。

::: tip
请注意：LLVM 后续版本引入了对龙架构平台的支持增强，其中 LLVM 18 引入了龙架构向量指令集支持。如有可能，请至少更新到该版本。

如果您希望为软件项目发布通用二进制或正在维护 Linux 发行版，请注意阅读[《龙架构软件开发与构建约定》](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc)中的相关规范约束。
:::

如下是在几个常见 Linux 发行版和操作系统下安装 LLVM 工具链（含 Clang）的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install llvm` |
| Arch Linux | `sudo pacman -S clang llvm` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install clang llvm` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install clang llvm` |

LLVM 工具链（尤其是 Clang 编译器）原生支持交叉编译，使用 LLVM 17 或更新版本并参考[本文](https://clang.llvm.org/docs/CrossCompilation.html)指定龙架构目标（如 `loongarch64-unknown-linux-gnu`）即可为龙架构交叉编译该工具链。

</template>

<template #rust>

Rust 已正式支持龙架构，您可以通过发行版仓库直接安装、下载二进制或交叉编译等方式安装该工具链。

Rust 官方推荐使用 [rustup](https://rustup.rs/) 安装 Rust 工具链：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

如下是在几个常见 Linux 发行版和操作系统下安装 Rust (rustc) 及 Cargo 包管理器的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install rustc` |
| Arch Linux | `sudo pacman -S rustc` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install rust-all` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install rust cargo` |

</template>

<template #nodejs>

Node.js 已正式支持龙架构，您可以通过发行版仓库直接安装、下载二进制或交叉编译等方式安装该工具链。目前 Node.js 通过 [Unofficial Builds](https://unofficial-builds.nodejs.org/) 项目提供龙架构二进制，从该页面下载 `loong64` 标记的工具链包即可直接使用。

如下是在几个常见 Linux 发行版和操作系统下安装 Node.js 的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install nodejs` |
| Arch Linux | `sudo pacman -S nodejs` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install nodejs` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install nodejs` |

::: tip
由于软件维护和用户应用场景的需要，许多 Linux 发行版都提供了多个版本的 Node.js 工具链。您可以根据需要查阅相关发行版的文档，并安装您所需的 Node.js 版本。
:::

</template>

<template #golang>

Go 已正式支持龙架构，您可以通过发行版仓库直接安装、下载二进制或交叉编译等方式安装该工具链。目前 Go 官方已开始提供龙架构二进制，您可以通过其[下载页面](https://go.dev/dl/)下载。

如下是在几个常见 Linux 发行版和操作系统下安装 Go 工具链的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install go` |
| Arch Linux | `sudo pacman -S go` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install golang` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install golang` |

Go 工具链原生支持交叉编译，使用 Go 1.21 或更新版本并参考[本文](https://go.dev/doc/install/source)指定龙架构目标（即 `GOARCH=loong64`）即可为龙架构交叉编译该工具链。

</template>

<template #python>

Python 已正式支持龙架构，您可以通过发行版仓库直接安装、下载二进制或交叉编译等方式安装该工具链。

如下是在几个常见 Linux 发行版和操作系统下安装 Python 的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install python-3` |
| Arch Linux | `sudo pacman -S python` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install python3` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install python3` |

::: tip
由于龙架构仍缺少 manylinux 基线定义，目前 PyPI 官方源没有提供龙架构的模块二进制（这意味着如果您使用 `pip` 安装 PyPI 模块时，会现场编译相关模块，且可能会需要您安装对应的 C/C++/Rust 工具链）。

龙芯中科目前在 [lpypi.loongnix.cn](http://lpypi.loongnix.cn/) 提供了面向 ABI 2.0 系统的 PyPI 二进制源，您可以编辑 `/etc/pip.conf` 修改 pip 配置以使用该源。此外 GitHub 上的 [loong64](https://github.com/loong64) 组织亦有维护独立的 PyPI 二进制源，具体配置方式请参阅[该组织的自述文件](https://github.com/loong64#pypi-repository)。
:::

</template>

<template #dotnet>

.NET 已正式支持龙架构，但由于龙架构属于 .NET 的“社区支持架构 (community-supported architecture)”，微软官方不提供其二进制工具链。

您可以通过以下途径获取 .NET 工具链二进制：

- [.NET 10（来自龙芯中科）](https://github.com/loongson/dotnet/releases)
- [.NET 9（来自 loongson-community 组织）](http://github.com/loongson-community/dotnet-unofficial-build/releases)

对于常见的 Linux 发行版，选择 RID（.NET 运行时标识符）为 `linux-loongarch64` 的 SDK 包即可获取完整工具链。如 `dotnet-runtime-10.0.1-linux-loongarch64.tar.gz`；关于如何使用 tar 包安装 .NET SDK，参阅 [.NET 官方文档](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install)

**为龙架构交叉编译 .NET 程序**

.NET 原生支持交叉编译和跨平台发布，使用 .NET 9 以上版本并参考[本文](https://learn.microsoft.com/zh-cn/dotnet/core/rid-catalog)指定目标 RID 后即可为龙架构发布 .NET 程序，但由于龙架构属于 .NET 的“社区支持架构”，NuGet.org 不提供目标为龙架构的 .NET 运行时包，在构建过程中会因此失败。

目前可以通过本地提供相应 NuGet 包的方式规避：

从上文获取工具链的位置获取以下文件（*号为具体的版本号）：

- Microsoft.AspNetCore.App.Runtime.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Crossgen2.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Host.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Runtime.linux-loongarch64.*.nupkg
- runtime.linux-loongarch64.Microsoft.DotNet.ILCompiler.*.nupkg

::: tip
loongson-community/dotnet-unofficial-build 提供的发行版将上述文件归类为“源码构建用产物包”，请下载该包以获取上述组件。
:::

将上述文件放入符合您需要的路径（如`/data/loongarch64-nupkgs`）并参考[本文](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources)将该目录加入 NuGet 源列表，如下所示：

```xml
<packageSources>
    <add key="LoongArch64 Packages" value="/data/loongarch64-nupkgs" />
</packageSources>
```

方能交叉编译龙架构 .NET 程序。

**编译 .NET 工具链**

.NET 工具链本身的编译较为复杂，建议参考[龙芯中科使用的 CI 构建脚本](https://github.com/loongson/dotnet/blob/build/.github/workflows/build-sdk10.yml)；该方式使用 .NET 官方推荐的 VMR 源码发行包进行编译。

</template>

<template #java>

由于非技术原因，Oracle OpenJDK 暂未支持龙架构 JIT。要安装 Java 工具链，目前推荐通过各 Linux 发行版或通过[“龙芯开源社区 (loongnix.cn)”](https://www.loongnix.cn/zh/api/java/) 下载“兼容 Linux 5.10.0 内核 UAPI”的二进制包。

如下是在几个常见 Linux 发行版和操作系统下安装 Java 工具链的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install openjdk` |
| Arch Linux | `sudo pacman -S java-openjdk` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install default-jdk` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install java-latest-openjdk` |

::: tip
由于软件维护和用户应用场景的需要，许多 Linux 发行版都提供了多个版本的 JDK。您可以根据需要查阅相关发行版的文档，并安装您所需的 JDK 版本。
:::

</template>

<template #kernel>

上游 Linux 内核已正式支持龙架构。一般来说，基于 ABI 2.0 的 Linux 发行版均使用上游内核（外加平台规避等补丁，见下文参考），但也有部分商业性质的发行版会选用 6.6 内核并附加大量平台支持补丁。

::: tip
Linux 内核从 5.19 包含对龙架构支持，但如希望发挥龙架构硬件机能和性能，请使用最新主线内核分支。
:::

**内核维护参考**

如前文所说，对于龙架构设备来说，Linux 内核是越新越好的。但考虑到 Linux 发行版有具体的维护规则和需要，如下是对 Linux 大版本更新对应的平台支持的说明：

| Linux 版本 | 关键平台支持更新 |
|------------|------------------|
| 6.18       | 2K2000/2K3000/3B6000M GPIO 修复 |
| 6.17       | 2K3000/3B6000M 片上网卡 DWMAC 支持；PWM 调频修复 |
| 6.16       | 2K2000/2K3000/3B6000M SDIO 支持 |
| 6.14       | 3C6000 家族多路支持 |
| 6.12       | 3B6000/3C6000 家族支持（高级扩展 IRQ 模型） |
| 6.7        | 虚拟化支持 |
| 6.4        | 超线程 (SMT) 支持 |

**未上游补丁**

长期以来，龙架构内核维护及新平台支持均有推送主线，但由于种种技术和非技术原因，部分龙架构功能相关的补丁仍未能上游化。

下表中列出了目前已知的、正在各下游（开发者、发行版社区等）维护的必要支持补丁，供各位参考（补丁列表及代码基于 `v6.19-rc1` 技术状态，不包含已经提交到上游 [loongarch](https://lore.kernel.org/loongarch) 邮件列表的补丁）：

| 描述 | 类型 |  对应配置项 | 链接 | 备注 |
|------|------|-------------|------|------|
| PixArt PS/2 总线设备支持 | 新功能 | `MOUSE_PS2_PIXART` (bool: y/n) | [1](https://lore.kernel.org/loongarch/20251127080203.3218018-1-zhoubinbin@loongson.cn/) | 用于清华同方超锐 L860-T2、卓怡恒通 L71 等基于 3A5000 及 3A6000 的笔记本，可解决这些设备上触摸板被错误识别为 PS/2 鼠标，导致手势功能及手掌探测失效 |
| HWMon（如温控等硬件监控功能）支持，可为龙芯 3 号家族提供处理器温控支持 | 新功能 | `CPU_HWMON` (bool: y/n) | [1](https://github.com/chenhuacai/linux/commit/2a6c1c74d93a21613a523aebc6494d654f35cf1a) | 不包括 7A 桥片监控支持；该补丁可能在 2K3000/3B6000M 等 SoC 平台上导致 `sensors(1)` 读出错误的温度传感器及数据 |
| 多通道 DMA 支持 | 新功能 | 无 | [1](https://github.com/AOSC-Tracking/linux/commit/87e13f54db61f) | |
| 2K3000/3B6000M 平台 CAN-FD 支持 | 新功能 | `CAN_LSCANFD` (bool: y/n), `CAN_LSCANFD_PLATFORM` (tristate: y/m/n) | [1](https://github.com/AOSC-Tracking/linux/commit/905bf46bcebfb) | 须搭配多通道 DMA 支持补丁使用 |
| BPI1000/1001（“旧世界”）固件平台支持 | 新功能 | 无 | [1](https://github.com/AOSC-Tracking/linux/commit/06e031656e659), [2](https://github.com/AOSC-Tracking/linux/commit/6a2eb415543d7), [3](https://github.com/AOSC-Tracking/linux/commit/56209fafa1832), [4](https://github.com/AOSC-Tracking/linux/commit/85a8b0edaf388), [5](https://github.com/AOSC-Tracking/linux/commit/16f5059f8b43d), [6](https://github.com/AOSC-Tracking/linux/commit/7d80610d12846), [7](https://github.com/AOSC-Tracking/linux/commit/ecd26b294d80e), [8](https://github.com/AOSC-Tracking/linux/commit/1c92272af179f) | 在联想开天 M540z、国光 3C5000L 四路服务器及部分使用 2020 - 2022 年份昆仑固件的平台上须打上，否则无法启动 |
| 修复部分 3B6000 及 3C6000 家族处理器 PCIe 总线速率错误标记为 PCIe 1.0 的问题 | 规避 | 无 | [1](https://github.com/AOSC-Tracking/linux/commit/ae2697f19a371) | 步进、批次影响范围不明，详见[此处说明](@/pages/guides/errata-desktop-and-server.html#早期-3b6000-3c6000-处理器步进-pcie-速率协商问题) |
| 规避 DSDT 表中 GPIO 使用了不符合《龙芯 CPU 统一系统架构规范》规定的 `gsi_idx_map` 中断定义，导致无法使用 GPIO 作为中断源、部分笔记本触摸板不可用的问题 | 规避 | 无 | [1](https://github.com/AOSC-Tracking/linux/commit/71068c266d426) | 原则上不影响 2K3000/3B6000M 及后续产品 |
| 规避 AMD GCN 1.0 - 4.0 显卡在龙架构平台上时有驱动崩溃、复位和锁死的问题 | 规避 | 无 | [1](https://lore.kernel.org/all/20240617105846.1516006-1-uwu@icenowy.me/) | 机理不明（属于实证型补丁）；deepin 等商用 6.6 内核中包含更为激进（但同样机理不明）的补丁集，参见[该 deeepin 拉取请求](https://github.com/deepin-community/kernel/pull/1215) |
| 规避 AMD "radeon" 显卡驱动（用于 TeraScale 2 及更早的显卡）在 7A 转出的 PCIe 总线上可能出现数据错误的问题 | 规避 | 无 | [1](https://github.com/chenhuacai/linux/commit/6266d0082b020ad68a3b3c6f314ba299b9d06d3d), [2](https://lore.kernel.org/all/20240220074958.3288170-1-chenhuacai@loongson.cn/), [3](https://github.com/AOSC-Tracking/linux/commit/3b730340dee61) | 机理不明，但的确有效；补丁 3 将该修改限定给 MIPS 及龙架构 64 位平台 (`MACH_LOONGSON64`) |
| 在 ACPI 初始化代码中注册 7A2000 桥片中的 3 号 PWM 控制器 `LOON0006:03` 为 `gsgpu_backlight`，以支持 LoongGPU 驱动的背光调节 | 规避 | 无 | [1](https://github.com/AOSC-Tracking/linux/commit/6a22acfd684e4) | 该补丁是 LoongGPU 背光支持的前序补丁，LoongGPU 驱动相关补丁请见 [AOSC-Tracking/loonggpu-kernel-dkms @ aosc/v1.0.1-alpha-lnd25.5](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commits/aosc/v1.0.1-alpha-lnd25.5/) |
| 启用 USB root hub 的“远程唤醒”（如 USB 键盘、鼠标等输入设备）支持 | 规避 | 无 | [1](https://lore.kernel.org/all/20250131100630.342995-1-chenhuacai@loongson.cn/), [2](https://github.com/AOSC-Tracking/linux/commit/a683c47758586) | 加入该补丁后可使用键盘唤醒处于 ACPI S3 状态的龙架构设备，但已知会造成部分 x86 笔记本无法睡眠；补丁 2 将该修改限定给 MIPS 及龙架构 64 位平台 (`MACH_LOONGSON64`) |


</template>

<template #docker>

Docker 软件已正式支持龙架构，您可以通过 Linux 发行版软件源安装；如下是在几个常见 Linux 发行版和操作系统下安装 Docker 的方法：

| 操作系统 | 安装方式 |
|----------|----------|
| 安同 OS | `oma install docker` |
| Arch Linux | `sudo pacman -S docker` |
| Debian、deepin、openKylin（开放麒麟）及 Loongnix 25 等 Debian 系发行版 | `sudo apt install docker.io` |
| Fedora LoongArch Remix、openEuler、Anolis OS、OpenCloudOS 等 Red Hat 系发行版 | `sudo dnf install docker` |

::: tip
目前在 Docker 官方仓库中的龙架构容器仍非常少；龙芯中科维护了[针对龙架构 ABI 2.0 的 Docker 镜像仓库](https://lcr.loongnix.cn/)，您可以按照需要[修改 Docker 配置](https://docs.docker.com/docker-hub/image-library/mirror/)以使用该镜像仓库。
:::

</template>


<template #cirunner>

诸多代码托管平台均有提供 CI 代理 (Runner) 支持，其中已有一部分支持龙架构。

**GitHub Actions**

目前 GitHub Actions Runner 由于 [NuGet 缺少龙架构支持](https://github.com/dotnet/sdk/issues/42248)，暂时无法推进二进制发布。如希望自行编译部署该 CI 代理，可参考此[拉取请求](https://github.com/actions/runner/pull/3928)。

**GitLab Runner**

GitLab Runner 已正式支持龙架构，可通过其[发布页面](https://gitlab.com/gitlab-org/gitlab-runner/-/releases)下载 `loong64` 标记的软件包或压缩包，直接安装使用。

**Gitea act_runner**

Gitea act_runner 已正式支持龙架构，但暂未提供龙架构二进制，目前可拉取[源代码](https://gitea.com/gitea/act_runner)自行编译部署。

**Forgejo Runner**

Forgejo Runner 暂未合入龙架构支持，如希望自行编译部署该 CI 代理，可参考此[拉取请求](https://code.forgejo.org/forgejo/runner/pulls/1144)。

**Sourcehut**

Sourcehut 的 CI 代理 [builds.sr.ht](https://git.sr.ht/~sircmpwn/builds.sr.ht/) 已正式支持龙架构。该 CI 代理不发布二进制，您可以自行拉取代码编译部署。

**Gitee**

Gitee 暂未合入龙架构支持，可参考如下拉取请求的代码自行编译部署：

- [gitee-go/utils#1](https://gitee.com/gitee-go/utils/pulls/1)
- [gitee-go/core#1](https://gitee.com/gitee-go/core/pulls/1)
- [gitee-go/runner-core#1](https://gitee.com/gitee-go/runner-core/pulls/1)
- [gitee-go/runner#1](https://gitee.com/gitee-go/runner/pulls/1)

**GitCode**

据社区好友咨询，GitCode 暂未支持自建 CI 代理，暂时无法支持龙架构。

</template>
</SdkIndex>
