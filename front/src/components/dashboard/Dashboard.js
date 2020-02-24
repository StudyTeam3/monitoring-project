import React, { Component } from "react";

import FirstChart from "./FirstChart";
import SecondChart from "./SecondChart";
import ThirdChart from "./ThirdChart";
import DashboardTable from "./DashboardTable";
import DashboardLogTable from "./DashboardLogTable";

import "../../css/dashboard.css";
import "../../../node_modules/react-vis/dist/style.css";
import "../../css/common.css";

class Dashboard extends Component {

  state = {
    currentServer: "spa"
  }
 
  changeServer = () => {
    const idSelect = document.getElementById("serverName");
    const serverName = idSelect.value;
    this.setState({currentServer : serverName})
    
    console.log(serverName, this.state.currentServer);
  };

  render() {
    if(this.props.isLogined) this.props.history.push('/Login');
    return (
      <div className="dashBoard">
          <div className="header">
            <h1 style={{display:'inline'}}>Dashboard</h1>
            <select id="serverName" style={{float:'right', marginTop:'30px'}} onChange={this.changeServer} >
              <option value="spa">spa</option>
              <option value="vehicle">vehicle</option>
            </select>
          </div>
          <hr
            style={{
              color: "#000066",
              height: "1px",
              background: "#00287A",
              marginLeft: "20px",
            }}
          />
          <div className="chartStyle">
            <div>
              <h2>시간대별 요청 흐름</h2>
              <FirstChart serverName={this.state.currentServer}></FirstChart>
            </div>
            <div>
              <h2>기능별 요청 빈도</h2>
              <SecondChart serverName={this.state.currentServer}></SecondChart>
            </div>
            <div>
              <h2>트랜잭션 성공률</h2>
              <ThirdChart serverName={this.state.currentServer}></ThirdChart>
            </div>
          </div>
          <div className="tableStyle">
            <div style={{ width: "35%", marginLeft: '30px' }}>
              <h2 className="tableName">서버 현황</h2>
              <DashboardTable></DashboardTable>
            </div>
            <div style={{ width: "60%" }}>
              <h2 className="tableName">최근 실패 로그</h2>
              <DashboardLogTable style={{ width: "70%" }}></DashboardLogTable>
            </div>
          </div>
      </div>
    );
  }
}

export default Dashboard;
