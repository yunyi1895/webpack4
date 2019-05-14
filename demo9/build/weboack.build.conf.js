var path = require('path');
var webpack = require("webpack");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var cleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require("webpack-merge");
var help = require('./help.js');
var webpackConfigBase = require('./webpack.base.conf.js');
var config = require('./config.js');

module.exports = merge(webpackConfigBase, {
  mode: config.build.mode,
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
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
    new BundleAnalyzerPlugin(),
    new cleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: help.assetsPath('css/[name].css')
    }),
    new OptimizeCSSAssetsPlugin()
  ]
})