import { describe, it, expect } from "vitest";
import type { RootState } from "@/app/store";
import { selectCounterValue, selectCounterStep } from "./counterSelectors";

describe("counterSelectors", () => {
  const state = {
    counter: { value: 42, step: 3 },
  } as RootState;

  it("selectCounterValue returns counter value", () => {
    expect(selectCounterValue(state)).toBe(42);
  });

  it("selectCounterStep returns counter step", () => {
    expect(selectCounterStep(state)).toBe(3);
  });
});
