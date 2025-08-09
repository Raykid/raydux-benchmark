import { takeBenchmark } from "@/slices/benchmark";
import { useZustandStore } from "@/slices/zustand";
import { copyLargeJson } from "@/utils/generateLargeJson";
import React, { FC, useCallback, useMemo } from "react";
import { LARGE_DATA_TIMES, SIMPLE_VALUE_TIMES } from "../global";
import "./index.less";

export const ZustandApp: FC = () => {
  const { count, increment, largeData, setLargeData } = useZustandStore();

  const onClickSimpleValue = useCallback(() => {
    const startTime = Date.now();
    for (let i = 0; i < SIMPLE_VALUE_TIMES; i++) {
      increment();
    }
    const delta = Date.now() - startTime;
    takeBenchmark().addSimpleValue("zustand", delta);
  }, [increment]);

  const onClickLargeData = useCallback(async () => {
    let sumDelta = 0;
    for (let i = 0; i < LARGE_DATA_TIMES; i++) {
      const data = copyLargeJson();
      const startTime = Date.now();
      setLargeData(data);
      sumDelta += Date.now() - startTime;
    }
    takeBenchmark().addLargeData("zustand", sumDelta);
    // 等待 0ms
    await new Promise((resolve) => setTimeout(resolve, 0));
  }, [setLargeData]);

  const largeDataStr = useMemo(() => {
    return JSON.stringify(largeData);
  }, [largeData]);

  return (
    <div className="app zustand-app">
      <h3>Zustand</h3>
      <button onClick={onClickSimpleValue}>
        {SIMPLE_VALUE_TIMES}次简单数值更新
      </button>
      <button onClick={onClickLargeData}>
        {LARGE_DATA_TIMES}次大型数据更新
      </button>
    </div>
  );
};
