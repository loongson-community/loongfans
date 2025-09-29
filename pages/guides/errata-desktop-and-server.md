---
layout: page
returnLink: /pages/guides
---

<ChildHeader>
    <template #pageTitle>常见问题集</template>
    <template #pageSubTitle>各类桌面平台已知问题</template>
</ChildHeader>

<div class="body_content">

# 7A 桥片稳定性问题

该主板使用 7A2000 桥片提供 PCIe 接口，但由于该桥片已知（但官方未确认的）原因，在使用部分外设（尤其是 AMD GCN 1.0 - 4.0 系列显卡）时会出现驱动不稳定、画面/应用崩溃甚至死机的情况。目前部分发行版提供了临时补丁进行规避，可以在很大程度上缓解问题，但有部分用户依然反馈遇到了类似问题。

如果您遇到了类似的情况，根据社区建议，我们建议您通过增强机箱或桥片散热的方式规避该问题。

---

# USB 设备丢失问题

根据用户反馈，在使用该主板过程中，启动系统后发现 USB 键鼠有随机失灵的情况，需要重复插拔方能使用。

根据龙芯中科工程师的调查，这是龙芯 7A2000 桥片的[一个硬件缺陷导致的](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482)。该问题已在 Linux 内核 6.15-rc1 或更高版本被规避，使用 6.6 内核的商用 ABI 2.0 发行版及使用 4.19 内核的 ABI 1.0 系统均包含此问题的规避。

</div>

<ChildFooter />

<script setup>
import ChildHeader from '/components/ChildHeader.vue'
import ChildFooter from '/components/ChildFooter.vue'
</script>