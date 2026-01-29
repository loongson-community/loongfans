import type { ChipFieldsDescriptor } from "./index"

const cpuFields: ChipFieldsDescriptor = {
  type: "cpu",
  basic: ["name", "series", "market"],
  cpu: [
    "cores",
    "threads",
    "arch",
    "freq",
    "l1_inst_cache",
    "l1_data_cache",
    "l2_cache",
    "l3_cache",
    "voltage",
    "tpc",
    "tdp",
  ],
  gpu: ["available", "name"],
  memory: ["max", "types", "channels", "ecc"],
  exp: [
    "io_name",
    "io_rev",
    "lanes",
    "usb_5gbps",
    "usb2",
    "sata",
    "eth",
    "spi",
    "uart",
    "i2c",
    "avs",
    "gpio",
    "d2d",
    "d2d_name",
    "other",
  ],
  package: ["socket", "temperature", "t_case", "t_junction", "size"],
  power: ["clock_gating", "frequency_scaling", "voltage_scaling"],
  technologies: ["isa", "isa_extensions"],
}

export default cpuFields
