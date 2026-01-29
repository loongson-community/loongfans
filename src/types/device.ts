export interface Device {
  comparisonKey?: string
  name: string
  href: string
  image: string
  spec: string
  tags: string
}

export interface DeviceCategory {
  title: string
  devices: Device[]
}

export interface DeviceFamily {
  family: string
  categories: DeviceCategory[]
}
