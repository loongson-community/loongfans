# 设计文档：下载资源数据层

## 动机

下载资源（目前仅为设备的 UEFI 固件文件）以 `<DeviceDownloadCard>` Vue 组件
props 的形式硬编码在 Markdown 设备页面中。相同的二进制元数据（sha256、size、
url、version、date）在中英文页面之间完全重复，容易导致同步问题。这些数据不可
查询、构建时无 Schema 校验，且需要手动管理 `latest` 标记。

未来，芯片页面（如数据手册、参考手册）、SDK/工具链页面或其他内容区域也可能需要
提供可下载资源。一个独立的资源数据层——与设备元数据分离——可以服务于所有这些
场景，而不需要将 Schema 耦合到任何单一内容类型。

## 现状

### 当前数据流

```plain
pages/devices/<slug>.md          （中文，内联 <DeviceDownloadCard> props）
pages/en/devices/<slug>.md       （英文，相同 props 重复）
    └──> <DeviceDownloadCard>    （src/client/components/device/DownloadCard.vue）
              └──> <CopyInline>  （sha256 复制组件）
```

### 现有情况

- **20 个**中文设备页面中有 **6 个**、**约 22 个**英文页面中有 **5 个**包含下载资源。
- 所有下载资源均为 UEFI 固件（`.fd` 文件），始终以 release/debug 成对出现。
- 每张卡片的 props：`title`、`version`、`size`（字节）、`date`（YYYY-MM-DD）、
  `sha256`、`url`、`latest`（布尔值）、`debug`（布尔值）。
- 更改日志：内联文本 + 可选的 `@include` 共享 Markdown 片段，
  中文来自 `pages/parts/devices/`，英文来自 `pages/parts/en/devices/`。
- `data/devices/<slug>/index.yml` 中的设备 YAML **没有**任何下载相关字段。

### 存在的问题

1. **数据重复** — 相同的元数据在中英文页面间复制粘贴；部分主板的英文页面已经
   落后于中文页面。
2. **无校验** — 与其他所有数据类型不同，下载数据跳过了
   `ts-json-schema-generator` → Ajv 校验流水线。
3. **不可查询** — 无法枚举固件版本、构建下载索引或生成更新订阅源。
4. **手动 `latest`** — 添加新版本需要编辑多个文件并手动移动 `latest` 标记。
5. **不可扩展** — 如果芯片或 SDK 也需要下载功能，目前没有可复用的基础设施。

## 设计方案

### 新 `data` 类型：`downloads`

引入 `downloads` 作为与 `biweekly`、`chips`、`device`、`os` 并列的**第五种独立
`data` 类型**，存放于 `data/downloads/`。每个下载资源独立一个 YAML 文件，以
**资源自身的唯一标识符**（即文件名）为键。

内容实体（设备、芯片等）通过在各自的数据文件中声明 `downloads` 引用列表来
关联所需的下载资源，而非反过来由下载资源声明所属实体。

#### 核心设计原则

- **下载资源是独立实体，不从属于特定内容类型。** 一个固件文件可能同时适用于
  多个设备（如共享平台的主板衍生产品），独立存储天然支持多对多关系。
- **引用关系由消费者声明。** 设备数据文件列出它需要的下载资源键，芯片数据文件
  也可以列出自己需要的下载资源键，各自独立，互不耦合。
- 同一套 Schema 和流水线服务于所有内容类型，无需按内容类型划分子目录。
- 独立的虚拟模块（`virtual:loongfans-data/downloads`）可以仅在需要时引入，
  不会拉入无关数据。

### 目录结构

```plain
data/
  downloads/
    README.md
    uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel.yml
    uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_dbg.yml
    uefi-fw-loongson-xa61200-v5.0.0344_stable202511_rel.yml
    uefi-fw-loongson-xa61200-v5.0.0344_stable202511_dbg.yml
    uefi-fw-loongson-xa61200-v4.0.05756_prestable2405_rel.yml
    uefi-fw-loongson-xa61200-v4.0.05756_prestable2405_dbg.yml
    ...                                # 每个下载资源一个文件
```

