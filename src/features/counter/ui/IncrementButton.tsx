import { Button } from "@/shared/ui/Button";
import React from "react";

interface IProps {
  increment: () => void;
}

export const IncrementButton = React.memo(({ increment }: IProps) => {
  return <Button onClick={increment}>+</Button>;
});
