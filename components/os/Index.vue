<template>
  <div class="distro-list">
    <OsCard
      v-for="card in $tm('osDataList')"
      :key="card.name"
      :data="card"
    />
  </div>
</template>

<script setup lang="ts">
import OsCard from './OsCard.vue'
</script>

<style scoped>
.distro-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-block: 16px;
}

@media (width >= 48rem) {
  .distro-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
