import type { DeviceFamily } from "@src/types/device"

export const devices: DeviceFamily[] = [
  {
    family: "3C6000 Family",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            name: "Loongson AC612A0_V1.0",
            href: "/en/devices/loongson-ac612a0-v1.0",
            spec: "3C6000/S @ 2.3GHz, ATX",
            tags: "7A2000, ECC memory support, Desktop Motherboard",
          },
          {
            name: "Loongson AC612A0_V1.1",
            href: "/en/devices/loongson-ac612a0-v1.1",
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
            name: "Loongson XB612B0_V1.1",
            href: "/en/devices/loongson-xb612b0-v1.1",
            spec: "3B6000 @ 2.3GHz, mATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XB612B0_V1.2",
            href: "/en/devices/loongson-xb612b0-v1.2",
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
            name: "ASUS XC-LS3A6M",
            href: "/en/devices/asus-xc-ls3a6m",
            spec: "3A6000-HV @ 2.5GHz, mATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA61200",
            href: "/en/devices/loongson-xa61200",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA61201_v1.0",
            href: "/en/devices/loongson-xa61201-v1.0",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA612A0_v1.0",
            href: "/en/devices/loongson-xa612a0-v1.0",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA612B0_v1.0",
            href: "/en/devices/loongson-xa612b0-v1.0",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, Desktop Motherboard",
          },
        ],
      },
      {
        title: "Laptops",
        devices: [
          {
            name: "EA EXCELSIOR NL38-N11",
            href: "/en/devices/ea-excelsior-nl38-n11",
            spec: "3A6000 @ 2.0GHz",
            tags: "Laptop",
          },
          {
            name: "Lenovo Kaitian N60d-G1d",
            href: "/en/devices/kaitian-n60d-g1d",
            spec: "3A6000 @ 2.0GHz",
            tags: "Laptop",
          },
        ],
      },
      {
        title: "Pre-built Systems",
        devices: [
          {
            name: "Morefine M700S",
            href: "/en/devices/morefine-m700s",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "NUC, Pre-built",
          },
          {
            name: "CTCISZ 3A6000 NUC",
            href: "/en/devices/ctcisz-3a6000-nuc",
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
            name: "OrangePi Nova v1.0",
            href: "/en/devices/opi-nova-v1.0",
            spec: "2K3000 @ 2.2GHz, nanoITX",
            tags: "Development Board",
          },
          {
            name: "Loongson 2K3000 AI Evaluation Board",
            href: "/en/devices/loongson-2k3000-ai-evb",
            spec: "2K3000 @ 2.2GHz",
            tags: "Development Board",
          },
        ],
      },
      {
        title: "Pre-built Systems",
        devices: [
          {
            name: "CTCISZ 3B6000M NUC",
            href: "/en/devices/ctcisz-3b6000m-nuc",
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
            name: 'Loongson 2K0300 "Hummingbird"',
            href: "/en/devices/loongson-2k0300-hummingbird-evb",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            name: 'Loongson 2K0300 "Pioneer"',
            href: "/en/devices/loongson-2k0300-pioneer-evb",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            name: "ALIENTEK 2K0300 Development Board",
            href: "/en/devices/alientek-2k0300-evb",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            name: "CTCISZ ForeverPi",
            href: "/en/devices/ctcisz-foreverpi",
            spec: "2K0300",
            tags: "Development Board",
          },
        ],
      },
    ],
  },
]
