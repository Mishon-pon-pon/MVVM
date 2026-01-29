import type { RootState } from "@/app/store";

export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterStep = (state: RootState) => state.counter.step;
