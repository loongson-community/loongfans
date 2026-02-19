---
layout: page
returnLink: /guides
pageTitle: 修复固件
pageSubTitle: 抢救刷入固件后无法开机的硬件
---

# 使用编程器修复损坏的固件程序

## 在进行修复工作之前

如果你正在查阅这个页面的内容，说明因为固件刷写或更新操作不当导致无法开机，本教程将帮助你如何自行通过编程器刷入固件。

在开始教程之前，请确保你已经购买过且已经拥有了以下硬件工具：

1. 另一台能够进入系统的电脑
2. CH341A USB 编程器
3. 烧录夹或探针，若使用探针需自行确认 SPI Flash 规格（大多数为 SOP8-208mil 规格），如果使用的是华硕主板则建议使用华硕专用烧录线
4. 1.8V 降压模块（目前大多数龙芯主板使用该电压的 Flash），若确认 Flash 为 3.3V 或 5V 则不需要
5. 对于部分在散热器下方的 Flash 芯片，那么你还需要准备硅脂，以便修复固件之后重新安装散热器

在开始教程之前，请确保你已经安装了以软件工具：

1. Windows 请事先安装好 CH341A 驱动程序，推荐使用 [由 Alangoa 更新芯片数据库的 NeoProgrammer (来源： 恩山论坛)](https://www.right.com.cn/FORUM/thread-8289988-1-1.html)
2. macOS / Linux 推荐使用 [IMSProg](https://github.com/bigbigmdm/IMSProg)

在烧写之前请先按以下步骤组装好编程器，此处分别以龙芯 XA61200 和华硕 XC-LS3A6M 两款主板作为范例。

## 下载固件并验证哈希

大多数主流产品可以在[产品规格数据库](https://loongfans.cn/devices)下找到，若未能找到相应型号的固件，请联系经销商。

下载后**请务必验证哈希值**，否则将导致启动失败。

> 注：若从华硕下载固件，请验证其 zip 文件，因为华硕提供的是 zip 文件的 SHA-256 哈希，不影响后续刷写操作，验证后请务必解压，因为烧录程序不会自动处理压缩包。

若使用 Windows，推荐使用 OpenHashTab 进行验证：

![](/images/guides/rescue-firmware/verify-with-openhashtab.webp)

若使用 macOS 或 Linux 发行版，可使用 `sha256sum` 进行校验：

```bash
# 以华硕 XC-LS3A6M 最新版本 1402 为例
sha256sum XC-LS3A6M-1402.7z
echo "7B435CA09F34088D6922BD82C9A46945E57A93BC4E3C24016BCE8FC19826E0AF XC-LS3A6M-1402.7z" | sha256sum -c
# 此时将会输出：XC-LS3A6M-1402.7z: 成功
```

## 组合并连接编程器

请根据主板使用的 SPI Flash 丝印查找以确认规格，以下是一些常见主板使用的 SPI Flash 型号，由于可能的生产批次换料，仅供参考：

| 主板 | Flash 型号 | 厂商 | 电压 |
| ---- | ---------- | ---- | ---- |
| XA61200 | GD25LQ64E | 兆易创新 (GigaDevice) | 1.8V |
| XC-LS3A6M | W25Q128JW | 华邦电子 (Winbond) | 1.8V |

之后请根据图示组合编程器，注意引脚位置从起始 1 开始必须一一对应。

:::warning
请注意：请必须提前查阅 Flash 型号，1.8V 的芯片无法在 3.3V 和 5V 电压档位下进行操作，但部分烧录工具会正常探测，此时可能不会进行提醒，**强行烧录将有可能导致 Flash 芯片损毁！！！**

若确认为 1.8V 芯片，请安装降压模块（如图所示的绿色模块）。
:::

![](/images/guides/rescue-firmware/setup-programmer.webp)

## 连接 Flash 芯片

### 使用烧录夹或探针连接 Flash 芯片

<!-- TODO -->
施工中

### 使用测试架连接 Flash 芯片

<!-- TODO -->
施工中

### (仅限华硕主板) 使用专用烧录线连接 Flash 芯片

如果使用的是华硕主板，这款主板用于存放 BIOS 固件的 SPI Flash 芯片位于 CPU 附近且在散热器下方，必须拆除散热器，且位置如图所示：

![](/images/guides/rescue-firmware/asus-spi-flash.webp)

将专用烧录线插入位于 SPI Flash 上方的接口，**注意接口涂白部分必须与主板左下角白色标识对应（即该位置是起始位置）**：

![](/images/guides/rescue-firmware/asus-connect-flash.webp)

烧录线的另一端根据顺序照常接入编程器。

## 烧录固件程序

编程器组合并连接好 Flash 芯片后，将编程器连接到电脑，并根据当前的操作系统选择烧录软件：

### (Windows) 使用 NeoProgrammer 刷写

在使用 NeoProgrammer 之前，请提前安装好驱动，驱动已随软件提供，位于 `软件目录\Drivers\CH341A` 下，双击 `DRVSETUP64.exe` 后点击 `安装`。

![](/images/guides/rescue-firmware/install-driver-windows.png)

然后在设备管理器确认有以下设备即安装成功：

![](/images/guides/rescue-firmware/check-ch341a-windows.png)

之后请事先确认 CH341A 编程器外观，并在软件界面的`切换编程器`菜单中选择，考虑到销售情况，多数情况下为`CH341 双电压黑色版`：

![](/images/guides/rescue-firmware/select-programmer.png)

根据图示的序号按顺序操作：

![](/images/guides/rescue-firmware/neoprogrammer.webp)

1. 点击`打开文件`，选择主板对应的固件文件（**注意：扩展名需重命名为`.bin`**）
![](/images/guides/rescue-firmware/select-firmware-windows.png)

2. 点击`检测`，可以探测连接的 Flash 芯片型号，若数据库中无完全对应的型号，也可使用近似型号，例如 `W25Q128JW` 可选择 `W25Q128FW`，这些型号在大多数情况下是新旧版本区别，参数基本相同。
![](/images/guides/rescue-firmware/detect-flashid-neoprogrammer.png)

3. 点击`擦除`，将已经损坏的固件彻底清空，擦除成功后也可选择右侧的`查空`功能检查 Flash 芯片是否已经没有内容。
![](/images/guides/rescue-firmware/erase-and-erasure.png)

4. 点击`写入`，将打开的固件文件烧录到 Flash 芯片中，在软件的默认设置中软件会按顺序执行写入和校验操作，期间**请务必保证连接正常，否则将会导致无法预料的后果**。
![](/images/guides/rescue-firmware/write-and-verify.png)

5. （可选）点击 `校验`，确认烧录内容是否与固件文件相同。

### (macOS, Linux) 使用 IMSProg 刷写

由于 Linux 已经在上游内置了 CH341A 驱动，在这些系统下不需要安装驱动。

根据图示的序号按顺序操作：

![](/images/guides/rescue-firmware/imsprog.webp)

1. 点击`打开文件`，选择主板对应的固件文件（**注意：与 NeoProgrammer 相同，扩展名需重命名为`.bin`**）

2. 点击`检测`，可以探测连接的 Flash 芯片型号，若数据库中无完全对应的型号，也可使用近似型号，同上。

3. 左侧的三个流程均需勾选，之后点击 `开始` 即开始将固件烧录到 Flash 中，期间**请务必保证连接正常，否则将会导致无法预料的后果**。

## 验证修复结果

断开所有连接在 Flash 芯片上的工具或烧录线，若拆下了散热器则需要将 CPU 上的残余硅脂清理干净，使用自备的硅脂填充并重新安装散热器。

照常连接电源线，安装内存条、硬盘，接入键鼠和显示器，开机进行初次安装时的操作，若开机后出现龙芯logo即恢复成功。
