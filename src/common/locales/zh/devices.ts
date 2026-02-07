import type { DeviceFamily } from "@src/types/device"

export const devices: DeviceFamily[] = [
  {
    family: "3C6000 家族",
    categories: [
      {
        title: "主板及开发板",
        devices: [
          {
            id: "loongson-ac612a0-v1.0",
            name: "龙芯 AC612A0_V1.0",
            spec: "3C6000/S @ 2.3GHz, ATX",
            tags: "7A2000, 支持 ECC 内存, 台式机主板",
          },
          {
            id: "loongson-ac612a0-v1.1",
            name: "龙芯 AC612A0_V1.1",
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
            id: "loongson-xb612b0-v1.1",
            name: "龙芯 XB612B0_V1.1",
            spec: "3B6000 @ 2.3GHz, mATX",
            tags: "7A2000, 台式机主板",
          },
          {
            id: "loongson-xb612b0-v1.2",
            name: "龙芯 XB612B0_V1.2",
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
            id: "asus-xc-ls3a6m",
            name: "华硕 XC-LS3A6M",
            spec: "3A6000-HV @ 2.5GHz, mATX",
            tags: "7A2000, 台式机主板",
          },
          {
            id: "loongson-xa61200",
            name: "龙芯 XA61200",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, 台式机主板",
          },
          {
            id: "loongson-xa61201-v1.0",
            name: "龙芯 XA61201_v1.0",
            spec: "3A6000-HV @ 2.5GHz, DTX",
            tags: "7A2000, 台式机主板",
          },
          {
            id: "loongson-xa612a0-v1.0",
            name: "龙芯 XA612A0_v1.0",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, 台式机主板",
          },
          {
            id: "loongson-xa612b0-v1.0",
            name: "龙芯 XA612B0_v1.0",
            spec: "3A6000-HV @ 2.5GHz, ATX",
            tags: "7A2000, 台式机主板",
          },
        ],
      },
      {
        title: "笔记本电脑",
        devices: [
          {
            id: "ea-excelsior-nl38-n11",
            name: "卓怡恒通 NL38-N11",
            spec: "3A6000 @ 2.0GHz",
            tags: "笔记本电脑",
          },
          {
            id: "kaitian-n60d-g1d",
            name: "联想开天 N60d-G1d",
            spec: "3A6000 @ 2.0GHz",
            tags: "笔记本电脑",
          },
        ],
      },
      {
        title: "整机产品",
        devices: [
          {
            id: "morefine-m700s",
            name: "摩方 M700S",
            spec: "3A6000-HV @ 2.5GHz",
            tags: "小主机, 整机",
          },
          {
            id: "ctcisz-3a6000-nuc",
            name: "中科云 3A6000 小主机",
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
            id: "opi-nova-v1.0",
            name: "OrangePi Nova v1.0",
            spec: "2K3000 @ 2.2GHz, nanoITX",
            tags: "开发板",
          },
          {
            id: "loongson-2k3000-ai-evb",
            name: "龙芯 2K3000 AI 评估板",
            spec: "2K3000 @ 2.2GHz",
            tags: "开发板",
          },
        ],
      },
      {
        title: "整机产品",
        devices: [
          {
            id: "ctcisz-3b6000m-nuc",
            name: "中科云 3B6000M 小主机",
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
            id: "loongson-2k0300-hummingbird-evb",
            name: "龙芯 2K0300 蜂鸟板",
            spec: "2K0300",
            tags: "开发板",
          },
          {
            id: "loongson-2k0300-pioneer-evb",
            name: "龙芯 2K0300 先锋派",
            spec: "2K0300",
            tags: "开发板",
          },
          {
            id: "alientek-2k0300-evb",
            name: "正点原子 2K0300 开发板",
            spec: "2K0300",
            tags: "开发板",
          },
          {
            id: "ctcisz-foreverpi",
            name: "中科云久久派",
            spec: "2K0300",
            tags: "开发板",
          },
        ],
      },
    ],
  },
]
