import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./features/counter/ui/HomePage";
import React from "react";

const CounterView = React.lazy(() =>
  import("./features/counter/ui/CounterView").then((res) => ({
    default: res.CounterView,
  })),
);

export const App = () => {
  return (
    <>
      <nav style={{ display: "flex", gap: "4px" }}>
        <Link to="/">Home</Link>
        <Link to="/counter">counter</Link>
      </nav>
      <div style={{ margin: "24px" }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counter" element={<CounterView />} />
      </Routes>
    </>
  );
};
