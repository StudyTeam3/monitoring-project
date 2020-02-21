import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import axios from "axios";
import { Link } from "react-router-dom";
import SuccessChip from "./SuccessChip";

const config = require("./../config/config");

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#000066",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 30
  }
}))(TableCell);

const capitalize = (str) => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace("_"," ");
}

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);

  const customCol = window.sessionStorage.getItem('column');

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, Object.keys(rows).length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios.get(config.development.url + '/spa')
    .then((res) => {
      setRows(res.data);
      setShow(true);
    })
    .catch((err) => {
      console.error(err);
    })
  },[]);

  return (
    <Table style={{ width: "80%" }}>
      <TableHead>
        <TableRow>
          {JSON.parse(customCol).map(name =>  <StyledTableCell>{capitalize(name)}</StyledTableCell>)}
        </TableRow>
      </TableHead>
      { show &&
      <TableBody>
        {rows
         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
         .map(t => {
          const tmp = {};
          let sorted = [];
          const cols = JSON.parse(customCol);
          for(var key in t) {
            if(customCol.includes(key)) tmp[key] = t[key];          
          }
          cols.map(key => sorted.push(tmp[key]));
          return ( 
          <StyledTableRow>

            <TableCell>
               <SuccessChip status={sorted.shift()} />
            </TableCell>
                          
            <Link 
              to={`/detail/${tmp.message_id}`} 
              style={{ textDecoration: "none" }}
            >
              <TableCell>{sorted.shift()} </TableCell>
            </Link>
            
              {sorted.map(data => (<TableCell>{data}</TableCell>))}
          </StyledTableRow>
          )
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>}
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={8}
            count={Object.keys(rows).length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
      </Table>
  );
}
