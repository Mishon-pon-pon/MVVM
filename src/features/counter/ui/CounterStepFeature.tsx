import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  step: number;
  setStep: (next: number) => void;
}

export const CounterStepFeature = React.memo(({ step, setStep }: IProps) => {
  const { t } = useTranslation();

  return (
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
  );
});
