const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var help = require('./help.js');
const rules = [{
        test: /\.(css)$/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                // publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
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
        exclude: "/node_modules/",
        include:[help.resolve('./src')],
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
        }
    },{
        test: /\.less$/,
        // 三个loader的顺序不能变
        // 不分离的写法
        // use: ["style-loader", "css-loader", "less-loader"]
        // 区别开发环境和生成环境
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                // publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
            'less-loader'
          ],
    }
];
module.exports = rules;