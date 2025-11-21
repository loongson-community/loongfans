<template>
  <a :href="href" :target="target">
    <Icon v-if="icon" :icon="icon" class="icon" />
    <span class="name">{{ name }}</span>
    <Icon
      v-if="target"
      icon="material-symbols:open-in-new"
      class="out-link-icon"
    />
  </a>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  href: { type: String, required: true },
  name: { type: String, required: true },
  icon: String,
});

const target = props.href?.startsWith("http") ? "_blank" : undefined;
</script>

<style scoped>
.icon {
  margin-right: 4px;
}

.out-link-icon {
  margin-left: 4px;
}
</style>
