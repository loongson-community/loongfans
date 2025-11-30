<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="href ? '_blank' : undefined"
    class="card"
    :class="qrLink ? 'expand' : undefined"
  >
    <div>
      <div class="name">
        <span>{{ name }}</span>
        <IconOpenInNew v-if="href" />
        <IconQrCode2 v-if="qrLink" />
      </div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="icon">
      <slot />
    </div>
    <div v-if="qrLink" class="qr-container">
      <img :src="qrLink" :alt="`${name}`" class="qr" />
    </div>
  </component>
</template>

<script setup>
import IconOpenInNew from "~icons/material-symbols/open-in-new";
import IconQrCode2 from "~icons/material-symbols/qr-code-2";

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
  --height: 82px;
  --expand-height: 132px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  color: unset;
  background-color: white;
  text-decoration: unset;
  border: 1px solid;
  border-radius: 12px;
  min-width: 260px;
  max-width: 400px;
  overflow: hidden;
  min-height: var(--height);
  margin-top: 0;
  transition: color 0.3s ease, margin-top 0.3s ease, height 0.3s ease;
}

.icon {
  color: v-bind(color);
  font-size: 24px;
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

@media (min-width: 40rem) {
  .card {
    height: var(--height);
  }

  .card.expand:hover {
    margin-top: calc(-1 * var(--expand-height));
    height: calc(var(--height) + var(--expand-height));
  }
}
</style>