文件名（去掉 `.yml` 后缀）即为该下载资源的**全局唯一键**，在整个项目中用于
引用。命名建议采用 `{type}-{device/entity}-{version}` 的格式以保持可读性
和排序友好。

### 引用关系：在数据实体中声明

各内容实体在自身的数据文件中通过 `downloads` 字段列出所关联的下载资源键：

```yaml
# data/devices/loongson-ac612a0-v1.0/index.yml
name:
  en: Loongson AC612A0_V1.0
  zh: 龙芯 AC612A0_V1.0
family: 3c6000
category: board
image: /images/devices/loongson-ac612a0-v1.0.thumbnail.webp
spec: "3C6000/S @ 2.3GHz, ATX"
tags:
  - 7a2000
  - ecc
  - desktop-mb
downloads:
  - uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel
  - uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_dbg
```

未来芯片数据也可以同样声明：

```yaml
# data/chips/cpu/3a6000.yml（未来示例）
# ... 现有芯片字段 ...
downloads:
  - datasheet-3a6000-v2.0
  - manual-3a6000-reference-v1.1
```

这种方式的优势：

- **多对多关系**：同一个固件可以被多个设备引用（如共享平台的派生主板）。
- **无命名空间开销**：不需要 `devices/`、`chips/` 等子目录分类；资源键本身
  已包含足够的上下文信息。
- **引用完整性可校验**：构建时可以检查所有引用的键是否在 `data/downloads/`
  中存在，类似外键约束。

### 下载资源 YAML Schema

每个下载资源文件包含该资源的完整元数据：

```yaml
# data/downloads/uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel.yml
type: uefi-firmware                    # DownloadType 枚举值
version: "V1.0_V5.0.0343_stable202511_rel"
size: 6291456                          # 字节
date: "2025-01-07"                     # YYYY-MM-DD
sha256: "021a22173dcea9f001de5fa876b3e32897d119743dcdaea8d776822fc27678d5"
url: "https://file.loongfans.cn/ac612a0-v1.0/EDK2025_AC612A0-V1.0_V5.0.0343_stable202511_rel.fd"
debug: false
description:
  zh: |
    本次主要基于 RefCode Stable2511 基线更新，详细更新说明按照流程需要查阅代码发布说明

    <!--@include: ./changelogs/stable2511.md -->
  en: |
    Major update based on RefCode Stable2511 baseline; see code release notes for details

    <!--@include: ./changelogs/stable2511.en.md -->
```

#### `description` 字段与 Markdown 包含

`description` 是可选的 `LocalizedString`，其内容为 Markdown 文本。
构建时对 `description` 的值进行预处理，支持 VitePress 风格的
`<!--@include: path -->` 指令，将引用的 Markdown 文件内容内联展开。

包含路径相对于 `data/downloads/` 目录解析。该实现是一个最小化的预处理器，
仅支持 `@include` 语法（不含 VitePress 的行范围选择等高级功能），在
`generateDownloadsDatabase()` 阶段执行：

```typescript
// 伪代码
function expandIncludes(content: string, baseDir: string): string {
  return content.replace(
    /<!--\s*@include:\s*(.+?)\s*-->/g,
    (_, filePath) => fs.readFileSync(resolve(baseDir, filePath), "utf-8"),
  )
}
```

这意味着虚拟模块暴露的 `DownloadItem.description` 值已经是展开后的完整
Markdown 文本，渲染组件无需再处理 `@include` 指令。

### TypeScript 类型定义

