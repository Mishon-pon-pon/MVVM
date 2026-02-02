import { onLCP, onCLS, onFCP, onINP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";

const handleMetric = (metric: Metric) => {
  const base = `[Web Vitals] ${metric.name}`;
  switch (metric.name) {
    case "LCP":
    case "FCP":
    case "INP":
    case "TTFB":
      console.log(base, `${metric.value} ms`, metric);
      break;
    case "CLS":
      console.log(base, metric.value, metric); // без ms, это не время
      break;

    default:
      console.log(base, metric.value, metric);
  }
};

function reportWebVitals(onReport: (metric: Metric) => void) {
  if (typeof onReport !== "function") return;

  onCLS(onReport);
  onINP(onReport);
  onLCP(onReport);
  onFCP(onReport);
  onTTFB(onReport);
}

export function showWebVitals() {
  reportWebVitals(handleMetric);
}
