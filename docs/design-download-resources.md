# 设计文档：下载资源数据层

## 动机

下载资源（最初为设备的 UEFI 固件文件）需要一个独立的数据层来解决以下问题：

1. **数据重复** — 相同的元数据在中英文页面间复制粘贴，容易不同步。
2. **无校验** — 下载数据跳过了 `ts-json-schema-generator` → Ajv 校验流水线。
3. **不可查询** — 无法枚举固件版本、构建下载索引或生成更新订阅源。
4. **手动 `latest`** — 添加新版本需要编辑多个文件并手动移动 `latest` 标记。
5. **不可扩展** — 如果芯片或 SDK 也需要下载功能，没有可复用的基础设施。

## 架构

### 数据类型：`downloads`

`downloads` 是与 `biweekly`、`chips`、`device`、`os` 并列的**第五种独立
`data` 类型**，存放于 `data/downloads/`。每个下载资源独立一个 YAML 文件，以
**文件名（去掉 `.yml` 后缀）作为全局唯一键**。

### 核心设计原则

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
    README.md                      # 编写指南
    changelogs/                    # 共享更改日志片段
      stable2511.md                # 中文
      stable2511.en.md             # 英文
    uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel.yml
    uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_dbg.yml
    ...                            # 每个下载资源一个文件
```

文件名即为该下载资源的**全局唯一键**。推荐命名格式：
`{type-abbrev}-{entity}-{version}`（如
`uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel`），但不强制执行。

### 引用关系

各内容实体在自身的数据文件中通过 `downloads` 字段列出所关联的下载资源键：

```yaml
# data/devices/loongson-ac612a0-v1.0/index.yml
name:
  en: Loongson AC612A0_V1.0
  zh: 龙芯 AC612A0_V1.0
family: 3c6000
category: board
# ...
downloads:
  - uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel
  - uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_dbg
```

构建时对所有引用进行完整性检查（类似外键约束）。

### 下载资源 YAML Schema

```yaml
# data/downloads/uefi-fw-loongson-ac612a0-v1.0-v5.0.0343_stable202511_rel.yml
type: uefi-firmware                    # DownloadType 枚举值
version: "V1.0_V5.0.0343_stable202511_rel"
size: 6291456                          # 字节
date: "2025-01-07"                     # YYYY-MM-DD
sha256: "021a22173dcea9f001de5fa876b3e32897d119743dcdaea8d776822fc27678d5"
url: "https://file.loongfans.cn/..."
debug: false
description:
  zh: |
    本次主要基于 RefCode Stable2511 基线更新

    <!-- truncate -->

    <!--@include: ./changelogs/stable2511.md -->
  en: |
    Major update based on RefCode Stable2511 baseline

    <!-- truncate -->

    <!--@include: ./changelogs/stable2511.en.md -->
```

### `description` 字段处理流水线

`description` 是可选的 `LocalizedString`，内容为 Markdown 文本。构建时经过
以下处理流水线：

1. **`@include` 展开** — 支持 VitePress 风格的 `<!--@include: path -->`
   指令，将引用的 Markdown 文件内容内联展开。路径相对于 `data/downloads/`
   解析。仅支持简单路径替换，不含 VitePress 的行范围选择等高级功能。

2. **`<!-- truncate -->` 分割** — 将描述分为摘要部分（brief）和详情部分
   （detail）。摘要在下载卡片中直接展示，详情在用户展开后显示。

3. **Markdown → HTML 渲染** — 使用 VitePress 的 `createMarkdownRenderer`
   在 Node.js 构建时将每个部分渲染为 HTML。**客户端不进行任何 Markdown
   解析**，消除了 `markdown-it` 运行时依赖。

最终虚拟模块暴露的数据使用 `RenderedDownloadItem` 类型，其中 `description`
字段被替换为 `briefHtml` 和 `detailHtml`（均为 `LocalizedString`）。

### TypeScript 类型

```typescript
// src/types/data.ts

/** 下载资源类型枚举。添加新类型时需同步更新 i18n 映射。 */
export enum DownloadType {
  UEFIFirmware = "uefi-firmware",
  Datasheet = "datasheet",
  ReferenceManual = "reference-manual",
  UserManual = "user-manual",
  SchematicDiagram = "schematic-diagram",
  SDK = "sdk",
}

