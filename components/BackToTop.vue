<template>
  <div
    v-show="showButton"
    class="set_to_top"
    :style="{ opacity: showButton ? 1 : 0 }"
    @click="scrollToTop"
  >
    <IconVerticalAlignTop class="icon" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import IconVerticalAlignTop from "~icons/material-symbols/vertical-align-top"

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
.set_to_top {
  display: block;
  clear: both;
  width: 50px;
  height: 50px;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 95px;
  cursor: pointer;
  transition: opacity 1s ease;
}

.icon {
  color: white;
  background-color: #e60013;
  font-size: 50px;
}

.icon:hover {
  opacity: 0.8;
}
</style>
