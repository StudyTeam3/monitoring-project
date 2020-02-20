import React from "react";
import { Label, Rect, Line, Text } from "react-konva";

const TransactionBar = props => {
  const auto = "#006";
  const black = "#fff";
  const { x, text } = props;

  return (
    <Label x={x} y={0}>
      <Line
        points={[50, 0, 50, 350]}
        stroke={auto}
        strokeWidth={15}
        lineCap={"round"}
        lineJoin={"round"}
      />
      <Rect cornerRadius={10} width={100} height={50} fill={auto} />
      <Text
        text={text}
        x={25}
        y={15}
        fontSize={20}
        fontFamily={"Calibri"}
        fill={black}
      />
    </Label>
  );
};

export default TransactionBar;
