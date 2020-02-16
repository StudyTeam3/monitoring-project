import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../../css/dashboardtable.css';

const classes = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData( logId, time, functionName, service ) {
    return { logId, time, functionName, service };
  }
  
  const rows = [
    createData('d2fjdff-22-dfsdf', "00:00 00.00", 'location/park', 'bluelink'),
    createData('d2fjdff-22-dfsdf', "00:00 00.00", 'control', 'bluelink'),
    createData('d2fjdff-22-dfsdf', "00:00 00.00", 'tracetime', 'uvo'),
  ];


class DashboardLogTable extends Component {

    render() {

        return (
            
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className="TableHead">
                    <TableRow>
                        <TableCell><p className="TableHeadFont">ID</p></TableCell>
                        <TableCell align="right"><p className="TableHeadFont">시간</p></TableCell>
                        <TableCell align="right"><p className="TableHeadFont">기능</p></TableCell>
                        <TableCell align="right"><p className="TableHeadFont">서비스</p></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.logId}>
                        <TableCell component="th" scope="row">
                            {row.logId}
                        </TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                        <TableCell align="right">{row.functionName}</TableCell>
                        <TableCell align="right">{row.service}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default DashboardLogTable;