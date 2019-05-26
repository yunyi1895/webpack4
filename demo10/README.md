# JS Tree Shaking 
参考代码 [demo10](https://github.com/yunyi1895/webpack4/tree/master/demo10)<br>

[Tree Shaking](https://webpack.js.org/guides/tree-shaking/#root)

![](https://user-gold-cdn.xitu.io/2019/5/26/16af2c8cd610ab6b?w=1506&h=370&f=png&s=301709)
> 树抖动是JavaScript上下文中常用于消除死代码的术语。
它依赖于ES2015模块语法的静态结构，即导入和导出。
名称和概念已由ES2015模块捆绑器汇总推广。

摇树的意思。在webpack4.0里面会自动的把不需要的js在打包的时候剔除。当然需要开发进行配合：**按需加载**<br>
我们拿[lodash](https://github.com/lodash/lodash)为例。
为了清楚我们摇掉了多少代码，先将react的包拆出来单独打包。
```
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
        reactVendors: {
          chunks: 'all',
          test: /(react|react-dom|react-dom-router)/,
          priority: 100,
          name: 'react',
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
```
在about.js里面使用lodash
```
import React from 'react';
import _ from 'lodash';
class About extends React.Component {

    render() {
      const s = _.concat([1],[2,3,1,2,3,4,6,78,41]);
      return (
        <h3>{s}</h3>
      )
    }
  }
  export default About;
```
运行打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/26/16af2c63544fb76b?w=1376&h=322&f=png&s=474070)
合并引入的vendors有95kb。我们只使用了lodash的concat方法，其他的方法没使用。
我们使用lodash的模块化包[lodash-es](https://www.npmjs.com/package/lodash-es)。
```
npm i lodash-es -S
```
改变about.js的代码
```
import React from 'react';
//import _ from 'lodash';
import { concat } from 'lodash-es';
class About extends React.Component {

    render() {
      const s = concat([1],[2,3,1,2,3,4,6,78,41]);
      return (
        <h3>{s}</h3>
      )
    }
  }
  export default About;
```
运行打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/26/16af2ce4c66e76c9?w=1394&h=216&f=png&s=383781)
现在只有28kb。缩小的部分就是loader的按需加载的部分。
