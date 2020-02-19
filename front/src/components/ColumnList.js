import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 450
  }
}));

const capitalize = (str) => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace("_"," ");
}


export default function ColumnList() {
  const classes = useStyles();
  const preChecked = window.sessionStorage.getItem("column");
  const [checked, setChecked] = React.useState(JSON.parse(preChecked));

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(newChecked);
    window.sessionStorage.setItem('column', JSON.stringify(newChecked));
  };

  const columns = [
    "start_time",
    "end_time",
    "log_level",
    "server_range",
    "server_name",
    "service_name",
    "message_id",
    "protocol",
    "http_method",
    "uri",
    "source",
    "destination",
    "commu_type",
    "success",
    "function",
    "car_id"
  ];

  return (
    <List className={classes.root}>
      {columns.map(name => (
        <ListItem>
          <ListItemText id={name} primary={capitalize(name)} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle(`${name}`)}
              color="primary"
              checked={checked.indexOf(`${name}`) !== -1}
              inputProps={{}}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

