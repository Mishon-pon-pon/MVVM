import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { decrement, increment, reset, setStep } from "../model/counterSlice";
import {
  selectCounterStep,
  selectCounterValue,
} from "../model/counterSelectors";

export const useCounterViewModel = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectCounterValue);
  const step = useAppSelector(selectCounterStep);

  const canDecrement = value > 0;

  const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    if (!canDecrement) return;
    dispatch(decrement());
  }, [dispatch, canDecrement]);

  const handleStepChange = useCallback(
    (next: number) => {
      if (next <= 0) return;
      dispatch(setStep(next));
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return useMemo(
    () => ({
      value,
      step,
      canDecrement,
      increment: handleIncrement,
      decrement: handleDecrement,
      setStep: handleStepChange,
      reset: handleReset,
    }),
    [
      value,
      step,
      canDecrement,
      handleIncrement,
      handleDecrement,
      handleStepChange,
      handleReset,
    ],
  );
};
