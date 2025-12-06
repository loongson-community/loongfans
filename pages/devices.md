---
layout: page
# 返回首页
returnLink: /
pageTitle: 产品规格数据库
pageSubTitle: 规格参数、特色配置及已知问题一览
---

<script setup>
import Card from "../components/device/Card.vue"
</script>


龙芯的处理器和板卡型号众多，但一般以处理器 + 主板（板 U）捆绑的模式销售。本页面用于记录和呈现所有已知的龙芯板 U 组合，以及笔记本、服务器整机信息。

::: info
欲知处理器规格、详情及参数比较，详请见：

- [Loong 1-2-3 站点“龙芯芯片参数”数据库](https://loong123.cn/chips/)
- [龙芯中科官方网站“芯片产品”板块](https://www.loongson.cn/product/channel)
:::

## 3C6000 家族

### 主板及开发板

<Card
  name="龙芯 AC612A0_V1.1"
  href="/pages/devices/loongson-ac612a0-v1.1"
  image="/public/images/devices/loongson-ac612a0-v1.1.thumbnail.webp"
  spec="3C6000/S @ 2.3GHz, ATX"
  tags="7A2000, 支持 ECC 内存, 台式机主板, PCIe 3.0"
/>

## 3B6000

### 主板及开发板

<Card
  name="龙芯 XB612B0_V1.1"
  href="/pages/devices/loongson-xb612b0-v1.1"
  image="/public/images/devices/loongson-xb612b0-v1.1.thumbnail.webp"
  spec="3B6000 @ 2.3GHz, mATX"
  tags="7A2000, 台式机主板"
/>

## 3A6000

### 主板及开发板

<Card
  name="华硕 XC-LS3A6M"
  href="/pages/devices/asus-xc-ls3a6m"
  image="/public/images/devices/asus-xc-ls3a6m.webp"
  spec="3A6000-HV @ 2.5GHz, mATX"
  tags="7A2000, 台式机主板"
/>

<Card
  name="龙芯 XA61200"
  href="/pages/devices/loongson-xa61200"
  image="/public/images/devices/loongson-xa61200.thumbnail.webp"
  spec="3A6000-HV @ 2.5GHz, DTX"
  tags="7A2000, 台式机主板"
/>

<Card
  name="龙芯 XA61201"
  href="/pages/devices/loongson-xa61201"
  image="/public/images/devices/loongson-xa61201.thumbnail.webp"
  spec="3A6000-HV @ 2.5GHz, DTX"
  tags="7A2000, 台式机主板"
/>

<Card
  name="龙芯 XA612A0"
  href="/pages/devices/loongson-xa612a0"
  image="/public/images/devices/loongson-xa612a0.thumbnail.webp"
  spec="3A6000-HV @ 2.5GHz, ATX"
  tags="7A2000, 台式机主板"
/>

### 笔记本电脑

<Card
  name="卓怡恒通 NL38-N11"
  href="/pages/devices/excelsior-nl38-n11"
  image="/public/images/devices/excelsior-nl38-n11.webp"
  spec="3A6000 @ 2.0GHz"
  tags="笔记本电脑"
/>

<Card
  name="联想开天 N60d-G1d"
  href="/pages/devices/kaitian-n60d-g1d"
  image="/public/images/devices/kaitian-n60d-g1d.thumbnail.webp"
  spec="3A6000 @ 2.0GHz"
  tags="笔记本电脑"
/>

### 整机产品

<Card
  name="摩方 M700S"
  href="/pages/devices/morefine-m700s"
  image="/public/images/devices/morefine-m700s.thumbnail.webp"
  spec="3A6000-HV @ 2.5GHz"
  tags="小主机, 整机"
/>

<Card
  name="中科云 3A6000 小主机"
  href="/pages/devices/ctcisz-3a6000-nuc"
  image="/public/images/devices/ctcisz-3a6000-nuc.thumbnail.webp"
  spec="3A6000-HV @ 2.5GHz"
  tags="小主机, 整机"
/>

## 2K3000/3B6000M

### 主板及开发板

<Card
  name="OrangePi Nova v1.0"
  href="/pages/devices/opi-nova-v1.0"
  image="/public/images/devices/opi-nova-v1.0.thumbnail.webp"
  spec="2K3000 @ 2.2GHz, nanoITX"
  tags="开发板"
/>

<Card
  name="龙芯 2K3000 AI 评估板"
  href="/pages/devices/loongson-2k3000-ai-evb"
  image="/public/images/devices/loongson-2k3000-ai-evb.webp"
  spec="2K3000 @ 2.2GHz"
  tags="开发板, AI"
/>

### 整机产品

<Card
  name="中科云 3B6000M 小主机"
  href="/pages/devices/ctcisz-3b6000m-nuc"
  image="/public/images/devices/ctcisz-3a6000-nuc.thumbnail.webp"
  spec="3B6000M @ 2.5GHz"
  tags="小主机, 整机"
/>

## 2K0300

### 主板及开发板

<Card
  name="龙芯 2K0300 蜂鸟板"
  href="/pages/devices/loongson-2k0300-hummingbird-evb"
  image="/public/images/devices/loongson-2k0300-hummingbird-evb.webp"
  spec="2K0300"
  tags="开发板"
/>

<Card
  name="龙芯 2K0300 先锋派"
  href="/pages/devices/loongson-2k0300-pioneer-evb"
  image="/public/images/devices/loongson-2k0300-pioneer-evb.webp"
  spec="2K0300"
  tags="开发板"
/>

<Card
  name="正点原子 2K0300 开发板"
  href="/pages/devices/alientek-2k0300-evb"
  image="/public/images/devices/alientek-2k0300-evb-1.webp"
  spec="2K0300"
  tags="开发板"
/>

<Card
  name="中科云久久派"
  href="/pages/devices/ctcisz-foreverpi"
  image="/public/images/devices/loongson-2k0300-pioneer-evb.webp"
  spec="2K0300"
  tags="开发板"
/>

