# 渐进式搭建webpack4配置

### demo2添加的配置有

* **新增包**
cross-env：在命令里面添加环境变量
html-webpack-plugin：html模板插件 必备
webpack-dev-server：启动本地服务，进行本地开发调试

* **devServer** 
丰富 webpack-dev-server 命令的配置参数
resolve.port  [_string_] 服务端口号
resolve.proxy  [_object_] 接口请求转发 [ http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)


* **plugins**
添加打包的插件
html-webpack-plugin html模板插件

* **mode**
提供 mode 配置选项，告知 webpack 使用相应模式的内置优化 webpack4新增。比如mode是production，webpack会默认添加一些打包插件比如：NoEmitOnErrorsPlugin。

```
npm run dev
```