import React, { Component } from 'react';
import '../../App.css';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, ArcSeries} from 'react-vis';

const wrap = {
  position: 'relative',
  textAline:'center'
};

const over = {
  position: 'absolute',
  top: '85px',
  left: '135px',
  color: '#000066'
}

class ThirdChart extends Component {
  render() {
    const PI = Math.PI * 2;
    const myData = [
      {angle0: 0, angle: PI * 3/4, radius: 1.9, radius0: 2, color: '#000066'},
      {angle0: PI * 3/4, angle: PI * 3/4, radius: 1.7, radius0: 2.2, color: '#000066'},
    ]
    
    return (
      <div style={wrap}>
        <div style={over}>
          <p>success</p>
          <p style={{fontSize: '30px',margin:'0 0', display:'inline'}}>75</p>
          <p style={{display:'inline'}}>%</p>
        </div>
        <XYPlot
          xDomain={[-100, 100]}
          yDomain={[-100, 100]}
          width={300}
          height={300}>
          <ArcSeries
            colorType = "literal"
            radiusDomain={[0,3]}
            center={{x: 0, y: 0}}
            data={myData}
          />
        </XYPlot>
      </div>
    );
  }
}

export default ThirdChart;