import React from "react";
import { useTranslation } from "react-i18next";
import { useCounterViewModel } from "../../../entities/counter/viewModel/useCounterViewModel";
import { Button } from "@/shared/ui/Button";

export const CounterView: React.FC = () => {
  const { t } = useTranslation();
  const { value, step, canDecrement, increment, decrement, setStep, reset } =
    useCounterViewModel();

  return (
    <section className="p-2.5">
      <h1>{t("counter.title")}</h1>

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
        <Button onClick={increment}>+</Button>
        <Button disabled={!canDecrement} onClick={decrement}>
          -
        </Button>
        <Button onClick={reset}>{t("counter.reset")}</Button>
      </div>
    </section>
  );
};
