import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  step: number;
}

const initialState: CounterState = {
  value: 0,
  step: 1,
};

/**
 * Слайс — только примитивное хранилище (setValue, setStep).
 * Вся бизнес-логика (increment, decrement, reset, валидация) в CounterModel.
 */
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
  },
});

export const { setValue, setStep } = counterSlice.actions;
export default counterSlice.reducer;