```typescript
// src/types/data.ts

/**
 * 下载资源类型枚举。
 *
 * 使用枚举而非自由格式字符串，原因如下：
 * - 类型安全：构建时即可捕获拼写错误和非法值。
 * - i18n 友好：每个枚举值直接映射到本地化显示名称。
 * - 展示一致性：保证 UI 中资源类型名称统一。
 *
 * 添加新资源类型时，需要同时更新此枚举和对应的 i18n 键。
 */
export enum DownloadType {
  UEFIFirmware = "uefi-firmware",
  Datasheet = "datasheet",
  ReferenceManual = "reference-manual",
  UserManual = "user-manual",
  SchematicDiagram = "schematic-diagram",
  SDK = "sdk",
}

export interface DownloadItem {
  type: DownloadType
  version: string
  size: number                    // 字节
  date: string                   // YYYY-MM-DD
  sha256: string
  url: string
  debug?: boolean                // 默认 false；仅与固件相关
  description?: LocalizedString  // 按语言的 Markdown 描述，支持 @include 语法
}

/**
 * 以资源键（文件名）为键的扁平映射。
 * 如 "uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel"。
 */
export interface DownloadsDB {
  [resourceKey: string]: DownloadItem
}
```

同时扩展 `DeviceInfoItem`，添加可选的 `downloads` 字段：

```typescript
export interface DeviceInfoItem {
  name: LocalizedString
  family: string
  category: string
  image: string
  spec: string
  tags: string[]
  downloads?: string[]           // 引用 DownloadsDB 中的资源键
}
```

### 派生属性（计算得出，不存储）

以下属性**不**存储在 YAML 中，而是在构建或渲染时派生：

| 属性 | 派生方式 |
| --- | --- |
| `latest` | 按 `(type, debug)` 分组，取 `date` 最新的条目。 |
| `formattedSize` | 在 Vue 组件中由 `size` 计算（已有实现）。 |
| `formattedDate` | 在 Vue 组件中由 `date` 计算（已有实现）。 |
| `title` | 由 `DownloadType` 枚举值通过 i18n 查找表派生（如 `uefi-firmware` → "UEFI 固件" / "UEFI Firmware"）。 |

### 虚拟模块

```plain
virtual:loongfans-data/downloads  →  DownloadsDB
```

下载资源以扁平的键值映射暴露。消费组件通过实体数据中的 `downloads` 键列表
从该模块中查找对应的 `DownloadItem`。

### 插件集成

`loongfans-data` Vite 插件需要新增：

1. 新的 `DataKind.Downloads` 枚举值。
2. `DatabaseGenerator` 中的 `generateDownloadsDatabase()` 方法：
   - Glob 匹配 `data/downloads/*.yml`（不含 `changelogs/` 子目录）。
   - 对每个文件按 `DownloadItem` 进行校验（包括 `type` 的 `DownloadType` 枚举校验）。
   - 预处理 `description` 字段中的 `<!--@include: ... -->` 指令，展开引用的
     Markdown 文件内容（路径相对于 `data/downloads/` 解析）。
   - 以文件名（去掉后缀）为键，组装为 `DownloadsDB`。
3. 构建时引用完整性检查：遍历所有 `DeviceInfoItem.downloads`（及未来的
   芯片等实体），验证每个键在 `DownloadsDB` 中存在。
4. Watcher 将 `data/downloads/` 的变更（包括 `changelogs/` 子目录中的
   Markdown 文件变更）映射到 `DataKind.Downloads`。
5. 在 `loongfans-data.d.ts` 中新增
   `declare module "virtual:loongfans-data/downloads"`。

### 更改日志片段

共享更改日志保持为 **Markdown 文件**（它们是自由格式的文本，不是结构化数据）。
从 `pages/parts/` 迁移到 `data/downloads/changelogs/`：

```plain
data/downloads/changelogs/
  stable2511.md             # 中文
  stable2511.en.md          # 英文翻译
```

更改日志通过 `description` 字段中的 `<!--@include: ... -->` 指令引用，
在构建时由 `generateDownloadsDatabase()` 的预处理器展开。不再需要单独的
`changelog` 字段或渲染时解析逻辑。

### 组件变更

#### 新增：`DownloadList.vue`

一个通用包装组件，功能如下：

1. 导入 `virtual:loongfans-data/downloads`。
2. 接受 `keys` prop（`string[]`，即资源键列表）。
3. 从 `DownloadsDB` 中查找每个键对应的 `DownloadItem`。
4. 按 `(type, debug)` 分组，派生 `latest`，并为每个条目渲染
   `<DownloadCard>`。
