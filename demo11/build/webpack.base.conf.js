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
        reactVendors: {
          chunks: 'all',
          test: /(react|react-dom|react-dom-router)/,
          priority: 100,
          name: 'react',
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
      minify: {
        // 压缩 HTML 文件
        removeComments: isPord, // 移除 HTML 中的注释
        collapseWhitespace: isPord, // 删除空白符与换行符
        minifyCSS: isPord // 压缩内联 css
      },
    })
  ],
}