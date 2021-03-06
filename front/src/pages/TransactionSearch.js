import React, { Component,Fragment } from "react";

import Filter from "./../components/filter";
import SearchResult from "./../components/search"
import "../css/common.css";
import "../css/canvas.css";

class Dashboard extends Component {
  render() {
    return (
        <Fragment>
            <div className="dashBoard">
                <h1 className="header">트랜잭션 검색</h1>
                <hr
                    style={{
                    color: "#000066",
                    height: "1px",
                    background: "#00287A",
                    marginLeft: "20px",
                    marginRight: "20px"
                    }}
                />
            </div>
            <div><Filter/></div>
            <div><SearchResult data={this.props.match.params.data}/></div>
        </Fragment>
    );
  }
}

export default Dashboard;
