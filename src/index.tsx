/// <reference types="antd" />

import "@/utils/vite-util";
import { createPinia } from "pinia";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createApp } from "vue";
import "./index.less";
import { BenchmarkApp } from "./pages/benchmark";
import VueApp from "./pages/pinia/app.vue";
import { RayduxApp } from "./pages/raydux";
import { ReduxToolkitApp } from "./pages/redux-toolkit";
import { ZustandApp } from "./pages/zustand";
import { store } from "./slices/redux-toolkit";

// 初始化 raydux 模块
createRoot(document.getElementById("root-raydux")!).render(<RayduxApp />);
// 初始化 redux-toolkit 模块
createRoot(document.getElementById("root-redux-toolkit")!).render(
  <Provider store={store}>
    <ReduxToolkitApp />
  </Provider>,
);
// 初始化 pinia 模块
createApp(VueApp).use(createPinia()).mount("#root-pinia");
// 初始化 zustand 模块
createRoot(document.getElementById("root-zustand")!).render(<ZustandApp />);

// 初始化 benchmark 模块
createRoot(document.getElementById("root-benchmark")!).render(<BenchmarkApp />);
