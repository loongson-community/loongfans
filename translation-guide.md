# 翻译指南

本文档提供了将中文内容（`pages/`）翻译为英文（`en/pages/`）的指南。请严格遵循这些指南，以确保翻译的一致性和准确性。

## 翻译原则

翻译目标是写出符合英文 Linux 技术社区风格的文档，而不是逐字翻译中文。

### 意译优先

中文和英文的表达习惯不同，翻译时应根据英文的自然语序重新组织句子，省略中文原文中的一些冗余表达：

- 「该主板由华硕设计发售，是龙芯 3A6000 首发的第三方主板之一」
  - ❌ The motherboard was designed and released by ASUS, and it is one of the first third-party motherboards for the Loongson 3A6000
  - ✅ This motherboard was designed and sold by ASUS and is one of the first third-party Loongson 3A6000 motherboards
  - 调整语序，把主语放前面
- 「中科云 3A6000 小主机是一款类似 Intel NUC 规格的小型台式机，搭载 3A6000-HV 处理器」
  - ❌ The CTCISZ 3A6000 NUC is a small desktop computer similar to the Intel NUC specification, equipped with a 3A6000-HV processor
  - ✅ The CTCISZ 3A6000 NUC is an Intel NUC-style mini PC powered by Loongson 3A6000-HV
  - 「类似 Intel NUC 规格」用 "NUC-style" 更简洁
  - 「搭载」用 "powered by" 比 "equipped with" 更地道
- 「其特色包括超频支持、双网口和额外的 USB 3.0 板载接口」
  - ❌ Its features include overclocking support, dual network ports, and additional USB 3.0 onboard interfaces
  - ✅ The motherboard is known for its overclocking support, dual network ports, and additional onboard USB 3.0 ports
  - 「其特色包括」不要逐字翻译成 "Its features include"
- 「基于 X 平台设计的开发板」
  - ❌ xxx-based development board
  - ✅ development board ... based on the xxx platform
  - 使用 "based on the xxx platform" 而非 "xxx-based"

### 面向读者

由于译文主要面向对 Linux 开源社区较为熟悉的读者，因此请使用正确的技术词汇：

- 「已在上游 Linux 内核 X 及以上版本中包含」：mainlined since Linux Kernel X
- 「该补丁将在 X 版本合入上游内核」：mainlined as part of Linux Kernel X
- 「X 功能不可用」：X not working

### 简洁优先

避免冗余的解释性文字：

- 保持段落紧凑，不要把一个概念拆成多个段落
- 使用 "typically" 优于 "generally"
- 不要使用 "i.e." 或括号来解释已经清楚的术语
  - ❌ motherboard and CPU bundles (i.e., motherboard and processor sold together)
  - ✅ motherboard and CPU bundles
- 不要在技术术语周围使用不必要的引号
  - ❌ 8Mbit on the "Wi-Fi" version and "256Mbit" on the "TF Card" version
  - ✅ 8Mbit on Wi-Fi, 256Mbit on TF Card
- 使用简洁的表达：
  - ❌ "ForeverPi ships in 'TF Card' and 'Wi-Fi' versions"
  - ✅ "ForeverPi is available in two variants: 'TF Card' and 'Wi-Fi'"

### 格式规范

- 优先使用 `and` 而非 `&`
- 使用 Oxford comma 规则：列举多个项目时，前面的项目用逗号分隔，最后一个项目前使用逗号加 `and`
- 不要在译文中使用 - （dash），而是使用合适的衔接语
- 缩写根据其正式名称决定是否加空格：USB 3.0 加空格，但 ABI2.0 和 ABI1.0 不加空格
- 像 AMD GCN 1.0 - 4.0 这样表示版本或代号范围的，译文应该使用 to 取代 -
- 译文 `.md` 中的 pageSubTitle 使用 sentence case（仅首字母大写），而非 title case（每个单词首字母大写）
- 使用正确的大写名称，如 M.2 而不是 m.2，也不是 m2

## 文件结构

- 中文源文件：`pages/`
- 英文翻译：`en/pages/`
- 英文版本中的 `returnLink` 路径需添加 `/en/` 前缀

## 术语表

### 核心术语

- 龙芯（品牌）: Loongson
- 龙芯（公司）、龙芯中科: Loongson Technology
- 龙架构、龙芯架构: LoongArch
- 我国: China
- 自主/自主研发: independently developed / indigenous
- 新世界 (ABI2.0) / 旧世界 (ABI1.0): New World (ABI2.0) / Old World(ABI1.0)
  - ABI2.0 系统: ABI2.0 systems
