import React from "react";
import { Button } from "@/shared/ui/Button";

interface IProps {
  canDecrement: boolean;
  decrement: () => void;
}

export const DecrementButton = React.memo(
  ({ canDecrement, decrement }: IProps) => {
    return (
      <Button disabled={!canDecrement} onClick={decrement}>
        -
      </Button>
    );
  }
);
