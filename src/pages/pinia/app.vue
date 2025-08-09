<template>
  <div class="app pinia-app">
    <h3>Pinia</h3>
    <button @click="onClickSimpleValue">
      {{ SIMPLE_VALUE_TIMES }}次简单数值更新
    </button>
    <button @click="onClickLargeData">
      {{ LARGE_DATA_TIMES }}次大型数据更新
    </button>
  </div>
</template>

<script setup lang="ts">
import { takeBenchmark } from "@/slices/benchmark";
import { usePiniaStore } from "@/slices/pinia";
import { copyLargeJson } from "@/utils/generateLargeJson";
import { computed } from "vue";
import { LARGE_DATA_TIMES, SIMPLE_VALUE_TIMES } from "../global";

const pinia = usePiniaStore();

const onClickSimpleValue = () => {
  const startTime = Date.now();
  for (let i = 0; i < SIMPLE_VALUE_TIMES; i++) {
    pinia.increment();
  }
  const delta = Date.now() - startTime;
  takeBenchmark().addSimpleValue("pinia", delta);
};

const onClickLargeData = async () => {
  let sumDelta = 0;
  for (let i = 0; i < LARGE_DATA_TIMES; i++) {
    const data = copyLargeJson();
    const startTime = Date.now();
    pinia.setLargeData(data);
    sumDelta += Date.now() - startTime;
  }
  takeBenchmark().addLargeData("pinia", sumDelta);
  // 等待 0ms
  await new Promise((resolve) => setTimeout(resolve, 0));
};

const largeDataStr = computed(() => {
  return JSON.stringify(pinia.largeData);
});
</script>

<style scoped>
.pinia-app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
