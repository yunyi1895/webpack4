var path = require('path');
var webpack = require("webpack");
var cleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require("webpack-merge");
var help = require('./help.js');
var webpackConfigBase = require('./webpack.base.conf.js');
var config = require('./config.js');

module.exports=merge(webpackConfigBase,{
  mode: config.build.mode,
  output:{
    filename:'assets/js/[name].[hash].js',
    publicPath:config.build.publicPath,
    path:help.resolve(config.build.assetsRoot),
  },
  plugins:[
    new cleanWebpackPlugin()
  ]
})