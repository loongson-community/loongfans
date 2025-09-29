---
layout: page
---

<script setup>
import ChildHeader from '/components/ChildHeader.vue'
</script>

<ChildHeader />

<div class="body_content">

# 这里是标题

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

# Markdown Content

## Markdown Content

```sh
npm init
npx vitepress init
```

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

</div>