/** YAML 输入类型，用于 Schema 校验。 */
export interface DownloadItem {
  type: DownloadType
  version: string
  size: number
  date: string
  sha256: string
  url: string
  debug?: boolean
  description?: LocalizedString
}

/** 虚拟模块输出类型，description 已渲染为 HTML 并按 truncate 分割。 */
export interface RenderedDownloadItem {
  type: DownloadType
  version: string
  size: number
  date: string
  sha256: string
  url: string
  debug?: boolean
  briefHtml?: LocalizedString
  detailHtml?: LocalizedString
}

export interface DownloadsDB {
  [resourceKey: string]: RenderedDownloadItem
}
```

### 派生属性（计算得出，不存储）

| 属性 | 派生方式 |
| --- | --- |
| `latest` | `DownloadList.vue` 中按 `(type, debug)` 分组，取 `date` 最新的条目。 |
| `formattedSize` | `DownloadCard.vue` 中由 `size` 计算。 |
| `formattedDate` | `DownloadCard.vue` 中由 `date` 计算。 |
| `title` | 由 `DownloadType` 枚举值通过 i18n 查找表派生。 |

### 虚拟模块

```plain
virtual:loongfans-data/downloads  →  DownloadsDB
```

### 插件集成

`loongfans-data` Vite 插件中的实现：

- `DataKind.Downloads` 枚举值。
- `DatabaseGenerator.generateDownloadsDatabase()` 方法：
  glob `data/downloads/*.yml` → 校验 → `@include` 展开 → truncate 分割 →
  Markdown→HTML 渲染 → 组装为 `DownloadsDB`。
- 构建时引用完整性检查：在 `generateDeviceDatabase()` 中验证
  `DeviceInfoItem.downloads` 引用的键在 `DownloadsDB` 中全部存在。
- Watcher 将 `data/downloads/` 的变更（包括 `changelogs/` 中的 Markdown
  文件）映射到 `DataKind.Downloads`。
- `loongfans-data.d.ts` 中的 `declare module "virtual:loongfans-data/downloads"`。

### 组件结构

- **`DownloadCard.vue`** — 通用下载卡片组件，接受 props 显示元数据和 HTML
  描述。可服务于设备、芯片或任何内容类型。
- **`DownloadList.vue`** — 导入 `virtual:loongfans-data/downloads`，接受
  `keys` prop，查找、排序、派生 `latest`，按语言解析 `briefHtml`/`detailHtml`，
  渲染 `<DownloadCard>`。
- **`DeviceDetail.vue`** — 自动从设备数据读取 `downloads` 键列表，列表非空时
  自动渲染下载标签页。设备页面 Markdown 无需包含 `#download` slot。

## 设计决策记录

1. **更改日志与资源描述** — 更改日志存放在 `data/downloads/changelogs/`，通过
   `description` 中的 `<!--@include: ... -->` 引用，构建时展开。

2. **下载类型** — 使用 `DownloadType` TypeScript 枚举，保证类型安全和 i18n
   一致性。

3. **自动注入** — 下载标签页数据驱动，无需页面 Markdown 中的手动 slot。

4. **资源键命名** — 自由格式字符串，推荐 `{type-abbrev}-{entity}-{version}`
   惯例，详见 `data/downloads/README.md`。

5. **构建时 Markdown 渲染** — 使用 VitePress 的 `createMarkdownRenderer` 在
   构建时将 `description` 渲染为 HTML，消除客户端 `markdown-it` 依赖。输入类型
   `DownloadItem`（YAML 校验用）与输出类型 `RenderedDownloadItem`（虚拟模块
   消费用）分离。

## 未来增强

| 增强项 | 优先级 |
| --- | --- |
| 下载索引页面（跨设备固件列表） | 中 |
| 固件更新 RSS/Atom 订阅源 | 低 |
| CI 完整性检查（获取 URL，验证 sha256） | 中 |
| 芯片下载资源（数据手册、参考手册） | 按需 |
| SDK/工具链下载资源 | 按需 |
| 适用于任意内容页面的 `DownloadCard` | 按需 |
