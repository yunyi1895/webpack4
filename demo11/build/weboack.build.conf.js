var path = require('path');
var webpack = require("webpack");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var cleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require("webpack-merge");
var CompressionPlugin = require('compression-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var help = require('./help.js');
var webpackConfigBase = require('./webpack.base.conf.js');
var config = require('./config.js');



module.exports = merge(webpackConfigBase, {
  mode: config.build.mode,
  output: {
    filename: help.assetsPath('js/[name].[chunkhash].js'),
    publicPath: config.build.publicPath,
    path: help.resolve(config.build.assetsRoot),
  },
  optimization:{
    runtimeChunk:true,
    minimizer: [
      new CompressionPlugin({
        filename: '[path].gz[query]', // 生成资源的名字 [path].gz[query] 是默认名字
        algorithm: 'gzip', // 压缩算法
        test: /\.(js|css|html|svg)$/, // 匹配的资源
        compressionOptions: { level: 8 }, // 压缩等级 默认9级
        threshold: 10240, // 多大资源使用才压缩 10kb
        minRatio: 0.8,
        //仅处理压缩比此比率更好的资源（minRatio =压缩尺寸/原始尺寸）。
        //示例：您拥有1024b大小的image.png文件，压缩版本的文件大小为768b，
        //因此minRatio等于0.75。换句话说，当压缩大小/原始大小值小于minRatio值时，
        //将处理资源。默认 0.8 。
        deleteOriginalAssets: false, // 是否删除原始资产。
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new cleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: help.assetsPath('css/[name].css')
    }),
    new OptimizeCSSAssetsPlugin()
  ]
})