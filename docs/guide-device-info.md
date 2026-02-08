# 编写指南：设备信息

本文档介绍设备信息的数据布局和编写约定。

## 目录结构

每个设备由 `data/devices/<device-slug>/` 目录表示，包含三个文件：

```plain
data/devices/<device-slug>/
├── index.yml        # 设备元数据
├── content.zh.md    # 中文页面内容（Vue template slots）
└── content.en.md    # 英文页面内容（Vue template slots）
```

设备标识符（`<device-slug>`）是目录名，同时作为页面 URL 路径的一部分：

- 中文页面：`/devices/<device-slug>`
- 英文页面：`/en/devices/<device-slug>`

### 分类配置

`data/devices/families.yml` 定义设备的三种分类维度：

| 键 | 用途 | 示例 |
| --- | --- | --- |
| `families` | CPU/SoC 产品家族 | `2k0300`、`3a6000`、`3c6000` |
| `categories` | 设备形态分类 | `board`、`laptop`、`prebuilt` |
| `tags` | 可筛选的特征标签 | `7a2000`、`desktop-mb`、`dev-board`、`nuc` |

每个分类条目都有 `title` 字段，含 `en` 和 `zh` 本地化显示名称。

添加新设备时使用已有的 `family`、`category` 和 `tags` 值。如需新增分类值，
需同时在 `families.yml` 中添加对应条目。

## `index.yml` 元数据

每个设备的 `index.yml` 包含以下字段：

```yaml
name:
  en: Loongson XA61200         # 英文设备名称
  zh: 龙芯 XA61200              # 中文设备名称
family: 3a6000                 # CPU/SoC 家族（引用 families.yml）
category: board                # 设备分类（引用 families.yml）
image: /images/devices/loongson-xa61200.thumbnail.webp  # 缩略图路径
spec: "3A6000-HV @ 2.5GHz, DTX"  # 简短规格摘要，显示在索引卡片上
tags:                          # 特征标签列表（引用 families.yml）
  - 7a2000
  - desktop-mb
downloads:                     # 关联的下载资源键（可选）
  - uefi-fw-loongson-xa61200-v5.0.0344_stable202511_rel
  - uefi-fw-loongson-xa61200-v5.0.0344_stable202511_dbg
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | `LocalizedString` | 是 | 设备显示名称，需提供 `en` 和 `zh` |
| `family` | `string` | 是 | 引用 `families.yml` 中的 `families` 键 |
| `category` | `string` | 是 | 引用 `families.yml` 中的 `categories` 键 |
| `image` | `string` | 是 | 缩略图路径，位于 `pages/public/images/devices/` |
| `spec` | `string` | 是 | 简短规格摘要，显示在设备索引卡片上 |
| `tags` | `string[]` | 是 | 特征标签，引用 `families.yml` 中的 `tags` 键 |
| `downloads` | `string[]` | 否 | 关联的下载资源键，引用 `data/downloads/` 中的文件名 |

### 图片约定

- 缩略图格式：WebP，放置在 `pages/public/images/devices/`。
- 命名：`<device-slug>.thumbnail.webp`。
- 可选地提供全尺寸图片：`<device-slug>.webp`。

## 内容文件

`content.zh.md` 和 `content.en.md` 不是独立的 Markdown 页面，而是包含
Vue `<template>` slot 块的片段，由 `DeviceDetail` 组件渲染。

### 必需的 slots

每个内容文件应包含以下四个 slot：

#### `#introduction` — 设备简介

使用 VitePress `:::info` 容器包装简介文字：

```html
<template #introduction>
:::info
龙芯 XA61200 是由龙芯中科推出的台式机主板。
:::
</template>
```

#### `#spec` — 规格表

使用 Markdown 表格展示详细规格：

```html
<template #spec>
| 类别 | 规格 |
| ---- | ---- |
| 厂商 | 龙芯中科 |
| 板型 | DTX (203×244mm) |
| 处理器 | 3A6000-HV @ 2.5GHz |
| 内存 | 2× DDR4 UDIMM, 最大 64GB |
</template>
```

**规格表常用类别**（中文 / 英文）：

| 中文 | 英文 |
| --- | --- |
| 厂商 | Manufacturer |
| 板型 | Form Factor |
| 处理器 | Processor |
| 内存 | Memory |
| 接口（PCIe） | Interfaces (PCIe) |
| 接口（USB） | Interfaces (USB) |
| 接口（存储） | Interfaces (Storage) |
| 接口（网络） | Interfaces (Network) |
| 接口（视频） | Interfaces (Video) |
| 接口（其他） | Interfaces (Other) |

如果设备有多个配置变体，使用 `###` 子标题区分：

```html
<template #spec>
### Wi-Fi 版

| 类别 | 规格 |
| ---- | ---- |
| ... | ... |

### TF 卡版

| 类别 | 规格 |
| ---- | ---- |
| ... | ... |
</template>
```

脚注放在表格之后：

```markdown
| 接口（USB） | 1× USB-C †, 2× USB 2.0 |

†：其中一个 USB-C 接口仅可用于为板卡供电，无数据功能。
```

#### `#known-issues` — 已知问题

优先引用 `pages/parts/known-issues/` 中的共享片段：

```html
<!-- 中文 -->
<template #known-issues>
<!--@include: @parts/known-issues/7a-errata.md -->
</template>

<!-- 英文 -->
<template #known-issues>
<!--@include: @parts/en/known-issues/7a-errata.md -->
</template>
```

共享已知问题片段位于：

- 中文：`pages/parts/known-issues/`
- 英文：`pages/parts/en/known-issues/`

如果没有已知问题，使用简短说明：

```html
<!-- 中文 -->
<template #known-issues>
暂无记录。
</template>

<!-- 英文 -->
<template #known-issues>
None noted.
</template>
```

#### `#image` — 产品图片

使用可点击缩略图链接到全尺寸图片，附带来源说明：

```html
<template #image>
[![](/images/devices/loongson-xa61200.thumbnail.webp)](/images/devices/loongson-xa61200.webp)
来源：《XA61200 主板产品使用手册 V1.1》
</template>
```

如果图片暂时不可用，使用占位符：

```html
<!-- 中文 -->
<template #image>
（待更新）
</template>

<!-- 英文 -->
<template #image>
(Coming Soon)
</template>
```

### 下载标签页

下载标签页由数据驱动，**无需在内容文件中手动添加 slot**。只需在
`index.yml` 中设置 `downloads` 字段引用对应的下载资源键即可。详见
[下载资源设计文档](./design-download-resources.md)。

## 添加新设备的步骤

1. **创建设备目录**：`data/devices/<device-slug>/`

2. **编写 `index.yml`**：填写设备元数据，确保 `family`、`category`、`tags`
   值在 `families.yml` 中已定义。

3. **编写 `content.zh.md`**：添加四个必需的 `<template>` slot。

4. **编写 `content.en.md`**：翻译中文内容。遵循
   [翻译指南](./translation-guide.md) 和[术语表](./glossary.md)。

5. **添加图片**：将缩略图（和可选的全尺寸图片）放入
   `pages/public/images/devices/`。

6. **关联下载资源**（如有）：在 `index.yml` 的 `downloads` 字段中列出下载
   资源键。

7. **验证**：运行 `pnpm run build` 确保构建成功。

> **注意：** 添加或删除设备目录后，VitePress 开发服务器的 HMR 可能不会自动
> 刷新路由列表。如果新设备页面未出现，请重启开发服务器。