- MIPS 时代 / LoongArch 时代: MIPS era / LoongArch era
  - NOTE: 如涉及对比 MIPS 与龙架构的龙芯硬件或软件使用

### 产品线与硬件

- 龙芯 3 号/2 号/1 号: Loongson 3/2/1 series
- 桥片: bridge chip (e.g., 7A2000)
- 板 U 套装: motherboard and CPU bundle
- 工控: industrial control
- 绿板: the "green board" a.k.a. the XA61200 evaluation board
- 亮机卡: basic graphics card (graphics card used just for display output)

## 社区与生态

- 《咱龙了吗？》: *AREWELOONGYET?*
  - NOTE: 对于中文表述必须完整包含书名号与问号，对于英文表述必须使用全大写无空格、包含问号、斜体排版
- AWLY: abbreviation for *AREWELOONGYET?*
- 社区板卡漂流计划: roaming Loongson program
- 龙友会: the Loong Meetups initiative, part of the *AREWELOONGYET?* project
- 统信 UOS: UOS
- 银河麒麟: KylinOS
- 麒麟: KylinOS / openKylin (但除明确说明外，无法指代 Ubuntu Kylin)
- 开放麒麟: openKylin
- 优麒麟: Ubuntu Kylin
- 中科方德: NFSCNS
- 鸿蒙: HarmonyOS / OpenHarmony
- 开放鸿蒙: OpenHarmony
- OHOS: abbreviation for OpenHarmony
- 开放欧拉: openEuler
- 龙蜥: Anolis OS / openAnolis
- 开放龙蜥: openAnolis
- 鸥栖: OpenCloudOS
- 安同 OS: AOSC OS
- 勇豹: Yongbao
- 龙芯开源社区: Loongson Open Source Community

### 硬件与产品

- 台式机: desktop (PC)
- 笔记本: laptop
- 服务器: server
- 开发板/评估板: development board / evaluation board (EVB)
- 整机: pre-built system
- 小主机: NUC
- 板载: onboard
- 独立显卡: discrete graphics card
- 集成显卡: integrated graphics
- 散热器: cooler
- 内存条: RAM module
- 固件: firmware
- 多路: multi-socket
- 嵌入式: embedded
- 主要规格: key specifications

### 厂商与具体板卡

- 华硕: ASUS
- 联想开天: Lenovo Kaitian
- 卓怡恒通: Excelsior
- 摩方: Morefine
- 中科云: CTCISZ
- 正点原子: ALIENTEK
- 龙芯俱乐部: Loongson Club
- 瑞萨: Renesas
- 瑞莎: Radxa
- 紫光（RAM 厂商）: UniIC
- 长鑫（RAM 厂商）: CXMT
- 力积（RAM 厂商）: Zentel
- 2K0300 蜂鸟派: 2K0300 "Hummingbird"
- 2K0300 先锋派: 2K0300 "Pioneer"
- 久久派: ForeverPi
- 中科云 3A6000 小主机: CTCISZ 3A6000 NUC
- 中科云 3B6000M 小主机: CTCISZ 3B6000M NUC
- 2K3000 AI 开发板: 2K3000 AI development board

### 软件与技术术语

- 上游: upstream
- 发行版: distribution
- 内核: kernel
  - Linux 内核: the Linux Kernel
- 内存兼容性: memory compatibility
- 龙芯爱好者社区: Loongson Hobbyists' Community
  - NOTE: 爱好者 -> hobbyists
- 双周会 / 龙架构双周会: LoongArch Biweekly
- lib龙啊龙: libLoL (LoongArch on LoongArch)
- larch: typically part of LoongArch ELF relocation type constant names, e.g., R_LARCH_B26 is read as "R Larch B twenty-six"
- 龙 64: loong64

### 站点专用术语

- 新手资源: Loongson 101
- 初识龙芯: Loongson: An Introduction
- 玩机及踩坑指南: FAQ & Troubleshooting
- 开发板漂流计划: Roaming Loongson Program
- 爱好者社区论坛: Community BBS
- 龙芯官方: Official Sites
- 龙芯生态平台: LoongEco
- 龙芯应用合作社: LoongApps
- 站点源码: Site Sources
- 报告问题: Report Content Issue
- 接口 (X): Interfaces (X)
- 板载 Wi-Fi 模块: Wi-Fi module (onboard)
- 可用于 4G LTE: available for 4G LTE
- 暂无记录: None noted

### 其他

- 闲鱼: Goofish (China's second-hand marketplace platform)
