import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import DatePicker from "./DatePicker";
import { connect } from "react-redux";
import {
  filterAction,
  funcAction,
  statusAction,
  serviceAction,
  serverAction,
  message_idAction,
  car_idAction
} from "../store/modules/filterModules";
import "../css/filter.css";

const SelectService = props => {
  const classes = useStyles();
  const [service, setService] = React.useState("");

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
        <MenuItem value={"start"}>start</MenuItem>
        <MenuItem value={"ing"}>ing</MenuItem>
        <MenuItem value={"end"}>end</MenuItem>
      </Select>
    </FormControl>
  );
};

const SelectFunction = props => {
  const classes = useStyles();
  const [func, serFunc] = React.useState("");

  const handleChange = event => {
    serFunc(event.target.value);
    props.function(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Select Function</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={func}
        onChange={handleChange}
      >
        <MenuItem value={"park"}>park</MenuItem>
        <MenuItem value={"location"}>location</MenuItem>
        <MenuItem value={"control"}>control</MenuItem>
      </Select>
    </FormControl>
  );
};

const SelectServer = props => {
  const classes = useStyles();
  const [server, setServer] = React.useState("");

  const handleChange = event => {
    setServer(event.target.value);
    props.function(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Select Server</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={server}
        onChange={handleChange}
      >
        <MenuItem value={"client"}>client</MenuItem>
        <MenuItem value={"spa"}>spa</MenuItem>
        <MenuItem value={"vehicle"}>vehicle</MenuItem>
      </Select>
    </FormControl>
  );
};

const SearchMessageID = props => {
  const classes = useStyles();
  const [messageID, setMessageID] = React.useState("");

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
    marginTop: 10,
    marginLeft: 20,
    minWidth: 170
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
    // console.log(this.props);
    this.props.filterAction(true);
  };

  handleTest = data => {
    console.log(data);
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
    }
  })
)(filter);
