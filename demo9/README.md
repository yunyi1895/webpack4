
# 文件解析。
代码内容详见[demo7](https://github.com/yunyi1895/webpack4/tree/master/demo7)<br>
文件解析需要用到的[loaders](https://www.webpackjs.com/loaders/#%E6%96%87%E4%BB%B6)。

![](https://user-gold-cdn.xitu.io/2019/5/13/16aaefef19a5f75e?w=1150&h=418&f=png&s=211476)
使用[url-loader](https://www.webpackjs.com/loaders/url-loader/)作为文件解析的loader。[file-loader](https://www.webpackjs.com/loaders/file-loader/)是一种'搬运工'的loader，将代码中需要的文件'搬运'到合适的地方，**url-loader**在搬运的基础上可以在代码上添加数据的作用，如添加base64的图片。
```
{
	test: /\.(png|jpg|gif)$/,
	use: [{
		// 需要下载file-loader和url-loader
		loader: "url-loader",
		options: {
			limit: 5 * 1024, //小于5kb将会已base64位图片打包处理 
			// 图片文件输出的文件夹
			outputPath: help.assetsPath("images"),
			name: '[name].[ext]'
		}
	}]
},
{
	test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 10000,
		outputPath: help.assetsPath("fonts")
	}
},
```
