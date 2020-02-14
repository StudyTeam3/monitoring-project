import React, { Component } from 'react';
import '../App.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, LineSeries, MarkSeries, XAxis, YAxis } from 'react-vis';

class FirstChart extends Component {
    render() {
        const data = [
          {x: 1, y: 4},
          {x: 2, y: 6},
          {x: 3, y: 5},
          {x: 4, y: 8},
          {x: 5, y: 5},
        ];
        return (
          <div className="App">
            <XYPlot height={300} width={300}>
              <LineMarkSeries data={data}
                markStyle={{stroke: '#000066', fill: '#FFFFFF'}}
                lineStyle={{stroke: '#000066'}}/>
              {/* <MarkSeries data={data} /> */}

              <XAxis title = "시간" position = "middle" tickTotal = {5} style={{text:{},line:{},title: {}}}/>
              <YAxis title = "요청" position = "middle" style={{title: {writingMode: 'vertical-rl'}}}/>
            </XYPlot>
          </div>
        );
    }
}

export default FirstChart;