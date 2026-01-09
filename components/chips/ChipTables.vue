<template>
  <div class="chips-data-pages">
    <div class="chips-data-link">
      <div class="chips-pic" style="margin-top: 20px">
        <img :src="commonData.ext_info?.pic" />
      </div>
      <div class="chip-actions">
        <Button
          v-if="!props.fields.chipset"
          :label="
            isComparing
              ? $t('chips.buttons.remove_compare')
              : $t('chips.buttons.add_compare')
          "
          @click="toggleCompare"
        />
      </div>
    </div>

    <div class="chips-data-info">
      <!-- 基本信息 -->
      <div v-if="props.fields.basic && commonData?.basic" class="chip-section">
        <h3 style="margin: 0 !important">{{ $t("chips.basic.title") }}</h3>
        <DataView :value="[commonData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.basic" :key="key">
                <div class="field">
                  <label>
                    {{ $t(`chips.basic.${key}`) }}
                    <a
                      v-if="key !== 'name'"
                      @click="showHelpDialog('basic.' + key, 'basic_' + key)"
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <span v-if="key === 'market'">
                      <span v-if="commonData.basic[key] == 1">{{
                        $t("chips.basic.market_type.desktop")
                      }}</span>
                      <span v-else-if="commonData.basic[key] == 2">{{
                        $t("chips.basic.market_type.mobile")
                      }}</span>
                      <span v-else-if="commonData.basic[key] == 3">{{
                        $t("chips.basic.market_type.server")
                      }}</span>
                      <span v-else-if="commonData.basic[key] == 4">{{
                        $t("chips.basic.market_type.embedded")
                      }}</span>
                    </span>
                    <span v-else>{{ commonData.basic[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- CPU 参数 -->
      <div v-if="props.fields.cpu && isCPU" class="chip-section">
        <h3 style="margin: 0 !important">{{ $t("chips.cpu.title") }}</h3>
        <DataView :value="[cpuData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.cpu" :key="key">
                <div class="field">
                  <label>
                    {{ $t(`chips.cpu.${key}`) }}
                    <a
                      v-if="['voltage', 'tpc', 'tdp'].includes(key.toString())"
                      @click="showHelpDialog('cpu.' + key, 'cpu_' + key)"
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">{{ cpuData?.cpu[key] }}</div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 芯片组参数 -->
      <div v-if="props.fields.chipset && isChipset" class="chip-section">
        <h3 style="margin: 0 !important">{{ $t("chips.chipset.title") }}</h3>
        <DataView :value="[chipsetData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.chipset" :key="key">
                <div class="field">
                  <label>{{ $t(`chips.chipset.${key}`) }}</label>
                  <div class="value">{{ chipsetData?.chipset[key] }}</div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- GPU 参数 -->
      <div v-if="props.fields.gpu && gpuData" class="chip-section">
        <h3 style="margin: 0 !important">{{ $t("chips.gpu.title") }}</h3>
        <DataView :value="[gpuData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.gpu" :key="key">
                <div class="field">
                  <label>{{ $t(`chips.gpu.${key}`) }}</label>
                  <div class="value">
                    <span v-if="key === 'available'">
                      <span v-if="gpuData[key]">{{
                        $t("chips.status.yes")
                      }}</span>
                      <span v-else>{{ $t("chips.status.no") }}</span>
                    </span>
                    <span v-else>{{ gpuData[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 内存参数 -->
      <div
        v-if="props.fields.memory && isCPU && cpuData?.memory"
        class="chip-section"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.memory.title") }}</h3>
        <DataView :value="[cpuData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.memory" :key="key">
                <div class="field">
                  <label>
                    {{ $t(`chips.memory.${key}`) }}
                    <a
                      v-if="key === 'ecc'"
                      @click="showHelpDialog('memory.' + key, 'memory_' + key)"
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <span v-if="key === 'ecc'">
                      <span v-if="cpuData.memory[key] == true">{{
                        $t("chips.status.supported")
                      }}</span>
                      <span v-else-if="cpuData.memory[key] == false">{{
                        $t("chips.status.unsupported")
                      }}</span>
                    </span>
                    <span v-else>{{ cpuData.memory[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 扩展性 -->
      <div v-if="props.fields.exp && commonData?.exp" class="chip-section">
        <h3 style="margin: 0 !important">{{ $t("chips.exp.title") }}</h3>
        <DataView :value="[commonData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.exp" :key="key">
                <div class="field">
                  <label>
                    <span v-if="key === 'd2d'">{{ $t(`chips.exp.d2d`) }}</span>
                    <span v-else-if="key === 'd2d_name'">{{
                      $t(`chips.exp.d2d_name`)
                    }}</span>
                    <span v-else>{{ $t(`chips.exp.${key}`) }}</span>
                    <a
                      v-if="
                        ['io_name', 'io_rev', 'd2d_name'].includes(
                          key.toString(),
                        )
                      "
                      @click="showHelpDialog('exp.' + key, 'exp_' + key)"
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <span v-if="key === 'd2d'">
                      <span v-if="commonData.exp[key] == true">{{
                        $t("chips.status.supported")
                      }}</span>
                      <span v-else-if="commonData.exp[key] == false">{{
                        $t("chips.status.unsupported")
                      }}</span>
                    </span>
                    <span v-else-if="key === 'd2d_name'">
                      <span v-if="commonData.exp[key] == 'lcl'">{{
                        $t("chips.exp.d2d_lcl")
                      }}</span>
                      <span v-else-if="commonData.exp[key] == 'ht3'">
                        HyperTransport 3.0
                      </span>
                      <span v-else>N/A</span>
                    </span>
                    <span v-else>{{ commonData.exp[key] || "N/A" }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 封装 -->
      <div
        v-if="props.fields.package && commonData?.package"
        class="chip-section"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.package.title") }}</h3>
        <DataView :value="[commonData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.package" :key="key">
                <div class="field">
                  <label>
                    <span v-if="key === 't_case'">T<sub>CASE</sub></span>
                    <span v-else-if="key === 't_junction'">
                      T<sub>JUNCTION</sub>
                    </span>
                    <span v-else>{{ $t(`chips.package.${key}`) }}</span>
                    <a
                      v-if="
                        ['temperature', 't_case', 't_junction'].includes(
                          key.toString(),
                        )
                      "
                      @click="
                        showHelpDialog('package.' + key, 'package_' + key)
                      "
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    {{ commonData.package[key] || "N/A" }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 功耗管理 -->
      <div
        v-if="props.fields.power && isCPU && cpuData?.power"
        class="chip-section"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.power.title") }}</h3>
        <DataView :value="[cpuData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.power" :key="key">
                <div class="field">
                  <label>
                    {{ $t(`chips.power.${key}`) }}
                    <a @click="showHelpDialog('power.' + key, 'power_' + key)">
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <span v-if="cpuData.power[key] == true">{{
                      $t("chips.status.supported")
                    }}</span>
                    <span v-else-if="cpuData.power[key] == false">{{
                      $t("chips.status.unsupported")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 支持技术 -->
      <div
        v-if="props.fields.technologies && isCPU && cpuData?.technologies"
        class="chip-section"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.tech.title") }}</h3>
        <DataView :value="[cpuData]" :layout="'list'">
          <template #list>
            <div
              class="grid grid-nogutter gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <div v-for="(item, key) in props.fields.technologies" :key="key">
                <div class="field">
                  <label>
                    {{ $t(`chips.tech.${key}`) }}
                    <a @click="showHelpDialog('tech.' + key, 'tech_' + key)">
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <template v-if="key === 'isa_extensions'">
                      <span
                        v-for="isa_name in cpuData.technologies[key]"
                        id="isa-info"
                        :key="isa_name"
                      >
                        <!-- 这里请不要暂时换行，会渲染多余的空格 -->
                        {{ isa_name
                        }}<a
                          @click="
                            showHelpDialog(
                              'isa.' + isa_name,
                              'tech_isa_' + isa_name,
                            )
                          "
                        >
                          <sup><MaterialSymbolsHelpOutline /></sup>
                        </a>
                      </span>
                      <span v-if="!cpuData.technologies[key]">N/A</span>
                    </template>
                    <span v-else>{{ cpuData.technologies[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  ref,
  onMounted,
  type ComputedRef,
  type Ref,
} from "vue"
import { useI18n } from "vue-i18n"

// PrimeVue
import Button from "primevue/button"
import DataView from "primevue/dataview"
import { useToast } from "primevue/usetoast"
import { useDialog } from "primevue/usedialog"

import MaterialSymbolsHelpOutline from "~icons/material-symbols/help-outline"
import * as ChipDescriptions from "./ChipDescriptions.vue"
import chipsJson from "../../data/chips.min.json"
import type {
  ChipCommonInfo,
  ChipInfoDB,
  ChipsetInfoItem,
  CPUInfoItem,
} from "../../types/data"

const { t } = useI18n()
const toast = useToast()
const dialog = useDialog()

const props = defineProps({
  chips: { type: String, required: true },
  fields: { type: Object, required: true },
})

const chipsDB: ChipInfoDB = chipsJson as ChipInfoDB

// 根据字段类型获取芯片数据
const cpuData: Ref<CPUInfoItem | null> = ref(null)
const chipsetData: Ref<ChipsetInfoItem | null> = ref(null)

const compareList: Ref<string[]> = ref([])

const initCompareList = () => {
  const storedList = localStorage.getItem("cpuCompareList")
  if (storedList) {
    compareList.value = JSON.parse(storedList)
  }
}

onMounted(() => {
  initCompareList()
})

const isComparing = computed(() => {
  return compareList.value.includes(props.chips)
})

const toggleCompare = () => {
  if (isComparing.value) {
    compareList.value = compareList.value.filter((id) => id !== props.chips)
  } else {
    if (compareList.value.length < 4) {
      // Limit to 4 chips for comparison
      compareList.value.push(props.chips)
    } else {
      toast.add({
        severity: "info",
        summary: t("chips.notice"),
        detail: t("chips.up_to_four_chips"),
        life: 3000,
      })
      return
    }
  }
  localStorage.setItem("cpuCompareList", JSON.stringify(compareList.value))
  window.dispatchEvent(new CustomEvent("cpuCompareListUpdated"))
}

// 加载芯片数据
switch (props.fields.type) {
  case "cpu":
    cpuData.value = chipsDB.cpu[props.chips] || null
    break
  case "chipset":
    chipsetData.value = chipsDB.chipset[props.chips] || null
    break
  default:
    cpuData.value = chipsDB.cpu[props.chips] || null
    break
}

const isCPU = computed(() => {
  return props.fields.type === "cpu"
})

const isChipset = computed(() => {
  return props.fields.type === "chipset"
})

const commonData: ComputedRef<ChipCommonInfo> = computed(() => {
  if (isChipset.value) {
    return chipsetData.value as ChipCommonInfo
  } else {
    return cpuData.value as ChipCommonInfo
  }
})

const gpuData = computed(() => {
  if (isChipset.value) {
    return chipsetData?.value?.gpu
  } else {
    return cpuData?.value?.gpu
  }
})

const showHelpDialog = (header, key) => {
  const headerText = header // 保存原始字符串

  // 特殊标题的映射
  const specialHeaders = {
    package_t_case: () => ["T", h("sub", "CASE")],
    package_t_junction: () => ["T", h("sub", "JUNCTION")],
    tech_isa_LBT: () => ["LBT"],
    tech_isa_LVZ: () => ["LVZ"],
    tech_isa_LSX: () => ["LSX"],
    tech_isa_LASX: () => ["LASX"],
  }

  if (specialHeaders[key]) {
    /* eslint-disable-next-line vue/one-component-per-file */
    header = defineComponent({
      setup() {
        return () =>
          h("span", { class: "p-dialog-title" }, specialHeaders[key]())
      },
    })
  } else {
    /* eslint-disable-next-line vue/one-component-per-file */
    header = defineComponent({
      setup() {
        return () =>
          h("span", { class: "p-dialog-title" }, t(`chips.${headerText}`))
      },
    })
  }

  dialog.open(ChipDescriptions[key], {
    props: {
      header: undefined,
      style: {
        width: "50vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
      dismissableMask: true,
    },
    templates: {
      header: header,
    },
  })
}

const isaStyleVariables = computed(() => `"${t("comma")}"`)
</script>

<style lang="css" scoped>
.chips-data-pages {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  gap: 20px;
}

.chips-data-info {
  width: 100%;
}

.chip-section {
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
}

.chip-section h3 {
  margin-bottom: 20px;
  color: #1f2937;
  font-weight: 600;
  font-size: 1.25rem;
  border-bottom: 2px solid #e60013;
  padding-bottom: 8px;
}

.field {
  padding: 12px;
  border-radius: 6px;
  background-color: #f9fafb;
  transition: background-color 0.2s;
}

.field:hover {
  background-color: #f3f4f6;
}

.field label {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 4px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.field .value {
  color: #111827;
  font-size: 1rem;
  font-weight: 500;
}

.field .value #isa-info {
  color: #111827;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  white-space: pre-wrap;
  &:after {
    content: v-bind(isaStyleVariables);
  }
  &:last-child {
    &:after {
      content: "";
    }
  }
}

.field a {
  cursor: pointer;
}

.chips-pic img {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.chip-actions {
  margin: 20px 0;
}

/* PrimeVue DataView 样式覆盖 */
:deep(.p-dataview) {
  background: transparent;
}

:deep(.p-dataview-content) {
  background: transparent;
  border: none;
}

:deep(.grid) {
  margin: 0;
}

/* 响应式处理 */
@media (max-width: 1280px) {
  .chips-data-pages {
    flex-direction: column;
  }
  .chip-section {
    margin-top: 0;
  }
}
</style>
