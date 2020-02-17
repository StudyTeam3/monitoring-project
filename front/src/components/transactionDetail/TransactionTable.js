import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "./../../css/table.css";

import sample from "./sampledata";

const columns = [
  {
    id: "time",
    label: "Time",
    minWidth: 50,
    format: value => value.toLocaleString()
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 50,
    format: value => value.toLocaleString()
  },
  {
    id: "source",
    label: "Source",
    minWidth: 50,
    align: "right"
  },
  {
    id: "destination",
    label: "Destination",
    minWidth: 50,
    align: "right"
  },
  {
    id: "method",
    label: "Method",
    minWidth: 50,
    align: "right"
  },
  {
    id: "url",
    label: "URL",
    minWidth: 50,
    align: "right"
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right"
  }
];

function createData(time, duration, source, destination, method, url, status) {
  return { time, duration, source, destination, method, url, status };
}

const rows = sample.map(element => createData(...element));

const TransactionTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  style={{ minWidth: column.minWidth }}
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
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
        rowsPerPageOptions={[10, 25, 100]}
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
