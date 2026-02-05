declare module "virtual:loongfans-data/biweekly" {
  const value: import("./data").BiweeklyDB
  export default value
}

declare module "virtual:loongfans-data/chips" {
  const value: import("./data").ChipInfoDB
  export default value
}

declare module "virtual:loongfans-data/os" {
  const value: import("./data").OSInfoItem[]
  export default value
}
