import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import SuccessChip from "./SuccessChip";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../transaction.css";

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

let sorted = [];
class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }
  componentWillMount(){
   console.log(this.state.tmp)
    sorted= [];
    const cols = JSON.parse(this.props.customCol);
    const origin = this.props.tmp;
    cols.map(key => sorted.push(origin[key]));
    console.log(sorted);
  }

  componentDidMount(){
    sorted=[];
  }
    render(){
        const handleClick = () => {
           console.log(this.state.sorted)
        }
        return (
            <StyledTableRow onClick = {handleClick}>

              <TableCell>
                 <SuccessChip status={sorted.shift()} />
              </TableCell>
                            
              <Link 
                to={`/detail/${this.state.tmp.message_id}`} 
                style={{ textDecoration: "none" }}
              >
                <TableCell>{sorted.shift()} </TableCell>
              </Link>
              
                {sorted.map(data => (<TableCell>{data}</TableCell>))}
            </StyledTableRow>
        )
    }
}

export default Transaction;

{/* <StyledTableRow onClick={handleClick}>
<Link
  to={`/detail/${this.props.MID}`}
  style={{ textDecoration: "none" }}
>
  <TableCell>{this.props.startTime}</TableCell>
</Link>
<TableCell>{this.props.endTime}</TableCell>
<TableCell>{this.props.MID}</TableCell>
<TableCell>{this.props.server}</TableCell>
<TableCell>{this.props.service}</TableCell>
<TableCell>{this.props.CID}</TableCell>
<TableCell>{this.props.function}</TableCell>
<TableCell>
  <SuccessChip status={this.props.status} />
</TableCell>
</StyledTableRow> */}