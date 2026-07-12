---
layout: page
pageTitle: Box64 入门指南
pageSubTitle: 使用 Box64 运行 x86 程序的指南
---

[Box64](https://github.com/ptitSeb/box64) 是一个二进制翻译器，可帮助您在搭载龙架构 CPU 的电脑上运行 x86 程序。如您平日用得顺手的办公软件或喜爱的游戏没有提供原生龙架构版本，本文档将有助于您在龙芯上将它们“跑起来”。

## 基础概念

在正式进入教程之前，我们先了解两个基础概念：

### 指令集：x86 -> LoongArch

指令集就像是 CPU 的“语言”，为 x86 编译的程序，龙架构 CPU 无法读懂，而 Box64 则可以进行“翻译”。

### 操作系统：Windows -> Linux

在 Linux 系统下，即便 x86 的电脑也无法直接运行为 Windows 编译的程序。幸好这一问题是架构无关的，我们可以通过使用 Wine 来解决。当然，如果您想运行的是 Linux 程序，则不需要 Wine。

下图展示了实际应用时上述几个概念的关系：

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:black;text-align:center;vertical-align:top}
</style>
<table class="tg"><tbody>
  <tr>
    <td class="tg-c3ow" colspan="2">Windows Game</td>
  </tr>
  <tr>
    <td class="tg-c3ow">Win32 API</td>
    <td class="tg-c3ow">DirectX</td>
  </tr>
  <tr>
    <td class="tg-c3ow">Wine</td>
    <td class="tg-c3ow">DXVK/vkd3d</td>
  </tr>
  <tr>
    <td class="tg-c3ow">POSIX API</td>
    <td class="tg-c3ow">Vulkan</td>
  </tr>
  <tr>
    <td class="tg-c3ow" colspan="2">Box64 for LoongArch</td>
  </tr>
  <tr>
    <td class="tg-c3ow" colspan="2">LoongArch Linux Kernel</td>
  </tr>
  <tr>
    <td class="tg-c3ow">LoongArch CPU</td>
    <td class="tg-c3ow">GPU</td>
  </tr>
</tbody>
</table>

## 使用教程

### 准备工作

#### 推荐的硬件配置

- CPU：3A6000，2K3000/3B6000M 或性能更强的型号
- 内存：16 GiB 及以上
- 显卡：2015 年后发布的 AMD 独立显卡

更低的配置可能也能正常工作，但是无法获得较理想的使用体验。

#### 必要的软件配置

- 操作系统：使用 glibc 作为基础 C 库的任意 ABI2.0 发行版
- 内核：4KiB 分页的 Linux 内核
- Box64：启用了龙架构 DynaRec、Box32 和 Binfmt 集成的最新版本

以下工具很可能也会有用：

- Wine：用于运行 Windows 程序，需要启用 WoW64 支持
- Steam：Linux 版本，用于获取和启动游戏
- Heroic 启动器：可以用于获取、管理和启动更多平台上发行的游戏

#### 示例配置

- 主板/CPU：龙芯 XB612B0_V1.2 主板，搭载 12 核版本的 3B6000 处理器
- 内存：DDR4-3200 16GiB x2
- 显卡：AMD Radeon RX 6750 GRE 12GB
- 操作系统：安同 OS

在操作系统的选择上，可优先考虑安同 OS，有以下几点优点：

- 默认在龙架构上提供 4KiB 分页内核，注意启动时要在 GRUB 菜单中选择带有“4KiB 内核分页”的选项
- 使用 `oma topics --opt-in box64-preview && oma install box64` 命令可安装较新版本的 Box64，该测试源每小时检查 Box64 仓库是否有新的提交，如有则自动构建并打包，因而能保证 Box64 版本较新
- 可以方便地使用 `oma` 安装软件源提供的 `wine, winetricks, steam, heroicgameslauncher` 等软件

### 运行 x86 Windows 应用

