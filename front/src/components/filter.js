import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import DatePicker from './DatePicker'
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import '../css/filter.css'

const SelectService = () => {
  const classes = useStyles();
  const [service, setService] = React.useState("");

  const handleChange = event => {
    setService(event.target.value);
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

const SelectStatus = () => {
  const classes = useStyles();
  const [status, setStatus] = React.useState("");

  const handleChange = event => {
    setStatus(event.target.value);
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

const SelectFunction = () => {
  const classes = useStyles();
  const [func, serFunc] = React.useState("");

  const handleChange = event => {
    serFunc(event.target.value);
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

const SelectServer = () => {
  const classes = useStyles();
  const [server, setServer] = React.useState("");

  const handleChange = event => {
    setServer(event.target.value);
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

const SearchMessageID = () => {
  const classes = useStyles();
  const [messageID, setMessageID] = React.useState("");

  const handleChange = event => {
    setMessageID(event.target.value);
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

const SearchCarID = () => {
  const classes = useStyles();
  const [carID, setCarID] = React.useState("");

  const handleChange = event => {
    setCarID(event.target.value);
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
      starTime: '',
      endTime: '',
      MID: '',
      server: '',
      service: '',
      CID: '',
      function: '',
      status: '',
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  handleSearch = (e) => {

    console.log(this.state);

  }

  render() {

    return (
        //여기에 state만들어서 위에 있는 함수들에서 state를 변경하게끔 
        //여기에 handle
        
        <div>
         <div>
            <DatePicker/>
            <IconButton color="primary" onClick={this.handleSearch}>
            <SearchIcon/>
            </IconButton>
         </div>
         <div>
           <SelectFunction/>
           <SelectStatus/>
           <SelectService/>
         </div>
         <div>
           <SearchMessageID/>
           <SearchCarID/>
           <SelectServer/>
         </div>
        </div>
    );
  }
}

export default filter;