5. 根据当前语言环境解析 `description`（已在构建时展开 `@include`，
   直接作为 Markdown 渲染即可）。
6. 由 `DownloadType` 枚举值通过 i18n 查找表派生卡片标题。

#### 重构：`DeviceDownloadCard.vue` → `DownloadCard.vue`

去掉 `Device` 前缀，因为它现在是通用的下载卡片组件，可服务于设备、芯片
或任何内容类型。组件 props 本身改动最小。

#### 自动注入下载标签页

`DeviceDetail.vue` 自动从设备数据中读取 `downloads` 键列表。如果列表非空，
则自动渲染下载标签页并在其中使用 `<DownloadList>`；如果列表为空或不存在，
则不显示该标签页。**设备页面的 Markdown 无需包含任何 `#download` slot。**

由于下载资源数据在渲染时已通过虚拟模块全部可用，该判断逻辑是简单的：

```typescript
// DeviceDetail.vue 中的伪代码
import downloadsDB from "virtual:loongfans-data/downloads"

const hasDownloads = computed(() =>
  deviceData.downloads?.length > 0
)
```

这意味着迁移完成后，设备页面只需包含 `#spec`、`#known-issues`、`#image`
三个 slot，下载标签页完全由数据驱动。

## 迁移计划

### 阶段 0：基础设施

| # | 任务 | 涉及文件 |
| --- | --- | --- |
| 0.1 | 添加 `DownloadType` 枚举和 `DownloadItem`、`DownloadsDB` 类型定义 | `src/types/data.ts` |
| 0.2 | 为 `DeviceInfoItem` 添加可选的 `downloads?: string[]` 字段 | `src/types/data.ts` |
| 0.3 | 在 `DatabaseGenerator` 中添加 `DownloadItem` JSON Schema 引用和校验器 | `src/node/plugins/loongfans-data/generateDatabase.ts` |
| 0.4 | 实现 `@include` 预处理器（`description` 字段中的 Markdown 包含展开） | `src/node/plugins/loongfans-data/generateDatabase.ts` |
| 0.5 | 添加 `generateDownloadsDatabase()` 方法（glob + 校验 + `@include` 展开 + 组装扁平映射） | `src/node/plugins/loongfans-data/generateDatabase.ts` |
| 0.6 | 在插件中添加 `DataKind.Downloads`、watcher case、`load` case | `src/node/plugins/loongfans-data/index.ts` |
| 0.7 | 添加 `declare module "virtual:loongfans-data/downloads"` | `src/types/loongfans-data.d.ts` |
| 0.8 | 添加构建时引用完整性检查（设备 `downloads` 键 → `DownloadsDB`） | `src/node/plugins/loongfans-data/generateDatabase.ts` |
| 0.9 | 创建 `data/downloads/README.md` 编写指南（含键名惯例） | `data/downloads/README.md` |

### 阶段 1：更改日志提取

| # | 任务 | 涉及文件 |
| --- | --- | --- |
| 1.1 | 将 `pages/parts/devices/changelist_*.md` 移至 `data/downloads/changelogs/` | 文件移动 |
| 1.2 | 将 `pages/parts/en/devices/changelist_*.md` 移至同目录，添加 `.en.md` 后缀 | 文件移动 |
| 1.3 | 如果更改日志仍作为 include 使用，则更新 `@include` 引用路径 | 设备页面 |

### 阶段 2：`DownloadList` 组件

| # | 任务 | 涉及文件 |
| --- | --- | --- |
| 2.1 | 将 `DeviceDownloadCard.vue` 重命名为 `DownloadCard.vue` | `src/client/components/device/` |
| 2.2 | 创建从虚拟模块读取数据的 `DownloadList.vue` | `src/client/components/device/` |
| 2.3 | 为每个 `DownloadType` 枚举值添加 i18n 键映射 | `src/common/locales/` |
| 2.4 | 实现 `latest` 派生逻辑 | 新组件内 |
| 2.5 | 修改 `DeviceDetail.vue` 实现下载标签页自动注入 | `src/client/components/device/DeviceDetail.vue` |

