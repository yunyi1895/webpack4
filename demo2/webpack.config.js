var path = require('path');
var help = require('./help.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var mode = help.getMode();
module.exports={
  entry:{
    app:'./app.js'
  },
  mode:mode,
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].[hash].js',
    publicPath:'/'
  },
  devServer:{
    port:'8899',
    proxy:{
      '/test/shortRent': {
        target: 'http:"//www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
            '^/test/shortRent': '/evcard-evrental'
        }
      },
    }
  },
  plugins:[ // 插件集合
    new htmlWebpackPlugin({
      filename:'index.html', // 导出的文件的名字
      template:'./index.html', // 模板文件
      inject:true, // 是否可以修改模板文件

    })
  ],
}