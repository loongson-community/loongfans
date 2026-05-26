## Firmware/System Interface Updates

- More comprehensive platform support: Covers core platforms such as 3A/B/C/D/E6000 and LS2K3000
- Improved stability: Improved controller-related issues related to boot, HDMI display, PCIe compatibility, and IOMMU
- Enhanced functionality: Continued refinement of capabilities and information related to SE, IPv6 PXE, and ACPI/SMBIOS
- Better maintainability: Ongoing optimization of builds, CI, coding standards, and toolchains

## Module Upgrades

- RefCode
  - Added support for slimmed-down core versions of the 3B6000M series and others
  - Ongoing iterative upgrades to PHY, MRC, SMC, and IPMI

## Feature Additions

General features:

- Enhanced support for the 6000 series platform to enable `ACPI.EDAC` reporting of `ECC` status to the kernel
- Continued optimization of the emulator’s `MultiArch` support for third-party `x86` peripheral cards. The simulation option can be temporarily disabled via the interface if certain high-end network cards experience occasional unexpected reboots
- Added and enhanced `SE` capabilities, including support for `DeviceMode` and the new `SE RNG API`
- Enhanced parsing support for older `EDID` versions
- Added paging support for the `gopinfo` subcommand
- Strengthened driver restrictions on `FrameBuffer` address modifications
- Added `IPv6 PXE`-related drivers
- Improved `EC` management read/write interfaces
- Added `SMBIOS` API for updating peripheral identifiers
- Added `BGRT` support to meet community needs and pass `GOP` information across all platforms
- Added `CPU ThermalZone _STR` descriptions to support `3C/D/E6000` platforms
- Updated `GPIO` resources to comply with the `V3.2` specification
- Added `DRAM MemoryTechnology` identification to `Smbios.Type17` to meet community needs
- Upgraded `LsIpmiPkg` from `1.3.11` to `1.3.13`
  - Removed the configurable `LegacyMode` boot interface from `BMC`
  - Added support for configuring `IPv6` and dynamically enabling `DHCP`
  - Adjusted `LAN` to support `OCP` shared port switching
  - Switched to a new `BMC` synchronization policy; depended on **BMC.v2.3.0**

## Fixes and Optimizations

General Optimizations:

- Optimized the `BootOption` boot entry loading strategy
- Optimized the availability of the `ShellLib/SmbiosUpdate` and `ShellLib/Spi` subcommands and related fixes to meet community needs
- Synchronized with upstream to enhance security mechanisms and optimize cleanup of keyboard queue residues after password reading
- Synchronized with upstream to support modifications to the `SMBIOS.Type4.Cache` data structure
- Optimized read/write strategy for `GmacPhy EEPROM`
- Upgraded MRC memory to optimize and improve Spec2017 floating-point performance
- Enhanced help information for interface display options
- Synchronized with upstream to optimize `OptionRom` search strategy
- Adjusted `MPS` scanning strategy for `AI+SW` multi-hybrid device topologies
- Cleaned up and optimized certain code structures and compiler compatibility warnings

General Issue Fixes:

- Fixed `PCR0` secure boot measurement variation issues
- Fixed `Console` display experience issues in high-resolution scenarios
- Fixed incorrect `IOMMU.IVRS SegNum` and `GROUP` information on 3C6000 dual-channel and 3B6000 platforms
- Corrected an issue where the Setup interface on the 3B6000 platform incorrectly displayed `4` memory channels when the actual count was `2`
- Fixed an issue causing exceptions on the 2K3000 platform after disabling DVFS
- Fixed an issue where downstream bus numbers might not be properly cleared when switching display policies
- Fixed a warning in newer versions of IASL
- Fixed the PPTT Package Number error
- Adjusted the number of `EIO/BIO` tables on platforms with 8 or more nodes to avoid conflicts with `perf` interrupts
- Fixed a series of stability and graphics (HDMI/DP) display issues on the 2K3000 platform

This summary is adapted from Loongson's official release notes:
https://github.com/loongson/Firmware/blob/main/docs/changelist_V5.0.0431-stable202602.md
