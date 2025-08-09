import { takeBenchmark } from "@/slices/benchmark";
import { EChartsType, init } from "echarts";
import React, { FC, useEffect, useRef, useState } from "react";
import { LARGE_DATA_TIMES, SIMPLE_VALUE_TIMES } from "../global";
import "./index.less";

export const BenchmarkApp: FC = () => {
  const { simpleValue, largeData } = takeBenchmark();

  const refSimpleValue = useRef<HTMLDivElement>(null);
  const [chartSimpleValue, setChartSimpleValue] = useState<EChartsType>();
  useEffect(() => {
    if (refSimpleValue.current) {
      const chart = init(refSimpleValue.current);
      setChartSimpleValue(chart);
    }
  }, [refSimpleValue.current]);
  useEffect(() => {
    if (chartSimpleValue) {
      chartSimpleValue.setOption({
        title: {
          text: `简单数值更新${SIMPLE_VALUE_TIMES}次（同步）`,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Raydux", "Redux Toolkit", "Pinia", "Zustand"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} ms",
          },
        },
        series: [
          {
            name: "Raydux",
            type: "line",
            data: simpleValue.raydux,
          },
          {
            name: "Redux Toolkit",
            type: "line",
            data: simpleValue.reduxToolkit,
          },
          {
            name: "Pinia",
            type: "line",
            data: simpleValue.pinia,
          },
          {
            name: "Zustand",
            type: "line",
            data: simpleValue.zustand,
          },
        ],
      });
    }
  }, [chartSimpleValue, simpleValue]);

  const refLargeData = useRef<HTMLDivElement>(null);
  const [chartLargeData, setChartLargeData] = useState<EChartsType>();
  useEffect(() => {
    if (refLargeData.current) {
      const chart = init(refLargeData.current);
      setChartLargeData(chart);
    }
  }, [refLargeData.current]);
  useEffect(() => {
    if (chartLargeData) {
      chartLargeData.setOption({
        title: {
          text: `20MB+数据更新${LARGE_DATA_TIMES}次（异步）`,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Raydux", "Redux Toolkit", "Pinia", "Zustand"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} ms",
          },
        },
        series: [
          {
            name: "Raydux",
            type: "line",
            data: largeData.raydux,
          },
          {
            name: "Redux Toolkit",
            type: "line",
            data: largeData.reduxToolkit,
          },
          {
            name: "Pinia",
            type: "line",
            data: largeData.pinia,
          },
          {
            name: "Zustand",
            type: "line",
            data: largeData.zustand,
          },
        ],
      });
    }
  }, [chartLargeData, largeData]);

  return (
    <div className="app benchmark-app">
      <div className="benchmark-chart" ref={refSimpleValue} />
      <div className="benchmark-chart" ref={refLargeData} />
    </div>
  );
};
