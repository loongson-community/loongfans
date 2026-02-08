declare module "virtual:loongfans-data/biweekly" {
  const value: import("./data").BiweeklyDB
  export default value
}

declare module "virtual:loongfans-data/chips" {
  const value: import("./data").ChipInfoDB
  export default value
}

declare module "virtual:loongfans-data/device" {
  const value: import("./data").DeviceInfoDB
  export default value
}

declare module "virtual:loongfans-data/downloads" {
  const value: import("./data").DownloadsDB
  export default value
}

declare module "virtual:loongfans-data/os" {
  const value: import("./data").OSInfoItem[]
  export default value
}

declare module "@data/events/events.ics?raw" {
  const value: string
  export default value
}
