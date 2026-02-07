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
- 使用正确的大小写与标点符号，如 M.2 而不是 m.2，也不是 m2

## 文件结构

- 术语表：[`./glossary.md`](./glossary.md)
- 中文源文件：`pages/`
- 英文翻译：`pages/en`
- 英文版本中的 `returnLink` 路径需添加 `/en/` 前缀
