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
import axios from "axios";

const classes = makeStyles({
        table: {
        minWidth: 650,
        },
    });
  
function createData( logId, time, functionName, service ) {
    return { logId, time, functionName, service };
}
  
let rows = [];

class DashboardLogTable extends Component {

    state = {
        serverName: "spa"
    }

    async getData() {
        console.log("logGetData");
        let logUrl = 'http://localhost:5000/home/logtable/'+this.state.serverName;
        console.log("logtable",logUrl);
        let { data: logs } = await axios.get(logUrl);
        console.log("logs",logs);
        for(var i = 0; i < Object.keys(logs).length; i++){
            if(i >= 3){
                break;
            }
            console.log(logs[i]);
            rows.push(createData(logs[i].message_id, logs[i].time, logs[i].function, logs[i].service_name));
        }
        console.log("logRows",rows);
    };

    // shouldComponentUpdate(nextProps, nextState){
    //     const propsChange = (this.props.serverName !== nextProps.serverName);
    //     const stateChange = (this.state.serverName !== nextState.serverName);
    
    //     return propsChange || stateChange;
    //   }

    componentWillMount (){
        this.state.serverName = this.props.serverName;
        console.log('logWillMount');
        this.getData();
    };

    componentWillUpdate(nextProps, nextState){
        this.state.serverName = nextProps.serverName;
        console.log('logWillUpdate',this.state.serverName);
        this.getData();
    };

    componentDidUpdate() {
        rows = [];
    }
    render() {

        return (
            
            // <TableContainer component={Paper} style = {{padding:'20px', maxWidth: '80%'}}>
                <Table className={classes.table} aria-label="simple table" style={{margin:'0px', padding:'20px', maxWidth: '80%'}}>
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
            // </TableContainer>
        );
    }
}

export default DashboardLogTable;