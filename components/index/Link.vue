<template>
  <a :href="href" :target="target" class="link">
    <Icon v-if="icon" :icon="icon" class="icon" />
    <span class="name">{{ name }}</span>
    <Icon
      v-if="href && target"
      icon="material-symbols:open-in-new"
      class="extra-icon"
    />
    <div class="extra-icon qr-wrapper">
      <Icon v-if="qrLink" icon="material-symbols:qr-code-2" />
      <img v-if="qrLink" :src="qrLink" class="qrcode" alt="QR Code" />
    </div>
  </a>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  href: { type: String, required: true },
  name: { type: String, required: true },
  icon: String,
  qrLink: String,
});

const target = props.href?.startsWith("http") ? "_blank" : undefined;
</script>

<style scoped>
.icon {
  margin-right: 4px;
}

.extra-icon {
  margin-left: 4px;
}

.qr-wrapper {
  position: relative;
  display: inline-block;
}

.qrcode {
  display: none;
  position: absolute;
  top: 100%;
  width: 128px;
  max-width: none; /* 干掉 vitepress 的 100%，不然 width 不会生效  */
  margin-top: 4px;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  border-color: #e60013;
  box-shadow: 0 4px 8px #8d8d8d;
  z-index: 100;
  background: white;
}

.link:hover .qrcode {
  display: block;
}
</style>
