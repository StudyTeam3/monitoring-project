import React, { useState } from "react";
import TransactionCanvas from "./../components/transactionDetail/TransactionCanvas";
import TransactionTable from "./../components/transactionDetail/TransactionTable";
import SuccessChip from "../components/SuccessChip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material/react-icon-button";
import { IoIosUndo } from "react-icons/io";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "../css/common.css";
import "../css/canvas.css";

const TransactionDetail = props => {
  const params = { ...props.match.params };
  const [transactionSummaryInfo, setTransactionSummaryInfo] = useState({});
  const [show, setShow] = useState(false);
  const onSummarySubmit = props => {
    setTransactionSummaryInfo(props);
    setShow(true);
  };

  return (
    <div>
      <Paper>
        <div className={"title"}>
          <div className={"titleInLine"}>
            <h1 className={"header"}>트랜잭션 상세정보</h1>
            <Link to={"/search"}>
              <IconButton size={"medium"} style={{ marginRight: "5vw" }}>
                <IoIosUndo color={"#006"} />
              </IconButton>
            </Link>
          </div>
          <hr className={"headerLine"} />
        </div>
        <div>
          <h3 className={"mid"}>{"MID: " + params.mid}</h3>
        </div>
        <div className={"CanvasDiv"}>
          {/* Card */}
          <div className={"Card"}>
            <Card className={"Card"}>
              {show && (
                <CardContent>
                  <Typography
                    className={"CardTitle"}
                    variant="h6"
                    color="textSecondary"
                    gutterBottom
                    style={{ textAlign: "center" }}
                  >
                    <b>Transaction 요약</b>
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"서비스 명:\t"}</b>
                    {transactionSummaryInfo.service_name}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"MID:\t"}</b>{transactionSummaryInfo.message_id}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"VID:\t"}</b>{transactionSummaryInfo.car_id}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"처리상태:\t"}</b>
                    <SuccessChip status={transactionSummaryInfo.status} />
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"총 소요시간:\t"}</b>{transactionSummaryInfo.duration}{" Sec"}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"시작일시:\t"}</b>{transactionSummaryInfo.start}
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    <b>{"종료일시:\t"}</b>{transactionSummaryInfo.end}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </div>
          {/* Canvas */}
          <div className={"Canvas"}>
            <TransactionCanvas />
          </div>
        </div>
      </Paper>
      <div>
        {/* Table */}
        <TransactionTable onSubmit={onSummarySubmit} message_id={params.mid} />
      </div>
    </div>
  );
};

export default TransactionDetail;
