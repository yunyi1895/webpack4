var path = require('path');
var webpack = require("webpack");
var help = require('./help.js');
var config = require('./config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var mode = help.getMode();
var rules = require('./webpack.rules.conf.js');
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
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
    })
  ],
}