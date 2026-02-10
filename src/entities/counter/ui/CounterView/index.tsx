import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  value: number;
}

export const CounterView = React.memo(({ value }: IProps) => {
  const { t } = useTranslation();
  return (
    <p>
      {t("counter.value")}: {value}
    </p>
  );
});

CounterView.displayName = "CounterView";
