import React from 'react';
import {XYPlot, ArcSeries} from 'react-vis';

class SecondChart extends React.Component {

  render() {
    const PI = Math.PI * 2;
    const myData = [
      {angle0: 0, angle: PI * 1/3, radius: 1.5, radius0: 2, color: '#355f77'},
      {angle0: PI * 1/3, angle: PI * 8/15, radius: 1.5, radius0: 2, color: '#5697bf'},
      {angle0: PI * 8/15, angle: PI * 111/180, radius: 1.5, radius0: 2, color: '#72a6c7'},
      {angle0: PI * 111/180, angle: PI * 126/180, radius: 1.5, radius0: 2, color: '#91bad1'},
      {angle0: PI * 126/180, angle: PI, radius: 1.5, radius0: 2,style: {fill: '#FFFFFF', stroke: '#000066'}},
    ]
    return (
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
    );
  }
}

export default SecondChart;
