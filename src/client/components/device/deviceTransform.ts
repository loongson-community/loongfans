import groupBy from "lodash/groupBy"
import isEmpty from "lodash/isEmpty"
import mapValues from "lodash/mapValues"

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
  const { families, categories, tags } = deviceDB.families
  const familyOrder = Object.keys(families)
  const categoryOrder = Object.keys(categories)

  // Group devices by family, then by category
  const grouped = mapValues(
    groupBy(
      Object.entries(deviceDB.devices).map(([id, d]) => ({ ...d, id })),
      "family",
    ),
    (devices) => groupBy(devices, "category"),
  )

  return familyOrder
    .filter((fKey) => !isEmpty(grouped[fKey]))
    .map((fKey) => ({
      family: families[fKey]?.title[lang] ?? fKey,
      categories: categoryOrder
        .filter((cKey) => !isEmpty(grouped[fKey]?.[cKey]))
        .map((cKey) => ({
          title: categories[cKey]?.title[lang] ?? cKey,
          devices: (grouped[fKey]?.[cKey] ?? []).map((d) => ({
            id: d.id,
            name: d.name[lang] ?? d.name.en ?? d.id,
            image: d.image,
            spec: d.spec,
            tags: d.tags.map((t) => tags[t]?.title[lang] ?? t).join(", "),
          })),
        })),
    }))
}
