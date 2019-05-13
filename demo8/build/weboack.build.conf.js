var path = require('path');
var webpack = require("webpack");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require("webpack-merge");
var help = require('./help.js');
var webpackConfigBase = require('./webpack.base.conf.js');
var config = require('./config.js');

module.exports = merge(webpackConfigBase, {
  mode: config.build.mode,
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
        echarts:{ // 新增拆包规则
          name:'echarts', // 规则名字
          chunks:'all', // 同步引入和异步引入都可以使用该规则
          priority:10, 
          // 该规则的优先级，比如 webpack中进行拆包的时候，
          // echarts包会有先匹配priority高的规则，如果满足这个规则，
          // 则将代码导入到该规则里面，不会将代码导入到后面的规则里面了。
          test:/(echarts)/, // 正则匹配规则
          minChunks:1 // 代码里面最少被引入1次就可以使用该规则
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
  output: {
    filename: help.assetsPath('js/[name].js'),
    publicPath: config.build.publicPath,
    path: help.resolve(config.build.assetsRoot),
  },
  plugins: [
    new cleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: help.assetsPath('css/[name].css')
    }),
    new OptimizeCSSAssetsPlugin()
  ]
})