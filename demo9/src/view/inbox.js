import React from 'react';
class Inbox extends React.Component {
   async componentDidMount() {
    // const {default:echarts}= await import('echarts');
    const {default:echarts} = await import(/* webpackChunkName: "echarts~async"*/ 'echarts');
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