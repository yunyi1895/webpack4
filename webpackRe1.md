# 渐进式配置webpack4单页面和多页面

# 前言
使用包的版本
```
webpack ->4.3.0
babel-loader ->8.0.5
npm ->6.4.1
webpack-cli ->3.3.1
```
每个章节对应一个demo

# 一、初始化项目

进入项目目录，运行 npm init来创建项目
```
npm init
```
终端输入完成后会自动创建一个package.json的文件。
```
{
  "name": "demo1",
  "version": "1.0.0",
  "description": "webpack-demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack app.js"
  },
  "keywords": [
    "demo"
  ],
  "author": "cmf",
  "license": "ISC",
  "devDependencies": {}
}

```
运行命令，引入webpack和webpack-cli，安装webpack-cli是为了在项目里面运行webpack命令。
```
npm i webpack webpack-cli -D
```
手动创建webpack.config.js。
```
touch webpack.config.js
```
在终端里面通过[npx](https://github.com/zkat/npx#readme)运行webpack命令无法进行复杂配置。所以创建webpack.config.js是为了后面的复杂配置。
新建app.js、index.html、view文件夹、view文件夹里面创建dom.js。
```
 mkdir view
 touch app.js
 cd view 
 touch app.js
```
代码内容详见[demo1](https://github.com/yunyi1895/webpack4/tree/master/demo1)
配置 webpack.config.js

![](https://user-gold-cdn.xitu.io/2019/5/8/16a964d6d1a03a8f?w=684&h=274&f=png&s=145148)
打包方式有两种
* 通过npx命令
```
npx webpack
```

* 通过配置package.json的script对象。
```
  "scripts": {
    "build": "webpack"
  },
```
这两种方式都会自动寻找项目里面的webpack包进行打包，并且webpack会根据webpack.config.js的配置规则进行打包。

---------------------
# 二、配置开发和生产环境
* 开发环境特点
1. 可视化
2. 本地服务
3. 可以快速找到代码错误
4. 热更新
* 生产环境特点
1. 代码压缩
2. 代码拆包
3. 快速响应

### 下载插件包
```
npm i cross-env html-webpack-plugin webpack-dev-server -D
```
[cross-env](https://github.com/kentcdodds/cross-env#readme) 跨平台的解决了环境变量和参数的命令配置。<br>
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 打包生成HTML的插件。<br>
[webpack-dev-server](https://github.com/webpack/webpack-dev-server#readme)创建开发服务器。功能强大，接口转发、热更新等。

### 文件更改
新建index.html、help.js
```
touch index.html
touch help.js
```
index.html 模板文件
```
<head>
  <title>demo2</title>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
</head>
<body>
  <div id="app"></div>
</body>
```
help.js 封装的一些方法。
```
module.exports.getMode = function() {
  return process.env.NODE_ENV === 'development'?'development':'production'
};
```
### 配置更改

![](https://user-gold-cdn.xitu.io/2019/5/8/16a96b96dc2c1d3c?w=584&h=735&f=png&s=373449)

[webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver)其他配置请参考官方文档。<br>
[mode](https://webpack.js.org/configuration/mode)模式。默认值是production。
告知 webpack 使用相应模式的内置优化。是 webpack4新增的属性。比如mode是production，webpack会默认添加一些打包插件比如：NoEmitOnErrorsPlugin。可以节省很多配置。

### 命令配置
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack",
    "dev": "cross-env NODE_ENV=development webpack-dev-server"
  },
```
**cross-env NODE_ENV=production** 设置环境变量信息
```
npm run dev
```
自动打开浏览器，会把app.js里面的内容自动注入到index.html里面。

![](https://user-gold-cdn.xitu.io/2019/5/8/16a96becf75d3570?w=696&h=478&f=png&s=60991)

# 三、模板解析与外部扩展
代码内容详见[demo3](https://github.com/yunyi1895/webpack4/tree/master/demo3)<br>
### 外部扩展(externals)
[externals](https://www.webpackjs.com/configuration/externals/)防止将某些 import 的包是从外部获取依赖不是从node_modules里面获取的。<br>
例如我们在app.js里面
```
// app.js
import Vue from 'Vue';
```
index.html
```
<head>
  <title>demo4</title>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
</head>
```
webpack.config.js
```
externals:{ //外部扩展
    'Vue':'window.Vue'
},
```
现在app.js 里面引入的**Vue**是从cdn里面引入的，而不是从**node_modules**包里面引入的。
这样做的好处：
* 提高打包效率。
* 类似于使用Vue这样的框架，使用的版本是一般是固定不变的。所以cdn引入的时候相当于模块化拆包。用户刷新浏览器和代码重新打包发版都不会再次请求Vue的代码，提高用户体验。

### 模板解析(resolve)
[resolve](https://www.webpackjs.com/configuration/resolve/)开发者可以自定义解析规则。

* [resolve.modules](https://www.webpackjs.com/configuration/resolve/#resolve-modules) 自定义依赖包的路径。参数是array，可以是相对目录也可以是绝对目录。默认是 **[path.resolve(process.cwd(),'node_modules')]**。当前命令的目录下面的node_modules文件夹。<br>如果一个大的项目里面有很多子项目，每个子项目没必要都安装依赖包，所以可以在各个子项目里面通过配置resolve.modules指向母项目的node_modules包。

* [resolve.modules](https://www.webpackjs.com/configuration/resolve/#resolve-extensions) 自定义引入模块时可以不带扩展名。参数是array。默认['.js','.json']
    ```
    extensions:['.js','.vue','.json','.css','.less'],
    ```
    代码里面
    ```
    import 'view/dom'
    ```
    会自动找到dom.js

* [resolve.alias](https://www.webpackjs.com/configuration/resolve/#resolve-alias) 自定义路径别名。参数是object。
    ```
    alias:{
        '@': path.resolve(__dirname, './src')
    },
    // __dirname 当前文件的目录地址。
    ```
    在代码里可以使用@符号指向src目录。
    ```
    import '@/view/dom.js';
    ```
    好处：在很深的代码层里面如果想引入顶层的某个js文件。不需要写很多'../../../'去找文件，提高开发效率。

**resolve**里面有很多的自定义解析规则。有时间都可以尝试一下。

# 四、生产与开发环境分开打包
代码内容详见[demo4](https://github.com/yunyi1895/webpack4/tree/master/demo4)<br>
虽然在webpack4里面提供了mode属性来分别打包开发和生产环境，各自提供不同的插件。但是如果**clean-webpack-plugin**插件想在生产环境使用在开发环境不使用，就需要每次手动更改配置，这样做很不合理，容易出错。<br>
可以使用
* 指定配置文件。
    ```
    webpack --config 配置文件
    ```
* 合并公共的配置[webpack-merge](https://github.com/survivejs/webpack-merge)

## 具体操作
### 新增依赖包
```
npm i webpack-merge -D
```
### 新增文件
新建build文件夹
```
 mkdir build
 cd build
 touch weboack.build.conf.js、webpack.base.conf.js、webpack.dev.conf.js config.js help.js
```
**help.js** 储层公共方法
```
var path = require('path');
module.exports.getMode = function() {
  return process.env.NODE_ENV === 'development'?'development':'production'
};
module.exports.resolve = function(p){
  return path.resolve(process.cwd(),p);
}
```
**config.js** 开发与生产的配置信息
```
module.exports = {
  dev: {
    mode: 'development',
    publicPath: '/',
    devServer: {
      port: '8899',
      proxy: {
        '/test/shortRent': {
          target: 'http:"//www.baidu.com',
          changeOrigin: true,
          pathRewrite: {
            '^/test/shortRent': '/evcard-evrental'
          }
        },
      },
    },
  },
  build: {
    mode: 'production',
    publicPath: './',
    assetsRoot: 'you-app'
  }
}
```

**webpack.base.conf.js** 开发与生产相同的webpack配置
```
var path = require('path');
var help = require('./help.js');
var config = require('./config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var mode = help.getMode();

module.exports={
  entry:{
    app:help.resolve('./app.js')
  },
  output:{
  },
  resolve:{ // 解析
    alias:{
      '@': help.resolve('./src')
    },
    extensions:['.js','.vue','.json','.css','.less'],
    modules: ["./node_modules"]
  },
  externals:{ //外部扩展
    'Vue':'window.Vue'
  },
  plugins:[
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'./index.html',
      inject:true,
    })
  ],
}
```
**webpack.dev.conf.js** 开发环境的webpack配置
```
var merge = require("webpack-merge");
var webpackConfigBase = require('./webpack.base.conf');
var help = require('./help.js');
var config = require('./config.js');

module.exports=merge(webpackConfigBase,{
  mode: config.dev.mode,
  output:{
    filename:help.assetsPath('js/[name].js'),
    publicPath:config.dev.publicPath
  },
  devServer:config.dev.devServer
})
```
**webpack.build.conf.js** 生产环境的webpack配置
```
var cleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require("webpack-merge");
var help = require('./help.js');
var webpackConfigBase = require('./webpack.base.conf.js');
var config = require('./config.js');

module.exports=merge(webpackConfigBase,{
  mode: config.build.mode,
  output:{
    filename:'assets/js/[name].[hash].js',
    publicPath:config.build.publicPath,
    path:help.resolve(config.build.assetsRoot),
  },
  plugins:[
    new cleanWebpackPlugin()
  ]
})
```
### 命令修改
```
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/weboack.build.conf.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.conf.js"
  },
```

# 五、解析转译JS
代码内容详见[demo5](https://github.com/yunyi1895/webpack4/tree/master/demo5)<br>
## loaders
[loader](https://www.webpackjs.com/loaders/) 用来解析文件转译成浏览器可以识别的文件。如.less、.vue、.jsx等这些文件浏览器是不能正常转译的，loaders的作用就是充当着'翻译'的作用。

## babel-loader
我们在开发的时候都使用es6的语法去编写代码，但是有些浏览器不支持es6的代码就需要将es6转译成浏览器可以读懂的es5的代码。[babel-loader](https://www.babeljs.cn/)的作用就是'翻译'es6代码。<br>
### step1
安装babel-loader。参照官方的安装方式，打开[官网](https://www.babeljs.cn/setup)选择webpack的安装方式。<br>
安装依赖
```
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev
```
babel-loader @babel/core 是核心插件<br>
[preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html) 编译方式

配置规则
```
module: {
  rules: [
        {
            test: /\.js$/,  // 正则匹配，所有的.js文件都使用这个规则进行编译
            exclude: /node_modules/, // 排除的文件夹。这个文件夹里面的的文件不进行转译
            loader: "babel-loader", // 转译的插件
            options: {  // 转译的规则
                presets: [ //转译器配置
                    [
                        "@babel/preset-env"
                    ]
                ],
                plugins: [] // 转译插件配置
            }
        },
  ]
}
```

> **plugins（转译插件）**。转译插件是用来转译单一功能的插件，比如transform-es2015-arrow-functions，这个插件只负责转译es2015新增的箭头函数。

> **presets（转译器）**。转译器是一系列转译插件的集合。比如babel-preset-es2015就包含了es2015新增语法的所有转译插件，比如包含transform-es2015-arrow-functions（es2015箭头函数转译插件）、transform-es2015-classes(es2015 class类转译插件)等。转译器分为语法转译器和补丁转译器。
[详解](https://www.cnblogs.com/lsgxeva/p/7758184.html)


在app.js里面写es6的代码
```
const s = new Set([1, 2, 3, 4, 5, 3, 2, 16, 7, 83, 21, 2, 1]);
var w = Object.assign({}, { w: 1, e: 4 })
console.log(w);
console.log([...s]);
function pro(v) {
  return new Promise((resolve) => {
    if (v) {
      resolve('真11')
    } else {
      resolve('假22')
    }
  })
}
pro(true).then(res=>{
  console.log(res)
})
```
运行命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa1521181d5cf2?w=1450&h=214&f=png&s=250115)
打开打包后的app.js只有1.7kb。

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa135fbfc5ded1?w=1788&h=876&f=png&s=627953)
promise里面的箭头函数已经被转译成了普通函数。<br>
似乎看起来已经已经成功了。
```
npm run dev
```
![](https://user-gold-cdn.xitu.io/2019/5/10/16aa14d7b57d872d?w=1218&h=138&f=png&s=48113)
在打包后的js全局搜索**promose**，代码里面只有一处。没有其他的代码来'翻译'**promise**，这在低版本的浏览器里面是不行的,所以需要继续'翻译'。

### step2
> Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。

所以还需要配置。
在babel@7.4以前使用[@babel/polyfill](https://babeljs.io/docs/en/next/babel-polyfill.html)为当前环境提供一个垫片。所谓垫片也就是垫平不同浏览器或者不同环境下的差异。<br>
但是babel@7.4及以后这个垫片被废弃了。

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa141f64701e87?w=1492&h=738&f=png&s=340102)
babel-polyfill 等同于 regenerator runtime + core-js<br>
官方建议使用
```
import "core-js/stable";
import "regenerator-runtime/runtime";
```
来代替@babel/polyfill。
* regenerator：提供对 generator 支持，如果应用代码中用到generator、async函数的话。
* core-js：提供 es(6-8) 新的特性。

core-js 在安装@babel/preset-env的时候已经安装好了。
```
npm i regenerator-runtime -D
```
在app.js里面引入
```
import "core-js/stable";
import "regenerator-runtime/runtime";
```
运行命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa153c4863c9b9?w=1394&h=324&f=png&s=327349)
打包后的app.js有113kb。多出来了100多kb的代码。<br>
打开打包后的js，搜索**promise**

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa1577374caaf5?w=1828&h=1268&f=png&s=824205)
一共有26处，这里面对promise的代码进行了'翻译'。<br>
但代码相比以前也太大了。把所有转译es的代码都打包了。
### setp3
[useBuiltIns](https://www.babeljs.cn/docs/babel-preset-env#usebuiltins)
这个配置属性可以解决这个问题。官方文档的配置其实是babel@7.4以前的写法，这也造成了我懵逼了两天。<br>
属性值 "usage" | "entry" | false， 默认是 false。<br>

> **useBuiltIns: 'entry'** 其实和import "core-js/stable";
import "regenerator-runtime/runtime";效果是一样的，表示把所有的转译代码都注入到打包的代码里面。但是还是需要在代码里面引入这两个插件。

> **useBuiltIns: 'usage'**
表示把代码里面需要用到的转译代码注入到打包的代码里面。就不需要引入core-js/stable了。但是regenerator-runtime/runtime还是需要继续引入。


```
{
    test: /\.js$/,  // 正则匹配，所有的.js文件都使用这个规则进行编译
    exclude: /node_modules/, // 排除的文件夹。这个文件夹里面的的文件不进行转译
    loader: "babel-loader", // 转译的插件
    options: {  // 转译的规则
        presets: [ //转译器配置
            [
                "@babel/preset-env", {
                    useBuiltIns: "usage"
                  }
            ]
        ],
        plugins: [] // 转译插件配置
    }
},
```
运行打包命令
```
npm run build
```
打包报错了

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa16fa92cc4b19?w=1930&h=834&f=png&s=638565)
根据[preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html) 的文档说明还需要配置**corejs**。作用是代替引入**core-js/stable**。
```
{
    test: /\.js$/,  // 正则匹配，所有的.js文件都使用这个规则进行编译
    exclude: /node_modules/, // 排除的文件夹。这个文件夹里面的的文件不进行转译
    loader: "babel-loader", // 转译的插件
    options: {  // 转译的规则
        presets: [ //转译器配置
            [
                "@babel/preset-env", {
                    useBuiltIns: "usage",
                    corejs: 3
                  }
            ]
        ],
        plugins: [] // 转译插件配置
    }
},
```
运行打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa17dc27292858?w=1362&h=198&f=png&s=217313)
只有33kb。

![](https://user-gold-cdn.xitu.io/2019/5/10/16aa17eb51879c7c?w=2042&h=1344&f=png&s=1022455)
> 打包的文件中有21个promise。<br>
这样做的好处就是使用哪种es语法就引入哪种转译器，避免代码过大。为什么还需要继续引入regenerator-runtime/runtime呢？因为它的代码太少了，@babel/preset-env没有像corejs一样进行配置。如果不引入async、await就不能使用了。

**babel-loader**还有很多配置很多坑，遇到就查文档或者google吧。

# 六、样式loader与样式HMR
## 样式loader

[样式loader](https://www.webpackjs.com/loaders/#%E6%A0%B7%E5%BC%8F),这些都是官方提供的样式loader。

![](https://user-gold-cdn.xitu.io/2019/5/12/16aaa69f1eafd81e?w=1090&h=524&f=png&s=279622)
* **style-loader** 将js里面引入的css文件，解析成css样式并且添加到style标签里面。
* **css-loader** 解析css里面的@import引入的样式。
* **less-loader sass-loader stylus-loader** 都是解析css扩展语言。
* **postcss-loader** 为css3的代码自动添加前缀。
### step1
比如 使用less作为样式语法。
首先安装style-loader css-loader。
```
npm i style-loader css-loader -D
```
[less-loader](https://www.webpackjs.com/loaders/less-loader/)文档里面显示需要安装
```
npm install --save-dev less-loader less
```


![](https://user-gold-cdn.xitu.io/2019/5/12/16aac2e025b2dd1c?w=1458&h=842&f=png&s=475599)
按照官方的配置进行rules配置。<br>
编写base.less文件
```
body{
  color: lawngreen;
}
.logo{
  background: #f60;
  height: 400px;
  width: 400px;
  background-repeat: no-repeat;
  transition: all 1s;
  display: flex;
}
.logo:hover{
  height: 600px;
  width: 600px;
  transform: translateY(60px);
}
```
在app.js 里面引入
```
import './src/assets/css/base.less';
```
运行命令
```
npm run dev
```

![](https://user-gold-cdn.xitu.io/2019/5/12/16aac29db0c859b3)
### step2
less文件里面的transition和transform都是css3的样式，如果想自动的生成带前缀的代码则需要[postcss-loader](https://www.webpackjs.com/loaders/postcss-loader/)，也需要postcss-loader的一个插件[autoprefixer](https://github.com/postcss/autoprefixer)<br>
安装依赖
```
npm i autoprefixer postcss-loader -D
```
更改配置
```
       {
            loader: "postcss-loader",
            options: {
                plugins: [
                    require("autoprefixer")({
                        browsers: [
                            'last 10 Chrome versions',
                            'last 5 Firefox versions',
                            'Safari >= 6',
                            'ie> 8'
                        ]
                    })
                ]
            }
        },
```

![](https://user-gold-cdn.xitu.io/2019/5/12/16aac5a2a6e9e692?w=850&h=658&f=png&s=206127)
browsers配置表示按照 大于ie8，Safari6，最后10个Chrome版本的规则进行编译。
```
npm run dev
```

![](https://user-gold-cdn.xitu.io/2019/5/12/16aac3ee22eba5db?w=796&h=742&f=png&s=419176)
css3的代码都进行了前缀编码。
### step3

home.less里面的代码并没有进行css3的转化。这时我们需要配置在 css-loader 中使用 [importLoaders](https://www.webpackjs.com/loaders/css-loader/#importloaders) 属性。

![](https://user-gold-cdn.xitu.io/2019/5/12/16aac4ab2bfa3947?w=1440&h=934&f=png&s=352218)
将importLoaders设置为2因为，css-loader前面需要执行postcss-loader和less-loader。
### step4
之前一直运行的是开发环境，我们运行一下生产打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/12/16aac4e004e04279?w=706&h=212&f=png&s=29911)
> 打包后并没有css文件。
把代码放入服务器或者使用[http-server](https://github.com/indexzero/http-server#readme)起一个本地的服务器。<br>

这时我们需要引入[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)进行css代码的抽离，以及打包插件[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)在打包的时候进行压缩。
```
npm i mini-css-extract-plugin optimize-css-assets-webpack-plugin -D
```



