import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

const CounterView = React.lazy(() =>
  import("@/features/counter/ui/CounterView").then((res) => ({
    default: res.CounterView,
  }))
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/counter" element={<CounterView />} />
  </Routes>
);
