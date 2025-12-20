<template></template>
<script>
import { defineComponent, h } from "vue";
import i18n from "../../.vitepress/theme/i18n"
const { t } = i18n.global;

// Basic 
export const basic_series = defineComponent({
  setup() {
    return () => h('p', t("helps.basic.series"));
  }
})

export const basic_market = defineComponent({
  setup() {
    return () => h('p', t("helps.basic.market"));
  }
})

// CPU
export const cpu_voltage = defineComponent({
  setup() {
    return () => h('p', t("helps.cpu.voltage"));
  }
})

export const cpu_tpc = defineComponent({
  setup() {
    return () => h('p', t("helps.cpu.tpc"));
  }
})

export const cpu_tdp = defineComponent({
  setup() {
    return () => h('p', t("helps.cpu.tdp"));
  }
})

// Memory
export const memory_ecc = defineComponent({
  setup() {
    return () => h('p', t("helps.memory.ecc"));
  }
})

// Expansion
export const exp_io_name = defineComponent({
  setup() {
    return () => h('p', t("helps.exp.io_name"));
  }
})

export const exp_io_rev = defineComponent({
  setup() {
    return () => h('p', t("helps.exp.io_rev"));
  }
})

export const exp_d2d = defineComponent({
  setup() {
    return () => h('p', t("helps.exp.d2d"));
  }
})

export const exp_d2d_name = defineComponent({
  setup() {
    return () => h('p', t("helps.exp.d2d_name"));
  }
})

// Package
export const package_temperature = defineComponent({
  setup() {
    return () => h('p', t("helps.package.temperature"));
  }
})

export const package_t_case = defineComponent({
  setup() {
    return () => h('p', [
      h('span', 'T'),
      h('sub', 'CASE '),
      t("helps.package.t_case"),
      h('span', 'T'),
      h('sub', 'CASE '),
      t("helps.package.t_notice")
    ]);
  }
})

export const package_t_junction = defineComponent({
  setup() {
    return () => h('p', [
      h('span', 'T'),
      h('sub', 'JUNCTION '),
      t("helps.package.t_junction"),
      h('span', 'T'),
      h('sub', 'JUNCTION '),
      t("helps.package.t_notice")
    ]);
  }
})

// Power
export const power_shutdown_of_the_clocks = defineComponent({
  setup() {
    return () => h('p', t("helps.power.shutdown_of_the_clocks"));
  }
})

export const power_frequency_scaling = defineComponent({
  setup() {
    return () => h('p', t("helps.power.frequency_scaling"));
  }
})

export const power_voltage_scaling = defineComponent({
  setup() {
    return () => h('p', t("helps.power.voltage_scaling"));
  }
})

// Technologies
export const technologies_set = defineComponent({
  setup() {
    return () => h('p', t("helps.technologies.set"));
  }
})

export const technologies_set_extensions = defineComponent({
  setup() {
    return () => h('p', t("helps.technologies.set_extensions"));
  }
})
</script>

<style>
  p {
    white-space: pre-line;
  }
</style>
