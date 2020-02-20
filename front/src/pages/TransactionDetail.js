import React, { useState, useEffect } from "react";
import TransactionCanvas from "./../components/transactionDetail/TransactionCanvas";
import TransactionTable from "./../components/transactionDetail/TransactionTable";
import SuccessChip from "../components/SuccessChip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material/react-icon-button";
import { IoIosUndo } from "react-icons/io";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../css/common.css";
import "../css/canvas.css";
const config = require("../config/config");

const TransactionDetail = props => {
  const params = { ...props.match.params };
  const [rows, setRows] = useState([]);
  const [transactionSummaryInfo, setTransactionSummaryInfo] = useState({});
  const [rowConnection, setRowConnection] = useState([]);

  useEffect(() => {
    // 특정 Transaction을 지칭하지 않았다면, search로 redirect
    if(params.mid === undefined) props.history.push('/search');
    axios
      .post(config.development.url + "/spa/detail", { message_id: params.mid })
      .then(res => {
        setRows(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (rows.length !== 0) {
      setTransactionSummaryInfo({
        service_name: rows[0].service_name,
        message_id: rows[0].message_id,
        car_id: rows[0].car_id,
        status: rows[rows.length - 1].success,
        duration: (
          0.001 *
          (new Date(rows[rows.length - 1].time).getTime() -
            new Date(rows[0].time).getTime())
        ).toFixed(3),
        start: rows[0].time,
        end: rows[rows.length - 1].time
      });
      const tempRowConnection = [];
      for (let element of rows) {
        if (element.source !== element.destination && element.source.length < 10) {
          tempRowConnection.push({
            source: element.source,
            destination: element.destination,
            method: element.http_method,
            function: element.function,
          });
        }
      }
      setRowConnection(tempRowConnection);
    }
  }, [rows]);

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
                  <b>{"MID:\t"}</b>
                  {transactionSummaryInfo.message_id}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  <b>{"VID:\t"}</b>
                  {transactionSummaryInfo.car_id}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  <b>{"처리상태:\t"}</b>
                  <SuccessChip status={transactionSummaryInfo.status} />
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  <b>{"총 소요시간:\t"}</b>
                  {transactionSummaryInfo.duration}
                  {" Sec"}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  <b>{"시작일시:\t"}</b>
                  {transactionSummaryInfo.start}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  <b>{"종료일시:\t"}</b>
                  {transactionSummaryInfo.end}
                </Typography>
              </CardContent>
            </Card>
          </div>
          {/* Canvas */}
          <div className={"Canvas"}>
            <TransactionCanvas data={rowConnection} />
          </div>
        </div>
      </Paper>
      <div>
        {/* Table */}
        <TransactionTable data={rows} />
      </div>
    </div>
  );
};

export default TransactionDetail;
