import { createSlice, takeCallback, takeState } from "raydux";

type Benchmark = {
  raydux: number[];
  reduxToolkit: number[];
  pinia: number[];
  zustand: number[];
};

export const takeBenchmark = createSlice("benchmark", () => () => {
  const [simpleValue, setSimpleValue] = takeState<Benchmark>({
    raydux: [],
    reduxToolkit: [],
    pinia: [],
    zustand: [],
  });
  const addSimpleValue = takeCallback((type: keyof Benchmark, time: number) => {
    setSimpleValue((value) => {
      value[type].push(time);
    });
  }, []);

  const [largeData, setLargeData] = takeState<Benchmark>({
    raydux: [],
    reduxToolkit: [],
    pinia: [],
    zustand: [],
  });
  const addLargeData = takeCallback((type: keyof Benchmark, time: number) => {
    setLargeData((value) => {
      value[type].push(time);
    });
  }, []);

  return {
    simpleValue,
    addSimpleValue,
    largeData,
    addLargeData,
  };
});
