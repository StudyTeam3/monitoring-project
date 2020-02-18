import React from "react";
import TransactionCanvas from "./../components/transactionDetail/TransactionCanvas";
import TransactionTable from "./../components/transactionDetail/TransactionTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material/react-icon-button";
import { IoIosUndo } from "react-icons/io";
import "../css/common.css";
import "../css/canvas.css";

const TransactionDetail = () => {
  return (
    <div>
      <Paper>
        <div className={"title"}>
          <div className={"titleInLine"}>
            <h1 className={"header"}>트랜잭션 상세정보</h1>
            <IconButton size={"medium"} style={{ marginRight: "5vw"}}>
              <IoIosUndo color={"#006"} />
            </IconButton>
          </div>
          <hr className={"headerLine"} />
        </div>
        <div>
          <h3 className={"mid"}>{"MID: " + "MIDMIDMIDMIDMIDMIDMID"}</h3>
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
                >
                  Transaction 요약
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  어쩌구저쩌구
                </Typography>
              </CardContent>
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
        <TransactionTable />
      </div>
    </div>
  );
};

export default TransactionDetail;
