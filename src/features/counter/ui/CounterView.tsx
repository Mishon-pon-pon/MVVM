import React, { useCallback, useMemo } from "react";
import { useCounterViewModel } from "../viewModel/useCounterViewModel";
import { Button } from "@/shared/ui/Button";

// function burnCpu(ms: number) {
//   const start = performance.now();
//   while (performance.now() - start < ms) {
//     // busy loop
//     Math.random();
//   }
// }

export const CounterView: React.FC = () => {
  const { value, step, canDecrement, increment, decrement, setStep, reset } =
    useCounterViewModel();

  // burnCpu(1250);
  const onIncrement = useCallback(increment, [increment]);
  const onDecrement = useCallback(decrement, [decrement]);
  const onReset = useCallback(reset, [reset]);
  const decrementDisabled = useMemo(() => !canDecrement, [canDecrement]);

  return (
    <section className="p-2.5">
      <h1>Counter</h1>

      <p>Value: {value}</p>

      <label>
        Step:{" "}
        <input
          className="border rounded-sm pl-1"
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
        <Button disabled={decrementDisabled} onClick={onDecrement}>
          -
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </section>
  );
};
