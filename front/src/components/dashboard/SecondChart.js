import React, { Fragment } from 'react';
import {XYPlot, ArcSeries, XAxis, YAxis, Hint } from 'react-vis';
import axios from "axios";

const FunctionUrl = "http://localhost:5000/home/secondChart";
const colorArr = ['#355f77','#5697bf','#72a6c7','#91bad1','#000066'];

class SecondChart extends React.Component {

  state = {
    data: [],
    dataName: []
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
    let loop = 0;

    for(var i in functionCount){
      if(i != 'null'){
        allOfCount += functionCount[i];
      }
    }
    let dataName = [];
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
      let tempName = {};
      tempName['title'] = i;
      dataName.push(i);
    }

    this.setState({data : tempData, dataName: dataName});
    console.log(this.state.dataName);
  };

  componentWillMount (){
    this.getData();
  };

  render() {

    return (
      <Fragment>
        <XYPlot
          xDomain={[-100, 100]}
          yDomain={[-100, 100]}
          width={300}
          height={230}>
          <ArcSeries
            colorType = "literal"
            radiusDomain={[0,3]}
            center={{x: 0, y: 0}}
            data={this.state.data}
          />
        </XYPlot>
        {
          this.state.dataName.map((value, index) => { if(index < 5 && value != 'null'){
          return  <div style={{}}>
                    <div style={{}}>
                      <div style={{backgroundColor: colorArr[index], width: '10px', height: '10px', margin: '0px', display: 'inline-block', marginRight: '10px', marginLeft: '110px', marginBottom: '10px'}}></div>
                      <p style={{textAlign: 'center', marign: '0px', display: 'inline', marginBottom: '20px'}}>{value}</p>
                    </div>
                  </div>
          }})
        }
      </Fragment>
    );
  }
}

export default SecondChart;
