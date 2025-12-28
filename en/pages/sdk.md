---
layout: page
# 返回首页
returnLink: /
pageTitle: Developer's Guide
pageSubTitle: Guides and Notes on Developing for LoongArch
---

<script setup>
import SdkIndex from "../../components/sdk/Index.vue"
</script>

When developing for non-x86 systems, many may find themselves asking:

> Where's the SDK of this device?

Thanks to the efforts of community contributors and Loongson engineers since 2021, most toolchains now have upstream support.

> What does this mean?

This means that the process to install various programming toolchains is now similar, if not identical, to the x86 platform - this means installing them is as easy as installing from distro repositories and with single-line command pastes!

::: tip
Given that ABI 2.0 (“New World”) is used by most community users and developers, this guide focuses solely on introducing installation and configuration procedures for ABI 2.0 systems. ABI 1.0 (“Old World”) is not covered here. If you are in a scenario where you have to develop for ABI 1.0, we recommend reconsidering and confirming that criterion. Should that necessity arise, please refer to the documentation from [Loongson Open Source Community (loongnix.cn)](https://www.loongnix.cn/).
:::

---

<SdkIndex>
<template #gnu>

GCC and Binutils officially support LoongArch. They are available directly from your distro's repository, as binaries, or may be built through cross-compilation.

::: tip
Note: Later versions of GCC and Binutils introduces enhanced support for LoongArch. Notably, GCC 14 introduced support for LoongArch vector extensions, whereas Binutils 2.41 introduced support for linker relaxation and, later with GCC 16, medium code model (significantly improving compatibility with larger source projects). All these represent critical functional enhancements. As such, please update them to at least the aforementioned versions.

If you intend to release universal binaries for projects or maintain a Linux distribution, please carefully review the relevant specifications and constraints outlined in the [*Software Development and Build Convention for LoongArch Architectures*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

To install GNU toolchain on common Linux distributions and operating systems:

| Operating System | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install binutils gcc` |
| Arch Linux | `sudo pacman -S binutils gcc` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install build-essential` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install binutils gcc` |

If you do not have a LoongArch device or wish to cross-compile:

| Operating System | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install gcc+cross-loongarch64` |
| Debian 13 and later, Ubuntu 24.04 and later, and their respective derivatives | `sudo apt install gcc-loongarch64-linux-gnu` |
| Windows and other Linux distributions | Please install from GitHub repository [loongson/build-tools](https://github.com/loongson/build-tools) |

</template>

<template #llvm>

LLVM officially supports LoongArch. It is available directly from your distro's repository, as binaries, or may be built through cross-compilation.

::: tip
Note: Later versions of LLVM have introduces enhanced support for LoongArch. LLVM 18 introduced support for LoongArch vector extensions. When available, please update to this version or later.

If you intend to release universal binaries for projects or maintain a Linux distribution, please carefully review the relevant specifications and constraints outlined in the [*Software Development and Build Convention for LoongArch Architectures*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

To install LLVM (including Clang) on common Linux distributions and operating systems:

| Operating Systems | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install llvm` |
| Arch Linux | `sudo pacman -S clang llvm` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install clang llvm` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install clang llvm` |

The LLVM toolchain (particularly the Clang compiler) natively supports cross compilation. To cross-compile this toolchain for LoongArch, use LLVM version 17 or later and refer to [this article](https://clang.llvm.org/docs/CrossCompilation.html) and specify the LoongArch target (e.g., `loongarch64-unknown-linux-gnu`).

</template>

<template #rust>

Rust officially supports LoongArch. It is available directly from your distro's repository, as binaries, or may be built through cross-compilation.

Rust recommends using [rustup](https://rustup.rs/) to install the Rust toolchain:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

To install Rust (rustc) and the Cargo package manager on common Linux distributions and operating systems:

| Operating System | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install rustc` |
| Arch Linux | `sudo pacman -S rustc` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install rust-all` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install rust cargo` |

</template>

<template #nodejs>

Node.js officially supports LoongArch. It is available directly from your distro's repository, as binaries, or may be built through cross-compilation. Node.js ships LoongArch binaries through the [Unofficial Builds](https://unofficial-builds.nodejs.org/) project (tagged as the `loong64` architecture).

To install Node.js on common Linux distributions and operating systems:

| Operating System | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install nodejs` |
| Arch Linux | `sudo pacman -S nodejs` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install nodejs` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install nodejs` |

::: tip
Many Linux distributions provide multiple versions of Node.js to suit the needs of different applications and projects. Please consult distro documentation and install alternative Node.js versions as needed.
:::

</template>

<template #golang>

Go officially supports LoongArch. It is available directly from your distro's repository, as binaries, or may be built through cross-compilation. The Go upstream builds LoongArch binaries, which are available from their [download page](https://go.dev/dl/).

To install Go on common Linux distributions and operating systems:

| Operating System | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install go` |
| Arch Linux | `sudo pacman -S go` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install golang` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install golang` |

Go natively supports cross-compilation. With Go 1.21 or later, follow the instructions outlined in [this article](https://go.dev/doc/install/source) and specify the LoongArch target (i.e., `GOARCH=loong64`) to cross-compile for LoongArch.

</template>

<template #python>

Python officially supports LoongArch. It is available directly from your distro's repository, as binaries, or may be built through cross-compilation.

To install Python on common Linux distributions and operating systems:

| Operating System | Installation Procedure |
|----------|----------|
| AOSC OS | `oma install python-3` |
| Arch Linux | `sudo pacman -S python` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install python3` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS  | `sudo dnf install python3` |

::: tip
Since LoongArch still lacks definition for a "manylinux" baseline, the official PyPI repository does not host binaries for LoongArch. This means that when installing PyPI modules using `pip`, the respective modules will be compiled from source and you may need to install C/C++/Rust toolchains as needed.

Loongson Technology hosts a PyPI binary repository for ABI 2.0 systems at [lpypi.loongnix.cn](http://lpypi.loongnix.cn/). You may edit `/etc/pip.conf` to and specify this as the default repository. alternatively, the [loong64](https://github.com/loong64) organization on GitHub maintains an independent PyPI binary repository. For configuration procedures, please refer to [the organization's README](https://github.com/loong64#pypi-repository).
:::

</template>

<template #dotnet>

.NET officially supports LoongArch. However, as LoongArch is classified as a “community-supported architecture” within .NET, Microsoft does not ship binary toolchains for LoongArch.

However, .NET toolchain binaries may be obtained through the following channels:

- [.NET 10 (from Loongson Technology)](https://github.com/loongson/dotnet/releases)
- [.NET 9 (from the loongson-community organization)](http://github.com/loongson-community/dotnet-unofficial-build/releases)

For common Linux distributions, simply download the SDK package with the RID (.NET Runtime Identifier) `linux-loongarch64` to obtain the full toolchain (i.e., `dotnet-runtime-10.0.1-linux-loongarch64.tar.gz`). For instructions on installing the .NET SDK using tar packages, refer to the [official .NET documentation](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install).

**Cross-Compiling .NET Applications for LoongArch**

.NET natively supports cross-compilation and cross-platform publishing. With .NET 9 or later, refer to [this article](https://learn.microsoft.com/zh-cn/dotnet/core/rid-catalog) and specify the target RID to publish .NET applications for LoongArch. However, since LoongArch is classified as a “community-supported architecture” for .NET, NuGet.org does not host .NET runtime packages targeting LoongArch, which may cause build failures. 

To workaround this issue, you may obtain and deploy all necessary NuGet packages locally. To do so, simply obtain the following files from the toolchain release pages mentioned above (* denotes specific version numbers):

- Microsoft.AspNetCore.App.Runtime.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Crossgen2.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Host.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Runtime.linux-loongarch64.*.nupkg
- runtime.linux-loongarch64.Microsoft.DotNet.ILCompiler.*.nupkg

::: tip
The distribution provided by loongson-community/dotnet-unofficial-build categorizes the aforementioned files as "release artifacts." Please download this package to obtain the components listed above.
:::

Place the above files in a path that suits your needs (e.g., `/data/loongarch64-nupkgs`) and follow the instructions in [this article](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) to add this directory to your NuGet source list, as shown below:

```xml
<packageSources>
    <add key="LoongArch64 Packages" value="/data/loongarch64-nupkgs" />
</packageSources>
```

You should now be able to cross-compile .NET applications for LoongArch.

**Compiling the .NET Toolchain**

Compiling the .NET toolchain itself is a relatively involved process. To ease the learning curve, please refer to the [CI build scripts used by Loongson Technology](https://github.com/loongson/dotnet/blob/build/.github/workflows/build-sdk10.yml). This method utilizes the VMR source distribution package officially recommended by .NET for compilation.

</template>

<template #java>

Due to non-technical reasons, Oracle OpenJDK does not currently support LoongArch JIT. To install Java, it is recommended to download binary packages compatible with the "Linux 5.10.0 kernel UAPI" on the [Loongson Open Source Community (loongnix.cn)](https://www.loongnix.cn/zh/api/java/) or through your distro's repository.

To install Java on common Linux distributions and operating systems:

| Operating System | Installation Procedures |
|----------|----------|
| AOSC OS | `oma install openjdk` |
| Arch Linux | `sudo pacman -S java-openjdk` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install default-jdk` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS  | `sudo dnf install java-latest-openjdk` |

::: tip
Many Linux distributions provide multiple versions of OpenJDK to suit the needs of different applications and projects. Please consult distro documentation and install alternative OpenJDK versions as needed.
:::

</template>

<template #kernel>

The Linux Kernel officially supports LoongArch. Generally, Linux distributions based on ABI 2.0 utilize the upstream kernel (along with platform-specific workarounds and other patches, see below). However, some commercial distributions ship the 6.6 "longterm" kernel with an extensive set of platform-specific patches.

::: tip
The Linux Kernel introduced LoongArch support since version 5.19. However, to fully leverage the hardware capabilities and performance of LoongArch, please use the latest mainline kernel.
:::

**Kernel Maintenance Reference**

As noted above, newer Linux kernels are generally preferable due to their better support for LoongArch devices. However, as distros may have their own set of rules when it comes to kernel updates, we have assembled the guide below for your reference.

| Linux Version | Key Feature Introduced |
|---------------|------------------------------|
| 6.18          | 2K2000/2K3000/3B6000M GPIO fixes |
| 6.17          | 2K3000/3B6000M On-Chip NIC DWMAC Support; PWM Frequency Modulation Fix |
| 6.16          | 2K2000/2K3000/3B6000M SDIO Support |
| 6.14          | 3C6000 Family Multiplexing Support |
| 6.12          | 3B6000/3C6000 family support (Advanced Extended IRQ model) |
| 6.7           | Virtualization support |
| 6.4           | Simultaneous Multi-Threading (SMT) support |

**Unmerged Patches**

Generally, engineers at Loongson Technology and community developers pushes hardware enablement, optimizations, and fixes to the upstream (mainline) kernel. However, due to technical and non-technical reasons, some patches remain unmerged.

The following table lists all known and essential patches maintained by various downstream parties (developers, distribution communities, etc.), for your reference (the patch list below are based on `v6.19-rc1` and do not include patches already submitted to the upstream [loongarch](https://lore.kernel.org/loongarch) mailing list):

| Description | Type | Kconfig Entry | Link | Notes |
|-------------|------|-----------------------------|------|-------|
| PixArt PS/2 Devices | Feature | `MOUSE_PS2_PIXART` (bool: y/n) | [1](https://lore.kernel.org/loongarch/20251127080203.3218018-1-zhoubinbin@loongson.cn/) | For laptops such as the Tongfang Chaorui L860-T2 and Excelsior L71 based on 3A5000 and 3A6000, this patch fixes an issue where the touchpads were misidentified as PS/2 mice, breaking support for gestures and palm detection. |
| HWMon support (thermal and other forms of hardware monitoring), providing CPU thermal control for the Loongson 3 family | Feature | `CPU_HWMON` (bool: y/n) | [1](https://github.com/chenhuacai/linux/commit/2a6c1c74d93a21613a523aebc6494d654f35cf1a) | Does not include support for thermal monitoring of the 7A bridge chip; this patch may cause `sensors(1)` to read incorrect temperature sensors and data on SoC platforms such as 2K3000/3B6000M. |
| Multi-channel DMA Controller | Feature | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/87e13f54db61f) | |
| 2K3000/3B6000M SoC CAN-FD Bus | Feature | `CAN_LSCANFD` (bool: y/n), `CAN_LSCANFD_PLATFORM` (tristate: y/m/n) | [1](https://github.com/AOSC-Tracking/linux/commit/905bf46bcebfb) | Must be used together with the patch for multi-channel DMA controller |
| BPI1000/1001 (“Old World”) firmware support | Feature | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/06e031656e659), [2](https://github.com/AOSC-Tracking/linux/commit/6a2eb415543d7), [3](https://github.com/AOSC-Tracking/linux/commit/56209fafa1832), [4](https://github.com/AOSC-Tracking/linux/commit/85a8b0edaf388), [5](https://github.com/AOSC-Tracking/linux/commit/16f5059f8b43d), [6](https://github.com/AOSC-Tracking/linux/commit/7d80610d12846), [7](https://github.com/AOSC-Tracking/linux/commit/ecd26b294d80e), [8](https://github.com/AOSC-Tracking/linux/commit/1c92272af179f) | Essential for booting ABI 2.0 systems on Lenovo Kaitian M540z, Gooxi 3C5000L quad-socket servers, and certain platforms shipping Kunlun firmware from 2020 to 2022. |
| PCIe bus speed detection quirk for some 3B6000 and 3C6000 family processors, where PCIe speeds were incorrectly limited to PCIe 1.0 | Workaround | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/ae2697f19a371) | The scope of impact processor steppings/batches is unclear. For details, see [the explanation here](@/pages/guides/errata-desktop-and-server.html#pcie-speed-negotiation-issue-with-early-3b6000-3c6000-steppings) |
| Workaround for inoperaable GPIO due to device descriptions that does not comply with the *Loongson CPU Unified System Architecture Specification*, where GPIO devices were described within `gsi_idx_map` | Workaround | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/71068c266d426) | Should not affect 2K3000/3B6000M and later products |
| Workaround for intermittent driver crashes, resets, and lockups with AMD GCN 1.0–4.0 GPUs on LoongArch platforms | Workaround | N/A | [1](https://lore.kernel.org/all/20240617105846.1516006-1-uwu@icenowy.me/) | The mechanism behind this fix is unclear (empirical patch); commercial 6.6 kernels like deepin include a more aggressive (yet similarly unexplained) patchset. See [this deepin pull request](https://github.com/deepin-community/kernel/pull/1215). |
| Workaround for data errors that on 7A platforms when using AMD “Radeon” graphics drivers (for TeraScale 2 and earlier graphics cards) | Workaround | N/A | [1](https://github.com/chenhuacai/linux/commit/6266d0082b020ad68a3b3c6f314ba299b9d06d3d), [2](https://lore.kernel.org/all/20240220074958.3288170-1-chenhuacai@loongson.cn/), [3](https://github.com/AOSC-Tracking/linux/commit/3b730340dee61) | Mechanism unknown but effective; patch 3 limits this workaround to MIPS and LoongArch64 platforms (`MACH_LOONGSON64`) |
| Register the third PWM controller `LOON0006:03` on the 7A2000 bridge as `gsgpu_backlight` in board-level ACPI initialization code to support LoongGPU backlight control | Workaround | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/6a22acfd684e4) | Prerequisite patch for LoongGPU backlight support. For LoongGPU driver-related patches, please refer to [AOSC-Tracking/loonggpu-kernel-dkms @ aosc/v1.0.1-alpha-lnd25.5](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commits/aosc/v1.0.1-alpha-lnd25.5/). |
| Enable "Remote Wake" support for USB root hubs (such as USB keyboards, mice, and other input devices) | Workaround | N/A | [1](https://lore.kernel.org/all/20250131100630.342995-1-chenhuacai@loongson.cn/), [2](https://github.com/AOSC-Tracking/linux/commit/a683c47758586) | Applying this patch enables keyboard wake-up for LoongArch devices in ACPI S3 (suspend-to-RAM), but it is known to prevent some x86 laptops from entering sleep mode. Patch 2 limits this wrokaroun to MIPS and LoongArch64 platforms (`MACH_LOONGSON64`). |

</template>

<template #docker>

Docker (utility) now officially supports LoongArch, usually available from your distro's repository.

To install Docker on common Linux distributions and operating systems:

| Operating System | Installation Method |
|----------|----------|
| AOSC OS | `oma install docker` |
| Arch Linux | `sudo pacman -S docker` |
| Debian and derivatives such as deepin, openKylin and Loongnix 25 | `sudo apt install docker.io` |
| Red Hat-derived distributions such as Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install docker` |

::: tip
There are only few LoongArch containers available in the official Docker registry. Loongson Technology maintains a [Docker image repository targeting LoongArch ABI 2.0](https://lcr.loongnix.cn/). You can [modify your Docker configuration](https://docs.docker.com/docker-hub/image-library/mirror/) to utilize this registry as needed.
:::

</template>


<template #cirunner>

Many code hosting platforms offer CI runner support and some already supports LoongArch natively

**GitHub Actions**

GitHub Actions Runner could not produce binary releases due to [NuGet lacking LoongArch support](https://github.com/dotnet/sdk/issues/42248). If you wish to compile and deploy this CI agent yourself, please refer to this [pull request](https://github.com/actions/runner/pull/3928).

**GitLab Runner**

GitLab Runner officially supports LoongArch. To deploy, simply download and install packages or compressed archives tagged `loong64` from its [release page](https://gitlab.com/gitlab-org/gitlab-runner/-/releases).

**Gitea act_runner**

Gitea act_runner officially supports LoongArch, though LoongArch binaries are not yet available. For now, you may clone the [source code](https://gitea.com/gitea/act_runner) to compile and deploy this runner.

**Forgejo Runner**

Forgejo Runner has not yet merged LoongArch support. If you wish to compile and deploy this runner yourself, please refer to this [pull request](https://code.forgejo.org/forgejo/runner/pulls/1144).  

**Sourcehut**

Sourcehut's CI proxy [builds.sr.ht](https://git.sr.ht/~sircmpwn/builds.sr.ht/) officially supports LoongArch. As this CI runner does not distribute binaries, you would need to build and deploy this runner from source.

**Gitee**

Gitee has not yet merged LoongArch support. If you wish to compile and deploy this runner yourself, please refer to the following pull requests:

- [gitee-go/utils#1](https://gitee.com/gitee-go/utils/pulls/1)
- [gitee-go/core#1](https://gitee.com/gitee-go/core/pulls/1)
- [gitee-go/runner-core#1](https://gitee.com/gitee-go/runner-core/pulls/1)
- [gitee-go/runner#1](https://gitee.com/gitee-go/runner/pulls/1)

**GitCode**

As inquired by community members, GitCode currently does not support self-hosted CI proxies and thus it is not possible to support LoongArch, at least for now.

</template>
</SdkIndex>
