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
    // path: help.resolve('dist'),
    // filename:'js/[name].[hash].js',
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