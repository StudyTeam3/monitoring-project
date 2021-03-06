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
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SuccessChip from "./SuccessChip";
import { filterAction, dataAction } from "../store/modules/filterModules";
// import { getScalePropTypesByAttribute } from "react-vis/dist/utils/scales-utils";
import "./../css/common.css";

const config = require("./../config/config");
const _ = require("lodash");

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

const capitalize = str => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace("_", " ");
};

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const CustomPaginationActionsTable = props => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  // const [status, setStatus] = useState([true, null]);
  // const [messageID, setMessageID] = useState("");
  let thisData = props.data;
  const dataAction = props.dataAction;

  if (thisData === undefined) thisData = "spa";

  const customCol = window.sessionStorage.getItem("column");

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

  const onSearchSubmit = (state) => {
    // let success = "";
    // if(state.status === "success") success = true;
    // else if (state.status = "fail") success = null;

    // setMessageID(state.message_id.toLowerCase())

    // axios.post(config.development.url + '/spa/filter', {
    //   message_id : state.message_id.toLowerCase(),
    //   success : success
    // })
    // .then((res) => {
    //   setRows(res.data);
    //   setShow(true);
    // })
    // .catch((err) => {
    //   console.error(err);
    // })
  }

  useEffect(() => {
    axios
      .get(config.development.url + `/data?data=${thisData}`)
      .then(res => {
        setRows(res.data);
        dataAction(res.data);
        setShow(true);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (props.filterOn === true) {
      setRows(
        _.chain(props.data)
        // 날짜 필터링
        .filter((item) => {
          if(props.from === null || props.to === null ) return true;
          else return (
            _.inRange(
              new Date(item.start).getTime(),
              new Date(props.from).getTime(),
              new Date(props.to).getTime()
            ) &&
            _.inRange(
              new Date(item.end).getTime(),
              new Date(props.from).getTime(),
              new Date(props.to).getTime()
            )
          );
        })
        // Service 필터링
        .filter((item) => {
          if( props.service === "" ) return true;
          else {
            return _.includes( item.service, props.service );
          }
        })
        // Server 필터링
        .filter((item) => {
          if( props.server === "" ) return true;
          else {
            return _.includes( item.server, props.server );
          }
        })
        // Car_id 필터링
        .filter((item) => {
          if( props.car_id === "" ) return true;
          else {
            return _.includes( item.car_id, props.car_id );
          }
        })
        // Message_id 필터링
        .filter((item) => {
          if( props.message_id === "" ) return true;
          else {
            return _.includes( item.message_id, props.message_id );
          }
        })
        // Stauts 필터링
        .filter((item) => {
          if( props.status === "" ) return true;
          else {
            if( props.status === "success" ) return item.status === true;
            else return item.status === null;
          }
        })
        // Function 필터링
        .filter((item) => {
          if( props.function === "" ) return true;
          else {
            return _.includes( item.function, props.function );
          }
        })
        .value()
      );
      props.filterAction(false);
    }
  }, [props.filterOn]);

  return (
    <Table style={{ width: "80%" }}>
      <TableHead>
        <TableRow>
          {JSON.parse(customCol).map(name => (
            <StyledTableCell>{capitalize(name)}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      {show && (
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(t => {
              const tmp = {};
              let sorted = [];
              const cols = JSON.parse(customCol);
              for (var key in t) {
                if (cols.includes(key)) tmp[key] = t[key];
              }
              cols.map(key => sorted.push(tmp[key]));
              return (
                <StyledTableRow>
                  {sorted.map(data => {
                    if (t.status === data)
                      return (
                        <TableCell>
                          <SuccessChip status={data} />
                        </TableCell>
                      );
                    else if (t.message_id === data)
                      return (
                        <Link
                          to={`/detail/${thisData}/${tmp.message_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <TableCell>{data} </TableCell>
                        </Link>
                      );
                    else return <TableCell>{data}</TableCell>;
                  })}
                </StyledTableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      )}
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
};

export default connect(
  state => {
    return {
      data: state.filterModules.data,
      filterOn: state.filterModules.filterOn,
      from: state.filterModules.from,
      to: state.filterModules.to,
      service: state.filterModules.service,
      server: state.filterModules.server,
      car_id: state.filterModules.car_id,
      message_id: state.filterModules.message_id,
      status: state.filterModules.status,
      function: state.filterModules.function
    };
  },
  dispatch => ({
    filterAction: data => {
      dispatch(filterAction(data));
    },
    dataAction: data => {
      dispatch(dataAction(data));
    }
  })
)(CustomPaginationActionsTable);
