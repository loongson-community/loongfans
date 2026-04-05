## 固件/系统接口更新

- 平台支持更完整：覆盖 3A/B/C/D/E6000/LS2K3000 等核心平台
- 稳定性更高：重点改善启动、HDMI 显示、PCIe 兼容和 IOMMU 等控制器相关问题
- 功能更丰富：持续完善补齐 SE、IPv6 PXE、ACPI/SMBIOS 等相关能力及信息
- 可维护性更强：构建、CI、代码规范与工具链持续优化

## 模块升级

- RefCode 各代码模块全面升级
  - 芯片组新增支持 3B6000M 等系列精简核心版本
  - PHY、MRC、SMC、IPMI 等软硬件代码模块持续迭代升级

## 新增功能

通用特性：

- 完善全系列 6000 平台支持 `ACPI.EDAC` 上报内核查询 `ECC` 功能
- 持续优化模拟器 `MultiArch` 对第三方 `x86` 外设卡支持；部分高端网卡如出现概率性重启模拟异常，可通过界面暂时关闭模拟选项
- 新增并完善 `SE` 能力，支持 `DeviceMode`，新增 `SE RNG API` 等
- 增强对低版本 `EDID` 的解析支持
- 增加 `gopinfo` 子命令分页支持
- 加强驱动对 `FrameBuffer` 的地址修改限制
- 新增 `IPv6 PXE` 相关驱动
- 完善 `EC` 管理读写接口
- 新增 `SMBIOS` 对外设标识的更新 `API`
- 新增 `BGRT` 支持，适应社区需求，传递全平台 `GOP` 信息
- 增加 `CPU ThermalZone _STR` 描述，支持 `3C/D/E6000` 全平台
- 更新 `GPIO` 资源适应 `V3.2` 规范
- `Smbios.Type17` 增加 `DRAM MemoryTechnology` 识别，以适应社区需求
- `LsIpmiPkg` 从 `1.3.11` 升级到 `1.3.13`
  - 去除 `BMC` 可配 `LegacyMode` 启动接口
  - 支持设置 `IPV6` 及动态使能 `DHCP`
  - 调整 `LAN` 支持 `OCP` 共享网口切换
  - 切换新 `BMC` 同步策略，依赖 **BMC.v2.3.0** 版本

## 功能修复与优化

通用优化：

- 优化 `BootOption` 启动项加载策略
- 优化 `ShellLib/SmbiosUpdate` 与 `ShellLib/Spi` 子命令可用性与相关修复，以适应社区需求
- 同步上游完善安全机制，优化清理密码读取后键盘队列残留
- 同步兼容上游 `SMBIOS.Type4.Cache` 数据结构修改
- 优化 `GmacPhy EEPROM` 的读写策略
- 内存 MRC 升级，优化提升 Spec2017 浮点单项性能
- 增强界面显示选项帮助信息
- 同步上游优化 `OptionRom` 搜索策略
- 针对 `AI+SW` 多混合设备拓扑调整 `MPS` 扫描策略
- 清理及优化部分代码构建结构及编译器兼容警告

通用问题修复：

- 修复 `PCR0` 安全启动测量变化问题
- 修复高分辨率场景下 `Console` 控制台显示体验问题
- 修复 3C6000 双路及 3B6000 平台 `IOMMU.IVRS SegNum` 及 `GROUP` 信息错误问题
- 纠正 3B6000 平台 Setup 界面下内存通道错误显示 `4`、实际为 `2` 的问题
- 修复 2K3000 平台关闭 DVFS 后异常问题
- 修复界面显示策略切换时可能出现下游总线号使用未清理问题
- 修复高版本 IASL warning
- 修复 PPTT Package Number 错误
- 调整 8 节点以上平台 `EIO/BIO` 表数量，避免与 `perf` 中断产生冲突
- 修复 2K3000 一系列稳定性及图形（HDMI/DP）显示问题等

以上信息来自龙芯中科的[固件发布信息](https://github.com/loongson/Firmware/blob/main/docs/changelist_V5.0.0431-stable202602.md)，整理了部分表述和分类以改善可读性。