### 阶段 3：逐设备迁移下载数据（每设备一个提交）

从中英文 Markdown 中提取 `<DeviceDownloadCard>` props，为每个下载资源创建
独立的 YAML 文件，并在设备 `index.yml` 中添加 `downloads` 引用列表。
每个设备迁移后验证。

推荐顺序（简单 → 复杂）：

| # | 设备 | 下载数量 | 备注 |
| --- | --- | --- | --- |
| 3.1 | `loongson-ac612a0-v1.0` | 2 | 当前正在编辑的文件；无英文页面 |
| 3.2 | `loongson-xa61201-v1.0` | 2 | |
| 3.3 | `loongson-xa612b0-v1.0` | 2 | |
| 3.4 | `loongson-xb612b0-v1.2` | 2 | |
| 3.5 | `loongson-xa612a0-v1.0` | 6 | 3 个版本 × release+debug |
| 3.6 | `loongson-xa61200` | 8 | 4 个版本 × release+debug；最复杂 |

每设备检查清单：

- [ ] 为该设备的每个下载资源创建 `data/downloads/<resource-key>.yml`
- [ ] 在 `data/devices/<slug>/index.yml` 中添加 `downloads` 引用列表
- [ ] 从中文页面移除内联 `<DeviceDownloadCard>` 代码块和 `#download` slot
- [ ] 从英文页面移除内联 `<DeviceDownloadCard>` 代码块和 `#download` slot（如存在）

### 阶段 4：清理

| # | 任务 |
| --- | --- |
| 4.1 | 移除 `pages/parts/` 中的孤立更改日志片段（已迁移到 `data/downloads/changelogs/`） |
| 4.2 | 更新 `AGENTS.md` 以记录新的数据类型 |

> **提醒：**每个提交前均需按 `AGENTS.md` 中的验证清单运行对应检查，此处不再
> 逐阶段列出。

### 阶段 5：未来增强

| # | 增强项 | 优先级 |
| --- | --- | --- |
| 5.1 | 下载索引页面（跨设备固件列表） | 中 |
| 5.2 | 固件更新 RSS/Atom 订阅源 | 低 |
| 5.3 | CI 完整性检查（获取 URL，验证 sha256） | 中 |
| 5.4 | 芯片下载资源（数据手册、参考手册）：为芯片类型添加 `downloads` 字段 | 按需 |
| 5.5 | SDK/工具链下载资源 | 按需 |
| 5.6 | 适用于任意内容页面的 `DownloadCard`（指南等） | 按需 |

## 设计决策记录

以下问题在设计评审中已确定：

1. **更改日志与资源描述** — 更改日志迁移到 `data/downloads/changelogs/`。
   在 `description` 字段中通过 `<!--@include: ... -->` 引用，构建时由
   `generateDownloadsDatabase()` 展开。实现一个最小化的 `@include` 预处理器
   （仅支持简单路径替换，不含 VitePress 的行范围选择等高级功能）。

2. **下载类型** — 使用 `DownloadType` TypeScript 枚举。保证类型安全和 i18n
   一致性，添加新类型时需同步更新枚举和 i18n 键。初始枚举值包括
   `uefi-firmware`、`datasheet`、`reference-manual`、`user-manual`、
   `schematic-diagram`、`sdk`。

3. **自动注入** — 下载标签页在设备数据中 `downloads` 列表非空时自动出现，
   无需页面 Markdown 中的 `#download` slot。因为下载资源数据在渲染时已通过
   虚拟模块完全可用，判断逻辑简单直接。

4. **资源键命名** — 键名为自由格式字符串，不做正则约束。推荐遵循
   `{type-abbrev}-{entity}-{version}` 惯例（如
   `uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel`）以保持
   可读性和排序友好，但不强制执行。命名惯例记录在 `data/downloads/README.md`
   中作为指南。
