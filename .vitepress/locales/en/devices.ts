import type { DeviceFamily } from "../zh/devices"

export const devices: DeviceFamily[] = [
  {
    family: "3C6000 Family",
    categories: [
      {
        title: "Motherboards and Development Boards",
        devices: [
          {
            name: "Loongson AC612A0_V1.1",
            href: "/en/devices/loongson-ac612a0-v1.1",
            image: "/images/devices/loongson-ac612a0-v1.1.thumbnail.webp",
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
            image: "/images/devices/loongson-xb612b0-v1.1.thumbnail.webp",
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
            image: "/images/devices/asus-xc-ls3a6m.webp",
            spec: "3A6000-HV @ 2.5GHz, mATX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA61200",
            href: "/en/devices/loongson-xa61200",
            image: "/images/devices/loongson-xa61200.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA61201",
            href: "/en/devices/loongson-xa61201",
            image: "/images/devices/loongson-xa61201.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, Desktop Motherboard",
          },
          {
            name: "Loongson XA612A0",
            href: "/en/devices/loongson-xa612a0",
            image: "/images/devices/loongson-xa612a0.thumbnail.webp",
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
            image: "/images/devices/ea-excelsior-nl38-n11.webp",
            spec: "3A6000 @ 2.0GHz",
            tags: "Laptop",
          },
          {
            name: "Lenovo Kaitian N60d-G1d",
            href: "/en/devices/kaitian-n60d-g1d",
            image: "/images/devices/kaitian-n60d-g1d.thumbnail.webp",
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
            image: "/images/devices/morefine-m700s.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "NUC, Pre-built",
          },
          {
            name: "CTCISZ 3A6000 NUC",
            href: "/en/devices/ctcisz-3a6000-nuc",
            image: "/images/devices/ctcisz-3a6000-nuc.thumbnail.webp",
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
            image: "/images/devices/opi-nova-v1.0.thumbnail.webp",
            spec: "2K3000 @ 2.2GHz, nanoITX",
            tags: "Development Board",
          },
          {
            name: "Loongson 2K3000 AI Evaluation Board",
            href: "/en/devices/loongson-2k3000-ai-evb",
            image: "/images/devices/loongson-2k3000-ai-evb.webp",
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
            image: "/images/devices/ctcisz-3a6000-nuc.thumbnail.webp",
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
            image: "/images/devices/loongson-2k0300-hummingbird-evb.webp",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            name: 'Loongson 2K0300 "Pioneer"',
            href: "/en/devices/loongson-2k0300-pioneer-evb",
            image: "/images/devices/loongson-2k0300-pioneer-evb.webp",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            name: "ALIENTEK 2K0300 Development Board",
            href: "/en/devices/alientek-2k0300-evb",
            image: "/images/devices/alientek-2k0300-evb-1.webp",
            spec: "2K0300",
            tags: "Development Board",
          },
          {
            name: "CTCISZ ForeverPi",
            href: "/en/devices/ctcisz-foreverpi",
            image: "/images/devices/loongson-2k0300-pioneer-evb.webp",
            spec: "2K0300",
            tags: "Development Board",
          },
        ],
      },
    ],
  },
]
