### 早期处理器步进 PCIe 速率协商问题

根据购买尝鲜的用户朋友反馈，该款 3C6000/S 主板上插入部分 AMD 显卡、RAID 控制器等时，PCIe 速率协商为了 PCIe 1.0，严重影响性能。经社区好友与龙芯中科工程师联调发现，早期 3C6000/S 步进的错误地将 PCIe 桥速率范围定义为了 2.5GT/s 而非预期的 2.5 - 16GT/s，导致部分驱动误以为平台只有 PCIe 1.0 支持。

该问题目前已有规避方案，可参考安同 OS 内核补丁 [1](https://github.com/AOSC-Tracking/linux/commit/283358e5b377517ad9f13bd1909b4b931754c196)、[2](https://github.com/AOSC-Tracking/linux/commit/874bb3b961fb6bf106b48c61a1671c196976e1f1) 与 [3](https://github.com/AOSC-Tracking/linux/commit/8d088d7587098ef48e0594bf46c603bb4d7abd52)。