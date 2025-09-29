## 项目名称
龙芯爱好者社区

### 项目描述
- 基于VitePress的纯静态站点，发布前先build打包
- 说明：本项目没有使用官方举例的docs文件夹，因此，相关命令不用加docs

### 本地化部署
````
先初始化本地环境
npm install node
安装vitepress
npm install vitepress
本地运行:
vitepress dev
````

### 模板套用页
```
/pages/tpl.md
# 上面的此页面为模板参考页，平时在使用的时候，复制一份，然后直接将复制后的页面内容修改成自己想要的页面即可。
```

### 页面上的返回按钮设置
```

```

### 构建代码（官方参考文档）
https://vitepress.dev/zh/guide/deploy
- 本地构建：  
vitepress build

- 构建后的文件在：
````
/.vitepress/dist
````
站点域名直接指向该目录即可。