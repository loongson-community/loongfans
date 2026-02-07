import type { DeviceInfoDB } from "@src/types/data"
import type { DeviceListData } from "@src/types/device"
import type { SupportedLanguage } from "@src/types/language"

/**
 * Transform device database into DeviceListData format for rendering.
 *
 * This function groups devices by family and category, respecting the
 * ordering defined in the families configuration, and localizes all
 * translatable strings.
 */
export function transformDeviceDB(
  deviceDB: DeviceInfoDB,
  lang: SupportedLanguage,
): DeviceListData {
  const familyOrder = Object.keys(deviceDB.families.families)
  const categoryOrder = Object.keys(deviceDB.families.categories)

  type DeviceWithId = (typeof deviceDB.devices)[string] & { id: string }
  const groupedByFamily: Record<string, Record<string, DeviceWithId[]>> = {}

  // Initialize structure based on family order
  for (const familyKey of familyOrder) {
    groupedByFamily[familyKey] = {}
  }

  // Group devices by family and category
  for (const [deviceId, device] of Object.entries(deviceDB.devices)) {
    const { family, category } = device

    if (!groupedByFamily[family]) {
      groupedByFamily[family] = {}
    }
    if (!groupedByFamily[family][category]) {
      groupedByFamily[family][category] = []
    }
    groupedByFamily[family][category].push({ ...device, id: deviceId })
  }

  // Transform to DeviceListData format
  return familyOrder
    .filter((familyKey) => {
      const familyData = groupedByFamily[familyKey]
      return familyData && Object.keys(familyData).length > 0
    })
    .map((familyKey) => {
      const familyMeta = deviceDB.families.families[familyKey]
      const familyData = groupedByFamily[familyKey]

      return {
        family: familyMeta?.title[lang] ?? familyKey,
        categories: categoryOrder
          .filter(
            (catKey) => familyData?.[catKey] && familyData[catKey].length > 0,
          )
          .map((catKey) => {
            const categoryMeta = deviceDB.families.categories[catKey]
            const devices = familyData?.[catKey] ?? []

            return {
              title: categoryMeta?.title[lang] ?? catKey,
              devices: devices.map((device) => ({
                id: device.id,
                name: device.name[lang] ?? device.name.en ?? device.id,
                image: device.image,
                spec: device.spec,
                tags: device.tags
                  .map((tag) => {
                    const tagMeta = deviceDB.families.tags[tag]
                    return tagMeta?.title[lang] ?? tag
                  })
                  .join(", "),
              })),
            }
          }),
      }
    })
}
