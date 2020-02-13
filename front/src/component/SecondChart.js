// import React, { Component } from 'react';
// import '../App.css';
// import '../../node_modules/react-vis/dist/style.css';
// import { XYPlot, ArcSeries } from 'react-vis';

// class SecondChart extends Component {
//     render() {
//         const PI = Math.PI;

//         const myData = [
//             {angle0: 0, angle: Math.PI / 4, opacity: 0.2, radius: 2, radius0: 1},
//             {angle0: PI / 4, angle: 2 * PI / 4, radius: 3, radius0: 0},
//             {angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 2, radius0: 0},
//             {angle0: 3 * PI / 4, angle: 4 * PI / 4, radius: 2, radius0: 0},
//             {angle0: 4 * PI / 4, angle: 5 * PI / 4, radius: 2, radius0: 0},
//             {angle0: 0, angle: 5 * PI / 4, radius: 1.1, radius0: 0.8}
//           ]
//         return (
//           <div className="App">
//             <XYPlot
//                 xDomain={[-5, 5]}
//                 yDomain={[-5, 5]}
//                 width={300}
//                 height={300}>
//             <ArcSeries
//                 animation
//                 radiusType={'literal'}
//                 center={{x: -2, y: 2}}
//                 data={myData}
//                 colorType={'literal'}/>
//             </XYPlot>
//           </div>
//         );
//       }
// }

// export default SecondChart;

import React from 'react';

import {XYPlot, ArcSeries} from 'react-vis';

// import {EXTENDED_DISCRETE_COLOR_RANGE} from 'theme';

const PI = Math.PI;

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

class SecondChart extends React.Component {
  state = {
    time: 0
  };

  componentDidMount() {
    this._timerId = setInterval(() => this.setState({time: getSeconds()}), 100);
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
    this.setState({timerId: false});
  }

  render() {
    const {time} = this.state;
    const seconds = time % 60;
    const minutes = (time / 60) % 60;
    const hours = (time / (60 * 24)) % 24;
    return (
      <XYPlot
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={300}
        getAngle={d => d.time}
        getAngle0={d => 0}
        height={300}
      >
        <ArcSeries
          animation={{
            damping: 9,
            stiffness: 300
          }}
          radiusDomain={[0, 3]}
          data={[
            {time: (seconds / 60) * 2 * PI, radius0: 1, radius: 1.5, color: 0},
            {
              time: (minutes / 60) * 2 * PI,
              radius0: 1.6,
              radius: 2.1,
              color: 1
            },
            {time: (hours / 24) * 2 * PI, radius0: 2.2, radius: 2.7, color: 2}
          ]}
        //   colorRange={EXTENDED_DISCRETE_COLOR_RANGE}
        />
      </XYPlot>
    );
  }
}

export default SecondChart;
