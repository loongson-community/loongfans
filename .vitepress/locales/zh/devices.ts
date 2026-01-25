import type { DeviceFamily } from "types/device"

export const devices: DeviceFamily[] = [
  {
    family: "3C6000 家族",
    categories: [
      {
        title: "主板及开发板",
        devices: [
          {
            name: "龙芯 AC612A0_V1.1",
            href: "/devices/loongson-ac612a0-v1.1",
            image: "/images/devices/loongson-ac612a0-v1.1.thumbnail.webp",
            spec: "3C6000/S @ 2.3GHz, ATX",
            tags: "7A2000, 支持 ECC 内存, 台式机主板",
          },
        ],
      },
    ],
  },
  {
    family: "3B6000",
    categories: [
      {
        title: "主板及开发板",
        devices: [
          {
            name: "龙芯 XB612B0_V1.1",
            href: "/devices/loongson-xb612b0-v1.1",
            image: "/images/devices/loongson-xb612b0-v1.1.thumbnail.webp",
            spec: "3B6000 @ 2.3GHz, mATX",
            tags: "7A2000, 台式机主板",
          },
        ],
      },
    ],
  },
  {
    family: "3A6000",
    categories: [
      {
        title: "主板及开发板",
        devices: [
          {
            name: "华硕 XC-LS3A6M",
            href: "/devices/asus-xc-ls3a6m",
            image: "/images/devices/asus-xc-ls3a6m.webp",
            spec: "3A6000-HV @ 2.5GHz, mATX",
            tags: "7A2000, 台式机主板",
          },
          {
            name: "龙芯 XA61200",
            href: "/devices/loongson-xa61200",
            image: "/images/devices/loongson-xa61200.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, 台式机主板",
          },
          {
            name: "龙芯 XA61201",
            href: "/devices/loongson-xa61201",
            image: "/images/devices/loongson-xa61201.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, 台式机主板",
          },
          {
            name: "龙芯 XA612A0",
            href: "/devices/loongson-xa612a0",
            image: "/images/devices/loongson-xa612a0.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, 台式机主板",
          },
        ],
      },
      {
        title: "笔记本电脑",
        devices: [
          {
            name: "卓怡恒通 NL38-N11",
            href: "/devices/ea-excelsior-nl38-n11",
            image: "/images/devices/ea-excelsior-nl38-n11.webp",
            spec: "3A6000 @ 2.0GHz",
            tags: "笔记本电脑",
          },
          {
            name: "联想开天 N60d-G1d",
            href: "/devices/kaitian-n60d-g1d",
            image: "/images/devices/kaitian-n60d-g1d.thumbnail.webp",
            spec: "3A6000 @ 2.0GHz",
            tags: "笔记本电脑",
          },
        ],
      },
      {
        title: "整机产品",
        devices: [
          {
            name: "摩方 M700S",
            href: "/devices/morefine-m700s",
            image: "/images/devices/morefine-m700s.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "小主机, 整机",
          },
          {
            name: "中科云 3A6000 小主机",
            href: "/devices/ctcisz-3a6000-nuc",
            image: "/images/devices/ctcisz-3a6000-nuc.thumbnail.webp",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "小主机, 整机",
          },
        ],
      },
    ],
  },
  {
    family: "2K3000/3B6000M",
    categories: [
      {
        title: "主板及开发板",
        devices: [
          {
            name: "OrangePi Nova v1.0",
            href: "/devices/opi-nova-v1.0",
            image: "/images/devices/opi-nova-v1.0.thumbnail.webp",
            spec: "2K3000 @ 2.2GHz, nanoITX",
            tags: "开发板",
          },
          {
            name: "龙芯 2K3000 AI 评估板",
            href: "/devices/loongson-2k3000-ai-evb",
            image: "/images/devices/loongson-2k3000-ai-evb.webp",
            spec: "2K3000 @ 2.2GHz",
            tags: "开发板",
          },
        ],
      },
      {
        title: "整机产品",
        devices: [
          {
            name: "中科云 3B6000M 小主机",
            href: "/devices/ctcisz-3b6000m-nuc",
            image: "/images/devices/ctcisz-3a6000-nuc.thumbnail.webp",
            spec: "3B6000M @ 2.5GHz",
            tags: "小主机, 整机",
          },
        ],
      },
    ],
  },
  {
    family: "2K0300",
    categories: [
      {
        title: "主板及开发板",
        devices: [
          {
            name: "龙芯 2K0300 蜂鸟板",
            href: "/devices/loongson-2k0300-hummingbird-evb",
            image: "/images/devices/loongson-2k0300-hummingbird-evb.webp",
            spec: "2K0300",
            tags: "开发板",
          },
          {
            name: "龙芯 2K0300 先锋派",
            href: "/devices/loongson-2k0300-pioneer-evb",
            image: "/images/devices/loongson-2k0300-pioneer-evb.webp",
            spec: "2K0300",
            tags: "开发板",
          },
          {
            name: "正点原子 2K0300 开发板",
            href: "/devices/alientek-2k0300-evb",
            image: "/images/devices/alientek-2k0300-evb-1.webp",
            spec: "2K0300",
            tags: "开发板",
          },
          {
            name: "中科云久久派",
            href: "/devices/ctcisz-foreverpi",
            image: "/images/devices/loongson-2k0300-pioneer-evb.webp",
            spec: "2K0300",
            tags: "开发板",
          },
        ],
      },
    ],
  },
]
