// Device description schema

export interface Device {
  id: string
  name: string
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

// For the DeviceList component, which is used to display not only the devices,
// *but also the chips*.

export interface DeviceListItem extends Device {
  comparisonKey?: string
  image?: string
  href?: string
}

export type DeviceListData = DeviceFamily<DeviceCategory<DeviceListItem>>[]
