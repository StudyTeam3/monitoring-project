import React from 'react';
import {XYPlot, ArcSeries, XAxis, YAxis, Hint } from 'react-vis';
import axios from "axios";

const FunctionUrl = "http://localhost:5000/home/secondChart";

class SecondChart extends React.Component {

  state = {
    data: []
  }

  async getData() {
    const PI = Math.PI * 2;

    // DB 데이터 파싱
    let functionCount = {};
    let { data: functions } = await axios.get(FunctionUrl);

    for(var i = 0; i < Object.keys(functions).length; i++){
      let functionKind = functions[i].function;
      if(functionCount[functionKind] == null){
        functionCount[functionKind] = 1;
      }
      else{
        functionCount[functionKind] += 1;
      }
    }

    // 데이터를 차트 데이터로 변형
    let tempData = [];
    let currentDegree = 0;
    let allOfCount = 0;
    const colorArr = ['#355f77','#5697bf','#72a6c7','#91bad1','#000066'];
    let loop = 0;

    for(var i in functionCount){
      allOfCount += functionCount[i];
    }

    for(var i in functionCount){
      let tempJson = {};
      tempJson['angle0'] = currentDegree;
      tempJson['angle'] = currentDegree +  PI * (functionCount[i]/allOfCount);
      tempJson['radius'] = 1.5;
      tempJson['radius0'] = 2;
      tempJson['color'] = colorArr[loop];
      loop += 1;
      currentDegree = tempJson['angle'];
      tempData.push(tempJson);
    }

    this.setState({data : tempData});
  };

  componentWillMount (){
    this.getData();
  };

  render() {

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
          showLabels
          data={this.state.data}
        />
        {/* <XAxis/>
        <YAxis/> */}
      </XYPlot>
    );
  }
}

export default SecondChart;
