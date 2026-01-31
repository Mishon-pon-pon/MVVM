import { describe, it, expect } from "vitest";
import counterReducer, {
  decrement,
  increment,
  reset,
  setStep,
} from "./counterSlice";

describe("counterSlice", () => {
  const initialState = { value: 0, step: 1 };

  it("returns initial state", () => {
    expect(counterReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("increment increases value by step", () => {
    expect(counterReducer(initialState, increment())).toEqual({
      value: 1,
      step: 1,
    });
    const withStep = { value: 10, step: 3 };
    expect(counterReducer(withStep, increment())).toEqual({
      value: 13,
      step: 3,
    });
  });

  it("decrement decreases value by step", () => {
    const state = { value: 5, step: 1 };
    expect(counterReducer(state, decrement())).toEqual({
      value: 4,
      step: 1,
    });
    const withStep = { value: 10, step: 3 };
    expect(counterReducer(withStep, decrement())).toEqual({
      value: 7,
      step: 3,
    });
  });

  it("setStep updates step", () => {
    expect(counterReducer(initialState, setStep(5))).toEqual({
      value: 0,
      step: 5,
    });
  });

  it("reset returns initial state", () => {
    const state = { value: 100, step: 7 };
    expect(counterReducer(state, reset())).toEqual(initialState);
  });
});
