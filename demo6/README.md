# 渐进式搭建webpack4配置

### demo6 新增包 
* **autoprefixer postcss-loader**
为css3添加自动补全
* **copy-webpack-plugin**
拷贝静态文件

### demo6 配置更改

* **文件更改**
src 里面新增多页面文件夹module。文件夹里面新增test和demo文件夹。用来作为多页面的入口和模板文件。

* **新增getEntry方法**
在help.js 里面新增 getEntry 方法用来构建多页面入口文件和模板文件。

* **webpack.base.conf.js 修改**
新增多页面入口
```
entry:Object.assign({},{app:help.resolve('./app.js')},entries),
```
新增解析多页面模板文件方法
```
function concatHtmlWebpackPlugin() {
  var entriesHtml = help.getEntry(['./src/module/**/*.html']);
  var res = [];
  for (var i in entriesHtml) {
      var html = entriesHtml[i];
      var obj = new htmlWebpackPlugin({
          filename: '.' + html.substring(html.lastIndexOf('/')),
          template: html, //html模板路径
          inject: true, //允许插件修改哪些内容，包括head与body
          hash: true,
          chunks: [i]//i代表入口文件的key
      })
      res.push(obj)
  }
  return res
} 
```


```
npm run dev //开发
npm run build //打包
```