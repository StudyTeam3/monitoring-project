import React from "react";
import TransactionDetail from "../../pages/TransactionDetail";
import { connect } from "react-redux";

const TransactionDetailContainer = props => {
  return <TransactionDetail data={props.match.params.data} mid={props.match.params.mid} />;
};

export default TransactionDetailContainer;
