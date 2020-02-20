import React, { Component,Fragment } from "react";
import ColumnList from "./../components/ColumnList";
import "../css/common.css";
import "../css/canvas.css";
import "../css/myPage.css";

class MyPage extends Component {
  render() {
    return (
        <div>
            <div>
                <h1 className="header">설정</h1>
                <hr
                    style={{
                    color: "#000066",
                    height: "1px",
                    background: "#00287A",
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "88vw"
                    }}
                />
            </div>
            <div className="column">
                <ColumnList/>
            </div>
     
        </div>
    );
  }
}

export default MyPage;
