import React from "react";
import { Stage, Label, Layer, Rect, Line, Arrow, Text } from "react-konva";

const TransactionCanvas = () => {
  return (
    <Stage x={0} y={0} width={window.innerWidth / 2} height={400}>
      <Layer>
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
          stroke={"#7e8083"}
          fill={"#7e8083"}
          strokeWidth={3}
          dash={[10, 10]}
        />
        <Arrow
          points={[250, 250, 57, 250]}
          stroke={"#7e8083"}
          fill={"#7e8083"}
          strokeWidth={3}
          dash={[10, 10]}
        />
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
          points={[450, 0, 450, 300]}
          stroke={"#006"}
          strokeWidth={15}
          lineCap={"round"}
          lineJoin={"round"}
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
  );
};

export default TransactionCanvas;
