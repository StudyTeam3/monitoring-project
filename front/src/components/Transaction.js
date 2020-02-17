import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../transaction.css';

const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  

class Transaction extends React.Component {
    render(){
      const handleClick = () => {
          console.log(this.props)
      }

      return (
          <StyledTableRow onClick = {handleClick}>
            <Link to="/detail" style={{ textDecoration: 'none' }}>
            <TableCell>{this.props.startTime}</TableCell>
            </Link>
            <TableCell>{this.props.endTime}</TableCell>
            <TableCell>{this.props.MID}</TableCell>
            <TableCell>{this.props.server}</TableCell>
            <TableCell>{this.props.service}</TableCell>
            <TableCell>{this.props.CID}</TableCell>
            <TableCell>{this.props.function}</TableCell>
            <TableCell>{this.props.status}</TableCell>     
          </StyledTableRow>
      )
    }
}

export default Transaction;