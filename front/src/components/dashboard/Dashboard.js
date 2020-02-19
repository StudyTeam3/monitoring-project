import React, { Component } from "react";

import FirstChart from "./FirstChart";
import SecondChart from "./SecondChart";
import ThirdChart from "./ThirdChart";
import DashboardTable from "./DashboardTable";
import DashboardLogTable from "./DashboardLogTable";
import Paper from "@material-ui/core/Paper";

import "../../css/dashboard.css";
import "../../../node_modules/react-vis/dist/style.css";
import "../../css/common.css";


class Dashboard extends Component {
  render() {
    return (
      <div className="dashBoard">
          <h1 className="header">Dashboard</h1>
          <hr
            style={{
              color: "#000066",
              height: "1px",
              background: "#00287A",
              marginLeft: "20px",
              marginRight: "20px"
            }}
          />
          <div className="chartStyle">
            <div>
              <h2>시간대별 요청 흐름</h2>
              <FirstChart></FirstChart>
            </div>
            <div>
              <h2>기능별 요청 빈도</h2>
              <SecondChart></SecondChart>
            </div>
            <div>
              <h2>트랜잭션 성공률</h2>
              <ThirdChart></ThirdChart>
            </div>
          </div>
          <div className="tableStyle">
            <div style={{ width: "35%" }}>
              <h2>서버 현황</h2>
              <DashboardTable></DashboardTable>
            </div>
            <div style={{ width: "60%" }}>
              <h2>최근 실패 로그</h2>
              <DashboardLogTable style={{ width: "70%" }}></DashboardLogTable>
            </div>
          </div>
      </div>
    );
  }
}

export default Dashboard;
