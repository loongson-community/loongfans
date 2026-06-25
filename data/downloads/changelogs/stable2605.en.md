## Loongson UEFI RC V5.0.0529-stable202605 FOR COMMUNITY

## 1. Version Overview

This release primarily includes updates to the DDR.MRC, PCIe.PHY, SMC, IPMI, and EDK II (edk2) base code, as well as platform-specific adaptations. It also optimizes platform stability, peripheral compatibility, the boot process, and firmware update functionality:

- **Core Module Upgrades**: Continued iterative improvements to core modules such as DDR.MRC, PCIe.PHY, and SMC to enhance memory initialization, link training, power consumption control, and handling of exceptional scenarios
- **Enhanced Platform Support**: Improved support for platforms such as Loongson 2K3000/3B6000M, 3A6000, 3B6000, 3C6000/S/D/Q, and 7A2000;
- **Feature Enhancements**: Added new features such as firmware backup and restoration, ACPI FPDT boot performance metrics, and ACPI I/O Virtualization Table (IOVT), while enhancing SMBIOS information and multiple platform capabilities for the 2K3000
- **Stability and Compatibility Optimizations**: Optimized PCIe link training, DMA transfer reliability, ACPI S3 sleep, VBIOS, PCIe Option ROM, and LoongGPU driver compatibility, while also enhancing peripheral compatibility

## 2. The following are the updates and changes to some core modules

| Module | Old Version | New Version | Major Changes |
| --- | ---: | ---: | --- |
| Loongson-FwSdk | V5.0.0431-stable202602 | V5.0.0529-stable202605 | Added support for 2K/3B/C/6000/S/D/Q 7A chips and platforms |
| EDK II (edk2 shared code) | stable202505 | stable202602 | Synchronizes new features and bug fixes from the EDK II stable202602 shared baseline |

## 3. Chip and Platform Compatibility

### 3.1 2K3000/3B6000M Platform

- Added definitions related to the 2K3000 and 3B6000/M platforms and dynamically enabled corresponding device features
- Added a power consumption cap feature for the 3B6000M/4 platform; this feature is configurable via interface options
- Added configuration options for the multi-port PCIe control interface on the 2K3000 series platforms
- Added a 4KiB page mode configuration option to the advanced settings interface for the 2K3000/3B6000M platforms to better support specific application scenarios such as binary translation
- Optimized initialization behavior for certain bit field controls, frame buffer operations, HDMI pixel clock frequency algorithms, and memory reset delays on the 2K3000/3B6000M platforms
- Optimized the pre-allocated memory pool mechanism for the 2K3000/3B6000M platforms to improve the boot experience
- Enhanced the hot-plug detection functionality for the DP interface on the 2K3000/3B6000M platforms
- Optimized the packet byte size setting when retrieving EDID via DP on the 2K3000/3B6000M platforms
- Optimized temperature sensor data acquisition and temperature algorithms for the 2K3000/3B6000M platforms
- Optimized the PCIe training mechanism for the 2K3000/3B6000M platforms
- Removed redundant IOMMU and SR-IOV configuration options that remained in the firmware settings interface of the 2K3000/3B6000M platforms
- Fixed an issue where data was returned incorrectly during sleep-to-wake transitions under specific scenarios on the 2K3000/3B6000M/4 platforms
- Fixed an issue where fast boot failed on the 2K3000/3B6000M platforms

### 3.2 3B6000/3C6000 Platforms

- Optimized PCIe-related configurations for the 3B/C6000 platforms to improve link stability and peripheral compatibility
- Enhanced ACPI EDAC functionality and RDIMM memory self-test support for the 3B6000 platform
- Calibrated temperature sensor data reading on the 3B6000/3C6000 platforms
- Fixed an EDAC false positive issue on specific 3C6000 platforms when no memory was present
- Optimized SMC exception handling to reduce the risk of controller abnormal suspension
- Integrated a BMC power consumption capping control command mechanism

### 3.3 7A2000 Platform

- Optimized initialization stability under specific conditions, such as low temperatures
- Fixed an issue where remote USB wake-up could not be disabled
- Fixed an issue where 7A2000 SATA port configurations were invalid in the firmware settings interface

### 3.4 Boards and Peripherals

