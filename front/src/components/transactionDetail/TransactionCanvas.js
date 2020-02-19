import React, { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import TransactionBar from "./TransactionBar";
import TransactionArrow from "./TransactionArrow";

const TransactionCanvas = props => {
  const { data } = props;
  const [realLoc, setRealLoc] = useState({});
  const [realNodeLoc, setRealLocArr] = useState([]);
  const [arrows, setArrows] = useState([]);
  const Width = window.innerWidth / 2;
  const Height = 400;

  const makeRealLoc = () => {
    let tempLoc = [];
    let tempObj = {};
    // 노드 개수 구하기
    for (let element of data) {
      if (!tempObj.hasOwnProperty(element.source)) {
        tempLoc.push({ node: element.source });
        tempObj[element.source] = {};
      }
      if (!tempObj.hasOwnProperty(element.destination)) {
        tempLoc.push({ node: element.destination });
        tempObj[element.destination] = {};
      }
    }
    let interval = Width / tempLoc.length;
    let index = 0;
    // 노드 위치 정하기
    for (let element of tempLoc) {
      element["x"] = interval * index;
      tempObj[element.node]["x"] = interval * index;
      index++;
    }
    setRealLocArr(tempLoc);
    setRealLoc(tempObj);
  };

  const makeArrows = () => {
    const interval = 300 / realNodeLoc.length;
    let index = 0;
    const tempArrows = [];
    for (let element of data) {
      const isRight = (realLoc[element.source].x < realLoc[element.destination].x + 50);
      tempArrows.push({
        from: realLoc[element.source].x + 50,
        to: realLoc[element.destination].x + 50,
        y: ( index * interval ) + 80,
        isRight: isRight
      });
      index++;
    }
    console.log(tempArrows);
    setArrows(tempArrows);
  };

  useEffect(() => {
    if (data.length !== 0) {
      console.log(data);
      makeRealLoc();
    }
  }, [data]);

  useEffect(() => {
    if (data.length !== 0) {
      makeArrows();
    }
  }, [realLoc]);

  return (
    <Stage x={0} y={0} width={Width} height={Height}>
      <Layer>
        {realNodeLoc.map(element => {
          return <TransactionBar x={element.x} text={element.node} />;
        })}
        {arrows.map(element => {
          return (
            <TransactionArrow
              from={element.from}
              to={element.to}
              y={element.y}
              isRight={element.isRight}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default TransactionCanvas;
