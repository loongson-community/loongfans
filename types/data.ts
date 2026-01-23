import type { SupportedLanguage } from "../.vitepress/utils/language"

export type LocalizedString = { [lang in SupportedLanguage]?: string }

// OS database entries

export enum OSTag {
  ABI1 = "abi1",
  ABI2 = "abi2",
  AtomicUpdates = "atomicity",
  CommercialSupport = "commercial_support",
  Community = "community",
  Container = "container",
  Desktop = "desktop",
  DIY = "diy",
  Embedded = "embedded",
  Firewall = "firewall",
  Immutable = "immutable",
  Rolling = "rolling",
  Router = "router",
  Server = "server",
  Virtualization = "virt",
  Linux = "linux",
  BSD = "bsd",
  Harmony = "harmony",
  RTOS = "rtos",
}

export interface OSInfoItem {
  name: LocalizedString
  href: string
  image: string
  description: LocalizedString
  tags: OSTag[]
}

// Chip database entries

export enum MarketSegment {
  Desktop = 1,
  Mobile = 2,
  Server = 3,
  Embedded = 4,
}

export interface ChipBasicInfo {
  name: string
  series: string
  market: MarketSegment
}

export interface ChipExtendedInfo {
  pic: string
  manual: string
}

export interface CPUSpecs {
  cores: number
  threads: number
  arch: string
  freq: string
  l1_inst_cache: string
  l1_data_cache: string
  l2_cache: string
  l3_cache: string
  voltage: string
  tpc: string
  tdp: string
}

export interface ChipIntegratedGPUSpecs {
  available: boolean
  name: string
}

export interface CPUMemorySpecs {
  max: string
  types: string
  channels: string
  ecc: boolean
}

export interface ChipInterfaceSpecs {
  io_name: string
  io_rev: string
  lanes: number | string
  usb_5gbps: number
  usb2: number
  sata: number
  eth: number | string
  spi: number
  uart: number
  i2c: number
  gpio: number
  avs: number
  d2d?: boolean
  d2d_name?: string | null
  other?: string
}

export interface ChipPackageSpecs {
  socket: string
  temperature: string
  t_case?: string
  t_junction?: string
  size: string
}

export interface CPUPowerSpecs {
  clock_gating: boolean
  frequency_scaling: boolean
  voltage_scaling: boolean
}

export interface CPUMicroarchitectureSpecs {
  isa: string
  isa_extensions: string[]
}

export interface ChipCommonInfo {
  basic: ChipBasicInfo
  ext_info: ChipExtendedInfo
  exp: ChipInterfaceSpecs
  package: ChipPackageSpecs
}

export interface CPUInfoItem extends ChipCommonInfo {
  cpu: CPUSpecs
  gpu: ChipIntegratedGPUSpecs
  memory: CPUMemorySpecs
  power: CPUPowerSpecs
  technologies: CPUMicroarchitectureSpecs
}

export interface ChipsetSpecs {
  interface: string
}

export interface ChipsetInfoItem extends ChipCommonInfo {
  chipset: ChipsetSpecs
  gpu: ChipIntegratedGPUSpecs
}

export interface ChipInfoDB {
  cpu: { [key: string]: CPUInfoItem }
  chipset: { [key: string]: ChipsetInfoItem }
}
