import React from "react";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const SuccessChip = (props) => {
    return (
        props.status ? (
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
          )
    );
}

export default SuccessChip;