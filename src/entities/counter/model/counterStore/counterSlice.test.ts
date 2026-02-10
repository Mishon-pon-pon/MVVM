import { describe, it, expect } from "vitest";
import counterReducer, { setStep, setValue } from "./counterSlice";

describe("counterSlice (примитивное хранилище)", () => {
  const initialState = { value: 0, step: 1 };

  it("returns initial state", () => {
    expect(counterReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("setValue updates value", () => {
    expect(counterReducer(initialState, setValue(5))).toEqual({
      value: 5,
      step: 1,
    });
  });

  it("setStep updates step", () => {
    expect(counterReducer(initialState, setStep(3))).toEqual({
      value: 0,
      step: 3,
    });
  });

  it("setValue and setStep are independent", () => {
    const state = { value: 10, step: 2 };
    expect(counterReducer(state, setValue(0))).toEqual({ value: 0, step: 2 });
    expect(counterReducer(state, setStep(1))).toEqual({ value: 10, step: 1 });
  });
});
