var path = require('path');
var help = require('./help.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var mode = help.getMode();
module.exports={
  entry:{
    app:'./app.js'
  },
  mode:mode, //webpack4 新属性 自动添加插件
  output:{
    // path:path.resolve(__dirname,'dist'),
    // filename:'js/[name].[hash].js',
    // publicPath:'/'
  },
  devServer:{
    port:'8899'
  },
  resolve:{ // 解析
    alias:{
      '@': path.resolve(__dirname, './src')
    },
    extensions:['.js','.vue','.json','.css','.less'],
    modules: ["node_modules"]
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