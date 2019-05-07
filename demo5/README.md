# 渐进式搭建webpack4配置

### demo5 新增包 
* **babel-loader 等** 
babel-loader@8.0.5解析JS 负责es6转es5
> 如果是用 babel7及以上 来转译，需要安装 **@babel/core**、**@babel/preset-env** 和 **@babel/plugin-transform-runtime**，而不是 babel-core、babel-preset-env 和 babel-plugin-transform-runtime，它们是用于 babel6 的

> 使用 @babel/plugin-transform-runtime 的原因：Babel 使用非常小的助手来完成常见功能。默认情况下，这将添加到需要它的每个文件中。**这种重复有时是不必要的**，尤其是当你的应用程序分布在多个文件上的时候。
**transform-runtime** 可以重复使用 Babel 注入的程序代码来**节省代码，减小体积**。

> 使用 @babel/polyfill 的原因：Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 **API**，比如 **Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象**，以及一些定义在全局对象上的方法（比如 **Object.assign**）都不会转码。必须使用 **@babel/polyfill**，为当前环境提供一个垫片。
> 所谓垫片也就是垫平不同浏览器或者不同环境下的差异
```
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime @babel/polyfill @babel/runtime --save-dev
```
.babelrc 文件
[配置详解](https://www.cnblogs.com/tugenhua0707/p/9452471.html)
```
{
  "presets": [],
  "plugins": []
 }
```
> **plugins（转译插件）**。转译插件是用来转译单一功能的插件，比如transform-es2015-arrow-functions，这个插件只负责转译es2015新增的箭头函数。
> **presets（转译器）**。转译器是一系列转译插件的集合。比如babel-preset-es2015就包含了es2015新增语法的所有转译插件，比如包含transform-es2015-arrow-functions（es2015箭头函数转译插件）、transform-es2015-classes(es2015 class类转译插件)等。转译器分为语法转译器和补丁转译器。
[详解](https://www.cnblogs.com/lsgxeva/p/7758184.html)

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs":3
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```
[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)的配置选项中**useBuiltIns: usage**表示自动为使用的es6和es7的代码添加转换工具。**corejs:3**是因为新版本已经废弃了polyfill,[具体详解](https://babeljs.io/blog/2019/03/19/7.4.0#core-js-3-7646-https-githubcom-babel-babel-pull-7646)。


* **css-loader style-loader less-loader less style-loader**
解析css less
* **autoprefixer postcss-loader**
为css3添加自动补全
* **mini-css-extract-plugin**
抽离css。extract-text-webpack-plugin 在webpack4里面不能使用了。
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