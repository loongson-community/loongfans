<template>
  <a :href="href" class="button">
    <div v-if="$slots.default">
      <slot />
    </div>
    <span>{{ text }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  href: string
}>()
</script>

<style scoped>
.button {
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: fit-content;
  color: #e60013;
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}

.button:hover {
  background-color: #e60013;
  color: #ffffff;
}
</style>
