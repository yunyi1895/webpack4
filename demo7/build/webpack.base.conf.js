var path = require('path');
var help = require('./help.js');
var config = require('./config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var copyWebpackPlugin = require("copy-webpack-plugin");
var mode = help.getMode();
var rules = require('./webpack.rules.conf.js');
var entries = help.getEntry(['./src/module/**/*.js']); // 获得入口js文件
console.log(entries)
module.exports = {
  entry:Object.assign({},{app:help.resolve('./app.js')},entries),
  output: {
  },
  resolve: { // 解析
    alias: {
      '@': help.resolve('./src')
    },
    extensions: ['.js', '.vue', '.json', '.css', '.less']
  },
  module: {
    rules: rules
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
      minSize: 30000, // 最小尺寸，30000
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 5, // 最大异步请求数， 默认5
      maxInitialRequests: 3, // 最大初始化请求书，默认3
      automaticNameDelimiter: '~',// 打包分隔符
      cacheGroups: {
        vendors: { // 打包两个页面的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'vendors', // 分离包的名字
          chunks: 'all'
        },
      }
    }
  },
  externals: { //外部扩展
    'Vue': 'window.Vue'
  },
  plugins: [
    new copyWebpackPlugin([{
      from: help.resolve('static'),
      to: './static' // 相对outout.path的位置
    }]),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'app']
    }),
    new MiniCssExtractPlugin({
      filename: help.assetsPath('css/[name].css')
    })
  ].concat(concatHtmlWebpackPlugin())
}
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
      chunks: ['vendors',i]//i代表入口文件的key
    })
    res.push(obj)
  }
  return res
} 