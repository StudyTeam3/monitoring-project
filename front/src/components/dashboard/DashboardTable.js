import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "../../css/dashboardtable.css";
import { Link } from "react-router-dom";
import axios from "axios";

const config = require("../../config/config");

const classes = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(serverName, lastUseTime) {
  return { serverName, lastUseTime };
}

class DashboardTable extends Component {
    state = {
        rows: []
      }


  componentDidMount() {
    axios
      .get(config.development.url + "/data/getAllTables")
      .then(res => {
        const results = res.data.map(element => createData(element.tablename,element.time));
        this.setState({
            rows: results
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{ margin: "0px", padding: "20px", maxWidth: "80%" }}
      >
        <TableHead className="TableHead">
          <TableRow>
            <TableCell>
              <p className="TableHeadFont">서버명</p>
            </TableCell>
            <TableCell align="right">
              <p className="TableHeadFont">최근 사용 시간</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.serverName}>
              <Link to={`/search/${row.serverName}`} style={{ textDecoration: "none" }}>
                <TableCell component="th" scope="row">
                  {row.serverName}
                </TableCell>
              </Link>
              <TableCell align="right">{row.lastUseTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default DashboardTable;
