# 下载资源数据

本目录用于存放独立的下载资源数据（固件、数据手册、参考手册、SDK 等）。
每个资源对应一个 YAML 文件，文件名（去掉 `.yml` 后缀）即为全局唯一键。

## 命名约定

建议格式：

```plain
{type}-{entity}-{version}
```

示例：

- `uefi-fw-loongson-xa61200-v4.0.05756_prestable2405_0523rel`
- `datasheet-3a6000-v2.0`

## Schema 字段

下载资源文件应符合 `DownloadItem` 结构：

- `type`: 下载类型（`DownloadType` 枚举值）
- `version`: 版本号字符串
- `size`: 文件大小（字节）
- `date`: 发布日期（`YYYY-MM-DD`）
- `sha256`: 校验和
- `url`: 下载 URL
- `debug`: 可选，调试版标记
- `description`: 可选，按语言的 Markdown 描述

## 描述与更改日志

`description` 支持 `<!--@include: ... -->` 指令，用于引用
`data/downloads/changelogs/` 下的 Markdown 片段。路径相对本目录解析。

示例：

```yaml
description:
  zh: |
    本次主要基于 RefCode Stable2511 基线更新。

    <!--@include: ./changelogs/stable2511.md -->
  en: |
    Major update based on RefCode Stable2511 baseline.

    <!--@include: ./changelogs/stable2511.en.md -->
```
