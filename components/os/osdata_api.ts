import { computed } from "vue"
import { useI18n } from "vue-i18n"

export interface OsData {
  name: { zh: string; en: string }
  href: string
  image: string
  description: { zh: string; en: string }
  tags: string[]
}

export function useTagTranslation() {
  const { tm } = useI18n()
  const tagTranslations = computed(() => {
    return tm("os") as Record<string, string>
  })

  const translateTag = (tag: string): string => {
    return tagTranslations.value[tag] || tag
  }

  return { translateTag }
}
