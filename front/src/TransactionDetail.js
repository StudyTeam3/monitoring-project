import React from "react";
import { Stage, Label, Layer, Rect, Line, Arrow, Text, Tag } from "react-konva";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import "./css/common.css";
import "./css/canvas.css";

const TransactionDetail = () => {
  return (
    <div>
      <div>
        <h1 className={"header"}>트랜잭션 상세정보</h1>
        <hr className={"headerLine"} />
      </div>
      <div className={"CanvasDiv"}>
        <div className={"Card"}></div>
        <Stage x={0} y={0} width={window.innerWidth} height={400}>
          <Layer>
            <Line
              points={[50, 0, 50, 300]}
              stroke={"#006"}
              strokeWidth={15}
              lineCap={"round"}
              lineJoin={"round"}
            />
            <Line
              points={[250, 0, 250, 300]}
              stroke={"#006"}
              strokeWidth={15}
              lineCap={"round"}
              lineJoin={"round"}
            />
            <Line
              points={[250, 0, 250, 300]}
              stroke={"#006"}
              strokeWidth={15}
              lineCap={"round"}
              lineJoin={"round"}
            />
            <Line
              points={[450, 0, 450, 300]}
              stroke={"#006"}
              strokeWidth={15}
              lineCap={"round"}
              lineJoin={"round"}
            />
            <Arrow
              points={[50, 100, 243, 100]}
              stroke={"#006"}
              fill={"#006"}
              strokeWidth={3}
            />
            <Arrow
              points={[250, 150, 443, 150]}
              stroke={"#006"}
              fill={"#006"}
              strokeWidth={3}
            />
            <Arrow
              points={[450, 200, 257, 200]}
              stroke={"#006"}
              fill={"#006"}
              strokeWidth={3}
              dash={[10, 10]}
            />
            <Arrow
              points={[250, 250, 57, 250]}
              stroke={"#006"}
              fill={"#006"}
              strokeWidth={3}
              dash={[10, 10]}
            />
            <Label x={0} y={0}>
              <Rect cornerRadius={10} width={100} height={50} fill="#006" />
              <Text
                text={"client"}
                x={25}
                y={15}
                fontSize={20}
                fontFamily={"Calibri"}
                fill={"#fff"}
              />
            </Label>
            <Label x={0} y={0}>
              <Rect
                cornerRadius={10}
                x={200}
                y={0}
                width={100}
                height={50}
                fill="#006"
              />
              <Text
                text={"spa"}
                x={225}
                y={15}
                fontSize={20}
                fontFamily={"Calibri"}
                fill={"#fff"}
              />
            </Label>
            <Label x={0} y={0}>
              <Rect
                cornerRadius={10}
                x={400}
                y={0}
                width={100}
                height={50}
                fill="#006"
              />
              <Text
                text={"vehicle"}
                x={425}
                y={15}
                fontSize={20}
                fontFamily={"Calibri"}
                fill={"#fff"}
                align={"center"}
              />
            </Label>
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default TransactionDetail;
