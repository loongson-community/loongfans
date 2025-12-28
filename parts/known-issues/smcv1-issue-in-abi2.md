### 部分 ABI2.0 系统下调频功能不可用

使用搭载上游内核的 ABI2.0（“新世界”）Linux 发行版无法启用处理器调频功能，这是因为上游内核尚未实现市售设备使用的 SMCv1 接口功能导致的。目前社区开发者[梓瑶](https://github.com/ziyao233)已提交[初版补丁](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/)，但在测试过程中仍发现有不稳定现象。