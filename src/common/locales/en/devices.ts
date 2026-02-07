import type { DeviceFamily } from "@src/types/device"

export const devices: DeviceFamily[] = [
  {
    family: "3C6000 Family",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            id: "loongson-ac612a0-v1.0",
            name: "Loongson AC612A0_V1.0",
            spec: "3C6000/S @ 2.3GHz, ATX",
            tags: "7A2000, ECC memory support, Desktop Motherboard",
          },
          {
            id: "loongson-ac612a0-v1.1",
            name: "Loongson AC612A0_V1.1",
            spec: "3C6000/S @ 2.3GHz, ATX",
            tags: "7A2000, ECC memory support, Desktop Motherboard",
          },
        ],
      },
    ],
  },
  {
    family: "3B6000",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            id: "loongson-xb612b0-v1.1",
            name: "Loongson XB612B0_V1.1",
            spec: "3B6000 @ 2.3GHz, mATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            id: "loongson-xb612b0-v1.2",
            name: "Loongson XB612B0_V1.2",
            spec: "3B6000 @ 2.3GHz, mATX",
            tags: "7A2000, Desktop Motherboard",
          },
        ],
      },
    ],
  },
  {
    family: "3A6000",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            id: "asus-xc-ls3a6m",
            name: "ASUS XC-LS3A6M",
            spec: "3A6000-HV @ 2.5GHz, mATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            id: "loongson-xa61200",
            name: "Loongson XA61200",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            id: "loongson-xa61201-v1.0",
            name: "Loongson XA61201_v1.0",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            id: "loongson-xa612a0-v1.0",
            name: "Loongson XA612A0_v1.0",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            id: "loongson-xa612b0-v1.0",
            name: "Loongson XA612B0_v1.0",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, Desktop Motherboard",
          },
        ],
      },
      {
        title: "Laptops",
        devices: [
          {
            id: "ea-excelsior-nl38-n11",
            name: "EA EXCELSIOR NL38-N11",
            spec: "3A6000 @ 2.0GHz",
            tags: "Laptop",
          },
          {
            id: "kaitian-n60d-g1d",
            name: "Lenovo Kaitian N60d-G1d",
            spec: "3A6000 @ 2.0GHz",
            tags: "Laptop",
          },
        ],
      },
      {
        title: "Pre-built Systems",
        devices: [
          {
            id: "morefine-m700s",
            name: "Morefine M700S",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "NUC, Pre-built",
          },
          {
            id: "ctcisz-3a6000-nuc",
            name: "CTCISZ 3A6000 NUC",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "NUC, Pre-built",
          },
        ],
      },
    ],
  },
  {
    family: "2K3000/3B6000M",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            id: "opi-nova-v1.0",
            name: "OrangePi Nova v1.0",
            spec: "2K3000 @ 2.2GHz, nanoITX",
            tags: "Development Board",
          },
          {
            id: "loongson-2k3000-ai-evb",
            name: "Loongson 2K3000 AI Evaluation Board",
            spec: "2K3000 @ 2.2GHz",
            tags: "Development Board",
          },
        ],
      },
      {
        title: "Pre-built Systems",
        devices: [
          {
            id: "ctcisz-3b6000m-nuc",
            name: "CTCISZ 3B6000M NUC",
            spec: "3B6000M @ 2.5GHz",
            tags: "NUC, Pre-built",
          },
        ],
      },
    ],
  },
  {
    family: "2K0300",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            id: "loongson-2k0300-hummingbird-evb",
            name: 'Loongson 2K0300 "Hummingbird"',
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            id: "loongson-2k0300-pioneer-evb",
            name: 'Loongson 2K0300 "Pioneer"',
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            id: "alientek-2k0300-evb",
            name: "ALIENTEK 2K0300 Development Board",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            id: "ctcisz-foreverpi",
            name: "CTCISZ ForeverPi",
            spec: "2K0300",
            tags: "Development Board",
          },
        ],
      },
    ],
  },
]
