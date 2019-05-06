var path = require('path');
var webpack = require("webpack");
var merge = require("webpack-merge");
var webpackConfigBase = require('./webpack.base.conf');
var help = require('./help.js');
var config = require('./config.js');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports=merge(webpackConfigBase,{
  mode: config.dev.mode,
  devtool:'eval-source-map',
  output:{
    filename:'js/[name].js',
    publicPath:config.dev.publicPath
  },
  devServer:{
    port:config.dev.port,
    proxy:config.dev.proxy
  },
  plugins:[
    new BundleAnalyzerPlugin(),
  ]
})