<template>
  <div v-if="chipsBeingCompared.length > 0" class="compare-container">
    <div class="compare-table">
      <div class="compare-row compare-header">
        <!-- 产品名称 -->
        <div class="compare-cell">
          <Button
            severity="danger"
            size="small"
            :label="$t('chips.buttons.clear')"
            @click="comparisonStore.clearComparison()"
          />
        </div>
        <div
          v-for="{ id, chip } in chipsBeingCompared"
          :key="chip.basic.name"
          class="compare-cell compare-never"
        >
          <img
            :src="chip.ext_info.pic"
            style="max-width: 100px; margin-bottom: 10px"
          />
          <h3>{{ chip.basic.name }}</h3>
          <Button
            severity="danger"
            size="small"
            :label="$t('chips.buttons.remove')"
            @click="comparisonStore.removeFromComparison(id)"
          />
        </div>
      </div>

      <div class="compare-section">
        <!-- 基本信息 -->
        <h3>{{ $t("chips.basic.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.basic.series") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell compare-never"
          >
            {{ chip.basic.series }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.basic.market") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell compare-never"
          >
            <span v-if="chip.basic.market == 1">{{
              $t("chips.basic.market_type.desktop")
            }}</span>
            <span v-else-if="chip.basic.market == 2">{{
              $t("chips.basic.market_type.mobile")
            }}</span>
            <span v-else-if="chip.basic.market == 3">{{
              $t("chips.basic.market_type.server")
            }}</span>
            <span v-else-if="chip.basic.market == 4">{{
              $t("chips.basic.market_type.embedded")
            }}</span>
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- CPU 参数 -->
        <h3>{{ $t("chips.cpu.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.cores") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.cores') }"
          >
            {{ chip.cpu.cores }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.threads") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.threads') }"
          >
            {{ chip.cpu.threads }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.arch") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.arch') }"
          >
            {{ chip.cpu.arch }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.freq") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.freq') }"
          >
            {{ chip.cpu.freq }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.l1_inst_cache") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.l1_inst_cache') }"
          >
            {{ chip.cpu.l1_inst_cache }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.l1_data_cache") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.l1_data_cache') }"
          >
            {{ chip.cpu.l1_data_cache }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.l2_cache") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.l2_cache') }"
          >
            {{ chip.cpu.l2_cache }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.l3_cache") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.l3_cache') }"
          >
            {{ chip.cpu.l3_cache }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.voltage") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.voltage') }"
          >
            {{ chip.cpu.voltage }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.tpc") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.tpc') }"
          >
            {{ chip.cpu.tpc }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.cpu.tdp") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'cpu.tdp') }"
          >
            {{ chip.cpu.tdp }}
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- GPU 参数 -->
        <h3>{{ $t("chips.gpu.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.gpu.available") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'gpu.available') }"
          >
            <span v-if="chip.gpu.available == true">{{
              $t("chips.status.yes")
            }}</span>
            <span v-else-if="chip.gpu.available == false">{{
              $t("chips.status.no")
            }}</span>
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.gpu.name") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'gpu.name') }"
          >
            {{ chip.gpu.name }}
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- 内存参数 -->
        <h3>{{ $t("chips.memory.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.memory.max") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'memory.max') }"
          >
            {{ chip.memory.max }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.memory.types") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'memory.types') }"
          >
            {{ chip.memory.types }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.memory.channels") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'memory.channels') }"
          >
            {{ chip.memory.channels }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.memory.ecc") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'memory.ecc') }"
          >
            <span v-if="chip.memory.ecc == true">{{
              $t("chips.status.supported")
            }}</span>
            <span v-else-if="chip.memory.ecc == false">{{
              $t("chips.status.unsupported")
            }}</span>
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- 扩展性 -->
        <h3>{{ $t("chips.exp.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.exp.io_name") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.name') }"
          >
            {{ chip.exp.io_name }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.exp.io_rev") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.rev') }"
          >
            {{ chip.exp.io_rev }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.exp.lanes") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.lanes') }"
          >
            {{ chip.exp.lanes }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">USB 3.1 {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.usb_5gbps') }"
          >
            {{ chip.exp.usb_5gbps }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">USB 2.0 {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.usb2') }"
          >
            {{ chip.exp.usb2 }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">SATA {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.sata') }"
          >
            {{ chip.exp.sata }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">
            {{ $t("chips.exp.eth") }}{{ $t("chips.exp.num") }}
          </div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.eth') }"
          >
            {{ chip.exp.eth }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">SPI {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.spi') }"
          >
            {{ chip.exp.spi }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">UART {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.uart') }"
          >
            {{ chip.exp.uart }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">I2C {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.i2c') }"
          >
            {{ chip.exp.i2c }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">GPIO {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.gpio') }"
          >
            {{ chip.exp.gpio }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">AVS {{ $t("chips.exp.num") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.avs') }"
          >
            {{ chip.exp.avs }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.exp.d2d") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.d2d') }"
          >
            <span v-if="chip.exp.d2d == true">{{
              $t("chips.status.supported")
            }}</span>
            <span v-else-if="chip.exp.d2d == false">{{
              $t("chips.status.unsupported")
            }}</span>
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.exp.d2d_name") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.d2d_name') }"
          >
            <span v-if="chip.exp.d2d_name == 'lcl'">{{
              $t("chips.exp.d2d_lcl")
            }}</span>
            <span v-else-if="chip.exp.d2d_name == 'ccnuma'">ccNUMA</span>
            <span v-else>N/A</span>
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.exp.other") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'exp.other') }"
          >
            <span v-if="chip.exp.other">{{ chip.exp.other }}</span>
            <span v-else>N/A</span>
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- 封装 -->
        <h3>{{ $t("chips.package.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.package.socket") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'package.socket') }"
          >
            {{ chip.package.socket }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.package.temperature") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'package.temperature') }"
          >
            {{ chip.package.temperature }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">T<sub>CASE</sub></div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'package.t_case') }"
          >
            {{ chip.package.t_case }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">T<sub>JUNCTION</sub></div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'package.t_junction') }"
          >
            {{ chip.package.t_junction }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.package.size") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'package.size') }"
          >
            {{ chip.package.size }}
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- 功耗管理 -->
        <h3>{{ $t("chips.power.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.power.clock_gating") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'power.clock_gating') }"
          >
            <span v-if="chip.power.clock_gating == true">{{
              $t("chips.status.supported")
            }}</span>
            <span v-else-if="chip.power.clock_gating == false">{{
              $t("chips.status.unsupported")
            }}</span>
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">
            {{ $t("chips.power.frequency_scaling") }}
          </div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{
              'same-as-first': isSame(chip, 'power.frequency_scaling'),
            }"
          >
            <span v-if="chip.power.frequency_scaling == true">{{
              $t("chips.status.supported")
            }}</span>
            <span v-else-if="chip.power.frequency_scaling == false">{{
              $t("chips.status.unsupported")
            }}</span>
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">
            {{ $t("chips.power.voltage_scaling") }}
          </div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'power.voltage_scaling') }"
          >
            <span v-if="chip.power.voltage_scaling == true">{{
              $t("chips.status.supported")
            }}</span>
            <span v-else-if="chip.power.voltage_scaling == false">{{
              $t("chips.status.unsupported")
            }}</span>
          </div>
        </div>
      </div>

      <div class="compare-section">
        <!-- 支持技术 -->
        <h3>{{ $t("chips.tech.title") }}</h3>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.tech.isa") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{ 'same-as-first': isSame(chip, 'technologies.isa') }"
          >
            {{ chip.technologies.isa }}
          </div>
        </div>
        <div class="compare-row">
          <div class="compare-cell">{{ $t("chips.tech.isa_extensions") }}</div>
          <div
            v-for="{ chip } in chipsBeingCompared"
            :key="chip.basic.name"
            class="compare-cell"
            :class="{
              'same-as-first': isSame(chip, 'technologies.isa_extensions'),
            }"
          >
            <template v-if="chip.technologies.isa_extensions">
              <span
                v-for="isa_name in chip.technologies.isa_extensions"
                id="isa-info-compare"
                :key="isa_name"
              >
                {{ isa_name }}
              </span>
            </template>
            <span v-else>N/A</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="compare-container">
    <p>{{ $t("chips.non_product") }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import Button from "primevue/button"

import chipsDB from "@data/chips.min.json"
import { useCPUComparisonStore } from "@src/client/stores/CPUComparisonStore"

const { t } = useI18n()
const comparisonStore = useCPUComparisonStore()

const chipsBeingCompared = computed(() => {
  return comparisonStore.compareList.map((chipId) => ({
    id: chipId,
    chip: chipsDB.cpu[chipId]!,
  }))
})

// 获取键值
const getFieldValue = (chip, path) => {
  return path.split(".").reduce((obj, key) => (obj ? obj[key] : null), chip)
}

// 判断是否相同
const isSame = (chip, fieldPath) => {
  if (!chipsBeingCompared.value.length || !fieldPath) return true
  const firstValue = getFieldValue(chipsBeingCompared.value[0]!.chip, fieldPath)
  const currentValue = getFieldValue(chip, fieldPath)
  return JSON.stringify(firstValue) === JSON.stringify(currentValue)
}

const isaStyleVariables = computed(() => `"${t("comma")}"`)
</script>

<style scoped>
.compare-container {
  margin: 40px 0;
  /* overflow: hidden; */
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.compare-table {
  display: inline-flex;
  flex-direction: column;
  min-width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.compare-section {
  border-bottom: 1px solid #ebeef5;
}

.compare-section h3 {
  background-color: #f5f7fa;
  padding: 10px 15px;
  margin: 0;
}

.compare-row {
  display: flex;
}

.compare-header {
  background-color: #f5f7fa;
  font-weight: bold;
}

.compare-cell {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ebeef5;
  min-width: 200px;
  position: relative;
}

.compare-cell #isa-info-compare {
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

.compare-cell:last-child {
  border-right: none;
}

.compare-cell:not(:first-child):not(.same-as-first) {
  background-color: #fff8e1;
}

.compare-never {
  background-color: inherit !important; /* 强制覆盖高亮样式，以解决部分行被错误高亮 */
}
</style>
