import React from "react";
import { useCounterViewModel } from "../viewModel/useCounterViewModel";

function burnCpu(ms: number) {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // busy loop
    Math.random();
  }
}

export const CounterView: React.FC = () => {
  const { value, step, canDecrement, increment, decrement, setStep, reset } =
    useCounterViewModel();

  burnCpu(1250);

  return (
    <section>
      <h1>Counter</h1>

      <p>Value: {value}</p>

      <label>
        Step:{" "}
        <input
          type="number"
          value={step}
          min={1}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            setStep(Number.isNaN(parsed) ? 1 : parsed);
          }}
        />
      </label>

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button type="button" onClick={increment}>
          +
        </button>
        <button type="button" onClick={decrement} disabled={!canDecrement}>
          -
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
};
