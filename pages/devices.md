---
layout: page
# 返回首页
returnLink: /
pageTitle: 产品规格数据库
pageSubTitle: 规格参数、特色配置及已知问题一览
---

<script setup>
import DeviceIndex from "../components/device/Index.vue"
</script>


龙芯的处理器和板卡型号众多，但一般以处理器 + 主板（板 U）捆绑的模式销售。本页面用于记录和呈现所有已知的龙芯板 U 组合，以及笔记本、服务器整机信息。

::: info
欲知处理器规格、详情及参数比较，详请见：

- [芯片规格数据库](/pages/chips)
- [龙芯中科官方网站"芯片产品"板块](https://www.loongson.cn/product/channel)
:::

<DeviceIndex :data="$tm('devices')" />
