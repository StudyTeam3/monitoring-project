import React, { Component } from 'react';
import '../../App.css';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';
import axios from "axios";

let serverName = "";

class FirstChart extends Component {
  
  state = {
    data: []
  }

  async getData() {
    let timeCount = {};
    let TimeUrl = 'http://localhost:5000/home/firstChart/'+serverName;
    let { data: times } = await axios.get(TimeUrl);

    for(var i = 0; i < Object.keys(times).length; i++){
      let tempSplit = times[i].time.split('T');
      let timeSplit = tempSplit[1].split(':');
      if(timeCount[timeSplit[0]] == null){
        timeCount[timeSplit[0]] = 1;
      }
      else{
        timeCount[timeSplit[0]] += 1;
      }
    }

    let tempData = [];
    for(var i in timeCount){
      let tempJson = {};
      tempJson['x'] = i;
      tempJson['y'] = timeCount[i];
      tempData.push(tempJson);
    }
    this.setState({data : tempData});
  };

  componentWillMount (){
    serverName = this.props.serverName;
    console.log("first",serverName);
    this.getData();
  };
  
  render() {

    return (
      <div className="App">
        <XYPlot height={300} width={300}>
          <LineMarkSeries data={this.state.data}
            size = {6}
            markStyle = {{stroke: '#000066', fill: '#FFFFFF'}}
            lineStyle = {{stroke: '#000066'}}/>
          <XAxis title = "시간" position = "end" tickTotal = {5} xDoamin={[0,10]} style={{text:{},line:{},title: {}}}/>
          <YAxis title = "요청" position = "start" style={{title: {transform:'rotate(180deg)'}}}/>
        </XYPlot>
      </div>
    );
  }
}

export default FirstChart;