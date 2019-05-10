
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  dev: {
    mode: 'development',
    publicPath: '/',
    styleLoader:{
      loader:'style-loader',
    },
    assetsSubDirectory: 'static',
    devServer: {
      port: '8899',
      open: true,
      proxy: {
        '/test/shortRent': {
          target: 'http:"//www.baidu.com',
          changeOrigin: true,
          pathRewrite: {
            '^/test/shortRent': '/evcard-evrental'
          }
        },
      },
    },
  },
  build: {
    mode: 'production',
    assetsSubDirectory: 'static',
    publicPath: '/',
    assetsRoot: 'you-app',
    styleLoader:{
      loader: MiniCssExtractPlugin.loader
    },
  }
}