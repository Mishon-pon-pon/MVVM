import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";
import { onLCP } from "web-vitals";
import type { LCPMetric } from "web-vitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals((metric: any) => {
  if (metric.name === "LCP") {
    console.log("LCP:", metric.value, "ms", metric);
  }
});

function reportWebVitals(onReport: (metrics: LCPMetric) => void) {
  if (typeof onReport === "function") {
    onLCP(onReport, { reportAllChanges: true });
  }
}
