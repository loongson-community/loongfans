---
layout: page
# 返回首页
returnLink: /
---

<ChildHeader>
<template #pageTitle>产品规格数据库</template>
<template #pageSubTitle>规格参数、特色配置及已知问题一览</template>
</ChildHeader>

<div class="body_content">

龙芯的处理器和板卡型号众多，但一般以处理器 + 主板（板 U）捆绑的模式销售。本页面用于记录和呈现所有已知的龙芯板 U 组合，以及笔记本、服务器整机信息。

::: info
欲知处理器规格、详情及参数比较，详请见：

- [Loong 1-2-3 站点“龙芯芯片参数”数据库](https://loong123.cn/chips/)
- [龙芯中科官方网站“芯片产品”板块](https://www.loongson.cn/product/channel)
:::

## 3C6000 家族

### 主板及开发板

- [龙芯 AC612A0_V1.1 (3C6000/S @ 2.3GHz, ATX)](/pages/devices/loongson-ac612a0_v1.1)

## 3B6000

### 主板及开发板

- [龙芯 XB612B0_V1.1 (3B6000 @ 2.3GHz, mATX)](/pages/devices/loongson-xb612b0_v1.1)

## 3A6000

### 主板及开发板

- [华硕 XC-LS3A6M (3A6000-HV @ 2.5GHz, mATX)](/pages/devices/asus-xc-ls3a6m)
- [龙芯 XA61200 (3A6000-HV @ 2.5GHz, mATX)](/pages/devices/loongson-xa61200)
- [龙芯 XA61201 (3A6000-HV @ 2.5GHz, mATX)](/pages/devices/loongson-xa61201)
- [龙芯 XA61200 (3A6000-HV @ 2.5GHz, ATX)](/pages/devices/loongson-xa612a0)

### 笔记本电脑

- [攀升 NL38-N11 笔记本 (3A6000 @ 2.0GHz)](/pages/devices/ipason-nl38-n11)
- [联想开天)](/pages/devices/ipason-nl38-n11)

### 整机产品

- [摩方 3A6000 小主机 (3A6000-HV @ 2.5GHz)](/pages/devices/morefine-3a6000-nuc)
- [中科云 3A6000 小主机 (3A6000-HV @ 2.5GHz)](/pages/devices/ctcisz-3a6000-nuc)

## 2K3000/3B6000M

### 主板及开发板

- [OrangePi Nova v1.0 (2K3000 @ 2.2GHz, nanoITX)](/pages/devices/opi_nova_v1.0)
- [龙芯 2K3000 AI 开发板 (2K3000 @ 2.2GHz)](/pages/devices/loongson-2k3000-ai-evb)

### 整机产品

- [中科云 3B6000M 小主机 (3B6000M @ 2.5GHz)](/pages/devices/ctcisz-nuc-3b6000)

## 2K0300

### 主板及开发板

- [龙芯 2K0300 蜂鸟派](/pages/devices/loongson-2k0300-evb)
- [正点原子 2K0300 开发板](/pages/devices/alientek-2k0300-evb)
- [中科云久久派](/pages/devices/ctcisz-foreverpi)

</div>

<ChildFooter />

<script setup>
import ChildHeader from '/components/ChildHeader.vue'
import ChildFooter from '/components/ChildFooter.vue'
</script>