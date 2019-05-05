# 渐进式搭建webpack4配置

### demo4 新增包 
* **clean-webpack-plugin**
每次打包前清除上一次打包的内容
* **webpack-merge**
合并配置

### demo4 配置更改

* **文件更改**
新增了build文件夹
新增weboack.build.conf.js、webpack.base.conf.js、webpack.dev.conf.js。开发和发布分模式打包。

### demo4 命令更改
```
 "build": "cross-env NODE_ENV=production webpack --config build/weboack.build.conf.js",
  "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.conf.js --open"
```


```
npm run dev //开发
npm run build //打包
```