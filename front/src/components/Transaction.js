import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import "../transaction.css";

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

class Transaction extends React.Component {
  render() {
    const handleClick = () => {
    };

    return (
      <StyledTableRow onClick={handleClick}>
        <Link to={`/detail/${this.props.MID}`} style={{ textDecoration: "none" }}>
          <TableCell>{this.props.startTime}</TableCell>
        </Link>
        <TableCell>{this.props.endTime}</TableCell>
        <TableCell>{this.props.MID}</TableCell>
        <TableCell>{this.props.server}</TableCell>
        <TableCell>{this.props.service}</TableCell>
        <TableCell>{this.props.CID}</TableCell>
        <TableCell>{this.props.function}</TableCell>
        <TableCell>
          {this.props.status ? (
            <Chip
              avatar={<Avatar>200</Avatar>}
              label="성공"
              color="primary"
              style={{ backgroundColor: "#006" }}
            />
          ) : (
            <Chip
              avatar={<Avatar>404</Avatar>}
              label="실패"
              color="secondary"
              style={{ backgroundColor: "#bb162b" }}
            />
          )}
        </TableCell>
      </StyledTableRow>
    );
  }
}

export default Transaction;
