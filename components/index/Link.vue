<template>
  <a :href="href" :target="isOutLink ? _blank : undefined">
    <span class="name">{{ name }}</span>
    <Icon v-if="isOutLink" icon="material-symbols:open-in-new" class="out-link-icon"/>
  </a>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  href: { type: String, required: true },
  name: { type: String, required: true },
});

const isOutLink = props.href?.startsWith("http");
</script>

<style scoped>
.out-link-icon {
  margin-left: 2px;
}
</style>
