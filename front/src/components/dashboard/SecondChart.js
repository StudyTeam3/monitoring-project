import React, { Fragment } from 'react';
import {XYPlot, ArcSeries, XAxis, YAxis, Hint } from 'react-vis';
import axios from "axios";

const FunctionUrl = "http://localhost:5000/home/secondChart";
const colorArr = ['#355f77','#5697bf','#72a6c7','#91bad1','#000066',
                  '#074e67','#001440','#74d2b3','#05878a','#3d0f2b',
                  '#ff7878','#401a24','#836a7e','#ffcc5c','#ffeead','#daa520'];

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
      if(functionKind != 'null'){
        if(functionCount[functionKind] == null){
          functionCount[functionKind] = 1;
        }
        else{
          functionCount[functionKind] += 1;
        }
      }
    }

    // 데이터 소팅
    let sortedArray = [];
    for(var i in functionCount){
      sortedArray.push([functionCount[i],i]);
    }
    sortedArray = sortedArray.sort(function(a,b){
      return b[0]-a[0];
    });

    // console.log("sorted",sortedArray.sort(function(a,b){
    //   return b[0]-a[0];
    // }));
    // 데이터를 차트 데이터로 변형
    let tempData = [];
    let currentDegree = 0;
    let allOfCount = 0;
    let loop = 0;

    for(var i in sortedArray){
      allOfCount += sortedArray[i][0];
    }

    let dataName = [];
    for(var i in sortedArray){
      let tempJson = {};
      tempJson['angle0'] = currentDegree;
      tempJson['angle'] = currentDegree +  PI * (sortedArray[i][0]/allOfCount);
      tempJson['radius'] = 1.5;
      tempJson['radius0'] = 2;
      tempJson['color'] = colorArr[loop];
      loop += 1;
      currentDegree = tempJson['angle'];
      tempData.push(tempJson);
      dataName.push(sortedArray[i][1]);
    }

    this.setState({data : tempData, dataName: dataName});
  };

  componentWillMount (){
    this.getData();
  };

  render() {

    return (
      <div>
        <div style={{position:'relative'}}>
          <XYPlot
            xDomain={[-100, 100]}
            yDomain={[-100, 100]}
            width={300}
            height={230}
            >
            <ArcSeries
              colorType = "literal"
              radiusDomain={[0,3]}
              center={{x: -20, y: 0}}
              data={this.state.data}
            />
          </XYPlot>
        </div>
        <div style={{position:'absolute', top:'325px',zIndex:'10'}}>
        {
          this.state.dataName.map((value, index) => { if(index <4 ){
            return  <div>
                      <div style={{backgroundColor: colorArr[index], width: '10px', height: '10px', margin: '0px', display: 'inline-block', marginRight: '10px', marginLeft: '80px', marginBottom: '3px'}}></div>
                      <p style={{width: '140px', textAlign: 'center', marign: '0px', display: 'inline', marginBottom: '20px'}}>{value}</p>
                    </div>
          }})
        }
        </div>
      </div>
    );
  }
}

export default SecondChart;
