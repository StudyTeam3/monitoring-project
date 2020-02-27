import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import DatePicker from "./DatePicker";
import { connect } from "react-redux";
import {
  filterAction,
  funcAction,
  statusAction,
  serviceAction,
  serverAction,
  message_idAction,
  car_idAction,
  refreshAction
} from "../store/modules/filterModules";
import "../css/filter.css";

const SelectService = (props, ref) => {
  const classes = useStyles();
  const [service, setService] = React.useState("");

  const refresh = () => {
    setService("");
  };

  const handleChange = event => {
    setService(event.target.value);
    props.function(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={service}
        onChange={handleChange}
      >
        <MenuItem value={"bluelink"}>bluelink</MenuItem>
        <MenuItem value={"uvo"}>uvo</MenuItem>
      </Select>
    </FormControl>
  );
};

const SelectStatus = props => {
  const classes = useStyles();
  const [status, setStatus] = React.useState("");

  const refresh = () => {
    setStatus("");
  };

  const handleChange = event => {
    setStatus(event.target.value);
    props.function(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        onChange={handleChange}
      >
        <MenuItem value={"success"}>success</MenuItem>
        <MenuItem value={"fail"}>fail</MenuItem>
      </Select>
    </FormControl>
  );
};

const SelectFunction = props => {
  const classes = useStyles();
  const [func, setFunc] = React.useState("");

  const refresh = () => {
    setFunc("");
  };

  const handleChange = event => {
    setFunc(event.target.value);
    props.function(event.target.value);
  };

  return (
    <FormControl className={classes.input}>
      <TextField
        id="standard-basic"
        label="Search Function"
        value={func}
        onChange={handleChange}
      />
    </FormControl>
  );
};

const SelectServer = props => {
  const classes = useStyles();
  const [server, setServer] = React.useState("");

  const refresh = () => {
    setServer("");
  };

  const handleChange = event => {
    setServer(event.target.value);
    props.function(event.target.value);
  };

  return (
    <FormControl className={classes.input}>
      <TextField
        id="standard-basic"
        label="Search Server"
        value={server}
        onChange={handleChange}
      />
    </FormControl>
  );
};

const SearchMessageID = props => {
  const classes = useStyles();
  const [messageID, setMessageID] = React.useState("");

  const refresh = () => {
    setMessageID("");
  };

  const handleChange = event => {
    setMessageID(event.target.value);
    props.function(event.target.value);
  };

  return (
    <FormControl className={classes.input}>
      <TextField
        id="standard-basic"
        label="Search Message ID"
        value={messageID}
        onChange={handleChange}
      />
    </FormControl>
  );
};

const SearchCarID = props => {
  const classes = useStyles();
  const [carID, setCarID] = React.useState("");

  const refresh = () => {
    setCarID("");
  };

  const handleChange = event => {
    setCarID(event.target.value);
    props.function(event.target.value);
  };

  return (
    <FormControl className={classes.input}>
      <TextField
        id="standard-basic"
        label="Search Car ID"
        value={carID}
        onChange={handleChange}
      />
    </FormControl>
  );
};

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 650,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    "& > *": {
      marginTop: 10,
      marginLeft: 20,
      width: 170
    }
  }
}));

class filter extends Component {
  state = {
    starTime: "",
    endTime: "",
    MID: "",
    server: "",
    service: "",
    carID: "",
    function: "",
    status: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = e => {
    this.props.filterAction(true);
    // e.preventDefault();
    // this.props.onSubmit(this.state);
  };

  refresh = () => {
    // this.setState({
    //   starTime: "",
    //   endTime: "",
    //   MID: "",
    //   server: "",
    //   service: "",
    //   carID: "",
    //   function: "",
    //   status: ""
    // })
    // console.log(this.refs);
    // this.date.refresh();
  };

  render() {
    return (
      //여기에 state만들어서 위에 있는 함수들에서 state를 변경하게끔
      //여기에 handle

      <div>
        <div>
          <DatePicker />
          <IconButton color="primary" onClick={this.handleSearch}>
            <SearchIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            endIcon={<RefreshIcon />}
            onClick={this.refresh}
          >
            Refresh
          </Button>
        </div>
        <div>
          <SelectFunction function={this.props.funcAction} />
          <SelectStatus function={this.props.statusAction} />
          <SelectService function={this.props.serviceAction} />
        </div>
        <div>
          <SearchMessageID function={this.props.message_idAction} />
          <SearchCarID function={this.props.car_idAction} />
          <SelectServer function={this.props.serverAction} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
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
  // null,
  dispatch => ({
    filterAction: data => {
      dispatch(filterAction(data));
    },
    funcAction: data => {
      dispatch(funcAction(data));
    },
    statusAction: data => {
      dispatch(statusAction(data));
    },
    serviceAction: data => {
      dispatch(serviceAction(data));
    },
    serverAction: data => {
      dispatch(serverAction(data));
    },
    message_idAction: data => {
      dispatch(message_idAction(data));
    },
    car_idAction: data => {
      dispatch(car_idAction(data));
    },
    refreshAction: data => {
      dispatch(refreshAction());
    }
  })
)(filter);
