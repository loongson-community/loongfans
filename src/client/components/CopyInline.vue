<template>
  <button v-if="text" class="copy-inline" @click="copyToClipboard(text)">
    <IconContentCopy class="icon" />
    {{ type }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useToast } from "primevue/usetoast"
import IconContentCopy from "~icons/material-symbols/content-copy"

const props = defineProps<{ text: string; type: string }>()
const toast = useToast()

const textWithColon = computed(() => `": ${props.text}"`)

function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.add({ severity: "info", summary: "Copied", life: 3000 }))
    .catch((e) =>
      toast.add({
        severity: "error",
        summary: "Failed to copy",
        detail: e,
        life: 3000,
      }),
    )
}
</script>

<style scoped>
.copy-inline {
  display: inline-flex;
  align-items: center;
  border-radius: 0.4em;
}

.copy-inline:hover {
  background-color: #eee;
}

.icon {
  margin-right: 0.3em;
}

@media (width >= 64rem) {
  .copy-inline::after {
    content: v-bind("textWithColon");
  }
}
</style>
