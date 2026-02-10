import { Button } from "@/shared/ui/Button";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  reset: () => void;
}

export const ResetButton = React.memo(({ reset }: IProps) => {
  const { t } = useTranslation();

  return <Button onClick={reset}>{t("counter.reset")}</Button>;
});
