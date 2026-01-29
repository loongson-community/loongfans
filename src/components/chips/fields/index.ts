export type ChipType = "cpu" | "chipset"

export enum ChipFieldCategory {
  BASIC = "basic",
  CPU = "cpu",
  CHIPSET = "chipset",
  EXP = "exp",
  GPU = "gpu",
  MEMORY = "memory",
  PACKAGE = "package",
  POWER = "power",
  TECHNOLOGIES = "technologies",
}

export type ChipFieldsDescriptor = {
  type: ChipType
} & {
  [key in ChipFieldCategory]?: string[]
}
