import React, { useCallback } from "react";
import { useCounterViewModel } from "../viewModel/useCounterViewModel";
import { Button } from "@/shared/ui/Button";

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

  // burnCpu(1250);
  const onIncrement = useCallback(increment, []);
  const onDecrement = useCallback(decrement, []);
  const onReset = useCallback(reset, []);

  return (
    <section className="p-[10px]">
      <h1>Counter</h1>

      <p>Value: {value}</p>

      <label>
        Step:{" "}
        <input
          className="border rounded-sm pl-[4px]"
          type="number"
          value={step}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            setStep(Number.isNaN(parsed) ? 1 : parsed);
          }}
        />
      </label>

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <Button onClick={onIncrement}>+</Button>
        <Button onClick={onDecrement}>-</Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </section>
  );
};
