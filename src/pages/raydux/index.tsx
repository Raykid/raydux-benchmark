import { takeBenchmark } from "@/slices/benchmark";
import { takeRaydux } from "@/slices/raydux";
import { copyLargeJson } from "@/utils/generateLargeJson";
import React, { FC, useCallback, useMemo } from "react";
import { LARGE_DATA_TIMES, SIMPLE_VALUE_TIMES } from "../global";
import "./index.less";

export const RayduxApp: FC = () => {
  const { count, increment, largeData, setLargeData } = takeRaydux();

  const onClickSimpleValue = useCallback(() => {
    const startTime = Date.now();
    for (let i = 0; i < SIMPLE_VALUE_TIMES; i++) {
      increment();
    }
    const delta = Date.now() - startTime;
    takeBenchmark().addSimpleValue("raydux", delta);
  }, [increment]);

  const onClickLargeData = useCallback(async () => {
    let sumDelta = 0;
    for (let i = 0; i < LARGE_DATA_TIMES; i++) {
      const data = copyLargeJson();
      const startTime = Date.now();
      setLargeData(data);
      sumDelta += Date.now() - startTime;
    }
    takeBenchmark().addLargeData("raydux", sumDelta);
    // 等待 0ms
    await new Promise((resolve) => setTimeout(resolve, 0));
  }, [setLargeData]);

  const largeDataStr = useMemo(() => {
    return JSON.stringify(largeData);
  }, [largeData]);

  return (
    <div className="app raydux-app">
      <h3>Raydux</h3>
      <button onClick={onClickSimpleValue}>
        {SIMPLE_VALUE_TIMES}次简单数值更新
      </button>
      <button onClick={onClickLargeData}>
        {LARGE_DATA_TIMES}次大型数据更新
      </button>
    </div>
  );
};
