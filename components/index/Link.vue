<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="target"
    class="link"
  >
    <div v-if="$slots.default" class="icon">
      <slot />
    </div>
    <span class="name">{{ name }}</span>
    <IconOpenInNew v-if="href && target" class="extra-icon" />
    <div class="extra-icon qr-wrapper">
      <IconQrCode2 v-if="qrLink" />
      <img v-if="qrLink" :src="qrLink" class="qrcode" alt="QR Code" />
    </div>
  </component>
</template>

<script setup>
import IconOpenInNew from "~icons/material-symbols/open-in-new";
import IconQrCode2 from "~icons/material-symbols/qr-code-2";

const props = defineProps({
  href: { type: String, required: true },
  name: { type: String, required: true },
  qrLink: String,
});

const target = props.href?.startsWith("http") ? "_blank" : undefined;
</script>

<style scoped>
.link {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  clear: both;
  width: 100%;
  min-height: 40px;
  height: auto;
  line-height: 1.2;
  overflow: visible;
  font-size: 22px;
  color: #000000;
  text-decoration: none;
  padding: 5px 0;
  word-wrap: break-word;
}

.link .name {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.link:hover {
  font-weight: bold;
  color: #e60013;
}

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

@media (max-width: 1000px) {
  .link {
    font-size: 18px;
  }
}

@media (max-width: 750px) {
  .link {
    height: auto;
    min-height: 30px;
    line-height: 20px;
    font-size: 14px;
    white-space: normal;
    word-wrap: break-word;
    padding: 5px 0;
  }

  .link .name {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>
