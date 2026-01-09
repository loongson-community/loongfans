import type { SupportedLanguage } from "../.vitepress/utils/language"

export type LocalizedString = { [lang in SupportedLanguage]?: string }

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
