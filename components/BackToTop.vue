
<template>
    <div v-show="showButton"
    @click="scrollToTop" class="set_to_top"
    :style="{ opacity: showButton ? 1 : 0 }">
    <img src="/images/icon_top.webp" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
.set_to_top img {
  display: block;
  clear: both;
  width: 100%;
  height: auto;
}
.set_to_top:hover img {
  opacity: 0.8;
}
</style>
