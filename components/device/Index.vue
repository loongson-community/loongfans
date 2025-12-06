<template>
  <div>
    <template v-for="family in devices" :key="family.family">
      <h2>{{ family.family }}</h2>
      <template v-for="category in family.categories" :key="category.title">
        <h3>{{ category.title }}</h3>
        <Card
          v-for="device in category.devices"
          :key="device.href"
          :name="device.name"
          :href="device.href"
          :image="device.image"
          :spec="device.spec"
          :tags="device.tags"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import { devices } from "./data";
</script>
