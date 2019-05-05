# 渐进式搭建webpack4配置

### demo3添加的配置有

* **resolve** 
项能设置模块如何被解析
resolve.alias  [_object_] 模块引入变得更简单
resolve.extensions  [_array_] 自动扩展名
resolve.modules [_array_] 告诉 webpack 解析模块时应该搜索的目录。多个项目可以使用一个 node_modules。

* **externals**
可以使用CDN引入的方式使用插件。提交打包效率还可以提高用户二次访问的体验。
比如 lodash vue jquery react都可以使用外部引入

```
npm run dev
```