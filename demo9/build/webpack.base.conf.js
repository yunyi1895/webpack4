var path = require('path');
var webpack = require("webpack");
var help = require('./help.js');
var config = require('./config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var mode = help.getMode();
var rules = require('./webpack.rules.conf.js');
var isPord = mode==='development'?false:true;

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
        removeComments: isPord, // 移除 HTML 中的注释
        collapseWhitespace: isPord, // 删除空白符与换行符
        minifyCSS: isPord // 压缩内联 css
      },
    })
  ],
}