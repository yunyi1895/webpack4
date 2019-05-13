import React from 'react';
import echarts from 'echarts';
class Inbox extends React.Component {
    render() {
      return (
        <div>
           
          <h2>Inbox</h2>
          {JSON.stringify(echarts)}
        </div>
      )
    }
  }
  export default Inbox;