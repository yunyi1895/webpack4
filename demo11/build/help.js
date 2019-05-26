var path = require('path');
var config = require('./config.js');
module.exports.getMode = function() {
  return process.env.NODE_ENV === 'development'?'development':'production'
};
module.exports.resolve = function(p){
  return path.resolve(process.cwd(),p);
}
module.exports.assetsPath=function(_path){
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
  ? config.build.assetsSubDirectory
  : config.dev.assetsSubDirectory
// path.posix是path模块跨平台的实现（不同平台的路径表示是不一样的）
  return path.posix.join(assetsSubDirectory, _path)
}