const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var help = require('./help.js');
const rules = [{
  test: /\.(le|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    { loader: "css-loader" },
    { loader: "less-loader" },
    {
      loader: "postcss-loader",
      options: {
        plugins: [
          require("autoprefixer")({
            browsers: [
              'last 10 Chrome versions',
              'last 5 Firefox versions',
              'Safari >= 6',
              'ie> 8'
            ]
          })
        ]
      }
    },
  ],
}, {
  test: /\.(png|jpg|gif)$/,
  use: [{
    // 需要下载file-loader和url-loader
    loader: "url-loader",
    options: {
      limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
      // 图片文件输出的文件夹
      outputPath: help.assetsPath("images")
    }
  }]
},
{
  test: /\.js$/,
  use: [{
    loader: "babel-loader"
  }],
  // 不检查node_modules下的js文件
  exclude: "/node_modules/"
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    outputPath:help.assetsPath("fonts")
  }
},
];
module.exports = rules;