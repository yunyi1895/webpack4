var path = require('path');
var webpack = require("webpack");
var help = require('./help.js');
var config = require('./config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var mode = help.getMode();
var rules = require('./webpack.rules.conf.js');
var isPord = mode==='development'?false:true;
var entries = help.getEntry(['./src/module/**/*.js']); // 获得入口js文件
console.log(entries);
module.exports={
  entry:Object.assign({},{app:help.resolve('./app.js')},entries),
  output:{
  },
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
          name:'vendors',
          chunks: 'all',
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
  resolve:{ // 解析
    alias:{
      '@': help.resolve('./src')
    },
    extensions:['.js','.vue','.json','.css','.less']
  },
  module:{
    rules:rules
  },
  externals:{ //外部扩展
    'Vue':'window.Vue'
  },
  plugins:[
    
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'./index.html',
      inject:true,
      chunks: ['vendors','app'],
      minify: {
        // 压缩 HTML 文件
        removeComments: isPord, // 移除 HTML 中的注释
        collapseWhitespace: isPord, // 删除空白符与换行符
        minifyCSS: isPord // 压缩内联 css
      },
    })
  ].concat(concatHtmlWebpackPlugin())
}
function concatHtmlWebpackPlugin() {
  var entriesHtml = help.getEntry(['./src/module/**/*.html']);
  console.log(entriesHtml)
  var res = [];
  for (var i in entriesHtml) {
    var html = entriesHtml[i];
    var obj = new htmlWebpackPlugin({
      filename: '.' + html.substring(html.lastIndexOf('/')),
      template: html, //html模板路径
      inject: true, //允许插件修改哪些内容，包括head与body
      chunks: ['vendors',i],//i代表入口文件的key
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