- Supports Mellanox ConnectX-4 series 25GbE/100GbE network cards, as well as certain PCIe networking and storage devices such as PMCs
- Upgrades certain EFI peripheral drivers: for example, the Huarui RAID driver improves stability

Further details regarding the above are not provided here.

## 4. General (Common Layer) Feature Enhancements

- Updated the EDK II (edk2) base code to version stable202602, which includes numerous new general-purpose features and fixes
- Added ACPI I/O virtualization tables (IOVT) for better compatibility with the IOMMU virtualization features in the mainline Linux kernel
- Added ACPI Firmware Performance Data Table (FPDT) to support programs such as `systemd-analyze(1)` in measuring firmware and bootloader execution times and other information
- Added corresponding names for DRAM vendor IDs in SMBIOS, including Ramaxel, Micron, and others
- Added a feature that automatically populates SMBIOS Type 17 (memory device) information with SPD data from soldered-on memory or memory modules based on DDR configuration
- Added support for ACPI S3 low-end address memory parity checks
- Added firmware backup and restore functionality
- Added a re-entry VBIOS parsing mechanism to facilitate adaptive adjustments to VBIOS data by the firmware
- Added a “Unified System Architecture Specification Version” field to the firmware configuration interface to clearly indicate the version correspondence between the firmware and the *Unified System Architecture Specification*
- Updated the PCI ID database to the version dated 2026.05.12, and added information for some previously unregistered PCI vendors and devices
- Adjusted the PCIe resource allocation strategy, expanding the supported “Above 4G” space from less than 512 GiB to 720 GiB to accommodate more large-BAR computing acceleration cards

Notably, the public beta firmware V5.0.0532, released concurrently, is primarily intended to support the dynamic frequency and voltage regulation as well as Turbo Boost (Boost) features already available in the community mainline Linux kernel.

## 5. General (Common Layer) Feature Optimizations and Bug Fixes

- Added a MultiArchUefiPkg Watchdog Timer (WDT) workaround to prevent assertion errors that occur when simulating the initialization of certain network card Option ROMs
- Enhanced compatibility with mixed-width character usage in certain PCIe Option ROMs to prevent garbled text in the settings interface of some non-standard devices, as well as freezes when switching the language of the firmware configuration interface
- Optimized the ACPI EDAC table; configurations can now be dynamically exported based on the ECC status of memory modules (DIMMs), with EDAC numbers sorted according to DIMM identification order
- Refined the recognition logic for LPDDR4 in the SMBIOS memory type field and corrected certain information
- Enhanced the `pcietest` command in the UEFI Shell (used by motherboard manufacturers for SI testing) to support the topology of the 3C6000 platform
- Enhanced the `i2c` command in the UEFI Shell to support read/write operations on the on-board EEPROM of specific boards
- Fixed a call error in `UninstallMultipleProtocolInterfaces` during driver uninstallation
- Fixed an issue where the graphical firmware update interface (`UI.UpdateFw`) could not be operated without a graphics card
- Fixed an HTTP boot type error caused by the EDK II (edk2) network stack upgrade
- Fixed an issue where accuracy might be compromised due to frequent RTC read/write operations during a reboot
- Fixed errors in some file paths
- Optimized certain SMBIOS fields and split them where necessary to avoid long lines
- Optimized some print messages during data decompression
- Refactored the OEM ID fields in some ACPI ASL and ACPI-related configuration information
- Standardized the masks for functions that depend on RTC bitfield registers

## 6. Notes and Known Issues

- The DisplayPort hot-plug detection feature on the 2K3000/3B6000M platform is only supported by the LoongGPU driver version 20250206 or later
- The firmware backup and restore feature requires administrator privileges and a writable storage device; the default backup path is \LsFwBackup\lsfw.bin
- The ACPI FPDT table is used for boot performance measurements; the current firmware has removed DB.Support-related data based on actual device usage scenarios

## 7. Reference Links

- EDK II (edk2) stable202602 release notes: https://github.com/tianocore/edk2/releases/tag/edk2-stable202602
- ACPI IOVT table reference submission: https://github.com/tianocore/edk2/commit/0e6f016032ed6c51a44cee684e4e0b0c65667cbd
- UninstallMultipleProtocolInterfaces Fix Reference: https://github.com/tianocore/edk2/commit/9388c6b1c17af9c8a9f451a42c066b3ae7d81fda
- PCI ID Database Source: https://github.com/pciutils/pciids
