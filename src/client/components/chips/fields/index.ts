import type {
  ChipBasicInfo,
  ChipIntegratedGPUSpecs,
  ChipInterfaceSpecs,
  ChipPackageSpecs,
  ChipsetSpecs,
  CPUMemorySpecs,
  CPUMicroarchitectureSpecs,
  CPUPowerSpecs,
  CPUSpecs,
} from "@src/types/data"

export type ChipType = "cpu" | "chipset"

export type ChipFieldsDescriptor = {
  type: ChipType
  basic?: (keyof ChipBasicInfo)[]
  cpu?: (keyof CPUSpecs)[]
  chipset?: (keyof ChipsetSpecs)[]
  exp?: (keyof ChipInterfaceSpecs)[]
  gpu?: (keyof ChipIntegratedGPUSpecs)[]
  memory?: (keyof CPUMemorySpecs)[]
  package?: (keyof ChipPackageSpecs)[]
  power?: (keyof CPUPowerSpecs)[]
  technologies?: (keyof CPUMicroarchitectureSpecs)[]
}
