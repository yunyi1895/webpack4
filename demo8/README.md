# 模块化拆包1
参考代码 [demo8](https://github.com/yunyi1895/webpack4/tree/master/demo8)<br>

> 什么是模块化拆包。比如我们在项目里面需要引入echarts、xlsx、lodash等比较大的包的时候。如果不做代码拆包，都会打包到一个js文件里面。如果每次打包发版都会生成一个新的js打包文件，用户重新请求页面的时候会再次请求echarts、xlsx、lodash这些不变的代码，就会降低用户体验。模块化拆包将这些不变的依赖包打包成一个新的js文件，每次打包发版的时候用户就不会再次请求echarts、xlsx、lodash这些不变的代码了。

## 代码更改
[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 可视化显示打包的JS引用的包
```
npm i webpack-bundle-analyzer -D
```

在项目里面引入echarts、xlsx、lodash
```
npm i echarts xlsx lodash -S
```
app.js
```
import "regenerator-runtime/runtime";
import _ from 'lodash';
import echarts from 'echarts';
import xlsx from 'xlsx';
console.log(echarts)
console.log(xlsx);
document.getElementById('app').innerHTML = _.ceil(2,3,4);

```
webpack.base.conf.js 配置可视化现在打包文件。
```
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  plugins:[
    new BundleAnalyzerPlugin(),
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'./index.html',
      inject:true,
      minify: {
        // 压缩 HTML 文件
        removeComments: isPord, // 移除 HTML 中的注释
        collapseWhitespace: isPord, // 删除空白符与换行符
        minifyCSS: isPord // 压缩内联 css
      },
    })
  ],
```
运行打包命令
```
npm run build

```

![](https://user-gold-cdn.xitu.io/2019/5/13/16aaffb4577a12fb?w=1556&h=576&f=png&s=588779)
![](https://user-gold-cdn.xitu.io/2019/5/13/16aaffab6ad9073a?w=2384&h=1328&f=png&s=1275970)
打包提示代码太大，需要进行拆包。<br>
## 默认配置
[optimization.splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/#root)是webpack4新的特性，默认进行代码拆包。


![](https://user-gold-cdn.xitu.io/2019/5/13/16aaffedde072bd9?w=1400&h=1128&f=png&s=341949)
上图是默认配置。
>  chunks:
- all: 不管文件是异步还是同步引入，都可以使用splitChunks进行代码拆包。
- async： 只将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
- initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包。
 
> minSize: 文件最小打包体积，单位byte，默认30000。

比如说某个项目下有三个入口文件，a.js和b.js和c.js都是100byte，当我们将minSize设置为301,那么webpack就会将他们打包成一个包，不会将他们拆分成为多个包。

> automaticNameDelimiter： 连接符。

假设我们生成了一个公用文件名字叫vendor，a.js,和b.js都依赖他，并且我们设置的连接符是"~"那么，最终生成的就是 vendor~a~b.js

> maxInitialRequests 入口点处的最大并行请求数，默认为3。

如果我们设置为1，那么每个入口文件就只会打包成为一个文件

> maxAsyncRequests 最大异步请求数量，默认5

如果我们设置为1，那么每个入口文件就只会打包成为一个文件

> 优先级关系。

maxInitialRequest / maxAsyncRequests <maxSize <minSize。

> cacheGroups 定制分割包的规则列表

test可以配置正则和写入function作为打包规则。其他属性均可继承splitChunks。

> minChunks

依赖最少引入多少次才能进行拆包。
## 简单修改配置
复制默认配置，将**chunks** 改为'all'。
```
    optimization: {
    splitChunks: {
      chunks: 'all',
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
运行打包命令
```
npm run build
```
![](https://user-gold-cdn.xitu.io/2019/5/13/16ab00bc559fe154?w=2780&h=1338&f=png&s=1343352)
多了一个vendors~app.js。这个js里面储层的就是需要拆分的代码。
## 再次拆包
vendors~app.js是一个1.71mb的文件，太大了，继续拆包。<br>
添加一个新的拆包规则

![](https://user-gold-cdn.xitu.io/2019/5/13/16ab01a5968fe0a3?w=866&h=780&f=png&s=488607)
```
      cacheGroups: {
        echarts:{ // 新增拆包规则
          name:'echarts', // 规则名字
          chunks:'all', // 同步引入和异步引入都可以使用该规则
          priority:10, 
          // 该规则的优先级，比如 webpack中进行拆包的时候，
          // echarts包会有先匹配priority高的规则，如果满足这个规则，
          // 则将代码导入到该规则里面，不会将代码导入到后面的规则里面了。
          test:/(echarts)/, // 正则匹配规则
          minChunks:1 // 代码里面最少被引入1次就可以使用该规则。
        },
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
```
运行打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/13/16ab01c801506574?w=2824&h=1360&f=png&s=2038378)
echarts包就被单独拆出来了储层在echarts.js。<br>
其实这个就是Code Splitting的概念之一[官方demo](https://webpack.js.org/guides/code-splitting/#prevent-duplication)