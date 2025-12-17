<template>
  <div>
    <Accordion :value="sdkList[0].name">
      <AccordionPanel v-for="sdk in sdkList" :value="sdk.name">
        <AccordionHeader>
          <component :is="sdk.icon" class="icon"/>
          {{ sdk.title }}
        </AccordionHeader>
        <AccordionContent>
          <slot :name="sdk.name" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

import { useI18n } from "vue-i18n";

import IconGnu from '~icons/simple-icons/gnu';
import IconLlvm from '~icons/simple-icons/llvm';
import IconRust from '~icons/simple-icons/rust';
import IconNodejs from '~icons/simple-icons/nodedotjs';
import IconGolang from '~icons/simple-icons/go';
import IconPython from '~icons/simple-icons/python';
import IconDotnet from '~icons/simple-icons/dotnet';
import IconJava from '~icons/simple-icons/openjdk';
import IconLinux from '~icons/simple-icons/linux';
import IconDocker from '~icons/simple-icons/docker';
import IconGithubActions from '~icons/simple-icons/githubactions';

const { t } = useI18n();

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
  }
]
</script>

<style scoped>
.p-tablist-tab-list > button {
  font-size: 0.9em;
}

.icon {
  font-size: 1.2em;
}
</style>
