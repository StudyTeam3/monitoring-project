import React, { Component } from 'react';
import '../../App.css';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';
import axios from "axios";

let serverName = "";
let count = 0;

class FirstChart extends Component {
  
  state = {
    data: [],
    serverName: ""
  }

  async getData() {
      let timeCount = {};
      let TimeUrl = 'http://localhost:5000/home/firstChart/'+this.state.serverName;
      let { data: times } = await axios.get(TimeUrl);
      // console.log("first_getData",serverName);
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

  constructor(){
    super();
    this.state.serverName = 'spa';
    this.setState({serverName:'spa'});
  }

  shouldComponentUpdate(nextProps, nextState){
    if(count == 0){
      count += 1;
      return true;
    }
    const propsChange = (this.props.serverName !== nextProps.serverName);
    const stateChange = (this.state.serverName !== nextState.serverName);

    return propsChange || stateChange;
  }

  componentWillMount (){
    this.state.serverName = this.props.serverName;

    return this.getData();
  };
  
  componentWillUpdate(nextProps, nextState){
    this.state.serverName = nextProps.serverName;
    this.getData();
    console.log("firstChart_WillUpdate",this.state.serverName);
  }

  // getSnapshotBeforeUpdate(prevProps,prevState){
  //   this.getData();
  //   console.log("firstChart_getSnap ",this.state.serverName);
  // }
  // componentDidUpdate(){
  //   this.state.serverName = this.props.serverName;
  //   // this.getData();
  //   console.log("firstChart_DidUpdate",this.state.serverName);
  // }

  render() {
    console.log("first_render",this.state.serverName);
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