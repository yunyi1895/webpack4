
# 构建多页面配置
具体代码参考[demo12]()

## 新建多页面目录
 新建module文件，约定module目录里面每个文件目录必须有个html文件，还有一个与其名字相同的js文件作为入口文件。
![](https://user-gold-cdn.xitu.io/2019/6/7/16b2fe754decda76?w=646&h=566&f=png&s=130527)
## 创建变量函数
在**build**文件夹里面的**help.js**里面新建方法
```
/**
 * @description: 遍历文件夹里面的所有文件
 * @param {array} [路径地址]
 * @return: {文件名：文件地址}
 */
exports.getEntry = function getEntry(globPath) {
	var entries = {};
	if (typeof(globPath) != "object") {
			globPath = [globPath]
  }
	globPath.forEach((itemPath) => {
        // glob.sync 同步读取
		glob.sync(itemPath).forEach(function(entry) {
				entries[entry.substring(13, entry.lastIndexOf('.'))] = entry; // 13代表'./src/module/'
		});
	});
	return entries;
};
```
## 引入多页面文件
### 在 **webpack.base.js**里面引入多页面入口文件
```
var entries = help.getEntry(['./src/module/**/*.js']); // 获得入口js文件
console.log(entries);
/**
打印结果
{ 'demo/demo': './src/module/demo/demo.js',
  'test/test': './src/module/test/test.js' }
**/
```
添加到入口文件
```
entry:Object.assign({},{app:help.resolve('./app.js')},entries),
```
### 在 **webpack.base.js**里面引入多页面的html文件
```
function concatHtmlWebpackPlugin() {
  var entriesHtml = help.getEntry(['./src/module/**/*.html']);
  console.log(entriesHtml)
  /**
  打印结果
  { 'demo/demo': './src/module/demo/demo.html',
  'test/test': './src/module/test/test.html' }
  **/
  var res = [];
  for (var i in entriesHtml) {
    var html = entriesHtml[i];
    var obj = new htmlWebpackPlugin({
      filename: '.' + html.substring(html.lastIndexOf('/')),
      template: html, //html模板路径
      inject: true, //允许插件修改哪些内容，包括head与body
      chunks: ['vendors',i],//i代表入口文件的key 指定注入某些入口文件
      minify: {
        // 压缩 HTML 文件
        removeComments: isPord, // 移除 HTML 中的注释
        collapseWhitespace: isPord, // 删除空白符与换行符
        minifyCSS: isPord // 压缩内联 css
      },
    })
    res.push(obj)
  }
  return res
}
```
注入多页面
```
  plugins:[
    
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'./index.html',
      inject:true,
      chunks: ['vendors','app'], // 指定注入某些入口文件
      minify: {
        // 压缩 HTML 文件
        removeComments: isPord, // 移除 HTML 中的注释
        collapseWhitespace: isPord, // 删除空白符与换行符
        minifyCSS: isPord // 压缩内联 css
      },
    })
  ].concat(concatHtmlWebpackPlugin())
```
## splitChunks 进行默认配置
```
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
```
运行命令
```
npm run dev
```

![](https://user-gold-cdn.xitu.io/2019/6/7/16b2ff729176b90e?w=718&h=530&f=png&s=78518)

![](https://user-gold-cdn.xitu.io/2019/6/7/16b2ff76700822d3?w=772&h=388&f=png&s=56855)

![](https://user-gold-cdn.xitu.io/2019/6/7/16b2ff7aed0f46f4?w=776&h=452&f=png&s=63816)
可以正常运行
