import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "./../../css/table.css";
import axios from "axios";

const config = require("../../config/config");

const columns = [
  {
    id: "time",
    label: "시간",
    format: value => value.toLocaleString()
  },
  {
    id: "duration",
    label: "처리시간",
    format: value => value.toLocaleString()
  },
  {
    id: "source",
    label: "송신시스템",
    align: "center"
  },
  {
    id: "destination",
    label: "수신시스템",
    align: "center"
  },
  {
    id: "http_method",
    label: "메서드",
    align: "center"
  },
  {
    id: "uri",
    label: "URL",
    align: "center"
  },
  {
    id: "success",
    label: "상태",
    align: "center"
  }
];

const TransactionTable = props => {
  const message_id = props.message_id;
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const inspectValue = value => {
    return value === null ? "-" : value === true ? "200 OK" : value;
  };

  useEffect(() => {
    axios
      .post(config.development.url + "/spa/detail", { message_id: message_id })
      .then(res => {
        setRows(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (rows.length !== 0) {
      props.onSubmit({
        service_name: rows[0].service_name,
        message_id: rows[0].message_id,
        car_id: rows[0].car_id,
        status: rows[rows.length - 1].success,
        duration: (0.001*(new Date(rows[rows.length - 1].time).getTime() - new Date(rows[0].time).getTime())).toFixed(3),
        start: rows[0].time,
        end: rows[rows.length - 1].time
      });
    }
  }, [rows]);

  return (
    <Paper className={"tableRoot"}>
      <TableContainer className={"tableContainer"}>
        <Table>
          <TableHead className={"tableHead"}>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={"tableCellMargin"}
                >
                  <p className={"tableHeadFont"}>{column.label}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={"tableCellMargin"}
                        >
                          {inspectValue(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={"tableContainer"}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionTable;
