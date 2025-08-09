import { createSlice, takeCallback, takeState } from "raydux";

export const takeRaydux = createSlice("raydux", () => () => {
  const [count, setCount] = takeState(0);
  const increment = takeCallback(() => {
    setCount((count) => count + 1);
  }, []);

  const [largeData, setLargeData] = takeState<any>();

  return {
    count,
    increment,
    largeData,
    setLargeData,
  };
});
