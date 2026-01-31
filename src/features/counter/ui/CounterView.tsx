import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCounterViewModel } from "../viewModel/useCounterViewModel";
import { Button } from "@/shared/ui/Button";

export const CounterView: React.FC = () => {
  const { t } = useTranslation();
  const { value, step, canDecrement, increment, decrement, setStep, reset } =
    useCounterViewModel();

  const onIncrement = useCallback(increment, [increment]);
  const onDecrement = useCallback(decrement, [decrement]);
  const onReset = useCallback(reset, [reset]);
  const decrementDisabled = useMemo(() => !canDecrement, [canDecrement]);

  return (
    <section className="p-2.5">
      <h1>{t("counter.title")}</h1>

      <p>
        {t("counter.value")}: {value}
      </p>

      <label>
        {t("counter.step")}:{" "}
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
        <Button onClick={onReset}>{t("counter.reset")}</Button>
      </div>
    </section>
  );
};
