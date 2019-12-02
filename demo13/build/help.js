/*
 * @Description: webpack配置需要用到函数
 * @Author: cmf
 * @Date: 2019-05-28 13:44:44
 * @LastEditTime: 2019-06-07 11:12:05
 * @LastEditors: Please set LastEditors
 */
var path = require('path');
var glob = require('glob');
var config = require('./config.js');
module.exports.getMode = function () {
	return process.env.NODE_ENV === 'development' ? 'development' : 'production'
};
module.exports.resolve = function (p) {
	return path.resolve(process.cwd(), p);
}
module.exports.assetsPath = function (_path) {
	const assetsSubDirectory = process.env.NODE_ENV === 'production'
		? config.build.assetsSubDirectory
		: config.dev.assetsSubDirectory
	// path.posix是path模块跨平台的实现（不同平台的路径表示是不一样的）
	return path.posix.join(assetsSubDirectory, _path)
}
/**
 * @description: 遍历文件夹里面的所有文件
 * @param {array} [string] 
 * @return: {文件名：文件地址}
 */
exports.getEntry = function getEntry(globPath) {
	var entries = {};
	if (typeof (globPath) != "object") {
		globPath = [globPath]
	}
	globPath.forEach((itemPath) => {
		// glob.sync 同步读取
		glob.sync(itemPath).forEach(function (entry) {
			entries[entry.substring(13, entry.lastIndexOf('.'))] = entry; // 13代表'./src/module/'
		});
	});
	return entries;
};