import { computed, getCurrentInstance, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { defineStore } from "pinia"
import { useToast } from "primevue/usetoast"

export const useCPUComparisonStore = defineStore("cpuComparison", () => {
  const compareList = ref<string[]>([])

  const { t } = useI18n()
  const toast = useToast()

  const listLength = computed(() => compareList.value.length)

  const postUpdate = () => {
    localStorage.setItem("cpuCompareList", JSON.stringify(compareList.value))
  }

  function isIncludedInComparison(id: string) {
    return compareList.value.includes(id)
  }

  function clearComparison() {
    compareList.value = []
    postUpdate()
  }

  function addToComparison(id: string) {
    if (isIncludedInComparison(id)) return

    // Limit to 4 chips for comparison
    if (compareList.value.length >= 4) {
      toast.add({
        severity: "info",
        summary: t("chips.notice"),
        detail: t("chips.up_to_four_chips"),
        life: 3000,
      })
      return
    }

    compareList.value.push(id)
    postUpdate()
  }

  function removeFromComparison(id: string) {
    compareList.value = compareList.value.filter((chipId) => chipId !== id)
    postUpdate()
  }

  function toggleComparison(id: string) {
    if (isIncludedInComparison(id)) {
      removeFromComparison(id)
    } else {
      addToComparison(id)
    }
  }

  // Load from local storage in browser context
  if (getCurrentInstance()) {
    onMounted(() => {
      const storedList = localStorage.getItem("cpuCompareList")
      if (storedList) {
        let parsed: object
        try {
          parsed = JSON.parse(storedList)
        } catch (/* eslint-disable-line @typescript-eslint/no-unused-vars */ e) {
          // clear the invalid data
          localStorage.removeItem("cpuCompareList")
          return
        }

        if (Array.isArray(parsed)) {
          if (parsed.every((item) => typeof item === "string")) {
            compareList.value = parsed
          }
        }
      }
    })
  }

  return {
    compareList,
    listLength,
    clearComparison,
    isIncludedInComparison,
    removeFromComparison,
    toggleComparison,
  }
})
