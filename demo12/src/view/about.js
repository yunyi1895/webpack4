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