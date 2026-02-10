import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

const CounterPageLazy = React.lazy(() =>
  import("@/widgets/counter/ui/CounterWidget").then((res) => ({
    default: res.CounterWidget,
  }))
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/counter" element={<CounterPageLazy />} />
  </Routes>
);
