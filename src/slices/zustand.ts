import { create } from "zustand";

export type ZustandProps = {
  count: number;
  increment: () => void;
  largeData: any;
  setLargeData: (data: any) => void;
};

export const useZustandStore = create<ZustandProps>((set) => ({
  count: 0,
  increment: () =>
    set((state) => ({
      ...state,
      count: state.count + 1,
    })),
  largeData: null,
  setLargeData: (data: any) =>
    set((state) => ({
      ...state,
      largeData: data,
    })),
}));
