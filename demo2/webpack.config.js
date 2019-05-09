var path = require('path');
var help = require('./help.js');
var htmlWebpackPlugin = require('html-webpack-plugin'); //html模板插件
var mode = help.getMode();// 获取开发模式
module.exports={
  entry:{
    app:'./app.js'
  },
  mode:mode, // 开发模式
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].[hash].js', // [hash] 每次打包生成唯一固定的hash值
    publicPath:'/'
  },
  devServer:{  // webpack-dev-server 参数配置
    port:'8899', // 服务端口
    open:true, // 自动打开默认浏览器
    proxy:{ // 接口转发
      '/test/shortRent': { // 拦截规则
        target: 'http:"//www.baidu.com', // 转发到目标服务器
        changeOrigin: true,
        pathRewrite: {
            '^/test/shortRent': '/evcard-evrental' // 地址重写
        }
      },
    }
  },
  plugins:[ // 插件集合
    new htmlWebpackPlugin({
      filename:'index.html', // 导出的文件的名字
      template:'./index.html', // 模板文件
      inject:true, // 是否可以修改模板文件 允许wepack在<head>和<body>标签里面插入数据。
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
    })
  ],
}