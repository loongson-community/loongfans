---
layout: page
# 返回首页，想返回哪张页面，就在下面填写相对链接
returnLink: /
pageTitle:  # 大标题
pageSubTitle: # 小标题
---

# 这里是标题

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD060 -->

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

<!-- markdownlint-restore -->

以上的写法仅供您源码阅读方便。当您撰写表格内容时，请遵循 markdownlint 的“compact”风格，如下所示：

| Tables | Are | Cool |
| --- | :-: | --: |
| col 3 is | right-aligned | $1600 |
| col 2 is | centered | $12 |
| zebra stripes | are neat | $1 |

两张表格的渲染效果应当完全相同。

## Markdown Content

### H3 heading

```sh
npm init
npx vitepress init
```

:::info
This is an info box.
:::

:::tip
This is a tip.
:::

:::warning
This is a warning.
:::

:::danger
This is a dangerous warning.
:::

:::details
This is a details block.
:::
