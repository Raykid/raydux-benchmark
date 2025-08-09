import { defineStore } from "pinia";

export const usePiniaStore = defineStore("pinia", {
  state: () => ({
    count: 0,
    largeData: undefined as any,
  }),
  actions: {
    increment() {
      this.count++;
    },
    setLargeData(largeData: any) {
      this.largeData = largeData;
    },
  },
});