Box64 的文档里有关于如何配合 Wine 来运行 Windows 程序的[介绍](https://github.com/ptitSeb/box64/blob/main/docs/WINE.md)，而在这里我们先解释一下 Wine prefix 的概念：它是一个模拟 Windows 系统环境的目录，包含模拟的 `C:` 盘、注册表和相关环境配置文件等，可创建多个，有助于满足不同软件对 Windows 系统环境的不同需求，也能避免软件之间的互相污染。当前的 Wine prefix 所在位置可由环境变量 `$WINEPREFIX` 所指定，默认是 `~/.wine`，且每次 Wine 运行时如发现指定的位置没有已经准备好的环境，会自动在那里初始化一个“干净”的 prefix。

此处以安装和使用一款高保真 CD 抓取软件 Exact Audio Copy 为例来进行演示如何运行 x86 Windows 应用。

1. 从 https://github.com/Kron4ek/Wine-Builds 下载任意带 wow64 字样的 Wine 压缩包，例如 `wine-11.11-staging-tkg-amd64-wow64.tar.xz` 并解压，这里假设解压后放置在了 `/path/to/wine-11.11-staging-tkg-amd64-wow64`。

2. 从 EAC 官网获取到它 Windows 版本的安装包，放置在 `~/EAC.exe`。

3. 使用命令

    ```bash
    export WINEPREFIX=~/foo
    export PATH=/path/to/wine-11.11-staging-tkg-amd64-wow64/bin:$PATH
    ```

    指定一个新的 Wine prefix 路径，再将 Wine 的可执行文件路径添加到环境变量 `$PATH`。

4. 在同一个终端执行

    ```bash
    wine ~/EAC.exe
    ```

    来启动安装程序，很快就会看见弹出 Setup 窗口，按照在 Windows 下的安装方法进行安装即可。

5. 执行

    ```bash
    wine "~/foo/drive_c/Program Files (x86)/Exact Audio Copy/EAC.exe"
    ```

    来打开 EAC 软件，然后将音频 CD 插入光驱，就可以和在 Windows 上一样，测试光盘驱动器，然后抓取音频了。

    ![eac-capturing](/images/guides/box64/eac.png)

### 运行 x86 Windows 游戏

想要运行游戏，需要的操作和上节大同小异。不过对于许多使用 DirectX 图形 API 的游戏，Wine 对其的支持可能不够理想，最好使用一些其他转换层来转换为 Vulkan 来获得更好体验。

对于 DirectX 8~11，可使用 [DXVK](https://github.com/doitsujin/DXVK)。

对于 DirectX 12，可使用 [vkd3d-proton](https://github.com/HansKristian-Work/vkd3d-proton)。

对于您手动安装或覆盖的 dll，请在 Wine 设置中将其设置为“原装先于内建”，以保证 Wine 调用正确的版本。

您也可以使用 `winetricks` 来更便捷地安装它们。

### 使用 Steam 玩游戏

首先，参考 Box64 仓库给出的 [Steam 运行教程](https://github.com/ptitSeb/box64/blob/main/docs/STEAM.md)来安装 Linux 版 Steam。对于示例使用的安同 OS，可使用 `oma install steam` 来直接从发行版软件源安装。

登录账号和下载安装游戏的过程不再赘述，要注意的是，许多游戏同时提供 Linux 和 Windows 版本，Steam 会优先选择 Linux 版本启动。如您想要获得和 Windows 上更接近的游戏体验，或 Linux 版本无法正常运行，可按如下方法指定使用 Proton 兼容层运行 Windows 版本：在“库”中右击该游戏，点击弹出菜单中的“属性”，在弹出窗口中，点击“兼容性”进入下图所示的页面。勾选“强制使用特定 Steam Play 兼容性工具”，并选择您想使用的 Proton 兼容层（通常可以先尝试 Proton Experimental），下次启动游戏时即会使用该兼容层运行游戏。

![Steam Play](/images/guides/box64/steam.png)

如游戏只提供 Windows 版本，但运行不正常，也可使用上述方法更换不同的兼容层来尝试解决。

## 控制 Box64 行为

当应用或游戏运行不正常，如无法启动、运行过程中崩溃或性能不佳，可尝试通过调整环境变量和配置文件来改变 Box64 的行为。

在终端中运行 `box64-configurator` 即可打开 Box64 配置工具，您可以在其中针对特定的可执行文件名来调整 Box64 的行为，[这个文档](https://github.com/ptitSeb/box64/blob/main/docs/USAGE_CN.md)更加完整地说明了所有配置项的功能。

## 故障排除

下面是一个自查清单，列举了一些常见的操作或配置错误。

- 当前内核分页大小不为 4KiB
  - 检查方法：使用 `getconf PAGESIZE` 命令可以查询当前内核分页大小，4KiB 分页内核应输出 4096。
  - 建议的解决方案：安同 OS 用户可重启并在 GRUB 菜单中选择带有“4KiB 内核分页”的选项启动，其他发行版用户也可自行编译符合要求的内核。

- 没有安装独立显卡
  - 原因：许多软件或游戏需要较新的 OpenGL 或 Vulkan 支持，而龙芯的 LG100/LG110/LG200 显卡往往无法满足此需求。
  - 建议的解决方案：添加一张性能足够的 AMD 独立显卡，可参考在 Windows PC 上流畅运行同样程序的显卡性能需求。
