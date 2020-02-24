import React, { Component } from 'react';
import '../../App.css';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, ArcSeries} from 'react-vis';
import axios from "axios";

const SuccessUrl = "http://localhost:5000/home/thirdChart";

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

  state = {
    data: [],
    percent: 0.0
  }

  async getData() {
    const PI = Math.PI * 2;

    // DB 데이터 파싱
    let successCount = {};
    let { data: success } = await axios.get(SuccessUrl);
    console.log("1");

    for(var i = 0; i < Object.keys(success).length; i++){
      let successKind = success[i].success;
      if(successKind){
        if(successCount[0] == null)
          successCount[0] = 1;
        else
          successCount[0] += 1;
      }
      else{
        if(successCount[1] == null)
          successCount[1] = 1;
        else
          successCount[1] += 1;
      }
    }

    // 데이터를 차트 데이터로 변형
    // const myData = [
    //   {angle0: 0, angle: PI * 3/4, radius: 1.9, radius0: 2, color: '#000066'},
    //   {angle0: PI * 3/4, angle: PI * 3/4, radius: 1.7, radius0: 2.2, color: '#000066'},
    // ]
    let tempData = [];
    let allOfCount = 0;
    let loop = 0;

    for(var i in successCount){
      allOfCount += successCount[i];
    }
    this.setState({percent: successCount[0]/allOfCount});

    let tempJson = {};
    tempJson['angle0'] = 0;
    tempJson['angle'] = PI * this.state.percent;
    tempJson['radius'] = 1.9;
    tempJson['radius0'] = 2;
    tempJson['color'] = '#000066';
    tempData.push(tempJson);

    tempJson = {};
    tempJson['angle0'] = PI * this.state.percent;
    tempJson['angle'] = PI * this.state.percent;
    tempJson['radius'] = 1.7;
    tempJson['radius0'] = 2.2;
    tempJson['color'] = '#000066';
    tempData.push(tempJson);

    console.log(tempData);
    this.setState({data : tempData});
  };

  componentWillMount (){
    this.getData();
  };

  render() {
    
    return (
      <div style={wrap}>
        <div style={over}>
          <p>success</p>
            <p style={{fontSize: '30px',margin:'0 0', display:'inline'}}>{this.state.percent * 100}</p>
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
            data={this.state.data}
          />
        </XYPlot>
      </div>
    );
  }
}

export default ThirdChart;