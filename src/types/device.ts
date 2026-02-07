// Device description schema

export interface Device {
  name: string
  href: string
  image: string
  spec: string
  tags: string
}

export interface DeviceCategory<D = Device> {
  title: string
  devices: D[]
}

export interface DeviceFamily<C = DeviceCategory> {
  family: string
  categories: C[]
}

// For the DeviceIndex component, which is used to display not only the devices,
// *but also the chips*.

export interface DeviceForIndex extends Device {
  comparisonKey?: string
}

export type DeviceIndexData = DeviceFamily<DeviceCategory<DeviceForIndex>>[]
