<template>
  <div class="sdk-grid">
    <a
      v-for="sdk in sdkList"
      :key="sdk.name"
      :href="`#${sdk.name}`"
      class="sdk-item"
    >
      <component :is="sdk.icon" class="sdk-icon" />
      <div>{{ sdk.title }}</div>
    </a>
  </div>
  <div>
    <template v-for="sdk in sdkList" :key="sdk.name">
      <h2 :id="sdk.name">{{ sdk.title }}</h2>
      <slot :name="sdk.name" />
    </template>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"

import IconGnu from "~icons/simple-icons/gnu"
import IconLlvm from "~icons/simple-icons/llvm"
import IconRust from "~icons/simple-icons/rust"
import IconNodejs from "~icons/simple-icons/nodedotjs"
import IconGolang from "~icons/simple-icons/go"
import IconPython from "~icons/simple-icons/python"
import IconDotnet from "~icons/simple-icons/dotnet"
import IconJava from "~icons/simple-icons/openjdk"
import IconLinux from "~icons/simple-icons/linux"
import IconDocker from "~icons/simple-icons/docker"
import IconGithubActions from "~icons/simple-icons/githubactions"

const { t } = useI18n()

const sdkList = [
  {
    name: "gnu",
    title: t("gnuInstall"),
    icon: IconGnu,
  },
  {
    name: "llvm",
    title: t("llvmInstall"),
    icon: IconLlvm,
  },
  {
    name: "rust",
    title: t("rustInstall"),
    icon: IconRust,
  },
  {
    name: "nodejs",
    title: t("nodejsInstall"),
    icon: IconNodejs,
  },
  {
    name: "golang",
    title: t("golangInstall"),
    icon: IconGolang,
  },
  {
    name: "python",
    title: t("pythonInstall"),
    icon: IconPython,
  },
  {
    name: "dotnet",
    title: t("dotnetInstall"),
    icon: IconDotnet,
  },
  {
    name: "java",
    title: t("javaInstall"),
    icon: IconJava,
  },
  {
    name: "kernel",
    title: t("kernelInstall"),
    icon: IconLinux,
  },
  {
    name: "docker",
    title: t("dockerInstall"),
    icon: IconDocker,
  },
  {
    name: "cirunner",
    title: t("cirunnerInstall"),
    icon: IconGithubActions,
  },
]
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}

.sdk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  gap: 24px;
}

.sdk-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid;
  border-radius: 16px;
  color: unset;
  text-decoration: none;
  text-align: center;
}

.sdk-item:hover {
  color: #e60013;
  border-color: #e60013;
}

.sdk-icon {
  font-size: 48px;
}
</style>
