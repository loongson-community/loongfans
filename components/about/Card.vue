<template>
  <a :href="href">
    <div>
      <div class="name">{{ name }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <Icon :icon="icon" class="icon" height="24px" />
  </a>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  name: String,
  description: String,
  href: String,
  icon: String,
  color: String,
});
</script>

<style scoped>
a {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  color: unset;
  text-decoration: unset;
  border: 1px solid;
  border-radius: 12px;
  min-width: 260px;
  max-width: 400px;
}

.icon {
  color: v-bind(color);
}

.name {
  font-size: large;
}

.description {
  font-size: small;
  color: #8d8d8d;
}
</style>
