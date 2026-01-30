import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./features/counter/ui/HomePage";
import { Nav } from "@/app/Nav";

const CounterView = React.lazy(() =>
  import("./features/counter/ui/CounterView").then((res) => ({
    default: res.CounterView,
  })),
);

export const App = () => {
  return (
    <div className="p-4">
      <Nav />
      <div style={{ margin: "24px" }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counter" element={<CounterView />} />
      </Routes>
    </div>
  );
};
