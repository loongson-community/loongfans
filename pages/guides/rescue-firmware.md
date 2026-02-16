---
layout: page
returnLink: /guides
pageTitle: 修复固件
pageSubTitle: 使用编程器修复损坏的固件程序
---

# 在进行修复工作之前

如果你正在查阅这个页面的内容，说明因为固件刷写或更新操作不当导致无法开机，本教程将帮助你如何自行通过编程器刷入固件。

在开始教程之前，请确保你已经购买过且已经拥有了以下硬件工具：

    1. 另一台能够进入系统的电脑
    2. CH341A USB 编程器
    3. 烧录夹或 flash 探针，如果你使用的是华硕主板则建议配备一根华硕专用烧录线
    4. 1.8V 降压模块（目前大多数龙芯主板使用该电压的 flash），若确认 flash 为 3.3V 或 5V 则不需要
    5. 对于部分在散热器下方的 flash 芯片，那么你还需要准备硅脂，以便修复固件之后重新安装散热器  

在开始教程之前，请确保你已经安装了以软件工具：

    1. Windows 请事先安装好 CH341A 驱动程序，推荐使用 [由 Alangoa 更新芯片数据库的 NeoProgramming (来源： 恩山论坛)](https://www.right.com.cn/FORUM/thread-8289988-1-1.html)
    2. macOS / Linux 推荐使用 [IMSProg](https://github.com/bigbigmdm/IMSProg)

在烧写之前请先按以下步骤组装好编程器，此处分别以龙芯 XA61200 和华硕 XC-LS3A6M 两款主板作为范例。

# 下载固件并验证哈希

大多数主流产品可以在[产品规格数据库](https://loongfans.cn/devices)下找到，若未



