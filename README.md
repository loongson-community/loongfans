# 龙芯爱好者社区门户

本仓库托管为龙芯爱好者社区门户 ([loongfans.cn](https://loongfans.cn/)) 源代码。

## 开发与测试

在安装 Node.js 及 NPM 后，运行如下命令安装开发依赖：

```sh
pnpm i
```

而后使用如下命令即可实时预览页面：

```sh
pnpm run dev
```

## 构建与部署

在完成上述依赖部署后，运行如下命令即可构建页面：

```sh
pnpm run build
```

构建后的站点数据将被存放在 `./.vitepress/dist`。

每次向 `main` 分支或任一 PR 进行推送，都会触发本站的 CI 任务，所构建的静态数据会被自动部署到相应的环境。目前的部署环境情况如下：

* 生产环境 `production`：自建后端
* 预览环境 `preview`：Cloudflare Pages
