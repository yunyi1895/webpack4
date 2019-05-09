var path = require('path'); //node 默认插件，用来处理文件路径。

module.exports={ // commonJs 语法
  entry:{ // 入口文件。需要打包的文件。可以是[app.js]也可以是下面的对象模式。
    app:'./app.js'
  },
  output:{// 输出配置 
    path:path.resolve(__dirname,'dist'),  // 输出的文件地址，是绝对路径。没有则创建新的文件夹。
    filename:'[name].js',  // 输出js的名字。[name]是对应的入口的文件名。
    publicPath:'./assets' // 是相对路径，相对于path的路径。储层静态资源的路径，如css、图片、字体等。
  }
}