<template>
  <div class="link_group">
    <div class="link_type_title">
      <div class="title">{{ title }}</div>
      <div class="red_line"></div>
    </div>
    <div class="link_type_box">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped>
.link_type_title {
  display: block;
  clear: both;
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
  cursor: default;
}

.link_type_title .title {
  display: block;
  clear: both;
  width: 100%;
  overflow: hidden;
  font-size: 24px;
  font-weight: bold;
  color: #e60013;
  margin-bottom: 4px;
  line-height: normal;
}

.link_type_title .red_line {
  display: block;
  clear: both;
  width: 100%;
  height: 5px;
  overflow: hidden;
  background-color: #e60013;
}

.link_group {
  padding: 0;
}

/* .link_group:hover .title {
  font-size: 26px;
  transition: font-size 0.5s ease 0s;
}

.link_group:hover .red_line {
  height: 0;
  transition: height 0.5s ease 0s;
} */

.link_type_box {
  display: block;
  clear: both;
  width: 100%;
  height: auto;
  overflow: visible;
  padding: 20px 0px;
}

.link_type_box > * {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  clear: both;
  width: 100%;
  min-height: 40px;
  height: auto;
  line-height: normal;
  overflow: visible;
  font-size: 22px;
  color: #000000;
  text-decoration: none;
  padding: 5px 0;
  word-wrap: break-word;
}

.link_type_box > * .name {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.link_type_box > *:hover {
  font-weight: bold;
  color: #e60013;
}
</style>
