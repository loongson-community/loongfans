<template>
  <a :href="href" class="card">
    <div class="image-container">
      <img :src="image" />
    </div>
    <div class="main">
      <div>
        <div class="name">{{ name }}</div>
        <div class="description">{{ spec }}</div>
      </div>
      <div v-if="tags" class="tags-container">
        <div v-for="tag in tags" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  spec: String,
  href: String,
  image: String,
  tags: Array,
});

const tags = computed(() => props.tags.split(",").map((i) => i.trim()));
</script>

<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  color: unset;
  background-color: white;
  text-decoration: unset;
  border: 1px solid;
  border-radius: 12px;
  max-width: 520px;
  overflow: hidden;
  transition: color 0.3s ease, margin-top 0.3s ease, height 0.3s ease;
}

.card:hover {
  color: unset;
  border-color: #e60013;
}

.image-container {
  height: 150px;
  width: 150px;
  flex-shrink: 0;
}

.image-container img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 8px;
  min-width: 200px;
}

.name {
  font-size: 1.6em;
}

.description {
  margin-top: 4px;
  font-size: 1.1em;
  color: #8d8d8d;
}

.tags-container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tag {
  padding: 4px 8px;
  border: 1px solid;
  border-color: #8d8d8d;
  border-radius: 8px;
  font-size: 0.9em;
}
</style>
