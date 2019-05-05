var path = require('path');
var help = require('./help.js');
var config = require('./config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    }),
    new MiniCssExtractPlugin({
      filename: help.assetsPath('css/[name].css')
    })
  ],
}