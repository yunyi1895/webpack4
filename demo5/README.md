# 渐进式搭建webpack4配置

### demo5 新增包 
* **babel-loader 等** 
解析JS es6 es7转 es5
* **css-loader style-loader less-loader less style-loader**
解析css less 
* **mini-css-extract-plugin**
抽离css。extract-text-webpack-plugin 在webpack4里面还不能使用
* **url-loader file-loader**
处理图片

### demo4 配置更改

* **文件更改**
新增webpack.rules.conf.js。用于定义解析规则

* **新增assetsPath方法**
设置开发和打包后的资源路径。



* **rules** 
资源解析规则


```
npm run dev //开发
npm run build //打包
```