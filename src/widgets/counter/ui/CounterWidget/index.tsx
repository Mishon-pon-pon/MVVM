import { CounterView } from "@/entities/counter/ui/CounterView";
import { useCounterViewModel } from "@/entities/counter/viewModel";
import { CounterStepFeature } from "@/features/counter/ui/CounterStepFeature";
import { DecrementButton } from "@/features/counter/ui/DecrimentButton";
import { IncrementButton } from "@/features/counter/ui/IncrementButton";
import { ResetButton } from "@/features/counter/ui/ResetButton";
import { useTranslation } from "react-i18next";

export const CounterWidget = () => {
  const { t } = useTranslation();

  const { value, step, canDecrement, increment, decrement, setStep, reset } =
    useCounterViewModel();

  return (
    <section className="p-2.5">
      <h1>{t("counter.title")}</h1>
      <CounterView value={value} />
      <CounterStepFeature setStep={setStep} step={step} />

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <IncrementButton increment={increment} />
        <DecrementButton decrement={decrement} canDecrement={canDecrement} />
        <ResetButton reset={reset} />
      </div>
    </section>
  );
};
