import React, { useEffect, useState } from "react";
import { Arrow, Text, Label } from "react-konva";

const TransactionArrow = props => {
  const blue = "#002c5f";
  const gray = "#7e8083";
  const { from, to, y, isRight, text, textInterval } = props;
  const [color, setColor] = useState(blue);
  const [dash, setDash] = useState([0, 0]);

  useEffect(() => {
    if (!isRight) {
      setColor(gray);
      setDash([10, 10]);
    }
  }, []);

  return (
    <Label>
      <Arrow
        points={[from, y, to, y]}
        stroke={color}
        fill={color}
        strokeWidth={3}
        dash={dash}
      />
      {isRight ? (
        <Text
          text={text}
          x={from + textInterval}
          y={y - 25}
          fontSize={15}
          fontFamily={"Calibri"}
          fill={"#000"}
        />
      ) : (
        <Text
          text={text}
          x={to + textInterval}
          y={y - 25}
          fontSize={15}
          fontFamily={"Calibri"}
          fill={"#000"}
        />
      )}
    </Label>
  );
};

export default TransactionArrow;
