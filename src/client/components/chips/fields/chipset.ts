import type { ChipFieldsDescriptor } from "./index"

const chipsetFields: ChipFieldsDescriptor = {
  type: "chipset",
  basic: ["name", "series", "market"],
  chipset: ["interface"],
  gpu: ["available", "name"],
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
    "other",
  ],
  package: ["socket", "temperature", "size"],
}

export default chipsetFields
