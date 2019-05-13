
var help = require('./help.js');
var config = require('./config.js');
const rules = [{
	test: /\.(le|c)ss$/,
	use: [
		process.env.NODE_ENV === 'development' ? config.dev.styleLoader : config.build.styleLoader,
		{
			loader: "css-loader",
			options: {
				importLoaders: 2 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, less-loader
			}
		},
		{
			loader: "postcss-loader",
			options: {
				plugins: [
					require("autoprefixer")({
						browsers: [
							'last 10 Chrome versions',
							'last 5 Firefox versions',
							'Safari >= 6',
							'ie> 8'
						]
					})
				]
			}
		},
		{ loader: "less-loader" },
	],
}, 
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
{
	test: /\.js$/,  // 正则匹配，所有的.js文件都使用这个规则进行编译
	exclude: /node_modules/, // 排除的文件夹。这个文件夹里面的的文件不进行转译
	loader: "babel-loader", // 转译的插件
	options: {  // 转译的规则
		presets: [ //转译器配置
			[
                "@babel/preset-env", {
                    useBuiltIns: "usage",
                    corejs: 3
                  }
            ]
		],
		plugins: [] // 转译插件配置
	}
},
];
module.exports = rules;