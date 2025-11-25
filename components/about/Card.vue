<template>
  <component :is="href ? 'a' : 'div'" :href="href" :target="href ? '_blank' : undefined" class="card">
    <div>
      <div class="name">
        <span>{{ name }}</span>
        <Icon v-if="href" icon="material-symbols:open-in-new" />
        <Icon v-if="qrLink" icon="material-symbols:qr-code-2" />
      </div>
      <div class="description">{{ description }}</div>
    </div>
    <Icon :icon="icon" class="icon" height="24px" />
    <div v-if="qrLink" class="qr-container">
      <img :src="qrLink" :alt="`${name}`" class="qr" />
    </div>
  </component>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  name: String,
  description: String,
  href: String,
  qrLink: String,
  icon: String,
  color: String,
});
</script>

<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  color: unset;
  text-decoration: unset;
  border: 1px solid;
  border-radius: 12px;
  min-width: 260px;
  max-width: 400px;
  transition: all 0.3s ease;
}

.icon {
  color: v-bind(color);
}

.name {
  font-size: large;
  display: flex;
  align-items: center;
  gap: 4px;
}

.description {
  font-size: small;
  color: #8d8d8d;
}

.qr-container {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
}

.qr {
  width: 120px;
  height: 120px;
  display: block;
  margin-inline: auto;
}

.card:hover {
  color: #e60013;
}

.card:hover .qr-container {
  max-height: 140px;
  opacity: 1;
  margin-top: 12px;
}
</style>
