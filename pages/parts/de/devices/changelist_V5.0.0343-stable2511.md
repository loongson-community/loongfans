## Firmware/System Interface Updates

- Removed backward compatibility code for legacy (ABI1.0; more precisely, the v3.1 *Loongson CPU Unified System Architecture Specification*) environments, switching all platforms to the v4.0 specification ([Reference Link](https://github.com/tianocore/edk2/)).
- Switched compiler toolchain from GCC 8.3 to GCC 12/13/14, fully adopting the EDK2 community toolchain.
- Removed legacy boot mode options from the setup interface, fully adopting 1:1 VA => PA address mapping.
- Migrated from the dated UDK2018 to EDK2025, with most LoongArch infrastructure APIs now aligning with upstream EDK2 implementations.

## Module Updates

- Added support for platforms based on single- or multi-socket 3B6000, 3C6000/{S,D,Q}, and 2K3000/3B6000M platforms.
- Updated code for various software/hardware modules, such as PHY, MRC, SMC, IPMI, MultiArch, eMMC, etc.

## New Features

General feature updates:

- Introduced MultiArchUefiPkgs to support x86 Option ROM/EFI emulation and filtering for third-party peripherals (may be enabled/disabled in firmware setup).
- Introduced option to configure memory frequencies - lowering memory clock speed for enhanced compatibility when necessary (frequencies configurable may vary by model; the firmware setup UI offers options for restoring settings, one may also remove the CMOS battery to reset settings).
- Added setup options for adjusting interface and console resolutions.
- Added DSM#5 option to control PCIe resource allocation strategy with the Linux kernel.
- Added support for Chinese-origin peripherals including HRDT's RAID controllers and BZWX's 25/40GbE NICs.
- Added multi-GPU options and making it possible to display simultaneously with different GPUs under UEFI.
- Added TPM and Secure Boot functionality, with support for algorithms such as SHA-384, SHA-512, and SM3 (hardware TPM support required).
- Separated PCIe, hard drive, and USB information views and added detailed hard drive information display.
- Updated SRAT to version 6.5, adding support for x2APIC extension.
- Synchronized code logic regarding LoongArch multi-core wake-up, exception handling, MMU, etc. from EDK2 upstream.

Platform-Specific features:

- Added PCIe 4.0 device training support for Loongson Coherent Link (LCL) platforms - 3B6000 and 3C6000/{S,D,Q} series.
- Added 2K3000 eMMC support.
- Added ACPI Thermal Zone/HWMon monitoring support for 3C6000.
- Added ACPI EDAC support for server platforms, enabling ECC status query from Linux.
- Enhanced SMC-based power limiting, "turbo boost", and fan monitoring/control for select models.
- Supported Security Engine (SE) resource description reporting via DSDT tables on select models.

## Fixes and Optimizations

General fixes:

- Fixed potential system crashes when selecting "All Video" as the primary display on single-socket server platforms with both discrete and BMC graphics cards installed.
- Resolved garbled firmware version and build time display on the boot screen.
- Optimized SMBIOS table support, primarily fixing logic errors with DMI Type 7.
- Addressed unexpected hangs during RTC LP write operations.
- Fixed known ACPI table issues.
- Fixed incorrect sequence on SATA port controller toggles.
- Fixed several Chinese translation issues.
- Fixed sporadic logo blanking during boot-up.

Platform-specific fixes and adjustments:

- Fixed an issue where information on GMAC NICs may fail to display on certain models.
- Reduced 7A2000 bridge chip frequency to 750MHz on server platforms.
- Optimized AST2500 and LS2K0500 BMC command protocol compatibility, fixing IPMI display issues and errors with certain commands.
- Fixed SMBIOS information de-synchronization in the BMC's Web interface when using LS2K0500 BMC with firmware versions higher than v2.2.2.
- Fixed issues with SATA P-N reverse wiring and incorrect PCIe LnkCap2 settings on certain platforms.
- Fixed 2K0500 BMC Serial-over-LAN (SOL) output.
- Fixed PPTT tables for multiple chips.
- Disabled the PTW feature to prevent data corruption caused by Linux kernel page table issues (will re-enable once kernel fixes are widely available).
- Removed ACPI GPIO resource descriptions for some platforms to avoid compatibility issues (will be reinstated once OS support is widely available).

Functional optimizations:

- Enhanced various firmware setup interfaces.
- Enhanced BMC presence detection and setup interface, adding FRU data extensions, USB port interface controls, and more.

The information above is originally supplied by Loongson Technology's [Firmware Release Notes](https://github.com/loongson/Firmware/blob/main/docs/changelist_V5.0.0343-stable2511.md); re-organized and paraphrased at several places for better readability.
