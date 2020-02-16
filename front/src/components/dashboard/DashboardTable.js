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
  
  function createData( serverName, lastUseTime) {
    return { serverName, lastUseTime };
  }
  
  const rows = [
    createData('ccsp.spa', "00:00 00.00"),
    createData('ccsp.vehicle', "00:00 00.00"),
    createData('ccsp.tmp', "00:00 00.00"),
  ];


class DashboardTable extends Component {

    render() {

        return (
            
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className="TableHead">
                    <TableRow>
                        <TableCell><p className="TableHeadFont">서버명</p></TableCell>
                        <TableCell align="right"><p className="TableHeadFont">최근 사용 시간</p></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.serverName}>
                        <TableCell component="th" scope="row">
                            {row.serverName}
                        </TableCell>
                        <TableCell align="right">{row.lastUseTime}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default DashboardTable;