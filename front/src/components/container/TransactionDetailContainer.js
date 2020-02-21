import React from "react";
import TransactionDetail from "../../pages/TransactionDetail"
import { connect } from "react-redux";
import { login } from "../../store/modules/loginModules";

const TransactionDetailContainer = (props) => {
    return (
        <TransactionDetail mid={props.match.params.mid} login={login} />
    )
}

export default connect(
    dispatch => ({
      login: () => {
        dispatch(login());
      }
    })
  )(TransactionDetailContainer);