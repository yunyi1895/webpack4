# 模块化拆包2
参考代码 [demo9](https://github.com/yunyi1895/webpack4/tree/master/demo9)<br>
这一节只使用splitChunks的默认配置来实现异步加载，理解异步加载的好处。<br>。
使用react作为开发框架。
## 同步引入的拆包
```
redux -> 16.8.6
react-dom -> 16.8.6
react-router-dom -> 5.0.0
```
安装 react 
```
npm i react react-router-dom react-dom -S
```
解析 jsx代码还需要[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react#docsNav)
```
npm i @babel/preset-react -D
```
详细代码请看[demo9](https://github.com/yunyi1895/webpack4/tree/master/demo9)。<br>
两个路由分别对应不同的组件。
```
    import About from './src/view/about';
    import Inbox from './src/view/inbox';
    // ....
    
   <App>
        <Route path="/about" component={About} />
        <Route path="/inbox" component={Inbox} />
    </App>
```

inbox.js引入了echarts并且使用了。
```
import React from 'react';
import echarts from 'echarts';
class Inbox extends React.Component {
  componentDidMount() {
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
      tooltip: {
        show: true
      },
      legend: {
        data: ['销量']
      },
      xAxis: [
        {
          type: 'category',
          data: ["衬衫", "羊毛衫2", "雪纺衫222", "裤子111", "高跟鞋", "袜子"]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          "name": "销量",
          "type": "bar",
          "data": [5, 20, 40, 10, 10, 20]
        }
      ]
    };

    // 为echarts对象加载数据 
    myChart.setOption(option);
  }
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        <div style={{ height: '400px' }} id="main"></div>
      </div>
    )
  }
}
export default Inbox;
```
splitChunks 使用默认配置
```
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
```

运行打包命令
```
npm run build
```

![](https://user-gold-cdn.xitu.io/2019/5/14/16ab52fa56bef735?w=1888&h=494&f=png&s=570869)

![](https://user-gold-cdn.xitu.io/2019/5/14/16ab5300e9177792?w=2850&h=1360&f=png&s=1386227)

> 打包的时候已经提示了，打包的代码太大影响性能。可以使用import()或require来限制包的大小。确保延迟加载应用程序的某些部分。
```
WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
```
>我们在首页的时候，并没有/inbox路由，但是/inbox路由里面的代码都打包在了app.js这一个js里面。首屏渲染变的很慢。按照官方提示需要做组件的动态引入，只有路由切换到/inbox的时候才加载对应组件的代码。

### 异步引入拆包
新建AsyncComponent.js。
```
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
    // 组件引入完成后渲染组件
      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
```
更换引入模式
```
//import Inbox from './src/view/inbox';
const Inbox = asyncComponent(() => import('./src/view/inbox'));
```
运行打包命令
```
npm run build
```
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab5728ca1fcfe8?w=2868&h=1274&f=png&s=1788166)
echarts被引入到1.js里面了。
```
npm run server
```
首页并没有加载1.js
![](https://user-gold-cdn.xitu.io/2019/5/14/16ab5745ff48f0f8?w=710&h=642&f=png&s=112573)
路由跳转后会引入。

![](https://user-gold-cdn.xitu.io/2019/5/14/16ab574e5c99d711?w=796&h=964&f=png&s=172346)

react的动态引入组件就OK了。
按照官方文档，还可以自定义chunk名称

```
const Inbox = asyncComponent(() => import(/* webpackChunkName: "echarts" */ './src/view/inbox'));
```
其实还可以异步引入依赖包
```
async componentDidMount() {
    const {default:echarts}= await import('echarts');
    var myChart = echarts.init(document.getElementById('main'));
}
```
## 总结
* 一般情况下推荐**splitChunks.chunks: 'all'**，其他参数可以不变。'all'的意思是同步引入和异步引入都可以进行拆包。
* 尽量小的引入所需要的插件，比如echarts官方提供了[按需加载](https://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)的方法。
* 在首页没有用的某个插件的时候，尽量使用异步加载的方式进行引入。
