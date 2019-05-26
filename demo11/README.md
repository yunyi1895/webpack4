
# Gzip压缩。
## Gzip压缩的好处。
打开[掘金首页](https://juejin.im/timeline)。<br>
随便找一个js资源。

![](https://user-gold-cdn.xitu.io/2019/5/26/16af2fa036875448?w=1534&h=924&f=png&s=531762)

> Response Headers 里面的 **content-encoding** 代表着资源传输格式。说明这段资源使用的是Gzip文件。说明很多公司用的是Gzip进行资源传输，因为代码打包成Gzip传输时需要的资源很小。

其实Gzip传输是服务器需要配置的。即使我们上传代码没有进行Gzip压缩，服务器经过配置后会将资源进行Gzip压缩然后传输。例如[nginx的Gzip配置](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)。

Gzip配置都是服务器配置的工作，我们要做什么呢？其实服务器会寻找资源对应的gzip文件，如果没有则会进行Gzip压缩然后传输资源。这就多出了压缩的时间。如果我们通过webpack生成gzip文件，可以减少服务器生成gzip文件的时间，也减缓了服务器压力。


## js打包压缩配置 [optimization.minimiz](https://webpack.js.org/configuration/optimization/#optimizationminimize)
这个属性的属性值可以是布尔、数组。
### 当属性值是布尔时
![](https://user-gold-cdn.xitu.io/2019/5/26/16af2e170e98da4c?w=1562&h=818&f=png&s=252837)

在mode是**prduction**时，minimiz默认是true。自动使用[terser-webpack-plugin](https://webpack.js.org/plugins/terser-webpack-plugin/)进行压缩。
### 当属性值是数组时

![](https://user-gold-cdn.xitu.io/2019/5/26/16af2e523e21c178?w=1430&h=1100&f=png&s=443665)
如图是默认配置。<br>
## 配置Gzip压缩
默认的配置不用改，使用压缩插件[compression-webpack-plugin](https://webpack.js.org/plugins/compression-webpack-plugin/#root)。
```
npm i  compression-webpack-plugin -D
```
配置 **optimization.minimiz**
```
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
    ]
```

![](https://user-gold-cdn.xitu.io/2019/5/26/16af311f67da439a?w=1236&h=674&f=png&s=579510)
运行打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/26/16af313064b24f6f?w=1620&h=236&f=png&s=441329)
**.zip** 就是打包生成的gzip资源。对比原来的文件压缩了 38/121≈0.3。压缩了很多。

