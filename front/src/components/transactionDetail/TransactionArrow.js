import React, { useEffect, useState } from "react";
import { Arrow } from "react-konva";

const TransactionArrow = props => {
  const blue = "#002c5f";
  const gray = "#7e8083";
  const { from, to, y, isRight } = props;
  const [color, setColor] = useState(blue);
  const [dash, setDash] = useState([0,0]);

  useEffect(() => {
    if (!isRight) {
        setColor(gray);
        setDash([10,10]);
    }
  }, []);

  return (
    <Arrow
      points={[from, y, to, y]}
      stroke={color}
      fill={color}
      strokeWidth={3}
      dash={dash}
    />
  );
};

export default TransactionArrow;
