<template>
  <div class="chips-data-pages">
    <div class="chips-data-link">
      <div class="chips-pic" style="margin-top: 20px">
        <img :src="chipData?.ext_info?.pic" />
      </div>
      <div class="chip-actions">
        <Button
          :label="
            isComparing
              ? $t('chips.buttons.remove_compare')
              : $t('chips.buttons.add_compare')
          "
          @click="toggleCompare"
          v-if="!props.fields.chipset"
        />
      </div>
    </div>

    <div class="chips-data-info">
      <!-- 基本信息 -->
      <div class="chip-section" v-if="props.fields.basic && chipData?.basic">
        <h3 style="margin: 0 !important">{{ $t("chips.basic.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.basic"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
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
                      <span v-if="chipData.basic[key] == 1">{{
                        $t("chips.basic.market_type.desktop")
                      }}</span>
                      <span v-else-if="chipData.basic[key] == 2">{{
                        $t("chips.basic.market_type.mobile")
                      }}</span>
                      <span v-else-if="chipData.basic[key] == 3">{{
                        $t("chips.basic.market_type.server")
                      }}</span>
                      <span v-else-if="chipData.basic[key] == 4">{{
                        $t("chips.basic.market_type.embedded")
                      }}</span>
                    </span>
                    <span v-else>{{ chipData.basic[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- CPU 参数 -->
      <div class="chip-section" v-if="props.fields.cpu && chipData?.cpu">
        <h3 style="margin: 0 !important">{{ $t("chips.cpu.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.cpu"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
                <div class="field">
                  <label>
                    {{ $t(`chips.cpu.${key}`) }}
                    <a
                      v-if="['voltage', 'tpc', 'tdp'].includes(key)"
                      @click="showHelpDialog('cpu.' + key, 'cpu_' + key)"
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">{{ chipData.cpu[key] }}</div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 芯片组参数 -->
      <div
        class="chip-section"
        v-if="props.fields.chipset && chipData?.chipset"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.chipset.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.chipset"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
                <div class="field">
                  <label>{{ $t(`chips.chipset.${key}`) }}</label>
                  <div class="value">{{ chipData.chipset[key] }}</div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- GPU 参数 -->
      <div class="chip-section" v-if="props.fields.gpu && chipData?.gpu">
        <h3 style="margin: 0 !important">{{ $t("chips.gpu.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.gpu"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
                <div class="field">
                  <label>{{ $t(`chips.gpu.${key}`) }}</label>
                  <div class="value">
                    <span v-if="key === 'available'">
                      <span v-if="chipData.gpu[key]">{{
                        $t("chips.status.yes")
                      }}</span>
                      <span v-else>{{ $t("chips.status.no") }}</span>
                    </span>
                    <span v-else>{{ chipData.gpu[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 内存参数 -->
      <div class="chip-section" v-if="props.fields.memory && chipData?.memory">
        <h3 style="margin: 0 !important">{{ $t("chips.memory.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.memory"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
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
                      <span v-if="chipData.memory[key] == true">{{
                        $t("chips.status.supported")
                      }}</span>
                      <span v-else-if="chipData.memory[key] == false">{{
                        $t("chips.status.unsupported")
                      }}</span>
                    </span>
                    <span v-else>{{ chipData.memory[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 扩展性 -->
      <div class="chip-section" v-if="props.fields.exp && chipData?.exp">
        <h3 style="margin: 0 !important">{{ $t("chips.exp.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.exp"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
                <div class="field">
                  <label>
                    <span v-if="key === 'd2d'">{{ $t(`chips.exp.d2d`) }}</span>
                    <span v-else-if="key === 'd2d_name'">{{
                      $t(`chips.exp.d2d_name`)
                    }}</span>
                    <span v-else>{{ $t(`chips.exp.${key}`) }}</span>
                    <a
                      v-if="['io_name', 'io_rev', 'd2d_name'].includes(key)"
                      @click="showHelpDialog('exp.' + key, 'exp_' + key)"
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <span v-if="key === 'd2d'">
                      <span v-if="chipData.exp[key] == true">{{
                        $t("chips.status.supported")
                      }}</span>
                      <span v-else-if="chipData.exp[key] == false">{{
                        $t("chips.status.unsupported")
                      }}</span>
                    </span>
                    <span v-else-if="key === 'd2d_name'">
                      <span v-if="chipData.exp[key] == 'lcl'">{{
                        $t("chips.exp.d2d_lcl")
                      }}</span>
                      <span v-else-if="chipData.exp[key] == 'ht3'"
                        >HyperTransport 3.0</span
                      >
                      <span v-else>N/A</span>
                    </span>
                    <span v-else>{{ chipData.exp[key] || "N/A" }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 封装 -->
      <div
        class="chip-section"
        v-if="props.fields.package && chipData?.package"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.package.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.package"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
                <div class="field">
                  <label>
                    <span v-if="key === 't_case'">T<sub>CASE</sub></span>
                    <span v-else-if="key === 't_junction'"
                      >T<sub>JUNCTION</sub></span
                    >
                    <span v-else>{{ $t(`chips.package.${key}`) }}</span>
                    <a
                      v-if="
                        ['temperature', 't_case', 't_junction'].includes(key)
                      "
                      @click="
                        showHelpDialog('package.' + key, 'package_' + key)
                      "
                    >
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">{{ chipData.package[key] || "N/A" }}</div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>

      <!-- 功耗管理 -->
      <div class="chip-section" v-if="props.fields.power && chipData?.power">
        <h3 style="margin: 0 !important">{{ $t("chips.power.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.power"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
                <div class="field">
                  <label>
                    {{ $t(`chips.power.${key}`) }}
                    <a @click="showHelpDialog('power.' + key, 'power_' + key)">
                      <MaterialSymbolsHelpOutline />
                    </a>
                  </label>
                  <div class="value">
                    <span v-if="chipData.power[key] == true">{{
                      $t("chips.status.supported")
                    }}</span>
                    <span v-else-if="chipData.power[key] == false">{{
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
        class="chip-section"
        v-if="props.fields.technologies && chipData?.technologies"
      >
        <h3 style="margin: 0 !important">{{ $t("chips.tech.title") }}</h3>
        <DataView :value="[chipData]" :layout="'list'">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, key) in props.fields.technologies"
                :key="key"
                class="col-12 md:col-6 lg:col-4"
              >
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
                        id="isa-info"
                        v-for="isa_name in chipData.technologies[key]"
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
                      <span v-if="!chipData.technologies[key]">N/A</span>
                      <!-- <span>N/A</span> -->
                    </template>
                    <span v-else>{{ chipData.technologies[key] }}</span>
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

<script setup>
import { ref, computed, onMounted, defineComponent, h } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()

// PrimeVue
import Button from "primevue/button"
import DataView from "primevue/dataview"
import { useToast } from "primevue/usetoast"
import { useDialog } from "primevue/usedialog"
const toast = useToast()
const dialog = useDialog()

import MaterialSymbolsHelpOutline from "~icons/material-symbols/help-outline"
import * as ChipDescriptions from "./ChipDescriptions.vue"
import chipsJson from "../../data/chips.min.json"

const props = defineProps({
  chips: String,
  fields: Object,
})

// 根据字段类型获取芯片数据
const chipData = ref(null)

onMounted(() => {
  if (!props.chips || !props.fields?.type) return

  switch (props.fields.type) {
    case "cpu":
      chipData.value = chipsJson.cpu[props.chips]
      break
    case "chipset":
      chipData.value = chipsJson.chipset[props.chips]
      break
    default:
      chipData.value = chipsJson.cpu[props.chips]
      break
  }
})

const compareList = ref(
  JSON.parse(localStorage.getItem("cpuCompareList") || "[]"),
)

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
    header = defineComponent({
      setup() {
        return () =>
          h("span", { class: "p-dialog-title" }, specialHeaders[key]())
      },
    })
  } else {
    header = defineComponent({
      setup() {
        return () =>
          h("span", { class: "p-dialog-title" }, t(`chips.${headerText}`))
      },
    })
  }

  dialog.open(ChipDescriptions[key], {
    props: {
      header: null,
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
  margin-bottom: 16px;
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
